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
import { ViteIcon } from "@/components/framework-icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Vite Installation",
  description:
    "How to install tweakcn/theme-picker themes in your Vite + React project.",
};

export default function ViteInstallationPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <ViteIcon className="h-10 w-10" />
          <div>
            <Badge variant="outline">Framework Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight mt-1">Vite</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Complete guide to installing tweakcn/theme-picker themes in your Vite
          + React application. Uses a custom ThemeProvider without external
          dependencies.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prerequisites</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Vite 4+ with React",
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
                <strong>Inline script</strong> in index.html to set data-theme
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
              Run this single command to install the complete theme system for
              Vite. This includes all 42+ themes, a custom ThemeProvider, and
              all theme CSS.
            </p>
            <InstallCommand url="https://tweakcn-picker.vercel.app/r/vite/theme-system.json" />
          </Step>

          <Step title="Add flash prevention script to index.html">
            <p>
              Add this inline script to your{" "}
              <code className="bg-muted px-1 rounded">index.html</code>{" "}
              <strong>before</strong> any other scripts. This applies the theme
              before React hydrates, preventing any flash.
            </p>
            <CodeBlockDoc
              filename="index.html"
              language="html"
              highlightLines={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
              code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
    <!-- Flash Prevention: Apply theme before render -->
    <script>
      (function() {
        var stored = localStorage.getItem("tweakcn-theme");
        if (stored) {
          document.documentElement.setAttribute("data-theme", stored);
        } else {
          var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.setAttribute("data-theme", isDark ? "default-dark" : "default-light");
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`}
            />
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Why the inline script?</AlertTitle>
              <AlertDescription>
                The script runs synchronously before any CSS or React loads,
                setting{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  data-theme
                </code>{" "}
                immediately. This prevents flash because CSS variables are
                applied before the first paint.
              </AlertDescription>
            </Alert>
          </Step>

          <Step title="The ThemeProvider is included">
            <p>
              The CLI installs a custom ThemeProvider that uses{" "}
              <code>data-theme</code> attributes. It supports all
              tweakcn/theme-picker themes:
            </p>
            <CodeBlockDoc
              filename="components/theme-provider.tsx"
              language="tsx"
              code={`import { createContext, useContext, useEffect, useState } from "react"
import { allThemeValues, DEFAULT_THEME } from "@/lib/themes-config"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: DEFAULT_THEME,
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = "tweakcn-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{
      theme,
      setTheme: (t) => {
        localStorage.setItem(storageKey, t)
        setTheme(t)
      }
    }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeProviderContext)`}
            />
          </Step>

          <Step title="Wrap your app with ThemeProvider">
            <p>Add the ThemeProvider to your root App component:</p>
            <CodeBlockDoc
              filename="App.tsx"
              language="tsx"
              highlightLines={[1, 5, 6, 7]}
              code={`import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="default-dark">
      {/* Your app content */}
    </ThemeProvider>
  )
}

export default App`}
            />
          </Step>

          <Step title="Import theme styles">
            <p>
              The CLI adds theme imports to your index.css. Make sure it
              includes:
            </p>
            <CodeBlockDoc
              filename="index.css"
              language="css"
              highlightLines={[6]}
              code={`@tailwind base;
@tailwind components;
@tailwind utilities;

/* tweakcn/theme-picker theme imports - added by CLI */
@import "./styles/themes/index.css";

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`}
            />
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Note:</strong> Keep your <code>:root</code> and{" "}
              <code>.dark</code> variable blocks as fallbacks to prevent flash
              of unstyled content.
            </p>
          </Step>

          <Step title="Use the included ThemeSwitcher">
            <p>
              The CLI installs a complete ThemeSwitcher component. Import and
              use it anywhere in your app:
            </p>
            <CodeBlockDoc
              filename="Using the ThemeSwitcher"
              language="tsx"
              highlightLines={[7]}
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
          <code className="bg-muted px-1.5 py-0.5 rounded">theme-vercel</code>,
          etc.
        </p>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Still need the provider</AlertTitle>
          <AlertDescription>
            Individual theme installation only adds the CSS. You&apos;ll still
            need to set up the{" "}
            <code className="bg-muted px-1 rounded text-foreground text-xs">
              ThemeProvider
            </code>{" "}
            as shown above.
          </AlertDescription>
        </Alert>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="localstorage-not-defined">
            <AccordionTrigger>localStorage is not defined</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                This error occurs during SSR. The{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  ThemeProvider
                </code>{" "}
                above handles this by only accessing localStorage on the client.
                If you&apos;re using Vite with SSR, wrap the localStorage call
                in a check.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="theme-flash">
            <AccordionTrigger>Theme flash on page load</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Add an inline script to your{" "}
                  <code className="bg-muted px-1 rounded text-foreground text-xs">
                    index.html
                  </code>{" "}
                  <strong>before</strong> any other scripts. This applies the
                  theme before React hydrates and respects system preference:
                </p>
                <CodeBlockDoc
                  filename="index.html"
                  language="html"
                  code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
    <!-- Flash Prevention: Apply theme before render -->
    <script>
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
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`}
                />
                <p className="text-sm text-muted-foreground">
                  This runs synchronously before the page renders, preventing
                  any flash. It also respects system preference for first-time
                  visitors.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
