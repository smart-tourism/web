import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Smart Tourism",
    default: "Smart Tourism",
  },
  description:
    "The Smart Tourism App is an innovative platform designed to enhance the travel experience by offering personalized recommendations, interactive maps, and real-time information about tourist attractions. The app integrates local culture, events, and services to provide a comprehensive guide for both domestic and international tourists. With features like route planning, virtual tours, and multi-language support, it serves as the perfect travel companion for exploring new destinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
