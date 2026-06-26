/**
 * Theme generator — single source of truth -> every variant.
 *
 * Source of truth: the canonical OKLCH theme files in `registry/themes/*.css`
 * (data-theme selectors, Tailwind v4 architecture). These are hand-authored /
 * exported from tweakcn. From each we generate:
 *
 *   v4 column (raw color functions, data-theme selectors):
 *     - oklch  -> identical to source (parity gate; we re-emit to prove no drift)
 *     - hsl / hex / rgb
 *   v3 column (bare channel triplets, :root/.dark in @layer base):
 *     - hsl / hex / rgb   (oklch is not representable in the v3 wrapper model)
 *
 * Outputs:
 *   registry/themes/variants/<name>.<ver>.<fmt>.css   (all non-default variants)
 *   src/styles/*.css                                  (mirror of v4-oklch for the site)
 *   registry/themes/index.css + src/styles/index.css  (regenerated import lists)
 *
 * It also rewrites registry.json to add variant items, and validates structure.
 *
 * Why parse instead of a normalized schema: the 44 source files are not uniform
 * (token set, order, precision, multi-line shadows all differ). Parsing and
 * transforming only color-valued declarations is the only way to keep the
 * v4-oklch column byte-identical while producing correct conversions.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  parseThemeCss,
  serializeTheme,
  serializeIdentity,
  type ParsedTheme,
} from "./lib/parse-theme";
import {
  convertColor,
  v3Wrapper,
  type ColorFormat,
  type TwVersion,
} from "./lib/convert-color";

const ROOT = process.cwd();
const THEMES_DIR = join(ROOT, "registry", "themes");
const VARIANTS_DIR = join(THEMES_DIR, "variants");
const STYLES_DIR = join(ROOT, "src", "styles");
const REGISTRY_JSON = join(ROOT, "registry.json");

const EOL = "\r\n"; // source files are CRLF; keep generated output consistent

// (version, format) matrix. oklch only valid for v4.
const VARIANTS: { version: TwVersion; format: ColorFormat }[] = [
  { version: "v4", format: "oklch" },
  { version: "v4", format: "hsl" },
  { version: "v4", format: "hex" },
  { version: "v4", format: "rgb" },
  { version: "v3", format: "hsl" },
  { version: "v3", format: "hex" },
  { version: "v3", format: "rgb" },
];

function themeFiles(): string[] {
  return readdirSync(THEMES_DIR)
    .filter(
      (f) => f.endsWith(".css") && f !== "index.css" && f !== "globals.css",
    )
    .map((f) => f.replace(/\.css$/, ""));
}

/** Source files keep a curated (non-alphabetical) import order in index.css. */
function importOrder(): string[] {
  const idx = readFileSync(join(THEMES_DIR, "index.css"), "utf8");
  const order: string[] = [];
  for (const m of idx.matchAll(/\.\/([a-z0-9-]+)\.css/g)) order.push(m[1]);
  return order;
}

/** v4: rewrite color declarations to the target format; structure untouched. */
function renderV4(parsed: ParsedTheme, format: ColorFormat): string {
  if (format === "oklch") return serializeIdentity(parsed);
  return serializeTheme(parsed, (value) => convertColor(value, "v4", format));
}

/**
 * v3: rewrite selectors `[data-theme="x-light"]` -> `:root`,
 * `[data-theme="x-dark"]` -> `.dark`, wrap the whole thing in `@layer base`,
 * and emit colors as bare channel triplets. Multi-line shadow values keep their
 * inline hsl()/rgb() (they're composite, not single-color tokens) and pass through.
 */
function renderV3(
  parsed: ParsedTheme,
  name: string,
  format: ColorFormat,
): string {
  const body = serializeTheme(parsed, (value, token) => {
    // Only convert single-color tokens (parser already flagged these).
    void token;
    return convertColor(value, "v3", format);
  });

  // Rewrite selectors on the raw structural lines.
  let v3 = body
    .replace(new RegExp(`\\[data-theme="${name}-light"\\]`, "g"), ":root")
    .replace(new RegExp(`\\[data-theme="${name}-dark"\\]`, "g"), ".dark")
    .replace(/\/\* Light mode \*\//g, "/* Light mode (:root) */")
    .replace(/\/\* Dark mode \*\//g, "/* Dark mode (.dark) */");

  const wrap = v3Wrapper(format);
  const header =
    `/* ${titleFromName(name)} Theme — Tailwind v3 (${format}) */${EOL}` +
    `/* Channel triplets — consume via ${wrap}(var(--token)). See tailwind.config snippet in docs. */${EOL}${EOL}` +
    `@layer base {${EOL}`;

  // Indent existing body by two spaces (it now lives inside @layer base).
  const indented = v3
    .split(EOL)
    .map((line) => (line.trim() === "" ? line : `  ${line}`))
    .join(EOL);

  return `${header}${indented}${EOL}}${EOL}`;
}

function titleFromName(name: string): string {
  // Reuse the title embedded in the source file's first comment if present.
  try {
    const src = readFileSync(join(THEMES_DIR, `${name}.css`), "utf8");
    const m = src.match(/\/\*\s*(.+?)\s+Theme/);
    if (m) return m[1];
  } catch {
    /* fall through */
  }
  return name;
}

function variantFileName(
  name: string,
  version: TwVersion,
  format: ColorFormat,
): string {
  return `${name}.${version}.${format}.css`;
}

/** Format labels for human-readable titles/descriptions. */
const FMT_LABEL: Record<ColorFormat, string> = {
  oklch: "OKLCH",
  hsl: "HSL",
  hex: "HEX",
  rgb: "RGB",
};

interface RegistryFile {
  path: string;
  type: string;
  target: string;
}
interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  files?: RegistryFile[];
  /** marker so re-runs can strip + rebuild generated variant items idempotently */
  meta?: { generatedVariant?: boolean; [k: string]: unknown };
  [k: string]: unknown;
}

/**
 * Add installable variant items to registry.json, one per (name, version, format)
 * except v4-oklch (which is the existing default `theme-<name>` item). Idempotent:
 * strips previously generated variant items first.
 */
function updateRegistryJson(names: string[]) {
  const reg = JSON.parse(readFileSync(REGISTRY_JSON, "utf8")) as {
    items: RegistryItem[];
    [k: string]: unknown;
  };

  // Drop any previously generated variant items.
  reg.items = reg.items.filter((it) => !it.meta?.generatedVariant);

  // Index base theme items by short name for title/description reuse.
  const baseByName = new Map<string, RegistryItem>();
  for (const it of reg.items) {
    if (it.type === "registry:theme" && it.name.startsWith("theme-")) {
      baseByName.set(it.name.slice("theme-".length), it);
    }
  }

  const newItems: RegistryItem[] = [];
  for (const name of names) {
    const base = baseByName.get(name);
    const baseTitle = base?.title ?? titleFromName(name);
    const baseDesc = base?.description ?? "";
    for (const { version, format } of VARIANTS) {
      if (version === "v4" && format === "oklch") continue; // default item
      const file = variantFileName(name, version, format);
      newItems.push({
        name: `theme-${name}-${version}-${format}`,
        type: "registry:theme",
        title: `${baseTitle} (Tailwind ${version}, ${FMT_LABEL[format]})`,
        description: baseDesc
          ? `${baseDesc} — Tailwind ${version} / ${FMT_LABEL[format]} variant.`
          : `Tailwind ${version} / ${FMT_LABEL[format]} variant.`,
        files: [
          {
            path: `registry/themes/variants/${file}`,
            type: "registry:file",
            target: `styles/themes/${name}.css`,
          },
        ],
        meta: { generatedVariant: true },
      });
    }
  }

  reg.items.push(...newItems);
  // Match the existing file: 2-space indent, CRLF line endings, trailing newline.
  const json = JSON.stringify(reg, null, 2).replace(/\n/g, EOL) + EOL;
  writeFileSync(REGISTRY_JSON, json);
  return newItems.length;
}

function main() {
  const names = themeFiles();
  mkdirSync(VARIANTS_DIR, { recursive: true });

  let parityFail = 0;
  for (const name of names) {
    const src = readFileSync(join(THEMES_DIR, `${name}.css`), "utf8");
    const parsed = parseThemeCss(src);

    for (const { version, format } of VARIANTS) {
      const out =
        version === "v4"
          ? renderV4(parsed, format)
          : renderV3(parsed, name, format);

      if (version === "v4" && format === "oklch") {
        // Parity gate: this MUST equal the source. We do not overwrite the
        // canonical file with itself, but we verify the round-trip is exact.
        if (out !== src) {
          parityFail++;
          let i = 0;
          while (i < src.length && src[i] === out[i]) i++;
          console.error(
            `  PARITY FAIL ${name}: byte ${i} ${JSON.stringify(src.slice(i, i + 30))} != ${JSON.stringify(out.slice(i, i + 30))}`,
          );
        }
        continue; // canonical file already on disk; don't duplicate into variants/
      }

      writeFileSync(
        join(VARIANTS_DIR, variantFileName(name, version, format)),
        out,
      );
    }

    // Mirror canonical v4-oklch into src/styles for the demo site.
    writeFileSync(join(STYLES_DIR, `${name}.css`), src);
  }

  // Regenerate index.css in both locations from the curated order.
  const order = importOrder().filter((n) => names.includes(n));
  // include any themes missing from the curated order (new themes appended).
  for (const n of names) if (!order.includes(n)) order.push(n);
  const indexCss =
    `/* Theme imports */${EOL}` +
    order.map((n) => `@import "./${n}.css";`).join(EOL) +
    EOL;
  writeFileSync(join(THEMES_DIR, "index.css"), indexCss);
  writeFileSync(join(STYLES_DIR, "index.css"), indexCss);

  const variantCount = names.length * (VARIANTS.length - 1); // minus v4-oklch
  if (parityFail > 0) {
    console.error(`\n✗ ${parityFail} parity failures — aborting.`);
    process.exit(1);
  }

  const itemCount = updateRegistryJson(names);

  console.log(
    `✓ parity OK for ${names.length} themes (v4-oklch byte-identical)`,
  );
  console.log(`✓ wrote ${variantCount} variant files to registry/themes/variants/`);
  console.log(`✓ mirrored ${names.length} canonical files to src/styles/`);
  console.log(`✓ regenerated index.css (${order.length} imports)`);
  console.log(`✓ added ${itemCount} variant items to registry.json`);
}

main();
