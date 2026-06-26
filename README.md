# Theme Picker for shadcn/ui

Easily add 43+ themes with support for light and dark modes. Add a complete theme picker to your shadcn/ui app with a single command. Custom fonts, light & dark modes for every theme, and every theme available in **OKLCH, HSL, HEX, or RGB** for **Tailwind CSS v4 (default) or v3**.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0842244a-f0cb-4110-9c6a-6835c8d11d7e" />

> This project is not affiliated with tweakcn. Themes are inspired by and adapted from the tweakcn theme collection.

## Features

- 43+ ready-to-use themes
- Light and dark mode support for each theme
- Framework adapters for Next.js, Vite, Astro, and Remix
- **Tailwind CSS v4 (default) and v3** — pick your version in the install dialog
- **Every color format** — OKLCH, HSL, HEX, and RGB variants of every theme
- Built on CSS variables; compatible with shadcn/ui components

### Tailwind version & color format

Themes ship in a full matrix of variants so they drop into any stack:

| | OKLCH | HSL | HEX | RGB |
| --- | :---: | :---: | :---: | :---: |
| **Tailwind v4** (default) | ✅ | ✅ | ✅ | ✅ |
| **Tailwind v3** | — | ✅ | ✅ | ✅ |

- **v4** variants use raw color values with `data-theme` selectors and `@theme inline` (the modern shadcn architecture). The default install URL is **v4 + OKLCH**.
- **v3** variants emit bare channel triplets under `:root` / `.dark` in `@layer base`, consumed via `hsl(var(--token))` (HSL) or `rgb(var(--token))` (HEX/RGB) in your `tailwind.config`. OKLCH is not offered for v3 because the v3 wrapper model can't carry it.

In the theme picker, open a theme's **Code** dialog and use the **Tailwind** and **Color format** toggles to copy the exact variant (and its install command) you need.

Variant install URLs follow the pattern:

```
https://tweakcn-picker.vercel.app/r/theme-<name>-<v4|v3>-<hsl|hex|rgb>.json
# e.g. theme-catppuccin-v3-hsl.json   (v4 + OKLCH is the default theme-<name>.json)
```

## Installation

### Next.js

```bash
npx shadcn@latest add https://tweakcn-picker.vercel.app/r/nextjs/theme-system.json
```

### Vite (React)

```bash
npx shadcn@latest add https://tweakcn-picker.vercel.app/r/vite/theme-system.json
```

### Astro

```bash
npx shadcn@latest add https://tweakcn-picker.vercel.app/r/astro/theme-system.json
```

### Remix

```bash
npx shadcn@latest add https://tweakcn-picker.vercel.app/r/remix/theme-system.json
```

## Adding Themes

After installing the theme system, add individual themes:

```bash
npx shadcn@latest add https://tweakcn-picker.vercel.app/r/theme-catppuccin.json
npx shadcn@latest add https://tweakcn-picker.vercel.app/r/theme-cyberpunk.json
```

## Available Themes

### Minimal

- Default
- Mocha Mousse
- Mono
- Modern Minimal
- Amber Minimal
- Clean Slate

### Colorful

- Catppuccin
- Bubblegum
- Nature
- Ocean Breeze
- Sunset Horizon
- Pastel Dreams
- Flora
- Perpetuity
- Tangerine
- Solar Dusk
- Candyland
- Northern Lights

### Branded

- Claude
- Vercel
- T3 Chat
- Twitter
- Bold Tech
- Supabase
- Twitch
- Kick
- Spotify
- Stripe
- GitHub

### Creative

- Cyberpunk
- Neo Brutalism
- Doom 64
- Kodama Grove
- Quantum Rose
- Elegant Luxury
- Claymorphism
- Retro Arcade
- Vintage Paper
- Windows 98

### Dark

- Cosmic Night
- Midnight Bloom
- Graphite
- Caffeine
- Starry Night

## Usage

### ThemeProvider

Wrap your application with the `ThemeProvider` component. This must be placed at the root of your app.

```tsx
// app/layout.tsx (Next.js) or main.tsx (Vite)
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

The `ThemeProvider` is pre-configured with:

- `attribute="data-theme"` - applies theme via data attribute
- `themes={allThemeValues}` - all available theme values
- `defaultTheme="default-dark"` - default theme on first load
- `enableSystem={false}` - system preference disabled (themes handle light/dark)
- `disableTransitionOnChange` - prevents flash during theme switch

### ThemeSwitcher

A dropdown component for selecting themes and toggling light/dark mode.

```tsx
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Header() {
  return (
    <header>
      <nav>{/* ... */}</nav>
      <ThemeSwitcher />
    </header>
  );
}
```

The switcher provides:

- Light/dark mode toggle
- Color theme selection with visual previews
- Current theme indicator

### useTheme Hook

Access and control the theme programmatically using the `useTheme` hook from `next-themes`.

```tsx
import { useTheme } from "next-themes";

export function MyComponent() {
  const { theme, setTheme } = useTheme();

  // Get current theme: "catppuccin-dark", "vercel-light", etc.
  console.log(theme);

  // Set theme directly
  setTheme("cyberpunk-dark");
  setTheme("nature-light");

  return null;
}
```

### Theme Naming Convention

All themes follow the pattern `{name}-{mode}`:

```
{theme-name}-light  // Light mode variant
{theme-name}-dark   // Dark mode variant
```

Examples:

- `default-dark`
- `catppuccin-light`
- `cyberpunk-dark`
- `vercel-light`

### ThemeConfig Interface

Each theme is defined with the following structure:

```ts
interface ThemeConfig {
  name: string; // Theme identifier (e.g., "catppuccin")
  title: string; // Display name (e.g., "Catppuccin")
  primaryLight: string; // Primary color for light mode (oklch)
  primaryDark: string; // Primary color for dark mode (oklch)
  fontSans: string; // Font family
}
```

### Available Exports

The `themes-config.ts` file exports:

```ts
import {
  themes, // Array of all ThemeConfig objects
  sortedThemes, // Themes sorted alphabetically (default first)
  themeNames, // Array of theme names: ["default", "catppuccin", ...]
  allThemeValues, // All theme values: ["default-light", "default-dark", ...]
  DEFAULT_THEME, // "default-dark"
} from "@/lib/themes-config";
```

### Example: Custom Theme Selector

```tsx
import { useTheme } from "next-themes";
import { themes } from "@/lib/themes-config";

export function CustomThemeSelector() {
  const { theme, setTheme } = useTheme();

  // Parse current theme
  const currentName = theme?.replace(/-light$|-dark$/, "") || "default";
  const isDark = theme?.endsWith("-dark") ?? true;

  const toggleMode = () => {
    setTheme(`${currentName}-${isDark ? "light" : "dark"}`);
  };

  const selectTheme = (name: string) => {
    setTheme(`${name}-${isDark ? "dark" : "light"}`);
  };

  return (
    <div>
      <button onClick={toggleMode}>
        {isDark ? "Switch to Light" : "Switch to Dark"}
      </button>
      <select value={currentName} onChange={(e) => selectTheme(e.target.value)}>
        {themes.map((t) => (
          <option key={t.name} value={t.name}>
            {t.title}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## Project Structure

```
registry/
  themes/             # Canonical theme CSS (v4 + OKLCH) — the source of truth
    variants/         # Generated v4/v3 × hsl/hex/rgb variants (do not edit by hand)
    index.css         # Generated import list
  nextjs/             # Next.js adapter components
  vite/               # Vite adapter components
  astro/              # Astro adapter components
  remix/              # Remix adapter components
scripts/
  generate-themes.ts  # Generator: canonical → all variants + registry items
  lib/                # color conversion (culori) + lossless CSS parser
src/styles/           # Mirror of canonical themes for the demo site (generated)
public/r/             # Built registry JSON files
```

The canonical `registry/themes/*.css` files (Tailwind v4, OKLCH) are the single
source of truth. `scripts/generate-themes.ts` parses them losslessly and emits
every other variant, the `src/styles` mirror, `index.css`, and the variant
entries in `registry.json`. The generator guarantees the v4-OKLCH output is
**byte-identical** to the canonical files (parity gate), so regenerating never
drifts the originals.

### About `--shadow-*` variables

Each theme defines shadow tokens (`--shadow-2xs` … `--shadow-2xl`, plus the
primitives `--shadow-color`, `--shadow-opacity`, `--shadow-blur`,
`--shadow-spread`, `--shadow-offset-x/y`). These drive shadcn's `shadow-*`
utilities so elevation is themeable. They're additive on top of the base shadcn
token set — safe to keep, and harmless if your project doesn't use them.

## Development

```bash
pnpm install
pnpm dev
```

Regenerate all theme variants (after editing a canonical theme or adding a new one):

```bash
pnpm themes:generate
```

Build the registry (runs the generator first, then `shadcn build`):

```bash
pnpm registry:build
```

## License

MIT
