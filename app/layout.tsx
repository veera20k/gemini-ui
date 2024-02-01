import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
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
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      </body>
    </html>
  );
}
