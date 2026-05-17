import { SectionHeader } from "./PlanSection";

const resources = [
  {
    icon: "📚",
    title: "Cours complets",
    desc: "Tous les chapitres en PDF téléchargeables",
    link: "https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques-biof",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: "📝",
    title: "Examens nationaux",
    desc: "Annales corrigées des années précédentes",
    link: "https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques-biof",
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    icon: "✏️",
    title: "Devoirs corrigés",
    desc: "Devoirs surveillés avec corrections détaillées",
    link: "https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques-biof",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: "🎬",
    title: "Vidéos cours",
    desc: "Explications vidéo par chapitre (Premium)",
    link: "https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques-biof",
    color: "from-emerald-500 to-teal-600",
  },
];

const tips = [
  { emoji: "🌙", title: "N3ass 7-8 ssa3at", desc: "L'cerveau dyalk kay7fed l'maelomat menin katn3ass." },
  { emoji: "💧", title: "Shrab l'ma w kol mzyan", desc: "Évite junk food — fruits, légumes, w protéines." },
  { emoji: "⏰", title: "Technique Pomodoro", desc: "25 min révision + 5 min pause. Krrarha 4 fois." },
  { emoji: "📵", title: "Bla téléphone", desc: "Aji bgha tnja7 ? Ba3d 3lik 3la TikTok w Insta 10 jours!" },
  { emoji: "✍️", title: "Ktab b yedek", desc: "Maktouba b yed kat7fed akter mn ghir l'9raya." },
  { emoji: "🧘", title: "10 min méditation", desc: "9bel ma tbda révision, 9ass nfes 10 fois bla7da." },
];

import { type Subject } from "../data/subjects";

export default function Resources({ subject }: { subject: Subject }) {
  return (
    <section id="ressources" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="📦 Ressources"
          title={<>Tout ce dont tu as <span className="text-gradient">besoin</span></>}
          sub="Liens directs vers AlloSchool — la source #1 dyal lmawad dyal bac f lmaghrib."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.link}
              target="_blank"
              rel="noopener"
              className="group border-glow rounded-2xl p-6 hover:scale-[1.03] transition-all hover:border-violet-500/40"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition`}>
                {r.icon}
              </div>
              <h3 className="font-bold text-white mb-1">{r.title}</h3>
              <p className="text-sm text-white/50">{r.desc}</p>
              <div className="mt-4 text-xs text-violet-300 flex items-center gap-1">
                Accéder <span className="group-hover:translate-x-1 transition">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-20">
          <SectionHeader
            tag="💡 Conseils pratiques"
            title={<>Survival kit — <span className="text-gradient">10 derniers jours</span></>}
            sub="Mn 3and stadets w psychologues — kifash tdir révision intelligente."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {tips.map((t) => (
              <div key={t.title} className="border-glow rounded-2xl p-6 hover:bg-white/[0.04] transition">
                <div className="text-4xl mb-3">{t.emoji}</div>
                <h3 className="font-bold text-white mb-1">{t.title}</h3>
                <p className="text-sm text-white/60">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
