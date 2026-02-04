import {
  AstroIcon,
  NextJsIcon,
  RemixIcon,
  ViteIcon,
} from "@/components/framework-icons";

import { Badge } from "@/components/ui/badge";
import { LinkedCard } from "@/components/docs/linked-card";

export const metadata = {
  title: "Installation",
  description: "How to install tweakcn/theme-picker themes in your project.",
};

export default function InstallationPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <Badge variant="outline">Installation</Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Framework Installation
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          These themes work with any React framework. Choose your framework
          below for specific installation instructions.
        </p>
      </div>

      {/* Framework Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <LinkedCard href="/docs/installation/nextjs">
          <NextJsIcon className="h-12 w-12" />
          <p className="mt-3 font-semibold">Next.js</p>
          <p className="mt-1 text-sm text-muted-foreground">
            App Router & Pages Router
          </p>
        </LinkedCard>

        <LinkedCard href="/docs/installation/vite">
          <ViteIcon className="h-12 w-12" />
          <p className="mt-3 font-semibold">Vite</p>
          <p className="mt-1 text-sm text-muted-foreground">
            React + Vite setup
          </p>
        </LinkedCard>

        <LinkedCard href="/docs/installation/astro">
          <AstroIcon className="h-12 w-12" />
          <p className="mt-3 font-semibold">Astro</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Astro with React islands
          </p>
        </LinkedCard>

        <LinkedCard href="/docs/installation/remix">
          <RemixIcon className="h-12 w-12" />
          <p className="mt-3 font-semibold">Remix</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Full-stack React framework
          </p>
        </LinkedCard>
      </div>

      {/* Registry Types */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Registry URLs</h2>
        <p className="text-muted-foreground">
          Each framework has a dedicated registry URL. Use the URL that matches
          your framework to install all 38+ themes at once.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Framework</th>
                <th className="text-left py-3 px-4 font-medium">
                  Install Command
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  Theme Attribute
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 px-4 font-medium">Next.js</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  npx shadcn@latest add
                  https://tweakcn-picker.vercel.app/r/nextjs/theme-system.json
                </td>
                <td className="py-3 px-4">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    data-theme
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Vite</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  npx shadcn@latest add
                  https://tweakcn-picker.vercel.app/r/vite/theme-system.json
                </td>
                <td className="py-3 px-4">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    data-theme
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Astro</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  npx shadcn@latest add
                  https://tweakcn-picker.vercel.app/r/astro/theme-system.json
                </td>
                <td className="py-3 px-4">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    data-theme
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Remix</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  npx shadcn@latest add
                  https://tweakcn-picker.vercel.app/r/remix/theme-system.json
                </td>
                <td className="py-3 px-4">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    data-theme
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Themes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Individual Theme Installation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Theme</th>
                <th className="text-left py-3 px-4 font-medium">
                  Install Command
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 px-4 font-medium">Catppuccin</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  npx shadcn@latest add
                  https://tweakcn-picker.vercel.app/r/theme-catppuccin.json
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Claude</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  npx shadcn@latest add
                  https://tweakcn-picker.vercel.app/r/theme-claude.json
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Vercel</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  npx shadcn@latest add
                  https://tweakcn-picker.vercel.app/r/theme-vercel.json
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Cyberpunk</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  npx shadcn@latest add
                  https://tweakcn-picker.vercel.app/r/theme-cyberpunk.json
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Browse all available themes on the{" "}
          <a href="/#themes" className="text-primary underline">
            home page
          </a>
          .
        </p>
      </div>

      {/* Manual Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Manual Installation</h2>
        <p className="text-muted-foreground">
          If you prefer to install manually or need more control, you can copy
          the theme CSS directly. Visit the theme preview page and click
          &quot;Copy CSS&quot; to get the raw styles.
        </p>
      </div>
    </div>
  );
}
