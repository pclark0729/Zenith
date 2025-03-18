import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TestEmail from "@/components/common/TestEmail";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenith Newsletter",
  description: "Weekly insights for your personal development journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <TestEmail />
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
