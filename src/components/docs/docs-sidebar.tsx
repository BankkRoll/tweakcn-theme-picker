"use client";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface DocsSidebarProps {
  className?: string;
}

const sidebarNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Framework Guides",
    items: [
      { title: "Next.js", href: "/docs/installation/nextjs" },
      { title: "Vite", href: "/docs/installation/vite" },
      { title: "Astro", href: "/docs/installation/astro" },
      { title: "Remix", href: "/docs/installation/remix" },
    ],
  },
  {
    title: "Themes",
    items: [
      { title: "Theme Structure", href: "/docs/theme-structure" },
      { title: "Customization", href: "/docs/customization" },
      { title: "Browse Themes", href: "/#themes" },
    ],
  },
];

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-full", className)}>
      <ScrollArea className="h-[calc(100vh-4rem)] py-6 pr-6 lg:py-8">
        <div className="space-y-6">
          {sidebarNav.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="font-semibold text-sm">{section.title}</h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
