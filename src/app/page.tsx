import { HeroSection } from "@/components/landing/hero-section";
import { ThemesSection } from "@/components/landing/themes-section";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ThemesSection />
    </main>
  );
}
