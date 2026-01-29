import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import Navbar from "@/components/Navbar";

// Configure Roboto (Body Text)
const roboto = localFont({
  src: [
    { path: "../public/fonts/Roboto/Roboto-Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/fonts/Roboto/Roboto-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Roboto/Roboto-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Roboto/Roboto-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Roboto/Roboto-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/Roboto/Roboto-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-roboto",
});

// Configure Bebas Neue Pro (Headings)
const bebas = localFont({
  src: [
    { path: "../public/fonts/Bebas Neue Pro/BebasNeuePro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Bebas Neue Pro/BebasNeuePro-Bold.ttf", weight: "700", style: "normal" },
    // Add other weights if explicitly needed, but these cover most use cases
  ],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Taikisha India - About Us",
  description: "Leading the way in engineering and construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${bebas.variable} font-sans`}>
        <LenisScroll>
          <Navbar />
          {children}
        </LenisScroll>
      </body>
    </html>
  );
}
