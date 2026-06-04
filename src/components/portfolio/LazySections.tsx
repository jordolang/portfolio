"use client";

import dynamic from "next/dynamic";
import { LazyOnScroll } from "../LazyOnScroll";

// Interactive below-the-fold sections. dynamic(ssr:false) keeps their JS out of
// the initial bundle; LazyOnScroll defers mounting (and hydration) until each is
// about to scroll into view. minHeight reserves approximate space so the scroll
// position stays stable before mount.

const BlogSection = dynamic(() => import("./BlogSection"), { ssr: false });
const TechStackSection = dynamic(() => import("./TechStackSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("./ProjectsSection"), { ssr: false });
const ServicesSection = dynamic(() => import("./ServicesSection"), { ssr: false });
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), { ssr: false });
const ContactSection = dynamic(() => import("./ContactSection"), { ssr: false });

export function LazyBlogSection() {
  return (
    <LazyOnScroll minHeight={500}>
      <BlogSection />
    </LazyOnScroll>
  );
}

export function LazyTechStackSection() {
  return (
    <LazyOnScroll minHeight={600}>
      <TechStackSection />
    </LazyOnScroll>
  );
}

export function LazyProjectsSection() {
  return (
    <LazyOnScroll minHeight={800}>
      <ProjectsSection />
    </LazyOnScroll>
  );
}

export function LazyServicesSection() {
  return (
    <LazyOnScroll minHeight={700}>
      <ServicesSection />
    </LazyOnScroll>
  );
}

export function LazyTestimonialsSection() {
  return (
    <LazyOnScroll minHeight={500}>
      <TestimonialsSection />
    </LazyOnScroll>
  );
}

export function LazyContactSection() {
  return (
    <LazyOnScroll minHeight={500}>
      <ContactSection />
    </LazyOnScroll>
  );
}
