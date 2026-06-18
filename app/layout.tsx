import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";

// Display: high-contrast literary serif — editorial, intimate, scales huge.
const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body: clean, warm sans.
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Mono accent: kickers, timestamps, "02:00", page numbers.
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
        <CartProvider>
          <SmoothScroll />
          <Grain />
          <Nav />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
