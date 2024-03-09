import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomQueryClient from "@/components/CustomQueryClient";

const font = Nunito({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Shades of shape - Bet smart. Win big.",
  description: "Bet with confidence. Win with pride.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <CustomQueryClient>
          <Navbar />
          {children}
          <Footer />
        </CustomQueryClient>
      </body>
    </html>
  );
}
