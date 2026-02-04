import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Step, Steps } from "@/components/docs/steps";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";
import { ViteIcon } from "@/components/framework-icons";

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
              blocks from your index.css, or themes won&apos;t work.
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
              Run this single command to install the complete theme system for
              Vite. This includes all 38+ themes, a custom ThemeProvider, and
              all theme CSS.
            </p>
            <InstallCommand url="https://tweakcn-picker.vercel.app/r/vite/theme-system.json" />
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
              <strong>Important:</strong> Remove any <code>:root</code> or{" "}
              <code>.dark</code> variable blocks - the theme files provide all
              variables.
            </p>
          </Step>

          <Step title="Use the ThemeSwitcher">
            <p>
              The CLI includes a ThemeSwitcher component. Use it to let users
              change themes:
            </p>
            <CodeBlockDoc
              filename="components/theme-switcher.tsx"
              language="tsx"
              code={`import { useTheme } from "@/components/theme-provider"
import { allThemeValues } from "@/lib/themes-config"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  // Toggle light/dark for current theme
  const toggleMode = () => {
    const base = theme.replace("-light", "").replace("-dark", "")
    const isDark = theme.endsWith("-dark")
    setTheme(\`\${base}-\${isDark ? "light" : "dark"}\`)
  }

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {allThemeValues.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
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
              <p className="text-sm text-muted-foreground">
                Add an inline script to your{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  index.html
                </code>{" "}
                that reads the theme from localStorage before React hydrates.
                This prevents the flash of wrong theme.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
