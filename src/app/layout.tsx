import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jlang.dev"),
  title: "Jordan Lang - Web Developer & IT Specialist",
  description: "Portfolio of Jordan Lang, a passionate web developer and IT specialist focused on contract web design and IT projects, creating modern digital solutions.",
  keywords: "Jordan Lang, Web Developer, IT Specialist, Contract Web Design, Portfolio, Frontend Development",
  authors: [{ name: "Jordan Lang" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Jordan Lang - Web Developer & IT Specialist",
    description: "Portfolio of Jordan Lang, specializing in contract web design and IT projects with modern technologies.",
    type: "website",
    images: [{
      url: "/jlangdev.png",
      width: 1200,
      height: 630,
      alt: "Jordan Lang - Web Developer & IT Specialist",
    }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GEV08XTBLL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GEV08XTBLL');
            `,
          }}
        />
      </head>
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