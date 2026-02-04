"use client";

import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";

type PackageManager = "npx" | "pnpm" | "bun" | "yarn";

interface InstallCommandProps {
  url: string;
  className?: string;
}

const packageManagers: {
  id: PackageManager;
  label: string;
  command: string;
}[] = [
  { id: "pnpm", label: "pnpm", command: "pnpm dlx shadcn@latest add" },
  { id: "npx", label: "npm", command: "npx shadcn@latest add" },
  { id: "bun", label: "bun", command: "bunx --bun shadcn@latest add" },
  { id: "yarn", label: "yarn", command: "npx shadcn@latest add" },
];

export function InstallCommand({ url, className }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);
  const [activeManager, setActiveManager] = useState<PackageManager>("pnpm");

  const activeCommand = packageManagers.find((pm) => pm.id === activeManager);
  const fullCommand = `${activeCommand?.command} ${url}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border-2 bg-zinc-950",
        className,
      )}
    >
      {/* Header with package manager tabs */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex">
          {packageManagers.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setActiveManager(pm.id)}
              className={cn(
                "px-4 py-2 text-xs font-medium transition-colors",
                activeManager === pm.id
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50",
              )}
            >
              {pm.label}
            </button>
          ))}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-3 py-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Command display */}
      <div className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-zinc-200 whitespace-nowrap">
          <span className="text-zinc-500">$</span>{" "}
          <span className="text-cyan-400">
            {activeCommand?.command.split(" ")[0]}
          </span>{" "}
          <span className="text-zinc-200">
            {activeCommand?.command.split(" ").slice(1).join(" ")}
          </span>{" "}
          <span className="text-emerald-400">{url}</span>
        </code>
      </div>
    </div>
  );
}
