import { Github, Menu, Palette } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import Link from "next/link";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="mx-auto max-w-7xl">
          <div className="flex">
            {/* Sidebar - desktop */}
            <div className="hidden md:block w-64 shrink-0 border-r">
              <div className="sticky top-14 px-4">
                <DocsSidebar />
              </div>
            </div>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <div className="px-4 py-8 md:px-8 lg:px-12 max-w-4xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
