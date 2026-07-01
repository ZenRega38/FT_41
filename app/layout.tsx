import type { Metadata } from "next";
import { Chakra_Petch, Titillium_Web, Share_Tech_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WelcomePopup } from "@/components/ui/WelcomePopup";
import { GlobalPreloader } from "@/components/ui/GlobalPreloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const titilliumWeb = Titillium_Web({
  weight: ['300', '400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yudisium Ke-41 Fakultas Teknik UBT",
  description: "Website profil Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan — 71 peserta, 4 program studi, satu babak baru.",
  icons: {
    icon: '/logo.png',
  },
  verification: {
    google: 'fOX0C0jsTriaXBPnOFy11Ncj_iIAZMJBU1YImqtUnX4',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        suppressHydrationWarning
        className={`${titilliumWeb.variable} ${chakraPetch.variable} ${shareTechMono.variable} font-sans antialiased bg-black-primary text-text-primary selection:bg-gold selection:text-black-primary`}
      >
        <GlobalPreloader />
        <CustomCursor />
        <WelcomePopup />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
