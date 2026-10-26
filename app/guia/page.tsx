"use client";

import { useMemo, useState } from "react";
import {
  venues,
  otherSpots,
  statusLabel,
  statusColor,
  type Venue,
  type Status,
} from "./data";

type Filter = "all" | "free" | "paid" | "transition" | "lastDays" | "nearby";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "free", label: "Grátis" },
  { id: "paid", label: "Pago" },
  { id: "transition", label: "Em transição" },
  { id: "lastDays", label: "Últimos dias ⚡" },
  { id: "nearby", label: "Próximos 📍" },
];

/** Região agregada de um museu: primeira parte do campo "área" (antes do "·"). */
const areaGroup = (v: Venue) => v.area.split("·")[0].trim();

function matches(v: Venue, f: Filter): boolean {
  switch (f) {
    case "all":
      return true;
    case "free":
      return v.free;
    case "paid":
      return !v.free;
    case "transition":
      return v.status === "transition";
    case "lastDays":
      return v.exhibitions.some((e) => e.lastDays);
    case "nearby":
      return true;
  }
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<string | null>(null);

  const areaGroups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const v of venues) {
      const g = areaGroup(v);
      counts.set(g, (counts.get(g) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return venues.filter((v) => {
      if (!matches(v, filter)) return false;
      if (filter === "nearby" && area && areaGroup(v) !== area) return false;
      if (!q) return true;
      const haystack = [v.name, v.area, v.tip ?? "", ...v.tags, ...v.exhibitions.map((e) => e.title)].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, area, query]);

  const freeTips = [
    { day: "Qua 28/10", tip: "Museu do Ipiranga — entrada gratuita toda quarta-feira." },
    { day: "Dom 1/11", tip: "Museu da Língua Portuguesa — grátis aos domingos." },
    { day: "Ter 3/11", tip: "Museu da Língua Portuguesa — grátis às terças." },
    { day: "Sempre", tip: "MAC USP, CCBB, IMS, Museu das Favelas, Casa do Grito, Monumento à Independência, Centro Cultural Coreano, Casa Bradesco — gratuitos o ano todo." },
  ];

  return (
    <div className="min-h-full bg-[#faf9f7] text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-5xl px-4 pb-6 pt-8 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Viagem · São Paulo
          </p>
          <h1 className="mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Guia de Museus de SP
          </h1>
          <p className="mt-2 text-center text-lg text-stone-600 dark:text-stone-400">
            Exposições em cartaz de <strong>28 out a 3 nov 2026</strong> — levantamento da
            lista &ldquo;Museus SP&rdquo; do Google Maps (26 lugares).
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        {/* Filtros */}
        <div className="sticky top-14 z-10 -mx-4 bg-[#faf9f7]/95 px-4 py-4 backdrop-blur dark:bg-stone-950/95 sm:-mx-6 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id);
                  if (f.id !== "nearby") setArea(null);
                }}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.id
                    ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-400"
                }`}
              >
                {f.label}
              </button>
            ))}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar museu, área, exposição…"
              className="ml-auto w-full rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm outline-none placeholder:text-stone-400 focus:border-stone-500 dark:border-stone-600 dark:bg-stone-900 sm:w-64"
            />
          </div>
          {filter === "nearby" && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Região:</span>
              <button
                onClick={() => setArea(null)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  area === null
                    ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-400"
                }`}
              >
                Todas ({venues.length})
              </button>
              {areaGroups.map(([g, n]) => (
                <button
                  key={g}
                  onClick={() => setArea(g)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    area === g
                      ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                      : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-400"
                  }`}
                >
                  {g} ({n})
                </button>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
            {list.length} {list.length === 1 ? "lugar" : "lugares"} ·{" "}
            {venues.filter((v) => v.status === "confirmed").length} com exposição confirmada
            {filter === "nearby" && area ? ` · região: ${area}` : ""}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((v) => (
            <article
              key={v.id}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold leading-snug">{v.name}</h2>
                  <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">{v.area}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor[v.status as Status]}`}
                >
                  {statusLabel[v.status as Status]}
                </span>
              </div>

              <ul className="mt-3 space-y-2">
                {v.exhibitions.map((e) => (
                  <li key={e.title} className="text-sm">
                    <p className="font-medium">
                      {e.title}
                      {e.until && (
                        <span className="ml-1 font-normal text-stone-500 dark:text-stone-400">· até {e.until}</span>
                      )}
                    </p>
                    {e.note && <p className="text-stone-600 dark:text-stone-400">{e.note}</p>}
                  </li>
                ))}
              </ul>

              <dl className="mt-3 space-y-1 border-t border-stone-100 pt-3 text-sm text-stone-600 dark:border-stone-800 dark:text-stone-400">
                <div className="flex gap-2">
                  <dt className="shrink-0 font-medium text-stone-500 dark:text-stone-400">Horário</dt>
                  <dd>{v.hours}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 font-medium text-stone-500 dark:text-stone-400">Ingresso</dt>
                  <dd>{v.price}</dd>
                </div>
                {v.tip && <p className="pt-1 text-stone-700 dark:text-stone-300">💡 {v.tip}</p>}
              </dl>

              <a
                href={v.mapQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-full border border-stone-900 px-4 py-1.5 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-900 hover:text-white dark:border-stone-300 dark:text-stone-200 dark:hover:bg-stone-100 dark:hover:text-stone-900"
              >
                Rota no Google Maps ↗
              </a>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <p className="py-12 text-center text-stone-500 dark:text-stone-400">
            Nenhum resultado para esse filtro/busca.
          </p>
        )}

        {/* Dicas de gratuidade */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Dicas de gratuidade na semana</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {freeTips.map((t) => (
              <li
                key={t.day}
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm dark:border-emerald-800 dark:bg-emerald-950"
              >
                <p className="font-semibold text-emerald-900 dark:text-emerald-300">{t.day}</p>
                <p className="mt-0.5 text-emerald-800 dark:text-emerald-400">{t.tip}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Sem exposição fixa */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Na lista, mas sem exposição fixa</h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Estes lugares da lista &ldquo;Museus SP&rdquo; não têm exposição no sentido tradicional —
            vale conferir a agenda de espetáculos/eventos:
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {otherSpots.map((s) => (
              <li
                key={s}
                className="rounded-xl border border-stone-200 bg-white p-3 text-sm text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-stone-500 dark:text-stone-400 sm:px-6">
          Levantamento feito em 20/10/2026 a partir de fontes públicas (sites e redes dos
          museus). Programação pode mudar — confirme horários e exposições antes de sair de
          casa.
        </div>
      </footer>
    </div>
  );
}
