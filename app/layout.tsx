import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/sonner"
import NextAuthProvider from "./next-auth-provider";

const myFont = localFont({
  src: '../public/fonts/Afacad-Regular.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Gemini AI",
  description: "A site to help you build your next AI project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className}>
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
