import { Step, Steps } from "@/components/docs/steps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";
import { NextJsIcon } from "@/components/framework-icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Next.js Installation",
  description:
    "How to install tweakcn/theme-picker themes in your Next.js project.",
};

export default function NextJsInstallationPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <NextJsIcon className="h-10 w-10" />
          <div>
            <Badge variant="outline">Framework Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight mt-1">Next.js</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Complete guide to installing tweakcn/theme-picker themes in your
          Next.js application. Works with both App Router and Pages Router.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prerequisites</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Next.js 13.4+ (App Router) or Next.js 12+ (Pages Router)",
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
            <h3 className="font-medium">Flash Prevention Setup</h3>
            <p className="text-sm text-muted-foreground">
              tweakcn/theme-picker uses{" "}
              <code className="bg-muted px-1 rounded">data-theme</code>{" "}
              attributes. To prevent flash on load, you need:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>:root fallback</strong> in CSS with your default theme
                colors
              </li>
              <li>
                <strong>Inline script</strong> in &lt;head&gt; to set data-theme
                before render
              </li>
              <li>
                Optional:{" "}
                <code className="bg-muted px-1 rounded">
                  @media (prefers-color-scheme)
                </code>{" "}
                for system preference support
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Installation Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Installation</h2>

        <Steps>
          <Step title="Install the theme system">
            <p>
              Run this single command to install the complete theme system. This
              includes all 42+ themes, the ThemeProvider component, theme CSS,
              and configures next-themes automatically.
            </p>
            <InstallCommand url="https://tweakcn-picker.vercel.app/r/nextjs/theme-system.json" />
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>This will modify your project</AlertTitle>
              <AlertDescription>
                The CLI will create/overwrite your ThemeProvider, add theme CSS
                files, and update your globals.css. Make sure to commit your
                changes first!
              </AlertDescription>
            </Alert>
          </Step>

          <Step title="Set up your root layout">
            <p>
              Add the ThemeProvider and flash prevention script to your root
              layout. The inline script in{" "}
              <code className="bg-muted px-1 rounded">&lt;head&gt;</code> runs
              before React hydrates, preventing any flash of unstyled content.
            </p>
            <CodeBlockDoc
              filename="app/layout.tsx"
              language="tsx"
              highlightLines={[
                1, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 29, 30, 31, 32, 33, 34, 36,
              ]}
              code={`import { ThemeProvider } from "@/components/providers/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Flash Prevention: Apply theme before render */}
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              (function() {
                const stored = localStorage.getItem('theme');
                if (stored) {
                  document.documentElement.setAttribute('data-theme', stored);
                } else {
                  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.setAttribute('data-theme', isDark ? 'default-dark' : 'default-light');
                }
              })();
            \`,
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="default-dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}
            />
            <Alert className="overflow-hidden mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Why the inline script?</AlertTitle>
              <AlertDescription className="wrap-anywhere">
                The script runs synchronously before any CSS or React loads,
                setting{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  data-theme
                </code>{" "}
                immediately. This prevents flash because CSS variables are
                applied before the first paint. Add{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  suppressHydrationWarning
                </code>{" "}
                to prevent hydration warnings.
              </AlertDescription>
            </Alert>
          </Step>

          <Step title="Import theme styles">
            <p>
              The CLI adds the theme imports to your globals.css automatically.
              Verify it looks like this:
            </p>
            <CodeBlockDoc
              filename="app/globals.css"
              language="css"
              highlightLines={[4]}
              code={`@import "tailwindcss";

/* tweakcn/theme-picker theme imports */
@import "../styles/index.css";

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`}
            />
          </Step>

          <Step title="Use the included ThemeSwitcher">
            <p>
              The CLI installs a complete ThemeSwitcher component that lets
              users switch between all 42+ themes and toggle light/dark modes.
              Import and use it anywhere in your app:
            </p>
            <CodeBlockDoc
              filename="Using the ThemeSwitcher"
              language="tsx"
              highlightLines={[1, 7]}
              code={`import { ThemeSwitcher } from "@/components/theme-switcher"

export function Header() {
  return (
    <header>
      <nav>{/* ... */}</nav>
      <ThemeSwitcher />
    </header>
  )
}`}
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
          <code className="bg-muted px-1.5 py-0.5 rounded">theme-vercel</code>,{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            theme-cyberpunk
          </code>
          , etc.
        </p>
        <Alert className="overflow-hidden">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Still need the provider</AlertTitle>
          <AlertDescription className="wrap-anywhere">
            Individual theme installation only adds the CSS. You&apos;ll still
            need to set up the{" "}
            <code className="bg-muted px-1 rounded text-foreground text-xs">
              ThemeProvider
            </code>{" "}
            and imports as shown above.
          </AlertDescription>
        </Alert>
      </div>

      {/* ThemeProvider Configuration */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ThemeProvider Configuration</h2>
        <p className="text-muted-foreground">
          The ThemeProvider accepts several props to customize behavior:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Prop</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 px-4 font-mono text-xs">attribute</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4">
                  HTML attribute to apply theme. Use{" "}
                  <code>&quot;data-theme&quot;</code> for tweakcn/theme-picker.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">defaultTheme</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4">
                  Default theme. Format:{" "}
                  <code>&quot;theme-name-light&quot;</code> or{" "}
                  <code>&quot;theme-name-dark&quot;</code>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">themes</td>
                <td className="py-3 px-4 text-muted-foreground">string[]</td>
                <td className="py-3 px-4">
                  Array of available themes. Pre-configured with all
                  tweakcn/theme-picker themes.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">enableSystem</td>
                <td className="py-3 px-4 text-muted-foreground">boolean</td>
                <td className="py-3 px-4">
                  Whether to use system preference. Set to <code>false</code>{" "}
                  for manual control.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Themes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Theme Values</h2>
        <p className="text-muted-foreground">
          Each theme has both light and dark variants. Use these values with{" "}
          <code>setTheme()</code>:
        </p>
        <CodeBlockDoc
          language="text"
          showLineNumbers={false}
          code={`[theme-name]-light
[theme-name]-dark

Examples:
- default-light / default-dark
- catppuccin-light / catppuccin-dark
- claude-light / claude-dark
- vercel-light / vercel-dark
- cyberpunk-light / cyberpunk-dark`}
        />
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="theme-not-applying">
            <AccordionTrigger>Theme not applying correctly</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground wrap-anywhere">
                Make sure the{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  attribute
                </code>{" "}
                prop in ThemeProvider is set to{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  "data-theme"
                </code>
                , not{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  "class"
                </code>
                . tweakcn/theme-picker themes use data attributes.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flash-of-unstyled">
            <AccordionTrigger>Flash of unstyled content</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground wrap-anywhere">
                  To prevent flash, you need both CSS fallbacks and an inline
                  script. Add this to your layout&apos;s &lt;head&gt;:
                </p>
                <CodeBlockDoc
                  filename="app/layout.tsx"
                  language="tsx"
                  code={`<head>
  {/* Inline script to set theme before render */}
  <script
    dangerouslySetInnerHTML={{
      __html: \`
        (function() {
          const stored = localStorage.getItem('theme');
          if (stored) {
            document.documentElement.setAttribute('data-theme', stored);
          } else {
            // Respect system preference for first-time visitors
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', isDark ? 'default-dark' : 'default-light');
          }
        })();
      \`,
    }}
  />
</head>`}
                />
                <p className="text-sm text-muted-foreground">
                  Also ensure your globals.css has{" "}
                  <code className="bg-muted px-1 rounded text-foreground text-xs">
                    :root
                  </code>{" "}
                  fallback values that match your default theme, placed{" "}
                  <strong>before</strong> the theme imports.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fonts-not-loading">
            <AccordionTrigger>Fonts not loading</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground wrap-anywhere">
                tweakcn/theme-picker themes use Google Fonts. Make sure to add
                the font links to your layout&apos;s{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  &lt;head&gt;
                </code>{" "}
                or use next/font.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
