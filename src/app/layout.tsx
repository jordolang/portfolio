import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: "Jordan Lang - Web Developer & IT Specialist",
  description: "Portfolio of Jordan Lang, a passionate web developer and IT specialist focused on contract web design and IT projects, creating modern digital solutions.",
  keywords: "Jordan Lang, Web Developer, IT Specialist, Contract Web Design, Portfolio, Frontend Development",
  authors: [{ name: "Jordan Lang" }],
  openGraph: {
    title: "Jordan Lang - Web Developer & IT Specialist",
    description: "Portfolio of Jordan Lang, specializing in contract web design and IT projects with modern technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <PostHogProvider>
          <ThemeProvider>
            {/* <AnimatedBackground /> */}
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}