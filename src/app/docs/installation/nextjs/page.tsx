import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Step, Steps } from "@/components/docs/steps";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";
import { NextJsIcon } from "@/components/framework-icons";

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

      {/* Installation Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Installation</h2>

        <Steps>
          <Step title="Install the theme system">
            <p>
              Run this single command to install the complete theme system. This
              includes all 38+ themes, the ThemeProvider component, theme CSS,
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

          <Step title="Wrap your app with ThemeProvider">
            <p>
              Add the ThemeProvider to your root layout. This enables theme
              switching throughout your app.
            </p>
            <CodeBlockDoc
              filename="app/layout.tsx"
              language="tsx"
              highlightLines={[1, 9, 10, 11, 12, 13, 14, 15]}
              code={`import { ThemeProvider } from "@/components/providers/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
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
            <Alert className="overflow-hidden">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription className="wrap-anywhere">
                Add{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  suppressHydrationWarning
                </code>{" "}
                to the{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  &lt;html&gt;
                </code>{" "}
                tag to prevent hydration warnings from next-themes.
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

          <Step title="Add a theme toggle (optional)">
            <p>
              Create a component to let users switch between light and dark
              modes, or between different themes.
            </p>
            <CodeBlockDoc
              filename="components/theme-toggle.tsx"
              language="tsx"
              code={`"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme?.endsWith("-dark")

  const toggleMode = () => {
    const currentTheme = theme?.replace("-light", "").replace("-dark", "")
    setTheme(\`\${currentTheme}-\${isDark ? "light" : "dark"}\`)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleMode}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}`}
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
              <p className="text-sm text-muted-foreground wrap-anywhere">
                Add{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  suppressHydrationWarning
                </code>{" "}
                to your{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  &lt;html&gt;
                </code>{" "}
                tag and ensure{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  disableTransitionOnChange
                </code>{" "}
                is set in ThemeProvider.
              </p>
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
