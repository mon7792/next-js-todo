import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { NavbarProvider } from "@/provider/navbar";
import RTLayout from "@/components/layout/root";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <NavbarProvider>
        <html lang="en">
          <body className={inter.className}>
            <RTLayout>{children}</RTLayout>
            <Toaster />
            {/* google analytics start */}
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-WX112PHK1W"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WX112PHK1W');
        `}
            </Script>
            {/* google analytics end */}
          </body>
        </html>
      </NavbarProvider>
    </ClerkProvider>
  );
}
