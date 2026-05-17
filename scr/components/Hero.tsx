import { useEffect, useState } from "react";
import { Subject } from "../data/subjects";

type Props = {
  progress: number;
  subject: Subject;
};

export default function Hero({ progress, subject }: Props) {
  const [days, setDays] = useState(10);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const KEY = "bacboost-deadline";
    let deadline = localStorage.getItem(KEY);
    if (!deadline) {
      const d = new Date();
      d.setDate(d.getDate() + 10);
      deadline = d.toISOString();
      localStorage.setItem(KEY, deadline);
    }
    const target = new Date(deadline).getTime();

    const update = () => {
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= d * 1000 * 60 * 60 * 24;
      const h = Math.floor(diff / (1000 * 60 * 60));
      diff -= h * 1000 * 60 * 60;
      const m = Math.floor(diff / (1000 * 60));
      diff -= m * 1000 * 60;
      const s = Math.floor(diff / 1000);
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  const resetCountdown = () => {
    localStorage.removeItem("bacboost-deadline");
    window.location.reload();
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      <div className="absolute inset-0 bg-radial pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
              </span>
              <span>{subject.icon} Mode {subject.name} · {subject.nameAr}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.1]">
              <span className="text-gradient">10 jours</span><br />
              <span className="text-white">pour réussir le Bac</span><br />
              <span className="text-white/80 text-3xl md:text-5xl font-extrabold flex items-center gap-3 mt-2">
                <span>{subject.name}</span>
                <span className="text-xl md:text-2xl px-3 py-1 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg">
                  {subject.badge}
                </span>
              </span>
            </h1>

            <p className="text-lg text-white/75 max-w-xl leading-relaxed">
              {subject.description} Profitez de l'AI Tutor b darija, des résumés de cours, exercices et examens nationaux corrigés d'AlloSchool.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#plan"
                className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${subject.color} hover:opacity-90 text-white font-bold text-base transition-all duration-300 glow flex items-center gap-2 shadow-xl hover:scale-105`}
              >
                <span>🚀 Lancer le plan 10 Jours</span>
              </a>
              <a
                href="#ai-tutor"
                className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 text-white font-bold text-base transition-all duration-300 flex items-center gap-2"
              >
                <span>💬 Poser une question à l'AI</span>
              </a>
            </div>

            {/* Progress */}
            <div className="border-glow rounded-3xl p-6 bg-white/[0.02]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-white/80 flex items-center gap-2">
                  <span>📈 Progression dans {subject.name}</span>
                </span>
                <span className="text-base font-black text-violet-300 bg-violet-500/20 px-3 py-1 rounded-xl border border-violet-500/30">
                  {progress}%
                </span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-1000 shadow-lg`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT - Countdown */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 blur-3xl animate-pulse-slow" />
            <div className="relative border-glow rounded-3xl p-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] animate-float shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-xs text-violet-300 uppercase tracking-[0.25em] font-black mb-2">
                  ⏳ Compte à rebours du Bac
                </div>
                <div className="text-sm text-white/60 font-semibold">
                  Reste concentré, chaque minute compte pour l'excellence !
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { v: days, l: "Jours" },
                  { v: hours, l: "Heures" },
                  { v: minutes, l: "Min" },
                  { v: seconds, l: "Sec" },
                ].map((it) => (
                  <div key={it.l} className="text-center group">
                    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 rounded-2xl py-6 px-2 shadow-inner group-hover:border-violet-400 transition duration-300">
                      <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
                        {String(it.v).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="text-xs text-white/50 mt-3 uppercase tracking-wider font-extrabold">{it.l}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={resetCountdown}
                className="mt-8 w-full text-xs text-white/40 hover:text-violet-300 hover:underline transition duration-200 text-center block font-mono"
              >
                🔄 Réinitialiser le compte à rebours (Débuter aujourd'hui)
              </button>

              <div className="mt-8 grid grid-cols-3 gap-2 pt-8 border-t border-white/10">
                <Stat icon="📚" label="Chapitres" value={String(subject.chapters.length)} />
                <Stat icon="🎯" label="Jours" value="10" />
                <Stat icon="🇲🇦" label="Source" value="AlloSchool" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="text-center bg-white/[0.02] p-3 rounded-2xl border border-white/5">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-black text-white">{value}</div>
      <div className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  );
}
