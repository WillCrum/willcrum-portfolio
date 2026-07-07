import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { themeInitScript } from "@/lib/theme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://willcrum.com"),
  title: {
    default: "Will Crum — Product Designer",
    template: "%s — Will Crum",
  },
  description:
    "Will Crum is a product designer and strategist in Brooklyn, turning complex AI/ML capabilities into intuitive interfaces.",
  openGraph: {
    type: "website",
    siteName: "Will Crum",
    url: "/",
    title: "Will Crum — Product Designer",
    description:
      "Product designer and strategist in Brooklyn, turning complex AI/ML capabilities into intuitive interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Crum — Product Designer",
    description:
      "Product designer and strategist in Brooklyn, turning complex AI/ML capabilities into intuitive interfaces.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Header />
          <Container className="my-12 md:my-16">
            <Divider />
          </Container>
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
