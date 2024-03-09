import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomQueryClient from "@/components/CustomQueryClient";
import { Fragment } from "react";
import { AppContextProvider } from "@/context/AppContext";

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
          <AppContextProvider>
            <Navbar />
            <div className="flex-grow min-h-[60vh]">{children}</div>
            <Footer />
          </AppContextProvider>
        </CustomQueryClient>
      </body>
    </html>
  );
}
