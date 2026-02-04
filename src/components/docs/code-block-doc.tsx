"use client";

import { Check, Copy, File } from "lucide-react";
import { JSX, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockDocProps {
  code: string;
  filename?: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export function CodeBlockDoc({
  code,
  filename,
  language = "tsx",
  showLineNumbers = true,
  highlightLines = [],
  className,
}: CodeBlockDocProps) {
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
        "group relative overflow-hidden rounded-lg border bg-zinc-950",
        className,
      )}
    >
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <File className="h-4 w-4" />
            <span className="text-sm font-medium">{filename}</span>
            {language && (
              <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-500">
                {language}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
          >
            {copied ? (
              <>
                <Check className="mr-1.5 h-3.5 w-3.5 text-green-400" />
                <span className="text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
      )}

      {/* Code Content */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="block font-mono">
            {lines.map((line, i) => {
              const lineNumber = i + 1;
              const isHighlighted = highlightLines.includes(lineNumber);
              return (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    isHighlighted &&
                      "bg-primary/10 -mx-4 px-4 border-l-2 border-primary",
                  )}
                >
                  {showLineNumbers && (
                    <span
                      className={cn(
                        "mr-4 inline-block w-8 select-none text-right text-zinc-600",
                        isHighlighted && "text-primary",
                      )}
                    >
                      {lineNumber}
                    </span>
                  )}
                  <span className="flex-1">
                    {highlightSyntax(line, language)}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>

        {/* Copy Button (when no filename) */}
        {!filename && (
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
        )}
      </div>
    </div>
  );
}

function highlightSyntax(line: string, language: string): JSX.Element[] {
  const parts: JSX.Element[] = [];
  let remaining = line;
  let key = 0;

  // Simple syntax highlighting
  const patterns: { regex: RegExp; className: string }[] = [
    // Comments
    {
      regex: /(\/\/.*$|\/\*[\s\S]*?\*\/|{\/\*[\s\S]*?\*\/})/g,
      className: "text-zinc-500",
    },
    // Strings
    {
      regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      className: "text-amber-300",
    },
    // Keywords
    {
      regex:
        /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|implements|interface|type|async|await|default|new|this|super|static|public|private|protected|readonly|typeof|instanceof|in|of|as|is)\b/g,
      className: "text-fuchsia-400",
    },
    // JSX/TSX tags
    { regex: /(<\/?[\w.-]+|>|\/>)/g, className: "text-cyan-400" },
    // Functions
    { regex: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, className: "text-blue-400" },
    // Numbers
    { regex: /\b(\d+\.?\d*)\b/g, className: "text-orange-400" },
    // Boolean/null
    { regex: /\b(true|false|null|undefined)\b/g, className: "text-orange-400" },
    // Props/attributes
    {
      regex:
        /\b(className|href|src|alt|type|name|value|onChange|onClick|style)\b(?=\s*=)/g,
      className: "text-emerald-400",
    },
  ];

  // Simple approach: just color the whole line for now
  // For production, you'd want a proper syntax highlighter
  let result = remaining;

  // Check for comments first
  if (remaining.trim().startsWith("//") || remaining.trim().startsWith("{/*")) {
    return [
      <span key={0} className="text-zinc-500">
        {remaining}
      </span>,
    ];
  }

  // Check for import/export statements
  if (
    remaining.trim().startsWith("import") ||
    remaining.trim().startsWith("export")
  ) {
    return [
      <span key={0} className="text-zinc-200">
        {highlightImportExport(remaining)}
      </span>,
    ];
  }

  return [
    <span key={0} className="text-zinc-200">
      {remaining}
    </span>,
  ];
}

function highlightImportExport(line: string): JSX.Element {
  const parts: JSX.Element[] = [];
  let key = 0;

  // Very basic highlighting for import/export
  const regex =
    /(\b(?:import|export|from|default|as)\b)|(".*?"|'.*?')|(\{[^}]*\})|(\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++} className="text-zinc-200">
          {line.slice(lastIndex, match.index)}
        </span>,
      );
    }

    if (match[1]) {
      parts.push(
        <span key={key++} className="text-fuchsia-400">
          {match[1]}
        </span>,
      );
    } else if (match[2]) {
      parts.push(
        <span key={key++} className="text-amber-300">
          {match[2]}
        </span>,
      );
    } else if (match[3]) {
      parts.push(
        <span key={key++} className="text-cyan-400">
          {match[3]}
        </span>,
      );
    } else if (match[4]) {
      parts.push(
        <span key={key++} className="text-zinc-200">
          {match[4]}
        </span>,
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={key++} className="text-zinc-200">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  return <>{parts}</>;
}
