import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Step, Steps } from "@/components/docs/steps";

import { AstroIcon } from "@/components/framework-icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";

export const metadata = {
  title: "Astro Installation",
  description:
    "How to install tweakcn/theme-picker themes in your Astro project.",
};

export default function AstroInstallationPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AstroIcon className="h-10 w-10" />
          <div>
            <Badge variant="outline">Framework Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight mt-1">Astro</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Complete guide to installing tweakcn/theme-picker themes in your Astro
          project with React islands. Uses inline scripts for instant theme
          application.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prerequisites</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Astro 3.0+ with React integration",
            "shadcn/ui initialized in your project",
            "Tailwind CSS configured",
          ].map((item) => (
            <Card key={item} className="p-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">{item}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Critical Note */}
      <Card className="p-4 border-red-500/50 bg-red-500/5">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-medium text-red-600 dark:text-red-400">
              Remove default CSS variables
            </h3>
            <p className="text-sm text-muted-foreground">
              tweakcn/theme-picker themes use{" "}
              <code className="bg-muted px-1 rounded">data-theme</code>{" "}
              attributes. You must <strong>remove</strong> any{" "}
              <code className="bg-muted px-1 rounded">:root</code> and{" "}
              <code className="bg-muted px-1 rounded">.dark</code> variable
              blocks from your globals.css, or themes won&apos;t work.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Differences */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Astro&apos;s Island Architecture</AlertTitle>
        <AlertDescription>
          Since Astro renders pages as static HTML by default, we use an inline
          script to apply the theme immediately, preventing any flash of
          unstyled content.
        </AlertDescription>
      </Alert>

      {/* Installation Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Installation</h2>

        <Steps>
          <Step title="Install the theme system">
            <p>
              Run this single command to install the complete theme system for
              Astro. This includes all 38+ themes, the theme scripts, and all
              theme CSS.
            </p>
            <InstallCommand url="https://tweakcn-picker.vercel.app/r/astro/theme-system.json" />
          </Step>

          <Step title="Create an inline theme script">
            <p>
              Add this inline script to your layout to apply the theme before
              the page renders:
            </p>
            <CodeBlockDoc
              filename="src/layouts/Layout.astro"
              language="astro"
              code={`---
import '../styles/globals.css'
---

<script is:inline>
  const getThemePreference = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const isDark = getThemePreference() === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

  if (typeof localStorage !== 'undefined') {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
</script>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>My Astro Site</title>
  </head>
  <body>
    <slot />
  </body>
</html>`}
            />
          </Step>

          <Step title="Create a mode toggle component">
            <p>
              Create a React component for the theme toggle. Note the{" "}
              <code>client:load</code> directive:
            </p>
            <CodeBlockDoc
              filename="src/components/ModeToggle.tsx"
              language="tsx"
              code={`import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<"light" | "dark" | "system">("light")

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "light")
  }, [])

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeState("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
            />
          </Step>

          <Step title="Use the toggle in your pages">
            <p>
              Import and use the ModeToggle with the <code>client:load</code>{" "}
              directive:
            </p>
            <CodeBlockDoc
              filename="src/pages/index.astro"
              language="astro"
              code={`---
import Layout from '../layouts/Layout.astro';
import { ModeToggle } from '@/components/ModeToggle';
---

<Layout>
  <main>
    <h1>Welcome to Astro</h1>
    <ModeToggle client:load />
  </main>
</Layout>`}
            />
          </Step>
        </Steps>
      </div>

      {/* Individual Theme Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Install Individual Themes</h2>
        <InstallCommand url="https://tweakcn-picker.vercel.app/r/theme-catppuccin.json" />
        <p className="text-sm text-muted-foreground mt-2">
          Replace{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            theme-catppuccin
          </code>{" "}
          with any theme:{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">theme-claude</code>,{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">theme-vercel</code>,
          etc.
        </p>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Still need the scripts</AlertTitle>
          <AlertDescription>
            Individual theme installation only adds the CSS. You&apos;ll still
            need to set up the{" "}
            <code className="bg-muted px-1 rounded text-foreground text-xs">
              inline scripts
            </code>{" "}
            as shown above.
          </AlertDescription>
        </Alert>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="toggle-not-working">
            <AccordionTrigger>Theme toggle not working</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                Make sure you&apos;re using{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  client:load
                </code>{" "}
                on the ModeToggle component. Astro components don&apos;t hydrate
                by default.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flash-of-wrong-theme">
            <AccordionTrigger>Flash of wrong theme</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                Ensure the inline script is placed in the{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  &lt;head&gt;
                </code>{" "}
                section and uses{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  is:inline
                </code>{" "}
                to run before any other JavaScript.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
