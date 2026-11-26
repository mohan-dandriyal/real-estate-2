import type { Metadata } from "next";
import localFont from "next/font/local";

import { brand } from "@/type/template.type";

import "./globals.css";
import "./page-layout.css";

const manrope = localFont({
  src: "./fonts/manrope.ttf",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond.ttf", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-italic.ttf", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: brand.name,
  description:
    "Discover luxury residences, premium properties and exceptional real estate experiences with PrimeEstate Realty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
