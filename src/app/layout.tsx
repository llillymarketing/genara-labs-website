import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import AgeGate from "@/components/AgeGate";
import { CartProvider } from "@/components/CartDrawer";
import { AuthProvider } from "@/lib/auth";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Genara Labs — Research-Grade Peptides",
  description:
    "Research-grade peptides with verified purity. Third-party tested, Certificate of Analysis with every order. For research use only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {/*
          DNA background video — rendered in the server component so `muted`
          is a real HTML attribute in the initial bytes iOS Safari parses.
          mix-blend-mode:screen makes it invisible on white pages and visible
          only on dark navy sections. z-index:-1 sits behind all content.
        */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.55,
            mixBlendMode: "screen",
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <source src="/dna-bg.mp4" type="video/mp4" />
        </video>

        <AuthProvider>
          <CartProvider>
            <Preloader />
            <ScrollProgress />
            <AgeGate />
            <Header />
            <div className="h-[88px]" />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
