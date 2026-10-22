import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNav from "./components/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viagem SP · 28 out – 4 nov 2026",
  description:
    "Itinerário dia a dia da viagem a São Paulo (28/10 a 4/11/2026) com guia de museus, exposições, horários e gratuidades.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Menu header */}
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-white shadow-sm">
          <div className="relative mx-auto flex h-14 max-w-5xl items-center px-4 sm:px-6">
            <Link
              href="/"
              className="w-24 shrink-0 text-sm font-bold tracking-tight text-stone-900"
            >
              ✈️ Viagem SP
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2">
              <SiteNav />
            </div>
            <span className="ml-auto w-24 text-right text-xs text-stone-400">
              28/10–4/11
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
