/**
 * Lossless parser for a tweakcn theme CSS file.
 *
 * The 44 existing theme files are NOT uniform — they differ in token set, order,
 * number precision, and some declarations wrap across multiple lines (e.g.
 * `--shadow-sm:` followed by an indented value). To guarantee the v4-oklch column
 * regenerates byte-for-byte, we do NOT normalise. We parse into an ordered list of
 * "entries" that each remember their exact source text, and only tag the ones that
 * are convertible single-color declarations so the generator can rewrite just those
 * for other formats.
 *
 * Line endings: source files are CRLF. We split on \n but keep the trailing \r as
 * part of each line's content so re-joining reproduces the original exactly.
 */

import { isConvertibleColor } from "./convert-color";

export type Entry =
  | { kind: "raw"; text: string } // comments, blank lines, selectors, braces, multi-line decls
  | {
      // a single-line declaration: `<indent>--token: <value>;<eol>`
      kind: "decl";
      indent: string;
      token: string;
      value: string; // trimmed value WITHOUT trailing ";"
      eol: string; // "" or "\r" (the carriage return kept for CRLF fidelity)
      isColor: boolean; // true if value is a convertible single color
    };

export interface ParsedTheme {
  /** ordered entries that reproduce the file exactly when value-format = oklch */
  entries: Entry[];
}

// Matches `  --token: value;` capturing indent, token, value, optional CR.
// We require the line to end with `;` (+ optional \r) so multi-line decls (whose
// first line ends with just `:`) fall through to "raw" and are preserved verbatim.
const DECL_RE = /^(\s*)(--[a-z0-9-]+):\s*(.*?);(\r?)$/;

export function parseThemeCss(source: string): ParsedTheme {
  const lines = source.split("\n");
  const entries: Entry[] = [];

  for (const line of lines) {
    const m = DECL_RE.exec(line);
    if (m) {
      const [, indent, token, value, cr] = m;
      entries.push({
        kind: "decl",
        indent,
        token,
        value: value.trim(),
        eol: cr,
        isColor: isConvertibleColor(value.trim()),
      });
    } else {
      entries.push({ kind: "raw", text: line });
    }
  }

  return { entries };
}

/** Re-serialise entries, transforming color values via `mapColor`. */
export function serializeTheme(
  parsed: ParsedTheme,
  mapColor: (value: string, token: string) => string,
): string {
  const out: string[] = [];
  for (const e of parsed.entries) {
    if (e.kind === "raw") {
      out.push(e.text);
    } else {
      const value = e.isColor ? mapColor(e.value, e.token) : e.value;
      out.push(`${e.indent}${e.token}: ${value};${e.eol}`);
    }
  }
  return out.join("\n");
}

/** Identity serialisation — must reproduce the source byte-for-byte. */
export function serializeIdentity(parsed: ParsedTheme): string {
  return serializeTheme(parsed, (v) => v);
}
