import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Palette,
  Sparkles,
  Terminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FrameworkInstall } from "@/components/docs/framework-install";
import { InstallCommand } from "@/components/docs/install-command";
import Link from "next/link";

export const metadata = {
  title: "Documentation",
  description:
    "Learn how to install and use tweakcn/theme-picker themes in your project.",
};

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <Badge variant="outline" className="mb-2">
          <Sparkles className="mr-1.5 h-3 w-3" />
          Documentation
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Getting Started with tweakcn/theme-picker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Beautiful, professionally designed themes for shadcn/ui. Install with
          a single command, customize everything.
        </p>
      </div>

      {/* Quick Start */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Start</h2>
        <p className="text-muted-foreground">
          Install the complete theme system with one command. Includes all 38+
          themes, the ThemeProvider, and everything you need.
        </p>

        <FrameworkInstall />
      </div>

      {/* Critical Note */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Critical Setup</h2>

        <Card className="p-4 border-red-500/50 bg-red-500/5">
          <div className="flex gap-3">
            <div className="shrink-0">
              <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Remove default CSS variables</h3>
              <p className="text-sm text-muted-foreground">
                These themes use{" "}
                <code className="bg-muted px-1 rounded">data-theme</code>{" "}
                attributes, NOT{" "}
                <code className="bg-muted px-1 rounded">:root</code> and{" "}
                <code className="bg-muted px-1 rounded">.dark</code> selectors.
                If your globals.css has default variables like this,{" "}
                <strong>remove them</strong>:
              </p>
              <div className="bg-zinc-950 rounded-md p-3 text-xs font-mono text-zinc-400 overflow-x-auto">
                <div className="text-red-400">
                  /* ❌ DELETE THIS from globals.css */
                </div>
                <div className="text-zinc-500">:root {"{"}</div>
                <div className="text-zinc-500 pl-4">
                  --background: 0 0% 100%;
                </div>
                <div className="text-zinc-500 pl-4">--foreground: ...</div>
                <div className="text-zinc-500">{"}"}</div>
                <div className="text-zinc-500">.dark {"{"}</div>
                <div className="text-zinc-500 pl-4">
                  --background: 222 84% 4.9%;
                </div>
                <div className="text-zinc-500">{"}"}</div>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                The theme files provide all CSS variables. Default :root/.dark
                will override them!
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* What's Included */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What&apos;s Included</h2>
        <p className="text-muted-foreground">
          When you install a theme, you get everything you need:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Theme CSS Variables",
              description:
                "Complete OKLCH color system with light and dark mode support",
            },
            {
              title: "Theme Provider",
              description:
                "Pre-configured provider component with next-themes integration",
            },
            {
              title: "Custom Typography",
              description:
                "Carefully selected Google Fonts that complement the theme",
            },
            {
              title: "Shadow System",
              description: "Theme-aware shadow variables for consistent depth",
            },
          ].map((item) => (
            <Card key={item.title} className="p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What Gets Modified</h2>

        <Card className="p-4 border-amber-500/50 bg-amber-500/5">
          <div className="flex gap-3">
            <div className="shrink-0">
              <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Terminal className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">The CLI will modify your project</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <strong>globals.css</strong> - Imports theme CSS files
                </li>
                <li>
                  • <strong>ThemeProvider</strong> - Creates or updates your
                  theme provider component
                </li>
                <li>
                  • <strong>styles/themes/</strong> - Adds all theme CSS files
                </li>
                <li>
                  • <strong>package.json</strong> - Installs next-themes if not
                  present
                </li>
              </ul>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                Make sure to commit your changes before installing!
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Individual Theme Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Install Individual Themes</h2>
        <p className="text-muted-foreground">
          Prefer to install just one theme? You can install any of our 38+
          themes individually:
        </p>

        <InstallCommand url="https://tweakcn-picker.vercel.app/r/theme-catppuccin.json" />
        <p className="text-sm text-muted-foreground">
          Replace{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            theme-catppuccin
          </code>{" "}
          with any theme name like{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">theme-claude</code>,{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">theme-vercel</code>,
          etc.
        </p>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <p className="text-muted-foreground">
          Choose your framework to get detailed installation instructions:
        </p>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/docs/installation">
              Installation Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#themes">
              <Palette className="mr-2 h-4 w-4" />
              Browse Themes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
