"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useMemo, useRef, useState } from "react";

import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";

interface ThemeInstallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  themeName: string;
  themeTitle: string;
}

type TwVersion = "v4" | "v3";
type ColorFormat = "oklch" | "hsl" | "hex" | "rgb";

const SITE = "https://tweakcn-picker.vercel.app";

/**
 * Resolve the registry item slug + JSON path for a (version, format) selection.
 * v4-oklch is the canonical default item (`theme-<name>`); everything else maps
 * to a generated variant item (`theme-<name>-<ver>-<fmt>`).
 */
function variantSlug(
  themeName: string,
  version: TwVersion,
  format: ColorFormat,
): string {
  if (version === "v4" && format === "oklch") return `theme-${themeName}`;
  return `theme-${themeName}-${version}-${format}`;
}

// v4 only: rewrite [data-theme="name-light"] -> :root and -dark -> .dark so the
// snippet drops straight into a globals.css. v3 variants already ship as
// :root/.dark inside @layer base, so they need no transform.
function transformToGlobalsCss(css: string, themeName: string): string {
  let out = css.replace(
    new RegExp(`\\[data-theme="${themeName}-light"\\]`, "g"),
    ":root",
  );
  out = out.replace(
    new RegExp(`\\[data-theme="${themeName}-dark"\\]`, "g"),
    ".dark",
  );
  out = out.replace(/\/\* Light mode \*\//g, "/* Light mode (:root) */");
  out = out.replace(/\/\* Dark mode \*\//g, "/* Dark mode (.dark) */");
  return out;
}

const FORMATS: ColorFormat[] = ["oklch", "hsl", "hex", "rgb"];

export function ThemeInstallDialog({
  open,
  onOpenChange,
  themeName,
  themeTitle,
}: ThemeInstallDialogProps) {
  const [cssContent, setCssContent] = useState<string>("");
  const [version, setVersion] = useState<TwVersion>("v4");
  const [format, setFormat] = useState<ColorFormat>("oklch");
  const [codeTab, setCodeTab] = useState<"globals" | "registry">("globals");

  // Cache fetched variant CSS by slug so switching version/format is instant and
  // never re-fetches the same variant (no flicker, no redundant network calls).
  const cacheRef = useRef<Map<string, string>>(new Map());

  // oklch is not representable in the v3 wrapper model — fall back to hsl.
  useEffect(() => {
    if (version === "v3" && format === "oklch") setFormat("hsl");
  }, [version, format]);

  const slug = useMemo(
    () => variantSlug(themeName, version, format),
    [themeName, version, format],
  );

  const themeUrl = `${SITE}/r/${slug}.json`;

  // Fetch (or serve from cache) the registry JSON for the active selection.
  useEffect(() => {
    if (!open || !themeName) return;

    const cached = cacheRef.current.get(slug);
    if (cached !== undefined) {
      setCssContent(cached); // instant, no flicker
      return;
    }

    let cancelled = false;
    setCssContent(""); // only blank while genuinely fetching a new variant
    fetch(`/r/${slug}.json`)
      .then((res) => res.json())
      .then((data) => {
        const cssFile = data.files?.find((f: { path: string }) =>
          f.path.endsWith(".css"),
        );
        const content = cssFile?.content || "/* Unable to load CSS */";
        cacheRef.current.set(slug, content);
        if (!cancelled) setCssContent(content);
      })
      .catch(() => !cancelled && setCssContent("/* Unable to load CSS */"));
    return () => {
      cancelled = true;
    };
  }, [open, themeName, slug]);

  const isV3 = version === "v3";
  const globalsCss =
    cssContent && !isV3
      ? transformToGlobalsCss(cssContent, themeName)
      : cssContent;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{themeTitle}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden space-y-6">
          {/* Installation Section — command first, then variant toggles */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Installation</h3>
            <InstallCommand url={themeUrl} />

            {/* Tailwind version + color format toggles (control the command + code above/below) */}
            <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Tailwind
                </span>
                <ToggleGroup
                  type="single"
                  size="sm"
                  value={version}
                  onValueChange={(v) => v && setVersion(v as TwVersion)}
                  variant="outline"
                >
                  <ToggleGroupItem value="v4" className="text-xs px-3">
                    v4
                  </ToggleGroupItem>
                  <ToggleGroupItem value="v3" className="text-xs px-3">
                    v3
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Color format
                </span>
                <ToggleGroup
                  type="single"
                  size="sm"
                  value={format}
                  onValueChange={(v) => v && setFormat(v as ColorFormat)}
                  variant="outline"
                >
                  {FORMATS.map((f) => (
                    <ToggleGroupItem
                      key={f}
                      value={f}
                      // oklch is unavailable for Tailwind v3.
                      disabled={isV3 && f === "oklch"}
                      className="text-xs px-3 uppercase"
                    >
                      {f}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>

            {isV3 && (
              <p className="mt-2 text-xs text-muted-foreground">
                Tailwind v3: values are channel triplets — consume via{" "}
                <code className="bg-muted px-1 py-0.5 rounded">
                  {format === "hsl" ? "hsl" : "rgb"}(var(--token))
                </code>{" "}
                in your{" "}
                <code className="bg-muted px-1 py-0.5 rounded">
                  tailwind.config
                </code>
                . See the docs for the color mapping snippet.
              </p>
            )}
          </div>

          {/* CSS Code Section with Tabs */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <Tabs
              value={isV3 ? "globals" : codeTab}
              onValueChange={(v) => setCodeTab(v as "globals" | "registry")}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Code</h3>
                {!isV3 && (
                  <TabsList className="h-8">
                    <TabsTrigger value="globals" className="text-xs px-3 h-7">
                      globals.css
                    </TabsTrigger>
                    <TabsTrigger value="registry" className="text-xs px-3 h-7">
                      data-theme
                    </TabsTrigger>
                  </TabsList>
                )}
              </div>
              <TabsContent value="globals" className="flex-1 mt-0">
                <CodeBlockDoc
                  code={globalsCss || "Loading..."}
                  filename={isV3 ? `${themeName}.css` : "globals.css"}
                  language="css"
                  showLineNumbers={false}
                  maxHeight="500px"
                />
              </TabsContent>
              {!isV3 && (
                <TabsContent value="registry" className="flex-1 mt-0">
                  <CodeBlockDoc
                    code={cssContent || "Loading..."}
                    filename={`${themeName}.css`}
                    language="css"
                    showLineNumbers={false}
                    maxHeight="500px"
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
