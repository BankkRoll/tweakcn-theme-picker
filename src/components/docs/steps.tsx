"use client";

import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

interface StepProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div
      className={cn(
        "relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Step({ title, children, className }: StepProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-xs font-semibold">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="space-y-4 text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
