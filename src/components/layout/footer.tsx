import Link from "next/link";
import { Palette } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Powered by{" "}
              <Link
                href="https://tweakcn.com"
                target="_blank"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                tweakcn
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://github.com/BankkRoll/tweakcn-theme-picker"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/docs"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              shadcn/ui
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
