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
import { RemixIcon } from "@/components/framework-icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
              Remix. This includes all 42+ themes, the theme CSS, and everything
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
              highlightLines={[1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 16]}
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
              highlightLines={[
                1, 2, 3, 4, 5, 6, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26,
                27, 28, 29, 30, 36, 43, 44,
              ]}
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
              highlightLines={[1, 2, 4]}
              code={`import { createThemeAction } from "remix-themes"
import { themeSessionResolver } from "../sessions.server"

export const action = createThemeAction(themeSessionResolver)`}
            />
          </Step>

          <Step title="Use the included ThemeSwitcher">
            <p>
              The CLI installs a complete ThemeSwitcher component. Import and
              use it anywhere in your app:
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
