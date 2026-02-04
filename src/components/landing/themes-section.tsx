"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sortedThemes, themes, themesByCategory } from "@/lib/themes-config";

import { ThemeCard } from "@/components/landing/theme-card";

const categoryLabels = {
  minimal: "Minimal",
  colorful: "Colorful",
  branded: "Branded",
  creative: "Creative",
  dark: "Dark",
};

export function ThemesSection() {
  return (
    <section id="themes" className="border-b bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose Your Theme
          </h2>
          <p className="mt-4 text-muted-foreground">
            Click any theme to preview it live.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="h-auto flex-wrap justify-center gap-1 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All ({themes.length})
              </TabsTrigger>
              {(
                Object.keys(categoryLabels) as Array<
                  keyof typeof categoryLabels
                >
              ).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {categoryLabels[category]} (
                  {themesByCategory[category].length})
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedThemes.map((t) => (
                <ThemeCard
                  key={t.name}
                  name={t.name}
                  title={t.title}
                  primaryLight={t.primaryLight}
                  primaryDark={t.primaryDark}
                  fontSans={t.fontSans}
                  description={t.description}
                />
              ))}
            </div>
          </TabsContent>

          {(
            Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>
          ).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {themesByCategory[category].map((t) => (
                  <ThemeCard
                    key={t.name}
                    name={t.name}
                    title={t.title}
                    primaryLight={t.primaryLight}
                    primaryDark={t.primaryDark}
                    fontSans={t.fontSans}
                    description={t.description}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
