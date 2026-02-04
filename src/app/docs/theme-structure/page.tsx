import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileCode, FolderTree, Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { InstallCommand } from "@/components/docs/install-command";

export const metadata = {
  title: "Theme Structure",
  description:
    "Understanding the structure of tweakcn themes and the registry system.",
};

export default function ThemeStructurePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <Badge variant="outline">Reference</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Theme Structure</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A detailed look at how the tweakcn registry works and what gets
          installed when you run the CLI command.
        </p>
      </div>

      {/* Registry Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Registry Overview
        </h2>
        <p className="text-muted-foreground">
          tweakcn uses the official{" "}
          <a
            href="https://ui.shadcn.com/docs/registry"
            target="_blank"
            className="text-foreground underline hover:text-primary"
          >
            shadcn/ui registry format
          </a>
          . This means you install themes using the same{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">shadcn add</code>{" "}
          command you use for components.
        </p>

        <Card className="p-4 bg-muted/30">
          <h3 className="font-semibold mb-3">Available Registry Items</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono text-xs">
                nextjs/theme-system
              </Badge>
              <span className="text-muted-foreground">
                Complete theme system for Next.js
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono text-xs">
                vite/theme-system
              </Badge>
              <span className="text-muted-foreground">
                Complete theme system for Vite + React
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono text-xs">
                astro/theme-system
              </Badge>
              <span className="text-muted-foreground">
                Complete theme system for Astro
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono text-xs">
                remix/theme-system
              </Badge>
              <span className="text-muted-foreground">
                Complete theme system for Remix
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono text-xs">
                theme-[name]
              </Badge>
              <span className="text-muted-foreground">
                Individual theme CSS (38 themes available)
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Files Created */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Files Created by CLI
        </h2>
        <p className="text-muted-foreground">
          When you install the theme system, these files are created in your
          project:
        </p>

        <CodeBlockDoc
          filename="Project Structure (Next.js)"
          language="text"
          showLineNumbers={false}
          code={`your-project/
├── components/
│   ├── providers/
│   │   └── theme-provider.tsx    # ThemeProvider component
│   └── theme-switcher.tsx        # ThemeSwitcher dropdown
├── lib/
│   └── themes-config.ts          # Theme configuration & exports
└── styles/
    └── themes/
        ├── index.css             # Imports all theme CSS
        ├── default.css           # Default theme
        ├── catppuccin.css        # Catppuccin theme
        ├── claude.css            # Claude theme
        ├── vercel.css            # Vercel theme
        └── ... (38 theme files)`}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <FileCode className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">themes-config.ts</h3>
                <p className="text-sm text-muted-foreground">
                  Theme metadata, exports for useTheme, and helper utilities
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <FileCode className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">theme-provider.tsx</h3>
                <p className="text-sm text-muted-foreground">
                  Pre-configured next-themes provider with all themes
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <FileCode className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">theme-switcher.tsx</h3>
                <p className="text-sm text-muted-foreground">
                  Ready-to-use dropdown for theme switching
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <FileCode className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">styles/themes/*.css</h3>
                <p className="text-sm text-muted-foreground">
                  38 theme CSS files with light and dark variants
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* themes-config.ts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">themes-config.ts</h2>
        <p className="text-muted-foreground">
          The central configuration file that defines all theme metadata and
          exports utilities for working with themes:
        </p>

        <CodeBlockDoc
          filename="lib/themes-config.ts"
          language="tsx"
          code={`// Theme configuration interface
export interface ThemeConfig {
  name: string;        // Theme identifier (e.g., "catppuccin")
  title: string;       // Display name (e.g., "Catppuccin")
  primaryLight: string; // Primary color for light mode (OKLCH)
  primaryDark: string;  // Primary color for dark mode (OKLCH)
  fontSans: string;    // Font family
}

// All 38 themes with metadata
export const themes: ThemeConfig[] = [
  {
    name: "default",
    title: "Default",
    primaryLight: "oklch(0.2050 0 0)",
    primaryDark: "oklch(0.9220 0 0)",
    fontSans: "ui-sans-serif, system-ui, sans-serif",
  },
  {
    name: "catppuccin",
    title: "Catppuccin",
    primaryLight: "oklch(0.55 0.25 297.02)",
    primaryDark: "oklch(0.79 0.12 304.77)",
    fontSans: "Montserrat, sans-serif",
  },
  // ... 36 more themes
];

// Sorted alphabetically (default first)
export const sortedThemes = [
  themes[0],
  ...themes.slice(1).sort((a, b) => a.title.localeCompare(b.title)),
];

// Theme names array
export const themeNames = themes.map((t) => t.name);

// All theme values for next-themes: ["default-light", "default-dark", ...]
export const allThemeValues = themes.flatMap((t) => [
  \`\${t.name}-light\`,
  \`\${t.name}-dark\`,
]);

// Default theme
export const DEFAULT_THEME = "default-dark";`}
        />
      </div>

      {/* ThemeProvider */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ThemeProvider</h2>
        <p className="text-muted-foreground">
          A pre-configured provider using next-themes with all themes
          registered:
        </p>

        <CodeBlockDoc
          filename="components/providers/theme-provider.tsx"
          language="tsx"
          code={`"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { allThemeValues, DEFAULT_THEME } from "@/lib/themes-config";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"      // Uses data-theme attribute
      themes={allThemeValues}     // All 76 theme values (38 × 2)
      defaultTheme={DEFAULT_THEME} // "default-dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}`}
        />

        <Card className="p-4 border-primary/50 bg-primary/5">
          <h3 className="font-semibold mb-2">Key Configuration</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              •{" "}
              <code className="bg-muted px-1 rounded">
                attribute=&quot;data-theme&quot;
              </code>{" "}
              - Themes are applied via data-theme attribute, not class
            </li>
            <li>
              •{" "}
              <code className="bg-muted px-1 rounded">
                themes={"{allThemeValues}"}
              </code>{" "}
              - All 76 theme values (38 themes × 2 modes)
            </li>
            <li>
              •{" "}
              <code className="bg-muted px-1 rounded">
                enableSystem={"{false}"}
              </code>{" "}
              - System preference disabled (manual control)
            </li>
          </ul>
        </Card>
      </div>

      {/* ThemeSwitcher */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ThemeSwitcher Component</h2>
        <p className="text-muted-foreground">
          A complete dropdown component for switching themes:
        </p>

        <CodeBlockDoc
          filename="components/theme-switcher.tsx (simplified)"
          language="tsx"
          code={`"use client";

import { useTheme } from "next-themes";
import { sortedThemes, themes } from "@/lib/themes-config";

// Parse theme string like "catppuccin-dark" into parts
function parseTheme(theme: string | undefined) {
  if (!theme) return { colorTheme: "default", mode: "dark" };
  if (theme.endsWith("-dark")) {
    return { colorTheme: theme.replace("-dark", ""), mode: "dark" };
  }
  if (theme.endsWith("-light")) {
    return { colorTheme: theme.replace("-light", ""), mode: "light" };
  }
  return { colorTheme: "default", mode: "dark" };
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { colorTheme, mode } = parseTheme(theme);

  // Change color theme, keep current mode
  const setColorTheme = (name: string) => {
    setTheme(\`\${name}-\${mode}\`);
  };

  // Change mode, keep current color theme
  const setMode = (newMode: "light" | "dark") => {
    setTheme(\`\${colorTheme}-\${newMode}\`);
  };

  // ... dropdown UI with sortedThemes.map(...)
}`}
        />
      </div>

      {/* Theme CSS Structure */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme CSS Structure</h2>
        <p className="text-muted-foreground">
          Each theme CSS file defines variables for both light and dark modes
          using <code className="bg-muted px-1 rounded">data-theme</code>{" "}
          selectors:
        </p>

        <CodeBlockDoc
          filename="styles/themes/catppuccin.css"
          language="css"
          code={`/* Catppuccin Theme - Auto-generated from tweakcn */

/* Light mode */
[data-theme="catppuccin-light"] {
  /* Base colors */
  --background: oklch(0.96 0.01 264.53);
  --foreground: oklch(0.44 0.04 279.33);

  /* Component colors */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.44 0.04 279.33);
  --popover: oklch(0.86 0.01 268.48);
  --popover-foreground: oklch(0.44 0.04 279.33);

  /* Semantic colors */
  --primary: oklch(0.55 0.25 297.02);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.86 0.01 268.48);
  --secondary-foreground: oklch(0.44 0.04 279.33);
  --muted: oklch(0.91 0.01 264.51);
  --muted-foreground: oklch(0.55 0.03 279.08);
  --accent: oklch(0.68 0.14 235.38);
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.55 0.22 19.81);
  --destructive-foreground: oklch(1 0 0);

  /* UI colors */
  --border: oklch(0.81 0.02 271.2);
  --input: oklch(0.86 0.01 268.48);
  --ring: oklch(0.55 0.25 297.02);

  /* Chart colors */
  --chart-1: oklch(0.55 0.25 297.02);
  --chart-2: oklch(0.68 0.14 235.38);
  --chart-3: oklch(0.63 0.18 140.44);
  --chart-4: oklch(0.69 0.2 42.43);
  --chart-5: oklch(0.71 0.1 33.1);

  /* Sidebar colors */
  --sidebar: oklch(0.93 0.01 264.52);
  --sidebar-foreground: oklch(0.44 0.04 279.33);
  --sidebar-primary: oklch(0.55 0.25 297.02);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.68 0.14 235.38);
  --sidebar-accent-foreground: oklch(1 0 0);
  --sidebar-border: oklch(0.81 0.02 271.2);
  --sidebar-ring: oklch(0.55 0.25 297.02);

  /* Typography */
  --font-sans: Montserrat, sans-serif;
  --font-serif: Georgia, serif;
  --font-mono: Fira Code, monospace;

  /* Spacing & radius */
  --radius: 0.35rem;
  --spacing: 0.25rem;

  /* Shadows */
  --shadow-sm: 0px 4px 6px 0px hsl(240 30% 25% / 0.12), ...;
  --shadow-md: ...;
  --shadow-lg: ...;
}

/* Dark mode */
[data-theme="catppuccin-dark"] {
  --background: oklch(0.22 0.03 284.06);
  --foreground: oklch(0.88 0.04 272.28);
  /* ... all dark mode variables */
}`}
        />
      </div>

      {/* Index CSS */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Index File</h2>
        <p className="text-muted-foreground">
          The index.css file imports all theme CSS files. This is what you
          import in your globals.css:
        </p>

        <CodeBlockDoc
          filename="styles/themes/index.css"
          language="css"
          code={`/* Theme imports */
@import "./default.css";
@import "./catppuccin.css";
@import "./claude.css";
@import "./vercel.css";
@import "./cyberpunk.css";
@import "./mocha-mousse.css";
/* ... all 38 themes */`}
        />

        <CodeBlockDoc
          filename="app/globals.css"
          language="css"
          code={`@import "tailwindcss";

/* Import all themes */
@import "../styles/themes/index.css";

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`}
        />
      </div>

      {/* Variable Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">CSS Variable Reference</h2>
        <p className="text-muted-foreground">
          All CSS variables defined in each theme:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Variable</th>
                <th className="text-left py-3 px-4 font-medium">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--background</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Page/app background color
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--foreground</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Primary text color
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--card</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Card component backgrounds
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--popover</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Dropdown, popover backgrounds
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--primary</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Primary brand color, buttons, links
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--secondary</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Secondary elements, less emphasis
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--muted</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Subdued backgrounds, disabled states
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--accent</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Highlights, hover states
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--destructive</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Error states, delete actions
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--border</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Border color for all elements
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--input</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Input field backgrounds/borders
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--ring</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Focus ring color
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">
                  --chart-1 to --chart-5
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  Chart/graph colors
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--sidebar-*</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Sidebar-specific colors
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--font-sans</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Sans-serif font stack
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--font-serif</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Serif font stack
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--font-mono</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Monospace font stack
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--radius</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Base border radius
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">--shadow-*</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Shadow scale (2xs, xs, sm, md, lg, xl, 2xl)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Theme Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Individual Theme Installation
        </h2>
        <p className="text-muted-foreground">
          You can also install individual themes without the full system:
        </p>

        <InstallCommand url="pnpm dlx shadcn@latest add https://tweakcn-picker.vercel.app/r/theme-catppuccin.json" />

        <Alert className="p-4 border-amber-500/50 bg-amber-500/5">
          <AlertTitle className="font-semibold mb-2">Note</AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Individual theme installation only adds the CSS file. You&apos;ll
            need to manually set up the ThemeProvider and configure next-themes.
            For most users, we recommend installing the full theme system.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
