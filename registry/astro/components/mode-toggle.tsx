import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STORAGE_KEY = "tweakcn-theme";
const DEFAULT_THEME = "default-dark";

declare global {
  interface Window {
    setTheme: (theme: string) => void;
  }
}

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<string>(DEFAULT_THEME);

  React.useEffect(() => {
    // Get initial theme from data-theme attribute or localStorage
    const currentTheme =
      document.documentElement.getAttribute("data-theme") ||
      localStorage.getItem(STORAGE_KEY) ||
      DEFAULT_THEME;
    setThemeState(currentTheme);

    // Listen for theme changes
    const handleThemeChange = (e: CustomEvent<string>) => {
      setThemeState(e.detail);
    };

    window.addEventListener("theme-change", handleThemeChange as EventListener);
    return () => {
      window.removeEventListener("theme-change", handleThemeChange as EventListener);
    };
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined" && window.setTheme) {
      window.setTheme(newTheme);
    }
  };

  const isDark = theme.endsWith("-dark");
  const colorTheme = theme.replace("-light", "").replace("-dark", "");

  const toggleMode = () => {
    const newTheme = `${colorTheme}-${isDark ? "light" : "dark"}`;
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(`${colorTheme}-light`)}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(`${colorTheme}-dark`)}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
