"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";

interface ThemeInstallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  themeName: string;
  themeTitle: string;
}

// Transform [data-theme="name-light"] to :root and [data-theme="name-dark"] to .dark
function transformToGlobalsCss(css: string, themeName: string): string {
  // Replace light mode selector with :root
  let transformed = css.replace(
    new RegExp(`\\[data-theme="${themeName}-light"\\]`, "g"),
    ":root",
  );
  // Replace dark mode selector with .dark
  transformed = transformed.replace(
    new RegExp(`\\[data-theme="${themeName}-dark"\\]`, "g"),
    ".dark",
  );
  // Update comments
  transformed = transformed.replace(
    /\/\* Light mode \*\//g,
    "/* Light mode (:root) */",
  );
  transformed = transformed.replace(
    /\/\* Dark mode \*\//g,
    "/* Dark mode (.dark) */",
  );
  return transformed;
}

export function ThemeInstallDialog({
  open,
  onOpenChange,
  themeName,
  themeTitle,
}: ThemeInstallDialogProps) {
  const [cssContent, setCssContent] = useState<string>("");

  const themeUrl = `https://tweakcn-picker.vercel.app/r/theme-${themeName}.json`;

  // Fetch CSS content from the registry JSON when dialog opens
  useEffect(() => {
    if (open && themeName) {
      fetch(`/r/theme-${themeName}.json`)
        .then((res) => res.json())
        .then((data) => {
          const cssFile = data.files?.find((f: { path: string }) =>
            f.path.endsWith(".css"),
          );
          setCssContent(cssFile?.content || "/* Unable to load CSS */");
        })
        .catch(() => setCssContent("/* Unable to load CSS */"));
    }
  }, [open, themeName]);

  const globalsCss = cssContent
    ? transformToGlobalsCss(cssContent, themeName)
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{themeTitle}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden space-y-6">
          {/* Installation Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Installation</h3>
            <InstallCommand url={themeUrl} />
          </div>

          {/* CSS Code Section with Tabs */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <Tabs defaultValue="globals" className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Code</h3>
                <TabsList className="h-8">
                  <TabsTrigger value="globals" className="text-xs px-3 h-7">
                    globals.css
                  </TabsTrigger>
                  <TabsTrigger value="registry" className="text-xs px-3 h-7">
                    tweakcn-picker
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="globals" className="flex-1 mt-0">
                <CodeBlockDoc
                  code={globalsCss || "Loading..."}
                  filename="globals.css"
                  language="css"
                  showLineNumbers={false}
                  maxHeight="500px"
                />
              </TabsContent>
              <TabsContent value="registry" className="flex-1 mt-0">
                <CodeBlockDoc
                  code={cssContent || "Loading..."}
                  filename={`${themeName}.css`}
                  language="css"
                  showLineNumbers={false}
                  maxHeight="500px"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
