"use client";

import { Check, Copy, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JSX, useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "bash",
  title,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-zinc-950",
        className,
      )}
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-300">{title}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
        </div>
      )}

      {/* Code Content */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className="block font-mono">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="mr-4 select-none text-zinc-600 w-6 text-right">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1">{highlightBashSyntax(line)}</span>
              </div>
            ))}
          </code>
        </pre>

        {/* Copy Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className={cn(
            "absolute right-2 top-2 h-8 w-8 p-0",
            "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
            "opacity-0 group-hover:opacity-100 transition-opacity",
          )}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

function highlightBashSyntax(line: string) {
  const parts: JSX.Element[] = [];
  let remaining = line;
  let key = 0;

  // Match command at the start
  const commandMatch = remaining.match(
    /^(npx|npm|pnpm|yarn|bunx?|git|cd|mkdir)/,
  );
  if (commandMatch) {
    parts.push(
      <span key={key++} className="text-cyan-400">
        {commandMatch[1]}
      </span>,
    );
    remaining = remaining.slice(commandMatch[1].length);
  }

  // Match flags
  remaining = remaining.replace(/(--?\w+(?:-\w+)*)/g, (match) => {
    return `__FLAG_START__${match}__FLAG_END__`;
  });

  // Match URLs
  remaining = remaining.replace(/(https?:\/\/[^\s]+)/g, (match) => {
    return `__URL_START__${match}__URL_END__`;
  });

  // Match strings
  remaining = remaining.replace(/"([^"]+)"/g, (_, content) => {
    return `__STRING_START__${content}__STRING_END__`;
  });

  // Parse and create elements
  const tokens = remaining.split(
    /(__FLAG_START__|__FLAG_END__|__URL_START__|__URL_END__|__STRING_START__|__STRING_END__)/,
  );
  let inFlag = false;
  let inUrl = false;
  let inString = false;

  for (const token of tokens) {
    if (token === "__FLAG_START__") {
      inFlag = true;
      continue;
    }
    if (token === "__FLAG_END__") {
      inFlag = false;
      continue;
    }
    if (token === "__URL_START__") {
      inUrl = true;
      continue;
    }
    if (token === "__URL_END__") {
      inUrl = false;
      continue;
    }
    if (token === "__STRING_START__") {
      inString = true;
      parts.push(
        <span key={key++} className="text-amber-300">
          &quot;
        </span>,
      );
      continue;
    }
    if (token === "__STRING_END__") {
      inString = false;
      parts.push(
        <span key={key++} className="text-amber-300">
          &quot;
        </span>,
      );
      continue;
    }

    if (token) {
      if (inFlag) {
        parts.push(
          <span key={key++} className="text-fuchsia-400">
            {token}
          </span>,
        );
      } else if (inUrl) {
        parts.push(
          <span
            key={key++}
            className="text-emerald-400 underline underline-offset-2"
          >
            {token}
          </span>,
        );
      } else if (inString) {
        parts.push(
          <span key={key++} className="text-amber-300">
            {token}
          </span>,
        );
      } else {
        parts.push(
          <span key={key++} className="text-zinc-200">
            {token}
          </span>,
        );
      }
    }
  }

  return parts.length > 0 ? (
    parts
  ) : (
    <span className="text-zinc-200">{line}</span>
  );
}

// Simple inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-zinc-200">
      {children}
    </code>
  );
}
