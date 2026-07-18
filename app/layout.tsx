import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { DEFAULT_THEME, THEME_ICONS, themeInitScript } from "@/lib/theme";
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
  // Matches DEFAULT_THEME — the inline script in <head> (themeInitScript)
  // corrects this to the stored preference's icon before paint if it
  // differs, and ThemeProvider's setTheme keeps it in sync on later toggles.
  icons: {
    icon: THEME_ICONS[DEFAULT_THEME],
  },
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
          {/* flex flex-col (not just flex-1) so a page that itself wants
              to fill this space can opt in with its own flex-1 — a plain
              percentage height (h-full) on a page's root element doesn't
              reliably resolve here, since main's own height only comes
              from flex-grow against body's min-h-full, not a hard height. */}
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
