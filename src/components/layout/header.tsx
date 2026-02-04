"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ThemeSwitcher } from "../theme-switcher";
import { themes } from "@/lib/themes-config";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme?.endsWith("-dark");
  const currentThemeName = theme?.replace("-light", "").replace("-dark", "");
  const currentTheme =
    themes.find((t) => t.name === currentThemeName) || themes[0];

  const toggleMode = () => {
    if (isDark) {
      setTheme(`${currentThemeName}-light`);
    } else {
      setTheme(`${currentThemeName}-dark`);
    }
  };

  const handleCopyInstall = async () => {
    await navigator.clipboard.writeText(
      `npx shadcn@latest add https://tweakcn-picker.vercel.app/r/themes/${currentThemeName}.json`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-lg tracking-tight">
              tweakcn/theme-picker
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/docs">Docs</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="https://github.com/BankkRoll/tweakcn-theme-picker"
              target="_blank"
            >
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1" />
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
