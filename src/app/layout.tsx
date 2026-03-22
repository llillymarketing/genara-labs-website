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
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
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
