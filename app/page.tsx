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

/**
 * Interpreta um valor de loc: "Nome" abre a busca pelo nome no Maps;
 * "Nome@lat,lon" (vindo de uma sugestão) abre o pino exato do lugar.
 */
const parseLoc = (value: string): { label: string; url: string } => {
  const at = value.lastIndexOf("@");
  if (at > 0) {
    return {
      label: value.slice(0, at),
      url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        value.slice(at + 1)
      )}`,
    };
  }
  return { label: value.replace(/ São Paulo$/, ""), url: mapsUrl(value) };
};

interface LocSuggestion {
  label: string;
  value: string;
}

/**
 * Input de local com sugestões enquanto digita (OpenStreetMap/Nominatim,
 * limitado a São Paulo). Ao escolher uma sugestão, o chip final abre o
 * pino exato no Google Maps.
 */
function LocPicker({ onPick }: { onPick: (value: string) => void }) {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sugs, setSugs] = useState<LocSuggestion[]>([]);
  const [show, setShow] = useState(false);

  // debounce da digitação (Nominatim pede no máx. 1 req/s)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  // busca sugestões dentro da caixa de São Paulo
  useEffect(() => {
    if (debounced.length < 3) {
      setSugs([]);
      return;
    }
    let alive = true;
    const url =
      "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5" +
      "&countrycodes=br&accept-language=pt-BR&bounded=1" +
      "&viewbox=-46.95,-23.35,-46.25,-23.85" +
      `&q=${encodeURIComponent(debounced)}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : []))
      .then(
        (data: { display_name?: string; lat?: string; lon?: string }[]) => {
          if (!alive || !Array.isArray(data)) return;
          setSugs(
            data
              .filter((d) => d.display_name && d.lat && d.lon)
              .map((d) => {
                const label = d.display_name!.split(",")[0].trim();
                return { label, value: `${label}@${d.lat},${d.lon}` };
              })
          );
          setShow(true);
        }
      )
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [debounced]);

  const confirm = (value?: string) => onPick((value ?? q).trim());

  return (
    <div className="relative ml-2 inline-flex items-center gap-1 align-middle">
      <input
        autoFocus
        value={q}
        title="Digite para ver sugestões de lugares em São Paulo"
        onChange={(e) => {
          setQ(e.target.value);
          setShow(true);
        }}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "Enter") confirm();
          if (e.key === "Escape") confirm("");
        }}
        placeholder="Lugar…"
        className="w-32 rounded-full border border-stone-300 px-2 py-0.5 text-xs font-normal outline-none focus:border-stone-500 dark:border-stone-600 dark:bg-stone-800"
      />
      <button
        onClick={() => confirm()}
        className="rounded-full bg-stone-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-stone-100 dark:text-stone-900"
      >
        ok
      </button>
      {show && sugs.length > 0 && (
        <ul className="absolute left-0 top-full z-20 mt-1 max-h-56 w-64 max-w-[70vw] overflow-auto rounded-xl border border-stone-200 bg-white py-1 shadow-lg dark:border-stone-700 dark:bg-stone-800">
          {sugs.map((s, idx) => (
            <li key={`${s.value}-${idx}`}>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  confirm(s.value);
                }}
                className="block w-full px-2.5 py-1.5 text-left text-xs font-normal text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-700"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Itinerario() {
  const [selected, setSelected] = useState(0);
  const [tags, setTags] = useState<Record<string, string[]>>({});
  const [adding, setAdding] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [locs, setLocs] = useState<Record<string, string | null>>({});
  const [addingLoc, setAddingLoc] = useState<string | null>(null);
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

  const addLoc = (key: string, value: string) => {
    if (value) saveLoc(key, value);
    setAddingLoc(null);
  };

  const removeLoc = (key: string) => saveLoc(key, null);

  return (
    <div className="min-h-full bg-[#faf9f7] text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-3xl px-4 pb-6 pt-6 sm:px-6">
          <h1 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Itinerário SP–Floripa
          </h1>
          <p className="mt-1 text-center text-sm text-stone-600 dark:text-stone-400">
            28 out – 4 nov 2026 · 8 dias · toque nos dias abaixo
          </p>
        </div>
      </header>

      {/* Abas por dia */}
      <nav className="sticky top-14 z-10 border-b border-stone-200 bg-[#faf9f7]/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
        <div className="mx-auto flex max-w-3xl justify-center gap-1 overflow-x-auto px-3 py-2 sm:px-4">
          {days.map((d, i) => (
            <button
              key={d.n}
              onClick={() => setSelected(i)}
              className={`flex shrink-0 flex-col items-center rounded-xl border px-3 py-1.5 text-xs transition-colors ${
                i === selected
                  ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-400"
              }`}
            >
              <span className="font-bold">Dia {d.n}</span>
              <span className={i === selected ? "text-stone-300 dark:text-stone-500" : "text-stone-500 dark:text-stone-500"}>
                {d.date.split(" ")[0]} {d.date.split(" ")[1]}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-4 sm:px-6">
        {/* Cabeçalho do dia */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Dia {day.n} · {day.date}
          </p>
          <h2 className="mt-1 text-xl font-bold">{day.weekday}</h2>
          <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">📍 {day.region}</p>
        </div>

        {/* Blocos do dia */}
        <div className="mt-5 space-y-6">
          {day.blocks.map((b) => (
            <section key={b.period}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
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
                        className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-sm dark:border-stone-800 dark:bg-stone-900"
                      >
                        {it.time && (
                          <span className="flex shrink-0 flex-col gap-1 self-start">
                            {[it.time].flat().map((t) => (
                              <span
                                key={t}
                                className="rounded-lg bg-stone-900 px-2 py-1 text-center text-xs font-semibold text-white dark:bg-stone-100 dark:text-stone-900"
                              >
                                {t}
                              </span>
                            ))}
                          </span>
                        )}
                        <div className="min-w-0 flex-1 text-sm">
                          <div className="font-medium">
                            {it.text}
                            {it.friends && (
                              <span
                                className="ml-2 inline-block rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 text-xs font-normal text-pink-700 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-300"
                                title="Dá pra chamar amigos"
                              >
                                chamar amigos
                              </span>
                            )}
                            {itemTags.map((t) => (
                              <span
                                key={t}
                                className="ml-2 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-normal text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              >
                                {t}
                                <button
                                  onClick={() => removeTag(key, t, it.tags)}
                                  title={`Remover amigo ${t}`}
                                  className="text-emerald-400 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-300"
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
                                  className="w-28 rounded-full border border-stone-300 px-2 py-0.5 text-xs font-normal outline-none focus:border-stone-500 dark:border-stone-600 dark:bg-stone-800"
                                />
                                <button
                                  onClick={() => addTag(key, it.tags)}
                                  className="rounded-full bg-stone-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-stone-100 dark:text-stone-900"
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
                                className="ml-2 inline-block rounded-full border border-dashed border-stone-300 px-2 py-0.5 align-middle text-xs font-normal text-stone-500 hover:border-stone-500 hover:text-stone-800 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-400 dark:hover:text-stone-200"
                              >
                                + amigo
                              </button>
                            )}
                            {itemLoc
                              ? (() => {
                                  const loc = parseLoc(itemLoc);
                                  return (
                                    <a
                                      href={loc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={`Abrir "${loc.label}" no Google Maps`}
                                      className="ml-2 inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-normal text-rose-700 hover:border-rose-400 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                    >
                                      📍 {loc.label}
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          removeLoc(key);
                                        }}
                                        title="Remover local"
                                        className="text-rose-400 hover:text-rose-700 dark:text-rose-500 dark:hover:text-rose-300"
                                      >
                                        ×
                                      </button>
                                    </a>
                                  );
                                })()
                              : addingLoc === key ? (
                                <LocPicker onPick={(v) => addLoc(key, v)} />
                              ) : (
                                <button
                                  onClick={() => setAddingLoc(key)}
                                  title="Adicionar local (abre no Google Maps)"
                                  className="ml-2 inline-block rounded-full border border-dashed border-stone-300 px-2 py-0.5 align-middle text-xs font-normal text-stone-500 hover:border-stone-500 hover:text-stone-800 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-400 dark:hover:text-stone-200"
                                >
                                  + loc
                                </button>
                              )}
                          </div>
                          {it.note && (
                            <p className="mt-1 text-stone-600 dark:text-stone-400">{it.note}</p>
                          )}
                          {it.link && (
                            <a
                              href={it.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-block font-medium text-sky-700 underline underline-offset-2 dark:text-sky-400"
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
              className="rounded-full border border-stone-300 bg-white px-4 py-1.5 font-medium hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-400"
            >
              ← Dia {days[selected - 1].n}
            </button>
          ) : (
            <span />
          )}
          {selected < days.length - 1 ? (
            <button
              onClick={() => setSelected(selected + 1)}
              className="rounded-full border border-stone-300 bg-white px-4 py-1.5 font-medium hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-400"
            >
              Dia {days[selected + 1].n} →
            </button>
          ) : (
            <span />
          )}
        </div>

        {/* Card de ideias (refeições) */}
        <section className="mt-10">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Restaurantes e afinz
            </p>
            <h2 className="mt-1 text-xl font-bold">Lugares para fazer uma boquinha, comer uns docinhos</h2>
            <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
              Separado por bairro — toque pra abrir.
            </p>

            <div className="mt-4 space-y-2">
              {foodIdeas.map((f, i) => (
                <details
                  key={f.bairro}
                  className="group rounded-xl border border-stone-200 bg-[#faf9f7] px-3 py-2.5 dark:border-stone-700 dark:bg-stone-800"
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                    {f.bairro}
                    <span className="text-stone-400 transition-transform group-open:rotate-180 dark:text-stone-500">
                      ▾
                    </span>
                  </summary>
                  {f.note && (
                    <p className="mt-1 text-xs italic text-stone-500 dark:text-stone-400">{f.note}</p>
                  )}
                  {f.places.length > 0 && (
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {f.places.map((p) => (
                        <li key={p.name}>
                          <a
                            href={mapsUrl(p.query)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-sky-700 underline underline-offset-2 dark:text-sky-400"
                          >
                            {p.name} ↗
                          </a>
                          <span className="text-stone-600 dark:text-stone-400"> — {p.desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}
            </div>

            <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
              lembre de confirmar endereço e horario de funcionamento antes.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
