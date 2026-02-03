import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CursorSpotlight from "./components/CursorSpotlight";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shefayet Nayon | Full Stack Developer & UI Designer",
    template: "%s | Shefayet Nayon"
  },
  description: "Portfolio of Shefayet Nayon, a Full Stack Developer specializing in Next.js, React, and modern UI design. Building scalable, high-performance web applications.",
  keywords: [
    "shefayet nayon",
    "full stack developer",
    "frontend developer",
    "web developer",
    "nextjs developer",
    "react developer",
    "ui designer",
    "software engineer",
    "javascript developer",
    "typescript"
  ],
  applicationName: "Shefayet Nayon Portfolio",
  authors: [{ name: "Shefayet Nayon", url: "https://shefayetnayon.netlify.app" }],
  creator: "Shefayet Nayon",
  publisher: "Shefayet Nayon",
  metadataBase: new URL("https://shefayetnayon.netlify.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shefayet Nayon | Full Stack Developer",
    description: "Building scalable, high-performance web applications with modern technologies.",
    url: "https://shefayetnayon.netlify.app",
    siteName: "Shefayet Nayon Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "Shefayet Nayon - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shefayet Nayon | Full Stack Developer",
    description: "Building scalable, high-performance web applications with modern technologies.",
    creator: "@ShefayetNayon",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shefayet Nayon",
              url: "https://shefayetnayon.netlify.app",
              image: "https://shefayetnayon.netlify.app/og-image.png",
              sameAs: [
                "https://github.com/shefayetnayon-dev",
                "https://linkedin.com/in/shefayetnayon",
                "https://twitter.com/ShefayetNayon",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Self-Employed",
              },
              description: "Full Stack Developer specializing in Next.js, React, and modern UI design.",
              knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "AWS"],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0d1117] text-[#c9d1d9]`}>
        <Navbar />
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <CursorSpotlight />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
