import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { AuthProvider } from "@/components/AuthContext";

// Display: a refined high-contrast serif. Light weights, optical sizing — quiet
// and expensive. Used at large sizes, sentence case.
const display = Fraunces({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body: a clean, premium neutral grotesque.
const sans = Hanken_Grotesk({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Mono accent: labels, prices, numbers, timestamps — the archive-catalog detail.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "2 AM Press — real talk for whatever you're going through",
  description:
    "Short, honest ebooks for the people still awake. The flagship: 100 Things To Do After A Breakup.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <AuthProvider>
          <CartProvider>
            <SmoothScroll />
            <Grain />
            <Nav />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
