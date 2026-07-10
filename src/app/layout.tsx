import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionProvider } from "@/components/MotionProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jlang.dev"),
  title: "Jordan Lang | Web Developer & IT Specialist Portfolio",
  description: "Portfolio of Jordan Lang, a passionate web developer and IT specialist focused on contract web design and IT projects, creating modern digital solutions.",
  keywords: "Jordan Lang, Web Developer, IT Specialist, Contract Web Design, Portfolio, Frontend Development",
  authors: [{ name: "Jordan Lang" }],
  alternates: {
    canonical: "/",
  },
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Resolve the theme synchronously, before first paint, so the correct
            theme class is present at SSR-paint time. This prevents a
            light↔dark flash AND — critically — stops the hero logo from being
            swapped (and re-downloaded) after hydration, which was wrecking LCP. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var dark=t?t==="dark":!window.matchMedia("(prefers-color-scheme: light)").matches;if(dark)document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <ThemeProvider>
            <MotionProvider>
              {children}
            </MotionProvider>
          </ThemeProvider>
        </PostHogProvider>
        {/* Google tag (gtag.js) — `lazyOnload` defers it until after the load
            event / browser idle, so its ~164 kB + main-thread cost lands OUTSIDE
            the Total Blocking Time window instead of competing with hydration. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GEV08XTBLL"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GEV08XTBLL');
          `}
        </Script>
      </body>
    </html>
  );
}