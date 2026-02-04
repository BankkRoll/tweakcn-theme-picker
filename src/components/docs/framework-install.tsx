"use client";

import { AstroIcon, NextJsIcon, RemixIcon, ViteIcon } from "../framework-icons";

import { InstallCommand } from "./install-command";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Framework = "nextjs" | "vite" | "remix" | "astro";

const frameworks: {
  id: Framework;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "nextjs", label: "Next.js", Icon: NextJsIcon },
  { id: "vite", label: "Vite", Icon: ViteIcon },
  { id: "remix", label: "Remix", Icon: RemixIcon },
  { id: "astro", label: "Astro", Icon: AstroIcon },
];

interface FrameworkInstallProps {
  className?: string;
}

export function FrameworkInstall({ className }: FrameworkInstallProps) {
  const [activeFramework, setActiveFramework] = useState<Framework>("nextjs");

  const url = `https://tweakcn-picker.vercel.app/r/${activeFramework}/theme-system.json`;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {frameworks.map((fw) => (
          <button
            key={fw.id}
            onClick={() => setActiveFramework(fw.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              activeFramework === fw.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            )}
          >
            <fw.Icon className="h-4 w-4" />
            {fw.label}
          </button>
        ))}
      </div>
      <InstallCommand url={url} />
    </div>
  );
}
