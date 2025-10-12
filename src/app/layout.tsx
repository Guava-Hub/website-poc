import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";

const font = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Visionary Commerce",
  description:
    "Visionary Commerce is a modern e-commerce experience built with Next.js 14, Tailwind CSS, and Stripe checkout integration."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.variable} font-sans`}> 
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 bg-background">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
