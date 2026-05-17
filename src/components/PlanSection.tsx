import { useState } from "react";
import { Chapter } from "../data/plan";
import { Subject } from "../data/subjects";

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
          sub={`Chaque jour aborde les points vitaux de ${subject.name}. Cliquez sur la carte d'un jour pour voir les conseils et résumés.`}
        />

        <div className="space-y-6 mt-12">
          {subject.plan.map((day) => {
            const dayChapters = day.chapterIds.map(id => subject.chapters.find(c => c.id === id)!).filter(Boolean);
            const dayCompletedCount = dayChapters.filter(c => completed[c.id]).length;
            const dayPct = dayChapters.length > 0 ? Math.round((dayCompletedCount / dayChapters.length) * 100) : 100;
            const isOpen = openDay === day.day;

            return (
              <div
                key={day.day}
                className={`border-glow rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? "ring-2 ring-violet-500/50 shadow-2xl bg-white/[0.02]" : "bg-white/[0.01]"}`}
              >
                <button
                  onClick={() => setOpenDay(isOpen ? null : day.day)}
                  className="w-full flex items-center gap-6 p-6 text-left hover:bg-white/[0.05] transition duration-300"
                >
                  <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${day.color || subject.color} flex items-center justify-center shadow-lg`}>
                    <div className="text-center">
                      <div className="text-[10px] text-white/80 uppercase font-bold tracking-wider">Jour</div>
                      <div className="text-3xl font-black text-white leading-none">{day.day}</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-xl text-white truncate">{day.theme}</h3>
                      <span className="text-xs text-white/40 hidden md:inline-block font-mono">({day.themeAr})</span>
                    </div>
                    <div className="text-sm text-white/60 mt-1">{day.focus}</div>

                    {dayChapters.length > 0 && (
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex-1 max-w-xs h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <div
                            className={`h-full bg-gradient-to-r ${day.color || subject.color} rounded-full transition-all duration-500`}
                            style={{ width: `${dayPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-white/70">{dayCompletedCount}/{dayChapters.length} terminés</span>
                      </div>
                    )}
                  </div>

                  <div className={`text-3xl font-bold text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-violet-400" : ""}`}>
                    ⌄
                  </div>
                </button>

                {isOpen && (
                  <div className="p-6 pt-2 border-t border-white/10 space-y-6 bg-black/20">
                    <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-2xl p-5 shadow-inner">
                      <div className="flex items-center gap-2 text-xs uppercase text-violet-300 font-black tracking-wider mb-2">
                        <span>💡 Tip du prof / d'examen</span>
                      </div>
                      <div className="text-base text-white/90 leading-relaxed font-medium">{day.tip}</div>
                    </div>

                    {dayChapters.length > 0 ? (
                      <div className="grid lg:grid-cols-2 gap-6">
                        {dayChapters.map((c) => (
                          <ChapterCard
                            key={c.id}
                            chapter={c}
                            done={!!completed[c.id]}
                            onToggle={() => toggle(c.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-white/50 italic text-sm">
                        Journée dédiée à la méthodologie et synthèse globale. Suivez les conseils ci-dessus !
                      </div>
                    )}
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
    <div className={`border rounded-2xl p-6 transition-all duration-300 ${
      done
        ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/5"
        : "border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/30"
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={onToggle}
          className={`mt-1 w-7 h-7 shrink-0 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
            done
              ? "bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-500/30 scale-110"
              : "border-white/30 hover:border-violet-400 hover:scale-105 bg-white/5"
          }`}
        >
          {done && (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className={`font-black text-lg leading-tight ${done ? "text-white/60 line-through" : "text-white"}`}>
                {chapter.title}
              </h4>
              <div className="text-xs font-semibold text-white/50 mt-1 font-mono">{chapter.titleAr}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge>📖 ~{chapter.estimatedHours}h</Badge>
            <Badge color={chapter.difficulty === 3 ? "rose" : chapter.difficulty === 2 ? "amber" : "emerald"}>
              {chapter.difficulty === 3 ? "🔥 Difficile" : chapter.difficulty === 2 ? "⚡ Moyen" : "🌱 Facile"}
            </Badge>
            {chapter.semester && <Badge>S{chapter.semester}</Badge>}
          </div>

          <div className="flex flex-wrap gap-2.5 mt-4 pt-3 border-t border-white/10">
            {chapter.pdfUrl && (
              <a
                href={chapter.pdfUrl}
                target="_blank"
                rel="noopener"
                className="text-xs px-3.5 py-2 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 font-bold transition flex items-center gap-1.5"
              >
                <span>📄 PDF</span>
              </a>
            )}
            {chapter.docUrl && (
              <a
                href={chapter.docUrl}
                target="_blank"
                rel="noopener"
                className="text-xs px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold transition flex items-center gap-1.5"
              >
                <span>📚 Doc</span>
              </a>
            )}
            {chapter.coursUrl && (
              <a
                href={chapter.coursUrl}
                target="_blank"
                rel="noopener"
                className="text-xs px-3.5 py-2 rounded-xl bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-300 font-bold transition flex items-center gap-1.5"
              >
                <span>🎬 Vidéo</span>
              </a>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition ml-auto flex items-center gap-1.5"
            >
              <span>{expanded ? "✕ Masquer" : "👁 Fiche Résumé"}</span>
            </button>
          </div>

          {expanded && (
            <div className="mt-5 space-y-4 pt-4 border-t border-white/10 animate-fade-in">
              {chapter.keyPoints && chapter.keyPoints.length > 0 && (
                <div>
                  <div className="text-xs uppercase text-violet-300 font-black tracking-wider mb-2">🎯 Points Clés</div>
                  <ul className="space-y-1.5 text-sm text-white/80">
                    {chapter.keyPoints.map((p, i) => (
                      <li key={i} className="flex gap-2.5 leading-snug">
                        <span className="text-violet-400 font-bold">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {chapter.formulas && chapter.formulas.length > 0 && (
                <div>
                  <div className="text-xs uppercase text-fuchsia-300 font-black tracking-wider mb-2">📐 Formules / Règles à retenir</div>
                  <div className="grid gap-1.5">
                    {chapter.formulas.map((f, i) => (
                      <div key={i} className="font-mono text-xs bg-black/40 border border-white/10 px-3.5 py-2 rounded-xl text-emerald-300 font-bold">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Badge({ children, color = "violet" }: { children: React.ReactNode; color?: "violet" | "rose" | "amber" | "emerald" }) {
  const colors = {
    violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  };
  return (
    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm ${colors[color]}`}>
      {children}
    </span>
  );
}

export function SectionHeader({ tag, title, sub }: { tag: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-block text-xs uppercase tracking-[0.25em] text-violet-300 font-black px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 mb-4 shadow-sm">
        {tag}
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{title}</h2>
      <p className="text-lg text-white/70 leading-relaxed font-medium">{sub}</p>
    </div>
  );
}
