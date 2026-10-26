"use client";

import { useEffect, useState } from "react";

/** Switch claro/escuro: grava a preferência e alterna a classe .dark no <html>. */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // sincroniza com o tema já aplicado pelo script inline no layout
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* armazenamento indisponível */
    }
  };

  return (
    <button
      onClick={toggle}
      title={dark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      aria-label={dark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-sm transition-colors hover:border-stone-500 dark:border-stone-600 dark:bg-stone-800"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
