import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: {
    default: "Sistema de Gestión de Clientes",
    template: "%s | Sistema de Gestión de Clientes",
  },
  description:
    "Gestione sus clientes de manera eficiente y sencilla con Strapi.",
  keywords: ["Gestión", "Clientes", "CRM", "Strapi", "Next.js"],
  authors: [{ name: "CJZN" }],
  creator: "CJZN",
  publisher: "CJZN",
  openGraph: {
    title: "Sistema de Gestión de Clientes",
    description:
      "Gestione sus clientes de manera eficiente y sencilla con Strapi.",
    url: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
    siteName: "Sistema de Gestión de Clientes",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Gestión de Clientes",
    description:
      "Gestione sus clientes de manera eficiente y sencilla con Strapi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sistema de Gestión de Clientes",
              url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
              logo: "https://your-logo-url.com/logo.png",
              sameAs: [
                "https://facebook.com/your-profile",
                "https://twitter.com/your-profile",
                "https://instagram.com/your-profile",
              ],
            }),
          }}
        />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
