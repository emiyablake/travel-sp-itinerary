"use client";

import { useEffect, useState } from "react";
import { days, foodIdeas } from "./itinerario-data";

const STORAGE_KEY = "itinerario-tags-v1";
const LOCS_KEY = "itinerario-locs-v1";

/** Chave estável de um evento: dia + período + texto. */
const itemKey = (dayN: number, period: string, text: string) =>
  `${dayN}|${period}|${text}`;

/** Link de busca aberta no Google Maps. */
const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export default function Itinerario() {
  const [selected, setSelected] = useState(0);
  const [tags, setTags] = useState<Record<string, string[]>>({});
  const [adding, setAdding] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [locs, setLocs] = useState<Record<string, string | null>>({});
  const [addingLoc, setAddingLoc] = useState<string | null>(null);
  const [draftLoc, setDraftLoc] = useState("");
  const day = days[selected];

  // Carrega amigos e locais salvos no navegador (localStorage)
  useEffect(() => {
    try {
      const rawTags = localStorage.getItem(STORAGE_KEY);
      if (rawTags) setTags(JSON.parse(rawTags));
      const rawLocs = localStorage.getItem(LOCS_KEY);
      if (rawLocs) setLocs(JSON.parse(rawLocs));
    } catch {
      /* ignora dados corrompidos */
    }
  }, []);

  const tagsOf = (key: string, base?: string[]) => tags[key] ?? base ?? [];

  const saveTags = (key: string, list: string[]) => {
    const next = { ...tags, [key]: list };
    setTags(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addTag = (key: string, base?: string[]) => {
    const t = draft.trim();
    if (t && !tagsOf(key, base).includes(t)) {
      saveTags(key, [...tagsOf(key, base), t]);
    }
    setDraft("");
    setAdding(null);
  };

  const removeTag = (key: string, tag: string, base?: string[]) => {
    saveTags(
      key,
      tagsOf(key, base).filter((t) => t !== tag)
    );
  };

  /** Local do evento: override salvo, ou o loc pré-definido no data. null = removido. */
  const locOf = (key: string, base?: string) =>
    locs[key] !== undefined ? locs[key] : (base ?? null);

  const saveLoc = (key: string, value: string | null) => {
    const next = { ...locs, [key]: value };
    setLocs(next);
    localStorage.setItem(LOCS_KEY, JSON.stringify(next));
  };

  const addLoc = (key: string, base?: string) => {
    const t = draftLoc.trim();
    if (t) saveLoc(key, t);
    setDraftLoc("");
    setAddingLoc(null);
  };

  const removeLoc = (key: string) => saveLoc(key, null);

  return (
    <div className="min-h-full bg-[#faf9f7] text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-6 pt-6 sm:px-6">
          <h1 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Itinerário SP–Floripa
          </h1>
          <p className="mt-1 text-center text-sm text-stone-600">
            28 out – 4 nov 2026 · 8 dias · toque nos dias abaixo
          </p>
        </div>
      </header>

      {/* Abas por dia */}
      <nav className="sticky top-14 z-10 border-b border-stone-200 bg-[#faf9f7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl justify-center gap-1 overflow-x-auto px-3 py-2 sm:px-4">
          {days.map((d, i) => (
            <button
              key={d.n}
              onClick={() => setSelected(i)}
              className={`flex shrink-0 flex-col items-center rounded-xl border px-3 py-1.5 text-xs transition-colors ${
                i === selected
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
              }`}
            >
              <span className="font-bold">Dia {d.n}</span>
              <span className={i === selected ? "text-stone-300" : "text-stone-500"}>
                {d.date.split(" ")[0]} {d.date.split(" ")[1]}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-4 sm:px-6">
        {/* Cabeçalho do dia */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Dia {day.n} · {day.date}
          </p>
          <h2 className="mt-1 text-xl font-bold">{day.weekday}</h2>
          <p className="mt-0.5 text-sm text-stone-600">📍 {day.region}</p>
        </div>

        {/* Blocos do dia */}
        <div className="mt-5 space-y-6">
          {day.blocks.map((b) => (
            <section key={b.period}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                {b.period}
              </h3>
              <ul className="mt-2 space-y-2">
                {b.items
                  .filter((it) => it.text || it.link)
                  .map((it, i) => {
                    const key = itemKey(day.n, b.period, it.text);
                    const itemTags = tagsOf(key, it.tags);
                    const itemLoc = locOf(key, it.loc);
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-sm"
                      >
                        {it.time && (
                          <span className="flex shrink-0 flex-col gap-1 self-start">
                            {[it.time].flat().map((t) => (
                              <span
                                key={t}
                                className="rounded-lg bg-stone-900 px-2 py-1 text-center text-xs font-semibold text-white"
                              >
                                {t}
                              </span>
                            ))}
                          </span>
                        )}
                        <div className="min-w-0 flex-1 text-sm">
                          <p className="font-medium">
                            {it.text}
                            {it.friends && (
                              <span
                                className="ml-2 inline-block rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 text-xs font-normal text-pink-700"
                                title="Dá pra chamar amigos"
                              >
                                chamar amigos
                              </span>
                            )}
                            {itemTags.map((t) => (
                              <span
                                key={t}
                                className="ml-2 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-normal text-emerald-800"
                              >
                                {t}
                                <button
                                  onClick={() => removeTag(key, t, it.tags)}
                                  title={`Remover amigo ${t}`}
                                  className="text-emerald-400 hover:text-emerald-700"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {adding === key ? (
                              <span className="ml-2 inline-flex items-center gap-1 align-middle">
                                <input
                                  autoFocus
                                  value={draft}
                                  onChange={(e) => setDraft(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") addTag(key, it.tags);
                                    if (e.key === "Escape") {
                                      setDraft("");
                                      setAdding(null);
                                    }
                                  }}
                                  placeholder="Nome do amigo…"
                                  className="w-28 rounded-full border border-stone-300 px-2 py-0.5 text-xs font-normal outline-none focus:border-stone-500"
                                />
                                <button
                                  onClick={() => addTag(key, it.tags)}
                                  className="rounded-full bg-stone-900 px-2 py-0.5 text-xs font-semibold text-white"
                                >
                                  ok
                                </button>
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  setAdding(key);
                                  setDraft("");
                                }}
                                title="Adicionar amigo"
                                className="ml-2 inline-block rounded-full border border-dashed border-stone-300 px-2 py-0.5 align-middle text-xs font-normal text-stone-500 hover:border-stone-500 hover:text-stone-800"
                              >
                                + amigo
                              </button>
                            )}
                            {itemLoc && (
                              <a
                                href={mapsUrl(itemLoc)}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Abrir "${itemLoc}" no Google Maps`}
                                className="ml-2 inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-normal text-rose-700 hover:border-rose-400"
                              >
                                📍 {itemLoc.replace(/ São Paulo$/, "")}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeLoc(key);
                                  }}
                                  title="Remover local"
                                  className="text-rose-400 hover:text-rose-700"
                                >
                                  ×
                                </button>
                              </a>
                            )}
                            {addingLoc === key ? (
                              <span className="ml-2 inline-flex items-center gap-1 align-middle">
                                <input
                                  autoFocus
                                  value={draftLoc}
                                  onChange={(e) => setDraftLoc(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") addLoc(key, it.loc);
                                    if (e.key === "Escape") {
                                      setDraftLoc("");
                                      setAddingLoc(null);
                                    }
                                  }}
                                  placeholder="Lugar…"
                                  className="w-28 rounded-full border border-stone-300 px-2 py-0.5 text-xs font-normal outline-none focus:border-stone-500"
                                />
                                <button
                                  onClick={() => addLoc(key, it.loc)}
                                  className="rounded-full bg-stone-900 px-2 py-0.5 text-xs font-semibold text-white"
                                >
                                  ok
                                </button>
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  setAddingLoc(key);
                                  setDraftLoc("");
                                }}
                                title="Adicionar local (abre no Google Maps)"
                                className="ml-2 inline-block rounded-full border border-dashed border-stone-300 px-2 py-0.5 align-middle text-xs font-normal text-stone-500 hover:border-stone-500 hover:text-stone-800"
                              >
                                + loc
                              </button>
                            )}
                          </p>
                          {it.note && (
                            <p className="mt-1 text-stone-600">{it.note}</p>
                          )}
                          {it.link && (
                            <a
                              href={it.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-block font-medium text-sky-700 underline underline-offset-2"
                            >
                              {it.link.label} ↗
                            </a>
                          )}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
        </div>

        {/* Navegação entre dias */}
        <div className="mt-8 flex items-center justify-between text-sm">
          {selected > 0 ? (
            <button
              onClick={() => setSelected(selected - 1)}
              className="rounded-full border border-stone-300 bg-white px-4 py-1.5 font-medium hover:border-stone-500"
            >
              ← Dia {days[selected - 1].n}
            </button>
          ) : (
            <span />
          )}
          {selected < days.length - 1 ? (
            <button
              onClick={() => setSelected(selected + 1)}
              className="rounded-full border border-stone-300 bg-white px-4 py-1.5 font-medium hover:border-stone-500"
            >
              Dia {days[selected + 1].n} →
            </button>
          ) : (
            <span />
          )}
        </div>

        {/* Card de ideias (refeições) */}
        <section className="mt-10">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Restaurantes e afinz
            </p>
            <h2 className="mt-1 text-xl font-bold">Ideias de lugares para fazer uma boquinha</h2>
            <p className="mt-0.5 text-sm text-stone-600">
              Separado por bairro — toque pra abrir.
            </p>

            <div className="mt-4 space-y-2">
              {foodIdeas.map((f, i) => (
                <details
                  key={f.bairro}
                  className="group rounded-xl border border-stone-200 bg-[#faf9f7] px-3 py-2.5"
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                    {f.bairro}
                    <span className="text-stone-400 transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  {f.note && (
                    <p className="mt-1 text-xs italic text-stone-500">{f.note}</p>
                  )}
                  {f.places.length > 0 && (
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {f.places.map((p) => (
                        <li key={p.name}>
                          <a
                            href={mapsUrl(p.query)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-sky-700 underline underline-offset-2"
                          >
                            {p.name} ↗
                          </a>
                          <span className="text-stone-600"> — {p.desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}
            </div>

            <p className="mt-4 text-xs text-stone-500">
              Vindas da tua lista salva no Maps — confirme endereço, nota e funcionamento antes.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
