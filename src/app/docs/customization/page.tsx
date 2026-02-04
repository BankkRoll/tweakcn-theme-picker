import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CodeBlockDoc } from "@/components/docs/code-block-doc";
import { Info, Paintbrush } from "lucide-react";

export const metadata = {
  title: "Customization",
  description: "How to customize tweakcn/theme-picker themes.",
};

export default function CustomizationPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <Badge variant="outline">Customization</Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Customizing Themes
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          tweakcn/theme-picker themes are fully customizable. Learn how to
          modify colors, fonts, and other properties to match your brand.
        </p>
      </div>

      {/* Modifying Colors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Modifying Colors</h2>
        <p className="text-muted-foreground">
          The easiest way to customize a theme is to modify the CSS variables
          directly. All colors use OKLCH format.
        </p>

        <CodeBlockDoc
          filename="styles/themes/custom.css"
          language="css"
          code={`/* Start with an existing theme and modify */
[data-theme="custom-light"] {
  /* Change primary to your brand color */
  --primary: oklch(0.60 0.22 250);  /* A custom blue */
  --primary-foreground: oklch(1 0 0);

  /* Keep other variables from base theme
     or customize each one */
  --background: oklch(0.98 0 0);
  --foreground: oklch(0.20 0 0);

  /* Accent can complement primary */
  --accent: oklch(0.75 0.15 250);
  --accent-foreground: oklch(0.15 0 0);
}`}
        />

        <Alert>
          <Paintbrush className="h-4 w-4" />
          <AlertTitle>OKLCH Color Picker</AlertTitle>
          <AlertDescription>
            Use an OKLCH color picker like{" "}
            <a
              href="https://oklch.com"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              oklch.com
            </a>{" "}
            to find the right values. Adjust L for brightness, C for saturation,
            and H for hue.
          </AlertDescription>
        </Alert>
      </div>

      {/* Custom Fonts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Fonts</h2>
        <p className="text-muted-foreground">
          Change the typography by updating the font variables and loading your
          preferred fonts.
        </p>

        <CodeBlockDoc
          filename="styles/themes/custom.css"
          language="css"
          code={`[data-theme="custom-light"],
[data-theme="custom-dark"] {
  /* Your custom font stack */
  --font-sans: "Your Font", system-ui, sans-serif;
  --font-serif: "Your Serif", Georgia, serif;
  --font-mono: "Your Mono", monospace;
}`}
        />

        <p className="text-sm text-muted-foreground mt-4">
          Remember to load the fonts in your layout:
        </p>

        <CodeBlockDoc
          filename="app/layout.tsx"
          language="tsx"
          code={`import { Your_Font } from "next/font/google"

const yourFont = Your_Font({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function Layout({ children }) {
  return (
    <html className={yourFont.variable}>
      {/* ... */}
    </html>
  )
}`}
        />
      </div>

      {/* Border Radius */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Border Radius</h2>
        <p className="text-muted-foreground">
          Adjust the --radius variable to change the roundness of all
          components:
        </p>

        <CodeBlockDoc
          filename="Custom radius examples"
          language="css"
          code={`/* Sharp corners */
--radius: 0;

/* Slightly rounded */
--radius: 0.25rem;

/* Default rounded */
--radius: 0.5rem;

/* More rounded */
--radius: 0.75rem;

/* Very rounded (pill-like buttons) */
--radius: 1rem;`}
        />

        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="p-4 rounded-none">
            <p className="text-xs text-muted-foreground">0</p>
          </Card>
          <Card className="p-4 rounded-sm">
            <p className="text-xs text-muted-foreground">0.25rem</p>
          </Card>
          <Card className="p-4 rounded-md">
            <p className="text-xs text-muted-foreground">0.5rem</p>
          </Card>
          <Card className="p-4 rounded-xl">
            <p className="text-xs text-muted-foreground">0.75rem</p>
          </Card>
        </div>
      </div>

      {/* Shadows */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Shadow Customization</h2>
        <p className="text-muted-foreground">
          tweakcn/theme-picker themes include a shadow scale system. Customize
          the shadow color and intensity:
        </p>

        <CodeBlockDoc
          filename="Shadow customization"
          language="css"
          code={`[data-theme="custom-light"] {
  /* Shadow base settings */
  --shadow-color: hsl(220 30% 20%);
  --shadow-opacity: 0.1;

  /* Or define each level */
  --shadow-sm: 0 1px 2px hsl(220 30% 20% / 0.05);
  --shadow: 0 1px 3px hsl(220 30% 20% / 0.1),
            0 1px 2px hsl(220 30% 20% / 0.06);
  --shadow-md: 0 4px 6px hsl(220 30% 20% / 0.1);
  --shadow-lg: 0 10px 15px hsl(220 30% 20% / 0.1);
  --shadow-xl: 0 20px 25px hsl(220 30% 20% / 0.1);
}`}
        />
      </div>

      {/* Creating a New Theme */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Creating a New Theme</h2>
        <p className="text-muted-foreground">
          To create a completely new theme, start with a base theme and
          customize all variables:
        </p>

        <CodeBlockDoc
          filename="styles/themes/brand.css"
          language="css"
          code={`/* Brand Theme - Light */
[data-theme="brand-light"] {
  /* Background and foreground */
  --background: oklch(0.98 0.01 220);
  --foreground: oklch(0.15 0.02 220);

  /* Cards and surfaces */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.02 220);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.02 220);

  /* Brand colors */
  --primary: oklch(0.55 0.20 220);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.92 0.02 220);
  --secondary-foreground: oklch(0.25 0.02 220);

  /* Neutral tones */
  --muted: oklch(0.94 0.01 220);
  --muted-foreground: oklch(0.45 0.01 220);
  --accent: oklch(0.94 0.01 220);
  --accent-foreground: oklch(0.25 0.02 220);

  /* Semantic colors */
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(1 0 0);

  /* Borders and inputs */
  --border: oklch(0.88 0.01 220);
  --input: oklch(0.92 0.01 220);
  --ring: oklch(0.55 0.20 220);

  /* Typography and sizing */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --radius: 0.5rem;
}

/* Brand Theme - Dark */
[data-theme="brand-dark"] {
  --background: oklch(0.15 0.02 220);
  --foreground: oklch(0.95 0.01 220);
  /* ... continue with dark mode values ... */
}`}
        />
      </div>

      {/* Register Custom Theme */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Register Your Theme</h2>
        <p className="text-muted-foreground">
          Update your ThemeProvider to include your custom theme:
        </p>

        <CodeBlockDoc
          filename="components/theme-provider.tsx"
          language="tsx"
          code={`const themes = [
  // Existing themes
  "catppuccin-light",
  "catppuccin-dark",
  // Your custom theme
  "brand-light",
  "brand-dark",
]

const DEFAULT_THEME = "brand-dark"

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      themes={themes}
      defaultTheme={DEFAULT_THEME}
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  )
}`}
        />
      </div>

      {/* Tips */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tips for Great Themes</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Contrast Ratios</h3>
            <p className="text-sm text-muted-foreground">
              Ensure foreground colors have at least 4.5:1 contrast ratio
              against backgrounds for accessibility.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Consistent Hues</h3>
            <p className="text-sm text-muted-foreground">
              Keep related colors (like muted and accent) in similar hue ranges
              for visual harmony.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Test Both Modes</h3>
            <p className="text-sm text-muted-foreground">
              Always check your customizations in both light and dark modes to
              ensure consistency.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Font Pairing</h3>
            <p className="text-sm text-muted-foreground">
              Choose fonts that complement each other. Sans-serif for UI, serif
              for headings or content.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
