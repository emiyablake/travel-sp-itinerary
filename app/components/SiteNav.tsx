"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Itinerário" },
  { href: "/guia", label: "Guia de Museus" },
];

export default function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1.5">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${
              active
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-transparent text-stone-600 hover:border-stone-300 hover:text-stone-900"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
