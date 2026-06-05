"use client";

import dynamic from "next/dynamic";
import { LazyOnScroll } from "../LazyOnScroll";

// Interactive below-the-fold sections. dynamic(ssr:false) keeps their JS out of
// the initial bundle; LazyOnScroll defers mounting (and hydration) until each is
// about to scroll into view (or a nav action requests it). The `loading` fallback
// reserves height while the chunk loads so layout never collapses, and the anchor
// `id` lives on the LazyOnScroll wrapper so nav links resolve even before mount.

const reserve = (minHeight: number) => {
  const Spacer = () => <div style={{ minHeight }} aria-hidden />;
  Spacer.displayName = "SectionSpacer";
  return Spacer;
};

const BlogSection = dynamic(() => import("./BlogSection"), { ssr: false, loading: reserve(500) });
const TechStackSection = dynamic(() => import("./TechStackSection"), { ssr: false, loading: reserve(600) });
const ProjectsSection = dynamic(() => import("./ProjectsSection"), { ssr: false, loading: reserve(800) });
const ServicesSection = dynamic(() => import("./ServicesSection"), { ssr: false, loading: reserve(700) });
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), { ssr: false, loading: reserve(500) });
const ContactSection = dynamic(() => import("./ContactSection"), { ssr: false, loading: reserve(500) });

export function LazyBlogSection() {
  return (
    <LazyOnScroll id="blog" minHeight={500}>
      <BlogSection />
    </LazyOnScroll>
  );
}

export function LazyTechStackSection() {
  return (
    <LazyOnScroll id="stack" minHeight={600}>
      <TechStackSection />
    </LazyOnScroll>
  );
}

export function LazyProjectsSection() {
  return (
    <LazyOnScroll id="projects" minHeight={800}>
      <ProjectsSection />
    </LazyOnScroll>
  );
}

export function LazyServicesSection() {
  return (
    <LazyOnScroll id="services" minHeight={700}>
      <ServicesSection />
    </LazyOnScroll>
  );
}

export function LazyTestimonialsSection() {
  return (
    <LazyOnScroll id="testimonials" minHeight={500}>
      <TestimonialsSection />
    </LazyOnScroll>
  );
}

export function LazyContactSection() {
  return (
    <LazyOnScroll id="contact" minHeight={500}>
      <ContactSection />
    </LazyOnScroll>
  );
}
