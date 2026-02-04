"use client";

import { Check, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeInstallDialog } from "./theme-install-dialog";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface ThemeCardProps {
  name: string;
  title: string;
  primaryLight: string;
  primaryDark: string;
  fontSans: string;
  description?: string;
}

export function ThemeCard({
  name,
  title,
  primaryLight,
  primaryDark,
  fontSans,
  description,
}: ThemeCardProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme?.replace("-light", "").replace("-dark", "");
  // Use "dark" as default for SSR consistency, actual value after mount
  const isDark = mounted ? theme?.endsWith("-dark") : true;
  // Only show active state after mounting to prevent hydration mismatch
  const isActive = mounted && currentTheme === name;

  const handleApply = () => {
    setTheme(`${name}-${isDark ? "dark" : "light"}`);
  };

  const primaryColor = isDark ? primaryDark : primaryLight;

  return (
    <>
      <div
        onClick={handleApply}
        className={cn(
          "group relative flex flex-col rounded-xl border bg-card p-4 transition-all duration-200 cursor-pointer",
          "hover:border-primary/50 hover:shadow-lg",
          isActive && "ring-2 ring-primary border-primary",
        )}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground z-10">
            <Check className="h-3.5 w-3.5" />
          </div>
        )}

        {/* Install button - appears on hover */}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10",
            isActive && "top-4",
          )}
          onClick={(e) => {
            e.stopPropagation();
            setDialogOpen(true);
          }}
        >
          <Code2 className="h-4 w-4" />
          <span className="sr-only">View install code</span>
        </Button>

        {/* Color Preview */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="h-12 w-12 rounded-lg border shadow-sm"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{title}</h3>
            <p
              className="text-xs text-muted-foreground truncate"
              style={{ fontFamily: fontSans }}
            >
              {fontSans.split(",")[0]}
            </p>
          </div>
        </div>

        {/* Mini UI Preview - Uses actual theme CSS variables */}
        <div
          data-theme={`${name}-${isDark ? "dark" : "light"}`}
          className="mb-4 overflow-hidden border bg-background text-foreground"
          style={{ borderRadius: "var(--radius)" }}
        >
          {/* Mini card */}
          <div
            className="m-2 border bg-card p-2"
            style={{ borderRadius: "var(--radius)" }}
          >
            {/* Header with text */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="h-5 w-5 bg-primary"
                style={{ borderRadius: "var(--radius)" }}
              />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-12 bg-card-foreground/80 rounded-sm" />
                <div className="h-1.5 w-8 bg-muted-foreground/50 rounded-sm" />
              </div>
            </div>
            {/* Button row */}
            <div className="flex gap-1.5">
              <div
                className="h-4 flex-1 bg-primary flex items-center justify-center"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="h-1.5 w-6 bg-primary-foreground/80 rounded-sm" />
              </div>
              <div
                className="h-4 flex-1 bg-secondary flex items-center justify-center"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="h-1.5 w-6 bg-secondary-foreground/80 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Install Dialog - Outside clickable card to prevent event issues */}
      <ThemeInstallDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        themeName={name}
        themeTitle={title}
      />
    </>
  );
}
