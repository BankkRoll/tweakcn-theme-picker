"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface LinkedCardProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function LinkedCard({
  href,
  children,
  className,
  external,
}: LinkedCardProps) {
  const Component = external ? "a" : Link;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component href={href} {...externalProps}>
      <Card
        className={cn(
          "group flex flex-col items-center justify-center p-6 text-center transition-all duration-200",
          "hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]",
          "cursor-pointer",
          className,
        )}
      >
        {children}
      </Card>
    </Component>
  );
}
