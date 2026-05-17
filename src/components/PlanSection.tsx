import { useState } from "react";
import { type Subject, type Chapter } from "../data/subjects";

type Props = {
  subject: Subject;
  completed: Record<string, boolean>;
  toggle: (id: string) => void;
};

export default function PlanSection({ subject, completed, toggle }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  return (
    <section id="plan" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag={`📅 Plan ${subject.name}`}
          title={<>Ton parcours en <span className="text-gradient">10 jours</span></>}
          sub={`Révision intelligente de ${subject.nameAr} • Chapitres officiels du programme marocain`}
        />

        <div className="space-y-4 mt-12">
          {subject.plan.map((day) => {
            const dayChapters = day.chapterIds
              .map(id => subject.chapters.find((c) => c.id === id))
              .filter((c): c is Chapter => c !== undefined);
            const dayCompletedCount = dayChapters.filter(c => completed[c.id]).length;
            const dayPct = Math.round((dayCompletedCount / dayChapters.length) * 100);
            const isOpen = openDay === day.day;

            return (
              <div
                key={day.day}
                className={`border-glow rounded-2xl overflow-hidden transition-all ${isOpen ? "ring-1 ring-violet-500/40" : ""}`}
              >
                <button
                  onClick={() => setOpenDay(isOpen ? null : day.day)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition"
                >
                  <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${day.color} flex items-center justify-center shadow-lg`}>
                    <div className="text-center">
                      <div className="text-[10px] text-white/80 uppercase">Jour</div>
                      <div className="text-2xl font-black text-white leading-none">{day.day}</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg text-white truncate">{day.theme}</div>
                    <div className="text-xs text-white/50 mt-0.5">{day.focus}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 max-w-[200px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${day.color} transition-all`}
                          style={{ width: `${dayPct}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/60">{dayCompletedCount}/{dayChapters.length}</span>
                    </div>
                  </div>

                  <div className={`text-2xl text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}>⌄</div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-4">
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
                      <div className="text-xs uppercase text-violet-300 font-bold mb-1">💡 Tip du jour</div>
                      <div className="text-sm text-white/80">{day.tip}</div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {dayChapters.map((c) => (
                        <ChapterCard
                          key={c.id}
                          chapter={c}
                          done={!!completed[c.id]}
                          onToggle={() => toggle(c.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChapterCard({ chapter, done, onToggle }: { chapter: Chapter; done: boolean; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`border rounded-xl p-4 transition ${done ? "border-emerald-500/40 bg-emerald-500/5" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={`mt-0.5 w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center transition ${
            done
              ? "bg-emerald-500 border-emerald-500"
              : "border-white/20 hover:border-violet-400"
          }`}
        >
          {done && (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className={`font-semibold ${done ? "text-white/60 line-through" : "text-white"}`}>
            {chapter.title}
          </div>
          <div className="text-xs text-white/40 mt-0.5">{chapter.titleAr}</div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>📖 ~{chapter.estimatedHours}h</Badge>
            <Badge color={chapter.difficulty === 3 ? "rose" : chapter.difficulty === 2 ? "amber" : "emerald"}>
              {chapter.difficulty === 3 ? "🔥 Difficile" : chapter.difficulty === 2 ? "⚡ Moyen" : "🌱 Facile"}
            </Badge>
            <Badge>S{chapter.semester}</Badge>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <a
              href={chapter.pdfUrl}
              target="_blank"
              rel="noopener"
              className="text-xs px-3 py-1.5 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 text-violet-300 transition"
            >
              📄 PDF
            </a>
            <a
              href={chapter.docUrl}
              target="_blank"
              rel="noopener"
              className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 transition"
            >
              📚 Doc
            </a>
            <a
              href={chapter.coursUrl}
              target="_blank"
              rel="noopener"
              className="text-xs px-3 py-1.5 rounded-lg bg-fuchsia-500/15 hover:bg-fuchsia-500/25 text-fuchsia-300 transition"
            >
              🎬 Cours vidéo
            </a>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition"
            >
              {expanded ? "✕ Masquer" : "👁 Résumé"}
            </button>
          </div>

          {expanded && (
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <div className="text-xs uppercase text-violet-300 font-bold mb-1">🎯 Points clés</div>
                <ul className="space-y-1 text-white/70">
                  {chapter.keyPoints.map((p, i) => (
                    <li key={i} className="flex gap-2"><span className="text-violet-400">▸</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase text-fuchsia-300 font-bold mb-1">📐 Formules à retenir</div>
                <ul className="space-y-1">
                  {chapter.formulas.map((f, i) => (
                    <li key={i} className="font-mono text-xs bg-black/30 px-3 py-1.5 rounded-md text-white/80">{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Badge({ children, color = "violet" }: { children: React.ReactNode; color?: "violet" | "rose" | "amber" | "emerald" }) {
  const colors = {
    violet: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/20",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  };
  return (
    <span className={`text-[10px] px-2 py-1 rounded-md border ${colors[color]}`}>{children}</span>
  );
}

export function SectionHeader({ tag, title, sub }: { tag: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-block text-xs uppercase tracking-[0.2em] text-violet-300 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/5 mb-4">
        {tag}
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{title}</h2>
      <p className="text-white/60">{sub}</p>
    </div>
  );
}
