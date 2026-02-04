import "./globals.css";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: {
    default: "tweakcn/theme-picker",
    template: "%s | tweakcn/theme-picker",
  },
  description:
    "42+ professional themes for shadcn/ui. Install like components. OKLCH colors, custom fonts, light/dark variants.",
  keywords: [
    "shadcn/ui",
    "themes",
    "tailwind",
    "oklch",
    "dark mode",
    "registry",
  ],
  authors: [{ name: "tweakcn/theme-picker" }],
  creator: "tweakcn/theme-picker",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "tweakcn/theme-picker",
    description:
      "42+ professional themes for shadcn/ui. Install like components.",
    siteName: "tweakcn/theme-picker",
  },
  twitter: {
    card: "summary_large_image",
    title: "tweakcn/theme-picker",
    description:
      "42+ professional themes for shadcn/ui. Install like components.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Inline script to prevent FOUC - runs before CSS/React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                if (stored) {
                  document.documentElement.setAttribute('data-theme', stored);
                } else {
                  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.setAttribute('data-theme', isDark ? 'default-dark' : 'default-light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`antialiased`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
