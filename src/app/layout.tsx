import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import JarvisIntro from "@/components/ui/JarvisIntro";
import CursorGlow from "@/components/ui/CursorGlow";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Suyash — Portfolio",
  description: "Full-Stack Developer & Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <JarvisIntro />
          <CursorGlow />
          <Navbar />
          <main>
            <PageWrapper>{children}</PageWrapper>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
