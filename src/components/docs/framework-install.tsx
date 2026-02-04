"use client";

import { AstroIcon, NextJsIcon, RemixIcon, ViteIcon } from "../framework-icons";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

import { InstallCommand } from "./install-command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

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

const frameworkSetupNotes: Record<
  Framework,
  {
    title: string;
    steps: string[];
    scriptLocation: string;
    docsLink: string;
  }
> = {
  nextjs: {
    title: "Flash Prevention Setup",
    steps: [
      "Add :root fallback in globals.css with default theme colors",
      "Add inline script in layout.tsx <head> to set data-theme before render",
      "Optional: Add @media (prefers-color-scheme) for system preference",
    ],
    scriptLocation: "app/layout.tsx <head>",
    docsLink: "/docs/installation/nextjs",
  },
  vite: {
    title: "Flash Prevention Setup",
    steps: [
      "Add :root fallback in index.css with default theme colors",
      "Add inline script in index.html <head> to set data-theme before render",
      "Optional: Add @media (prefers-color-scheme) for system preference",
    ],
    scriptLocation: "index.html <head>",
    docsLink: "/docs/installation/vite",
  },
  remix: {
    title: "Flash Prevention Setup",
    steps: [
      "Add :root fallback in tailwind.css with default theme colors",
      "remix-themes handles SSR theme persistence via cookies",
      "Configure theme session in app/sessions.server.ts",
    ],
    scriptLocation: "Server-side via cookies",
    docsLink: "/docs/installation/remix",
  },
  astro: {
    title: "Flash Prevention Setup",
    steps: [
      "Add :root fallback in globals.css with default theme colors",
      "Use the ThemeScript component in your layout <head>",
      "ThemeScript runs inline before render for instant theme application",
    ],
    scriptLocation: "Layout <head> via ThemeScript",
    docsLink: "/docs/installation/astro",
  },
};

interface FrameworkInstallProps {
  className?: string;
  showSetupNotes?: boolean;
}

export function FrameworkInstall({
  className,
  showSetupNotes = false,
}: FrameworkInstallProps) {
  const [activeFramework, setActiveFramework] = useState<Framework>("nextjs");

  const url = `https://tweakcn-picker.vercel.app/r/${activeFramework}/theme-system.json`;
  const setupNote = frameworkSetupNotes[activeFramework];

  return (
    <div className={cn("space-y-4", className)}>
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

      {showSetupNotes && (
        <Card className="p-4 border-primary/50 bg-primary/5">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-medium">{setupNote.title}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {setupNote.steps.map((step, i) => (
                  <li key={i}>• {step}</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                <strong>Script location:</strong> {setupNote.scriptLocation}
              </p>
              <Link
                href={setupNote.docsLink}
                className="text-sm text-primary hover:underline inline-block mt-1"
              >
                View full{" "}
                {frameworks.find((f) => f.id === activeFramework)?.label} guide
                →
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
