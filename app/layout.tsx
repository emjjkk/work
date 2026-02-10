import type { Metadata } from "next";
import { Inter, Stack_Sans_Text, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";

const geistSans = Stack_Sans_Text({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "work.emjjkk.tech",
  description: "Custom dev services, including web development, stream overlays, and Discord/Telegram bots. Fast, clean, and tailored to your needs.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.variable} antialiased`}>
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="1b254fc9-b555-4dc5-8d1f-6bb940a7dee5"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
