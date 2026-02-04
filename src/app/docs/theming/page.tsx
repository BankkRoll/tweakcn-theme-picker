import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { Palette, Sun, Moon } from "lucide-react";

export const metadata = {
  title: "Theming",
  description: "Understanding how tweakcn/theme-picker themes work.",
};

export default function ThemingPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <Badge variant="outline">Theming</Badge>
        <h1 className="text-4xl font-bold tracking-tight">How Theming Works</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Understanding the tweakcn/theme-picker theme system: OKLCH colors, CSS
          variables, light/dark modes, and custom typography.
        </p>
      </div>

      {/* Theme Naming Convention */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Naming Convention</h2>
        <p className="text-muted-foreground">
          Each theme has two variants: light and dark. The theme value follows
          this pattern:
        </p>
        <CodeBlockDoc
          language="text"
          showLineNumbers={false}
          code={`[theme-name]-light
[theme-name]-dark

Examples:
catppuccin-light    // Catppuccin light mode
catppuccin-dark     // Catppuccin dark mode
claude-light        // Claude light mode
claude-dark         // Claude dark mode`}
        />
      </div>

      {/* OKLCH Color System */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">OKLCH Color System</h2>
        <p className="text-muted-foreground">
          tweakcn/theme-picker uses the OKLCH color space for all theme colors.
          OKLCH provides perceptually uniform colors, meaning colors with the
          same lightness value actually appear equally bright.
        </p>

        <Card className="p-4 bg-muted/30">
          <div className="font-mono text-sm space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-24">Format:</span>
              <code>oklch(L C H)</code>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-24">L (Lightness):</span>
              <span>0 to 1 (0 = black, 1 = white)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-24">C (Chroma):</span>
              <span>0 to ~0.4 (saturation/colorfulness)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-24">H (Hue):</span>
              <span>0 to 360 degrees (color wheel)</span>
            </div>
          </div>
        </Card>

        <CodeBlockDoc
          filename="Example"
          language="css"
          code={`/* Primary color in OKLCH */
--primary: oklch(0.55 0.25 297.02);    /* L=0.55, C=0.25, H=297° */
--primary-foreground: oklch(1 0 0);     /* Pure white */

/* The same hue with different lightness */
--primary-light: oklch(0.75 0.18 297);  /* Lighter version */
--primary-dark: oklch(0.35 0.20 297);   /* Darker version */`}
        />
      </div>

      {/* CSS Variables */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">CSS Variables</h2>
        <p className="text-muted-foreground">
          Themes define a comprehensive set of CSS custom properties that
          shadcn/ui components use:
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Color Variables
            </h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>
                <code>--background</code> / <code>--foreground</code>
              </li>
              <li>
                <code>--card</code> / <code>--card-foreground</code>
              </li>
              <li>
                <code>--popover</code> / <code>--popover-foreground</code>
              </li>
              <li>
                <code>--primary</code> / <code>--primary-foreground</code>
              </li>
              <li>
                <code>--secondary</code> / <code>--secondary-foreground</code>
              </li>
              <li>
                <code>--muted</code> / <code>--muted-foreground</code>
              </li>
              <li>
                <code>--accent</code> / <code>--accent-foreground</code>
              </li>
              <li>
                <code>--destructive</code> /{" "}
                <code>--destructive-foreground</code>
              </li>
              <li>
                <code>--border</code>, <code>--input</code>, <code>--ring</code>
              </li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Other Variables</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>
                <code>--radius</code> - Border radius base
              </li>
              <li>
                <code>--font-sans</code> - Sans-serif font stack
              </li>
              <li>
                <code>--font-serif</code> - Serif font stack
              </li>
              <li>
                <code>--font-mono</code> - Monospace font stack
              </li>
              <li>
                <code>--shadow-*</code> - Shadow definitions
              </li>
              <li>
                <code>--chart-1</code> to <code>--chart-5</code>
              </li>
              <li>
                <code>--sidebar-*</code> - Sidebar-specific colors
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Light and Dark Mode */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Light and Dark Mode</h2>
        <p className="text-muted-foreground">
          Each theme defines variables for both modes using CSS selectors:
        </p>

        <CodeBlockDoc
          filename="catppuccin.css"
          language="css"
          code={`/* Light mode - using data-theme attribute */
[data-theme="catppuccin-light"] {
  --background: oklch(0.96 0.01 264.53);
  --foreground: oklch(0.44 0.04 279.33);
  --primary: oklch(0.55 0.25 297.02);
  /* ... more variables */
}

/* Dark mode */
[data-theme="catppuccin-dark"] {
  --background: oklch(0.22 0.03 284.06);
  --foreground: oklch(0.88 0.04 272.28);
  --primary: oklch(0.79 0.12 304.77);
  /* ... more variables */
}`}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold">Light Mode</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Higher lightness values for backgrounds, lower for text. Subtle
              shadows and borders.
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="h-5 w-5 text-indigo-400" />
              <h3 className="font-semibold">Dark Mode</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Lower lightness for backgrounds, higher for text. Often more
              saturated accent colors.
            </p>
          </Card>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Typography</h2>
        <p className="text-muted-foreground">
          Each theme includes carefully selected Google Fonts that complement
          the color scheme:
        </p>

        <CodeBlockDoc
          filename="Theme Typography"
          language="css"
          code={`/* Font variables in theme CSS */
--font-sans: Montserrat, sans-serif;
--font-serif: Georgia, serif;
--font-mono: Fira Code, monospace;

/* Applied in Tailwind */
body {
  font-family: var(--font-sans);
}`}
        />

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Loading Google Fonts</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Make sure to load the required fonts. Add this to your layout:
          </p>
          <CodeBlockDoc
            language="html"
            showLineNumbers={false}
            code={`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">`}
          />
        </Card>
      </div>

      {/* Switching Themes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Switching Themes Programmatically
        </h2>
        <p className="text-muted-foreground">
          Use the theme hooks to change themes in your components:
        </p>

        <CodeBlockDoc
          filename="Example: Theme Switcher"
          language="tsx"
          code={`import { useTheme } from "next-themes"

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  // Get current color theme and mode
  const colorTheme = theme?.replace("-light", "").replace("-dark", "")
  const isDark = theme?.endsWith("-dark")

  // Switch to a different theme
  const switchTheme = (newTheme: string) => {
    setTheme(\`\${newTheme}-\${isDark ? "dark" : "light"}\`)
  }

  // Toggle light/dark mode
  const toggleMode = () => {
    setTheme(\`\${colorTheme}-\${isDark ? "light" : "dark"}\`)
  }

  return (
    <div>
      <button onClick={() => switchTheme("catppuccin")}>
        Catppuccin
      </button>
      <button onClick={() => switchTheme("claude")}>
        Claude
      </button>
      <button onClick={toggleMode}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  )
}`}
        />
      </div>
    </div>
  );
}
