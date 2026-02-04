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
import { RemixIcon } from "@/components/framework-icons";

export const metadata = {
  title: "Remix Installation",
  description:
    "How to install tweakcn/theme-picker themes in your Remix project.",
};

export default function RemixInstallationPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <RemixIcon className="h-10 w-10" />
          <div>
            <Badge variant="outline">Framework Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight mt-1">Remix</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Complete guide to installing tweakcn/theme-picker themes in your Remix
          application. Uses remix-themes for server-side theme persistence.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prerequisites</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Remix 2.0+",
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
              blocks from your tailwind.css, or themes won&apos;t work.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Differences */}
      <Alert className="overflow-hidden">
        <Info className="h-4 w-4" />
        <AlertTitle>Server-side Theme Persistence</AlertTitle>
        <AlertDescription className="wrap-anywhere">
          Remix uses cookies to persist theme preferences on the server,
          preventing flash of wrong theme on SSR pages. We use the{" "}
          <code className="bg-muted px-1 rounded text-foreground text-xs">
            remix-themes
          </code>{" "}
          package for this.
        </AlertDescription>
      </Alert>

      {/* Installation Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Installation</h2>

        <Steps>
          <Step title="Install the theme system">
            <p>
              Run this single command to install the complete theme system for
              Remix. This includes all 38+ themes, the theme CSS, and everything
              you need.
            </p>
            <InstallCommand url="https://tweakcn-picker.vercel.app/r/remix/theme-system.json" />
            <p className="mt-4">
              Then install remix-themes for server-side theme persistence:
            </p>
            <CodeBlockDoc
              filename="Terminal"
              language="bash"
              code={`npm install remix-themes`}
            />
          </Step>

          <Step title="Update your Tailwind CSS">
            <p>
              Modify your tailwind.css to support both class and root selectors:
            </p>
            <CodeBlockDoc
              filename="app/tailwind.css"
              language="css"
              highlightLines={[2]}
              code={`.dark,
:root[class~="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... other dark mode variables ... */
}`}
            />
          </Step>

          <Step title="Create session storage and theme resolver">
            <p>Create a file to handle theme sessions:</p>
            <CodeBlockDoc
              filename="app/sessions.server.tsx"
              language="tsx"
              code={`import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

const isProduction = process.env.NODE_ENV === "production"

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"], // Replace with your own secret
    ...(isProduction
      ? { domain: "your-production-domain.com", secure: true }
      : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)`}
            />
          </Step>

          <Step title="Set up the root layout">
            <p>Update your root.tsx to include the ThemeProvider:</p>
            <CodeBlockDoc
              filename="app/root.tsx"
              language="tsx"
              code={`import clsx from "clsx"
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes"
import type { LoaderFunctionArgs } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"

import { themeSessionResolver } from "./sessions.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return {
    theme: getTheme(),
  }
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider
      specifiedTheme={data.theme}
      themeAction="/action/set-theme"
    >
      <App />
    </ThemeProvider>
  )
}

function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}`}
            />
          </Step>

          <Step title="Create the theme action route">
            <p>Create an action route to handle theme changes:</p>
            <CodeBlockDoc
              filename="app/routes/action.set-theme.ts"
              language="tsx"
              code={`import { createThemeAction } from "remix-themes"
import { themeSessionResolver } from "../sessions.server"

export const action = createThemeAction(themeSessionResolver)`}
            />
          </Step>

          <Step title="Add a mode toggle">
            <p>Create a component to switch themes:</p>
            <CodeBlockDoc
              filename="app/components/mode-toggle.tsx"
              language="tsx"
              code={`import { Moon, Sun } from "lucide-react"
import { Theme, useTheme } from "remix-themes"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function ModeToggle() {
  const [, setTheme] = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
        <Alert className="overflow-hidden">
          <Info className="h-4 w-4" />
          <AlertTitle>Still need remix-themes</AlertTitle>
          <AlertDescription className="wrap-anywhere">
            Individual theme installation only adds the CSS. You&apos;ll still
            need to set up{" "}
            <code className="bg-muted px-1 rounded text-foreground text-xs">
              remix-themes
            </code>{" "}
            as shown above.
          </AlertDescription>
        </Alert>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="theme-not-persisting">
            <AccordionTrigger>Theme not persisting</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground wrap-anywhere">
                Make sure the{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  /action/set-theme
                </code>{" "}
                route exists and matches the{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  themeAction
                </code>{" "}
                prop in ThemeProvider.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cookie-not-set">
            <AccordionTrigger>
              Cookie not being set in production
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground wrap-anywhere">
                Update the cookie configuration in sessions.server.tsx with your
                actual production domain and ensure{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  secure: true
                </code>{" "}
                is set.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flash-of-wrong-theme">
            <AccordionTrigger>Flash of wrong theme</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground wrap-anywhere">
                Make sure{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  PreventFlashOnWrongTheme
                </code>{" "}
                is included in your head and that you&apos;re passing the{" "}
                <code className="bg-muted px-1 rounded text-foreground text-xs">
                  ssrTheme
                </code>{" "}
                prop correctly.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
