import Background from "@/components/portfolio/Background";
import HeroSection from "@/components/portfolio/HeroSection";
import Navigation from "@/components/portfolio/Navigation";
import OverviewSection from "@/components/portfolio/OverviewSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import Footer from "@/components/portfolio/Footer";
import {
  LazyBlogSection,
  LazyTechStackSection,
  LazyProjectsSection,
  LazyServicesSection,
  LazyTestimonialsSection,
  LazyContactSection,
} from "@/components/portfolio/LazySections";

export default function Portfolio() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white relative">
      {/* Background (static, server) */}
      <Background />

      {/* Navigation */}
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 pt-24">
        {/* Above the fold */}
        <HeroSection />
        <OverviewSection />

        {/* Below the fold — interactive sections lazy-mount on scroll;
            Experience + Footer are static server components rendered directly. */}
        <LazyBlogSection />
        <LazyTechStackSection />
        <ExperienceSection />
        <LazyProjectsSection />
        <LazyServicesSection />
        <LazyTestimonialsSection />
        <LazyContactSection />
        <Footer />
      </div>
    </div>
  );
}
