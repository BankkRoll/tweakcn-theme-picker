import { Step, Steps } from "@/components/docs/steps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Info } from "lucide-react";

import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";
import { AstroIcon } from "@/components/framework-icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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

      {/* Note about CSS variables */}
      <Card className="p-4 border-primary/50 bg-primary/5">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-medium">Keep :root and .dark as fallbacks</h3>
            <p className="text-sm text-muted-foreground">
              tweakcn/theme-picker themes use{" "}
              <code className="bg-muted px-1 rounded">data-theme</code>{" "}
              attributes. Keep your{" "}
              <code className="bg-muted px-1 rounded">:root</code> and{" "}
              <code className="bg-muted px-1 rounded">.dark</code> variable
              blocks as fallbacks to prevent flash of unstyled content before
              the theme loads.
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
              Astro. This includes all 42+ themes, the theme scripts, and all
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
              highlightLines={[
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
              ]}
              code={`---
import '../styles/globals.css'
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>My Astro Site</title>
    <!-- Flash Prevention: Apply theme before render -->
    <script is:inline>
      (function() {
        var stored = localStorage.getItem("tweakcn-theme");
        if (stored) {
          document.documentElement.setAttribute("data-theme", stored);
        } else {
          // Respect system preference for first-time visitors
          var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.setAttribute("data-theme", isDark ? "default-dark" : "default-light");
        }
      })();
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>`}
            />
          </Step>

          <Step title="Use the included ThemeSwitcher">
            <p>
              The CLI installs a complete ThemeSwitcher component. Use it with
              the <code>client:load</code> directive:
            </p>
            <CodeBlockDoc
              filename="src/pages/index.astro"
              language="astro"
              highlightLines={[3, 9]}
              code={`---
import Layout from '../layouts/Layout.astro';
import { ThemeSwitcher } from '@/components/theme-switcher';
---

<Layout>
  <main>
    <h1>Welcome to Astro</h1>
    <ThemeSwitcher client:load />
  </main>
</Layout>`}
            />
            <p className="text-sm text-muted-foreground mt-3">
              The ThemeSwitcher includes a dropdown menu with all available
              themes, light/dark mode toggle, and displays the current theme
              with a color indicator.
            </p>
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
                on the ThemeSwitcher component. Astro components don&apos;t
                hydrate by default.
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
