import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Itinerário SP · 28/10–4/11/2026",
  description:
    "Itinerário dia a dia da viagem São Paulo — 8 dias, de 28 de outubro a 4 de novembro de 2026.",
};

export default function ItinerarioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
