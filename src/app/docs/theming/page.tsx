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
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Switching Themes Programmatically
        </h2>
        <p className="text-muted-foreground">
          Use the{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">
            useTheme
          </code>{" "}
          hook from{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">
            next-themes
          </code>{" "}
          to control themes programmatically in your components.
        </p>

        {/* useTheme Hook API */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">The useTheme Hook</h3>
          <CodeBlockDoc
            filename="Importing the hook"
            language="tsx"
            code={`import { useTheme } from "next-themes"`}
          />

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Return Values</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium">
                      Property
                    </th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                    <th className="text-left py-2 px-3 font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">theme</td>
                    <td className="py-2 px-3 text-muted-foreground">string</td>
                    <td className="py-2 px-3">
                      Current active theme (e.g., "catppuccin-dark")
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">setTheme</td>
                    <td className="py-2 px-3 text-muted-foreground">
                      (theme: string) =&gt; void
                    </td>
                    <td className="py-2 px-3">
                      Function to change the current theme
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">themes</td>
                    <td className="py-2 px-3 text-muted-foreground">
                      string[]
                    </td>
                    <td className="py-2 px-3">List of all available themes</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">
                      resolvedTheme
                    </td>
                    <td className="py-2 px-3 text-muted-foreground">string</td>
                    <td className="py-2 px-3">
                      Actual theme applied (useful when theme is "system")
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">systemTheme</td>
                    <td className="py-2 px-3 text-muted-foreground">
                      "light" | "dark"
                    </td>
                    <td className="py-2 px-3">
                      System preference (light or dark)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Basic Usage */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <CodeBlockDoc
            filename="Getting the current theme"
            language="tsx"
            code={`const { theme, setTheme } = useTheme()

// theme = "catppuccin-dark"
console.log(theme)`}
          />
        </div>

        {/* Parsing Theme Values */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Parsing Theme Values</h3>
          <p className="text-muted-foreground">
            Since themes follow the{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">
              [name]-[mode]
            </code>{" "}
            pattern, you can parse them to get the color theme and mode
            separately:
          </p>
          <CodeBlockDoc
            filename="Parsing theme name and mode"
            language="tsx"
            code={`const { theme } = useTheme()

// Extract the color theme name
const colorTheme = theme?.replace("-light", "").replace("-dark", "")
// colorTheme = "catppuccin"

// Check if dark mode
const isDark = theme?.endsWith("-dark")
// isDark = true`}
          />
        </div>

        {/* Setting Themes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Setting Themes</h3>
          <CodeBlockDoc
            filename="Changing themes"
            language="tsx"
            code={`const { setTheme } = useTheme()

// Set a specific theme with mode
setTheme("claude-dark")
setTheme("vercel-light")
setTheme("catppuccin-dark")

// Set theme dynamically
const themeName = "cyberpunk"
const mode = "dark"
setTheme(\`\${themeName}-\${mode}\`)`}
          />
        </div>

        {/* Toggle Mode */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Toggling Light/Dark Mode</h3>
          <p className="text-muted-foreground">
            To toggle between light and dark while keeping the same color theme:
          </p>
          <CodeBlockDoc
            filename="Toggle mode function"
            language="tsx"
            code={`const { theme, setTheme } = useTheme()

const toggleMode = () => {
  // Get current color theme (without -light/-dark suffix)
  const colorTheme = theme?.replace("-light", "").replace("-dark", "")

  // Check current mode
  const isDark = theme?.endsWith("-dark")

  // Toggle to opposite mode
  setTheme(\`\${colorTheme}-\${isDark ? "light" : "dark"}\`)
}

// If theme is "catppuccin-dark", calling toggleMode()
// will change it to "catppuccin-light"`}
          />
        </div>

        {/* Switch Color Theme */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Switching Color Themes</h3>
          <p className="text-muted-foreground">
            To switch to a different color theme while preserving the current
            mode:
          </p>
          <CodeBlockDoc
            filename="Switch color theme function"
            language="tsx"
            code={`const { theme, setTheme } = useTheme()

const switchColorTheme = (newTheme: string) => {
  // Keep the current mode (light/dark)
  const isDark = theme?.endsWith("-dark")

  // Apply new theme with same mode
  setTheme(\`\${newTheme}-\${isDark ? "dark" : "light"}\`)
}

// Usage
switchColorTheme("claude")     // Switches to claude-[current-mode]
switchColorTheme("vercel")     // Switches to vercel-[current-mode]
switchColorTheme("cyberpunk")  // Switches to cyberpunk-[current-mode]`}
          />
        </div>

        {/* Available Themes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Getting Available Themes</h3>
          <p className="text-muted-foreground">
            You can also import the theme configuration directly:
          </p>
          <CodeBlockDoc
            filename="Using themes config"
            language="tsx"
            code={`import { themes, sortedThemes, allThemeValues } from "@/lib/themes-config"

// themes - Array of theme objects with metadata
themes.forEach(t => {
  console.log(t.name)        // "catppuccin"
  console.log(t.title)       // "Catppuccin"
  console.log(t.description) // "Soothing pastel theme..."
  console.log(t.category)    // "colorful"
})

// sortedThemes - Alphabetically sorted (default first)
// allThemeValues - All theme strings: ["default-light", "default-dark", ...]`}
          />
        </div>

        {/* Hydration Warning */}
        <Card className="p-4 border-amber-500/50 bg-amber-500/5">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span className="text-amber-500">⚠</span> Hydration Warning
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            The theme is stored in localStorage and isn&apos;t available during
            SSR. Always check if the component is mounted before rendering
            theme-dependent UI:
          </p>
          <CodeBlockDoc
            language="tsx"
            showLineNumbers={false}
            code={`const [mounted, setMounted] = useState(false)
const { theme } = useTheme()

useEffect(() => {
  setMounted(true)
}, [])

// Avoid hydration mismatch
if (!mounted) return null

// Safe to use theme now
return <div>Current: {theme}</div>`}
          />
        </Card>
      </div>
    </div>
  );
}
