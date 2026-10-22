import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guia de Museus de SP · 28/10–3/11/2026",
  description:
    "Exposições em cartaz em São Paulo de 28 de outubro a 3 de novembro de 2026 — horários, preços, gratuidades e rotas.",
};

export default function GuiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
