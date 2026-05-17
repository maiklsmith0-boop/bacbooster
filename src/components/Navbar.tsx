import { subjectsData } from "../data/subjects";

type Props = {
  activeSub: string;
  setActiveSub: (id: "math" | "pc" | "svt" | "philo" | "eng") => void;
};

export default function Navbar({ activeSub, setActiveSub }: Props) {
  const currentSub = subjectsData[activeSub];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#07060d]/80 border-b border-white/10 shadow-2xl shadow-black">
      {/* Top Main Nav */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-xl font-black shadow-lg shadow-violet-500/30 group-hover:scale-110 transition duration-300">
            🎓
          </div>
          <div>
            <div className="font-black text-lg leading-tight flex items-center gap-2">
              <span>BacBoost</span>
              <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-[11px] text-white uppercase tracking-wider font-extrabold shadow">
                AI 2.0
              </span>
            </div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
              2 BAC SP BIOF 🇲🇦
            </div>
          </div>
        </a>

        {/* Anchor links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-xl border border-white/10">
          {[
            { href: "#plan", label: "Plan 10J" },
            { href: "#ai-tutor", label: "AI Tutor" },
            { href: "#quiz", label: "Quiz" },
            { href: "#ressources", label: "Ressources" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Source button */}
        <a
          href={currentSub.url}
          target="_blank"
          rel="noopener"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/15 hover:bg-white/20 text-xs font-bold text-white transition duration-300 shadow-sm hover:scale-105"
        >
          <span>🔗 AlloSchool</span>
        </a>
      </div>

      {/* Subject Switcher Bar */}
      <div className="bg-white/[0.02] border-t border-white/5 py-2 px-4 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center gap-2 justify-start md:justify-center min-w-max">
          <span className="text-xs uppercase text-white/40 tracking-widest font-black mr-2 hidden sm:inline-block">
            Matières :
          </span>
          {(Object.keys(subjectsData) as Array<"math" | "pc" | "svt" | "philo" | "eng">).map((key) => {
            const sub = subjectsData[key];
            const isActive = activeSub === key;
            return (
              <button
                key={key}
                onClick={() => setActiveSub(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${sub.color} text-white shadow-lg scale-105 ring-1 ring-white/30`
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
                }`}
              >
                <span className="text-base leading-none">{sub.icon}</span>
                <span>{sub.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-white/60'}`}>
                  {sub.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
