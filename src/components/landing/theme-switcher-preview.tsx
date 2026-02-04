"use client";

import { Check, Moon, Palette, Sun } from "lucide-react";
import { sortedThemes, themes } from "@/lib/themes-config";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

function parseTheme(theme: string | undefined): {
  colorTheme: string;
  mode: "light" | "dark";
} {
  if (!theme) return { colorTheme: "default", mode: "dark" };
  if (theme.endsWith("-dark")) {
    return { colorTheme: theme.replace("-dark", ""), mode: "dark" };
  }
  if (theme.endsWith("-light")) {
    return { colorTheme: theme.replace("-light", ""), mode: "light" };
  }
  return { colorTheme: "default", mode: "dark" };
}

interface ThemeSwitcherPreviewProps {
  showMainMenu?: boolean;
  showSubMenu?: boolean;
  onThemeSelect?: (name: string) => void;
}

export function ThemeSwitcherPreview({
  showMainMenu = false,
  showSubMenu = false,
  onThemeSelect,
}: ThemeSwitcherPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { colorTheme, mode } = parseTheme(theme);
  const isDark = mounted ? mode === "dark" : true;

  const currentThemeConfig =
    themes.find((t) => t.name === colorTheme) || themes[0];

  const setColorTheme = (name: string) => {
    setTheme(`${name}-${isDark ? "dark" : "light"}`);
    onThemeSelect?.(name);
  };

  const setMode = (newMode: "light" | "dark") => {
    setTheme(`${colorTheme}-${newMode}`);
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg">
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>

      {/* Main Menu */}
      {showMainMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute top-12 left-0 w-48 rounded-lg border bg-popover p-1 shadow-lg z-10"
        >
          {/* Current Theme Label */}
          <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold">
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: isDark
                  ? currentThemeConfig.primaryDark
                  : currentThemeConfig.primaryLight,
              }}
            />
            {currentThemeConfig.title}
          </div>
          <div className="my-1 h-px bg-border" />

          {/* Light/Dark Toggle */}
          <button
            onClick={() => setMode("light")}
            className={cn(
              "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer",
              mode === "light" && "bg-accent",
            )}
          >
            <Sun className="h-4 w-4" />
            <span className="flex-1 text-left">Light</span>
            {mode === "light" && <Check className="h-4 w-4 text-primary" />}
          </button>
          <button
            onClick={() => setMode("dark")}
            className={cn(
              "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer",
              mode === "dark" && "bg-accent",
            )}
          >
            <Moon className="h-4 w-4" />
            <span className="flex-1 text-left">Dark</span>
            {mode === "dark" && <Check className="h-4 w-4 text-primary" />}
          </button>

          <div className="my-1 h-px bg-border" />

          {/* Color Theme with arrow */}
          <div
            className={cn(
              "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
              showSubMenu && "bg-accent",
            )}
          >
            <Palette className="h-4 w-4" />
            <span className="flex-1 text-left">Color Theme</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </motion.div>
      )}

      {/* Sub Menu - Theme List */}
      {showSubMenu && (
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute top-30 left-50 w-52 rounded-lg border bg-popover p-1 shadow-lg z-20 overflow-hidden"
        >
          <div className="max-h-80 overflow-y-auto scrollbar-thin">
            {sortedThemes.map((t, i) => (
              <motion.button
                key={t.name}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.03 }}
                onClick={() => setColorTheme(t.name)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer",
                  colorTheme === t.name && "bg-accent",
                )}
              >
                <div
                  className="h-4 w-4 rounded-full border border-border shrink-0"
                  style={{
                    backgroundColor: isDark ? t.primaryDark : t.primaryLight,
                  }}
                />
                <span className="flex-1 text-left truncate">{t.title}</span>
                {colorTheme === t.name && (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                )}
              </motion.button>
            ))}
          </div>
          <Separator />
          <div className="px-2 py-1.5 text-xs text-muted-foreground text-center">
            Themes by{" "}
            <a
              href="https://tweakcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              tweakcn
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
