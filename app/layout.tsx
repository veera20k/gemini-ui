import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/sonner"
import NextAuthProvider from "./next-auth-provider";
import ChatLayout from "@/components/chat/chat-layout";
import { cookies } from "next/headers";

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
const layout = cookies().get("react-resizable-panels:layout");
let defaultLayout;
if (layout) {
  defaultLayout = JSON.parse(layout.value);
}
  return (
    <html lang="en" className={myFont.className}>
      <body>
        <NextAuthProvider>
          <ChatLayout defaultLayout={defaultLayout}>
            {children}
          </ChatLayout>
        </NextAuthProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
