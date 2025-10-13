import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { SiteLayout } from "@/components/layout/site-layout";
import { RouteProgressProvider } from "@/components/layout/route-progress-provider";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";

const font = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Guava Hub",
  description:
    "Guava Hub is a modern e-commerce experience built with Next.js 14, Tailwind CSS, and Stripe checkout integration."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.variable} font-sans`}> 
        <RouteProgressProvider>
          <AuthProvider>
            <CartProvider>
              <SiteLayout>{children}</SiteLayout>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </RouteProgressProvider>
      </body>
    </html>
  );
}
