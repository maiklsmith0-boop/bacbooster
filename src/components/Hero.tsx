import { useEffect, useState } from "react";

type HeroProps = {
  progress: number;
  currentSubject: any;
};

export default function Hero({ progress, currentSubject }: HeroProps) {
  const [days, setDays] = useState(10);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Persistent countdown stored in localStorage (start of 10-day journey)
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
    <section className="relative overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 bg-radial pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              AI Tutor · Math 2 BAC SP BIOF · Source : AlloSchool
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6">
              <span className="text-gradient">10 jours</span><br />
              <span className="text-white">pour réussir</span><br />
              <span className="text-white/80 text-3xl md:text-5xl font-bold">{currentSubject.name} 🇲🇦</span>
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
              Plan de révision intelligent dyal <strong className="text-white">{currentSubject.name} 2 BAC</strong> — 
              {currentSubject.nameAr} • Chapitres mn AlloSchool • AI Tutor • Quiz interactifs • 100% gratuit.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#plan" className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold transition-all glow">
                🚀 Commencer la révision
              </a>
              <a href="#ai-tutor" className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 text-white font-semibold transition-all">
                💬 Parler à l'AI Tutor
              </a>
            </div>

            {/* Progress */}
            <div className="border-glow rounded-2xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/60">Progression globale</span>
                <span className="text-sm font-bold text-violet-300">{progress}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT - Countdown */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 blur-3xl animate-pulse-slow" />
            <div className="relative border-glow rounded-3xl p-8 animate-float">
              <div className="text-center mb-6">
                <div className="text-sm text-white/50 uppercase tracking-widest mb-1">Temps restant</div>
                <div className="text-xs text-white/40">⏰ Reste concentré, ga3 dakhal f la course</div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { v: days, l: "Jours" },
                  { v: hours, l: "Heures" },
                  { v: minutes, l: "Min" },
                  { v: seconds, l: "Sec" },
                ].map((it) => (
                  <div key={it.l} className="text-center">
                    <div className="bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl py-5 px-2">
                      <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
                        {String(it.v).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="text-xs text-white/50 mt-2 uppercase">{it.l}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={resetCountdown}
                className="mt-6 w-full text-xs text-white/40 hover:text-violet-300 transition"
              >
                🔄 Reset countdown (commencer maintenant)
              </button>

              <div className="mt-6 grid grid-cols-3 gap-2 pt-6 border-t border-white/10">
                <Stat icon="📚" label="Chapitres" value="15" />
                <Stat icon="🎯" label="Jours" value="10" />
                <Stat icon="🧠" label="AI Tutor" value="24/7" />
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
    <div className="text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-[10px] text-white/40 uppercase">{label}</div>
    </div>
  );
}
