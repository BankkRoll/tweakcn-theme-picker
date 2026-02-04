import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type { Metadata } from "next";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "tweakcn/theme-picker",
    template: "%s | tweakcn/theme-picker",
  },
  description:
    "38+ professional themes for shadcn/ui. Install like components. OKLCH colors, custom fonts, light/dark variants.",
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
      "38+ professional themes for shadcn/ui. Install like components.",
    siteName: "tweakcn/theme-picker",
  },
  twitter: {
    card: "summary_large_image",
    title: "tweakcn/theme-picker",
    description:
      "38+ professional themes for shadcn/ui. Install like components.",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
