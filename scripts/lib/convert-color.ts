/**
 * Color conversion for the theme generator.
 *
 * The canonical source format is OKLCH. At generate-time we convert each
 * color-valued token into the target format. shadcn injects variable values
 * verbatim (it does NOT convert), so whatever we emit is exactly what lands in
 * the consumer's project — every conversion here must be correct and stable.
 *
 * Two consumption models:
 *  - Tailwind v4: raw color functions, e.g. `--primary: oklch(...)` / `hsl(...)` /
 *    `rgb(...)` / `#rrggbb`, used directly (no wrapper).
 *  - Tailwind v3: bare channel triplets, e.g. `--primary: 70 16% 77%;` consumed via
 *    `hsl(var(--primary))`, or `--primary: 224 168 95;` consumed via `rgb(var(--primary))`.
 */

import { formatHex, oklch, rgb, hsl, clampChroma, type Color } from "culori";

export type ColorFormat = "oklch" | "hsl" | "hex" | "rgb";
export type TwVersion = "v4" | "v3";

/** A value that is NOT a color and must be passed through unchanged. */
export type NonColor = { kind: "passthrough"; value: string };

// Round to a sane precision and drop trailing zeros (e.g. 0.500 -> 0.5, 12.0 -> 12).
function round(n: number, places: number): number {
  const f = Math.pow(10, places);
  return Math.round(n * f) / f;
}
function num(n: number, places = 2): string {
  return String(round(n, places));
}
function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
function clamp255(n: number): number {
  return Math.min(255, Math.max(0, Math.round(n)));
}

/**
 * Returns true if `value` is a single color function we know how to convert.
 * We intentionally only treat standalone color values (the common case for theme
 * tokens) — composite values (shadows, font stacks, lengths) are passthrough.
 */
const SINGLE_COLOR_RE =
  /^(oklch|rgb|rgba|hsl|hsla)\([^()]*\)$|^#[0-9a-fA-F]{3,8}$/;

export function isConvertibleColor(value: string): boolean {
  return SINGLE_COLOR_RE.test(value.trim());
}

/**
 * Parse a value to a color, gamut-mapped into sRGB.
 *
 * OKLCH can describe colors outside the sRGB gamut (e.g. a vivid `destructive`
 * red). Converting those naively yields invalid output — saturation > 100% or
 * negative RGB channels. We reduce chroma in OKLCH until the color fits sRGB
 * (CSS Color 4 gamut mapping), preserving hue and lightness.
 */
function parse(value: string): Color | undefined {
  const c = oklch(value) as Color | undefined;
  if (!c) return undefined;
  // clampChroma maps into the target gamut (default "rgb" = sRGB).
  return clampChroma(c, "oklch");
}

/** v4 raw-function output for a given target format. */
function toV4(value: string, format: ColorFormat): string {
  if (format === "oklch") return value; // canonical — emit unchanged

  const c = parse(value);
  if (!c) return value; // unparseable: leave as-is rather than corrupt

  if (format === "hex") {
    return formatHex(c) ?? value;
  }
  if (format === "rgb") {
    const r = rgb(c);
    if (!r) return value;
    const R = clamp255((r.r ?? 0) * 255);
    const G = clamp255((r.g ?? 0) * 255);
    const B = clamp255((r.b ?? 0) * 255);
    const a = r.alpha;
    return a === undefined || a === 1
      ? `rgb(${R}, ${G}, ${B})`
      : `rgba(${R}, ${G}, ${B}, ${num(a, 3)})`;
  }
  // hsl
  const h = hsl(c);
  if (!h) return value;
  const H = num(h.h ?? 0, 2);
  const S = num(clamp01(h.s ?? 0) * 100, 2);
  const L = num(clamp01(h.l ?? 0) * 100, 2);
  const a = h.alpha;
  return a === undefined || a === 1
    ? `hsl(${H} ${S}% ${L}%)`
    : `hsl(${H} ${S}% ${L}% / ${num(a, 3)})`;
}

/** v3 bare-triplet output (consumed via hsl()/rgb() wrappers in tailwind.config). */
function toV3Triplet(value: string, format: ColorFormat): string {
  const c = parse(value);
  if (!c) return value;

  if (format === "rgb" || format === "hex") {
    // v3 hex variant also uses an rgb triplet (hex can't be a CSS var channel set
    // that composes with opacity utilities); both consumed via rgb(var(--x)).
    const r = rgb(c);
    if (!r) return value;
    const R = clamp255((r.r ?? 0) * 255);
    const G = clamp255((r.g ?? 0) * 255);
    const B = clamp255((r.b ?? 0) * 255);
    return `${R} ${G} ${B}`;
  }
  // hsl triplet: "H S% L%"
  const h = hsl(c);
  if (!h) return value;
  return `${num(h.h ?? 0, 2)} ${num((h.s ?? 0) * 100, 2)}% ${num((h.l ?? 0) * 100, 2)}%`;
}

/**
 * Convert a single color token value for a (version, format) target.
 * Non-color / unparseable values are returned unchanged.
 */
export function convertColor(
  value: string,
  version: TwVersion,
  format: ColorFormat,
): string {
  const v = value.trim();
  if (!isConvertibleColor(v)) return value;
  return version === "v4" ? toV4(v, format) : toV3Triplet(v, format);
}

/** The wrapper function a v3 consumer must use for a given format. */
export function v3Wrapper(format: ColorFormat): "hsl" | "rgb" {
  return format === "hsl" ? "hsl" : "rgb";
}
