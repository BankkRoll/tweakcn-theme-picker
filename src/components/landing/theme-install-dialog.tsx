"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";

interface ThemeInstallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  themeName: string;
  themeTitle: string;
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{themeTitle}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden space-y-6">
          {/* Installation Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Installation</h3>
            <InstallCommand url={themeUrl} />
          </div>

          {/* CSS Code Section */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <h3 className="text-sm font-semibold mb-3">Code</h3>
            <CodeBlockDoc
              code={cssContent || "Loading..."}
              filename={`${themeName}.css`}
              language="css"
              showLineNumbers={false}
              maxHeight="300px"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
