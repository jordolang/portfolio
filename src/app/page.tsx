import dynamic from "next/dynamic";
import Background from "@/components/portfolio/Background";
import HeroSection from "@/components/portfolio/HeroSection";
import Navigation from "@/components/portfolio/Navigation";
import OverviewSection from "@/components/portfolio/OverviewSection";

// Below-the-fold sections are code-split so their JS isn't part of the initial
// payload. SSR stays enabled (default) so their content remains in the HTML for
// SEO; only the JavaScript download/parse is deferred off the critical path.
const BlogSection = dynamic(() => import("@/components/portfolio/BlogSection"));
const TechStackSection = dynamic(() => import("@/components/portfolio/TechStackSection"));
const ExperienceSection = dynamic(() => import("@/components/portfolio/ExperienceSection"));
const ProjectsSection = dynamic(() => import("@/components/portfolio/ProjectsSection"));
const ServicesSection = dynamic(() => import("@/components/portfolio/ServicesSection"));
const TestimonialsSection = dynamic(() => import("@/components/portfolio/TestimonialsSection"));
const ContactSection = dynamic(() => import("@/components/portfolio/ContactSection"));
const Footer = dynamic(() => import("@/components/portfolio/Footer"));

export default function Portfolio() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white relative">
      {/* Background */}
      <Background />

      {/* Navigation */}
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 pt-24">
        {/* Above the fold */}
        <HeroSection />
        <OverviewSection />

        {/* Below the fold — lazily code-split */}
        <BlogSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
