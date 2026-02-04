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
  maxHeight?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  title,
  className,
  showLineNumbers = false,
  maxHeight,
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
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card",
        className,
      )}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {/* Header - Sticky */}
      {title && (
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{title}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/80" />
            <div className="h-3 w-3 rounded-full bg-chart-4/80" />
            <div className="h-3 w-3 rounded-full bg-chart-2/80" />
          </div>
        </div>
      )}

      {/* Code Content - Scrollable */}
      <div className="relative flex-1 overflow-auto">
        <pre className="p-4 text-sm">
          <code className="block font-mono">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="mr-4 select-none text-muted-foreground w-6 text-right">
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
            "text-muted-foreground hover:text-foreground hover:bg-accent",
            "opacity-0 group-hover:opacity-100 transition-opacity",
          )}
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
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
      <span key={key++} className="text-primary">
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
        <span key={key++} className="text-chart-1">
          &quot;
        </span>,
      );
      continue;
    }
    if (token === "__STRING_END__") {
      inString = false;
      parts.push(
        <span key={key++} className="text-chart-1">
          &quot;
        </span>,
      );
      continue;
    }

    if (token) {
      if (inFlag) {
        parts.push(
          <span key={key++} className="text-chart-2">
            {token}
          </span>,
        );
      } else if (inUrl) {
        parts.push(
          <span
            key={key++}
            className="text-primary underline underline-offset-2"
          >
            {token}
          </span>,
        );
      } else if (inString) {
        parts.push(
          <span key={key++} className="text-chart-1">
            {token}
          </span>,
        );
      } else {
        parts.push(
          <span key={key++} className="text-foreground">
            {token}
          </span>,
        );
      }
    }
  }

  return parts.length > 0 ? (
    parts
  ) : (
    <span className="text-foreground">{line}</span>
  );
}

// Simple inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-accent px-1.5 py-0.5 text-sm font-mono text-foreground">
      {children}
    </code>
  );
}
