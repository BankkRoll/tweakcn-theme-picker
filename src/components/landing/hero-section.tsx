"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ThemeSwitcherPreview } from "./theme-switcher-preview";
import { cn } from "@/lib/utils";

const INSTALL_COMMAND =
  "pnpm dlx shadcn@latest add https://tweakcn-picker.vercel.app/r/nextjs/theme-system.json";

const TERMINAL_LINES = [
  { text: "Fetching registry...", delay: 600 },
  { text: "Found 38 themes", delay: 400 },
  { text: "Installing next-themes...", delay: 300 },
  { text: "Creating theme files...", delay: 400 },
  { text: "  + 38 theme CSS files", delay: 200 },
  { text: "  + components/theme-provider.tsx", delay: 150 },
];

const SUCCESS_LINE = "Done! Theme system ready.";

export function HeroSection() {
  const [typedCommand, setTypedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typedCommand.length < INSTALL_COMMAND.length) {
      const timeout = setTimeout(
        () => {
          setTypedCommand(INSTALL_COMMAND.slice(0, typedCommand.length + 1));
        },
        25 + Math.random() * 20,
      );
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      setTimeout(() => showTerminalLinesSequence(), 400);
    }
  }, [typedCommand]);

  const showTerminalLinesSequence = async () => {
    for (let i = 0; i < TERMINAL_LINES.length; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, TERMINAL_LINES[i].delay),
      );
      setTerminalLines((prev) => [...prev, TERMINAL_LINES[i].text]);
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    setShowSuccess(true);
    // Show component preview
    await new Promise((resolve) => setTimeout(resolve, 600));
    setShowPreview(true);
    // Open main menu
    await new Promise((resolve) => setTimeout(resolve, 400));
    setShowMainMenu(true);
    // Open sub menu with themes
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowSubMenu(true);
  };

  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            One command install for shadcn/ui
          </Badge>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            38+ themes,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              one install
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Add a complete theme picker to your shadcn/ui app with a single
            command. OKLCH colors, custom fonts, light & dark modes for every
            theme.
          </p>
        </div>

        <div className="pb-16">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-0">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:items-start">
              {/* Terminal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border-2 bg-zinc-950 overflow-hidden shadow-2xl"
              >
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-zinc-500 ml-2 font-mono">
                    Terminal
                  </span>
                </div>

                <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs md:text-sm h-56 sm:h-60 overflow-hidden">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 shrink-0">$</span>
                    <div className="flex-1 break-all">
                      <span className="text-zinc-200">{typedCommand}</span>
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-1.5 h-3.5 bg-zinc-200 ml-0.5 align-middle"
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-3 space-y-0.5">
                    <AnimatePresence>
                      {terminalLines.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.15 }}
                          className={cn(
                            "text-zinc-400",
                            line.startsWith("  +") && "text-cyan-400",
                            line.startsWith("Found") && "text-emerald-400",
                            line.startsWith("Installing") && "text-amber-400",
                            line.startsWith("Creating") && "text-amber-400",
                          )}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2 text-emerald-400 mt-2 pt-2 border-t border-zinc-800"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{SUCCESS_LINE}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Theme Switcher Preview - shows the actual component with menus */}
              <div
                className={cn(
                  "flex items-start justify-start transition-opacity duration-300 min-h-60 sm:min-h-70",
                  showPreview ? "opacity-100" : "opacity-0",
                )}
              >
                {mounted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ThemeSwitcherPreview
                      showMainMenu={showMainMenu}
                      showSubMenu={showSubMenu}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
