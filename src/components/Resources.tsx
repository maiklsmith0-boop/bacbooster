import { Subject } from "../data/subjects";
import { SectionHeader } from "./PlanSection";

type Props = {
  subject: Subject;
};

export default function Resources({ subject }: Props) {
  const resources = [
    {
      icon: "📚",
      title: "Cours complets",
      desc: `Tous les chapitres de ${subject.name} en PDF et Doc`,
      link: subject.url,
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: "📝",
      title: "Examens nationaux",
      desc: "Annales corrigées des sessions Normales et Rattrapages",
      link: subject.url,
      color: "from-fuchsia-500 to-pink-600",
    },
    {
      icon: "✏️",
      title: "Devoirs corrigés",
      desc: "Devoirs surveillés avec barèmes et corrections détaillées",
      link: subject.url,
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: "🎬",
      title: "Vidéos explicatives",
      desc: "Séries d'exercices et cours en vidéo (AlloSchool Premium)",
      link: subject.url,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const tips = [
    { emoji: "🌙", title: "Sommeil de 7-8h", desc: "Le cerveau consolide la mémoire et les formules pendant le sommeil profond." },
    { emoji: "💧", title: "Hydratation & Nutrition", desc: "Privilégiez les amandes, fruits, légumes et eau. Évitez les sucres rapides avant l'examen." },
    { emoji: "⏰", title: "Méthode Pomodoro", desc: "25 minutes de révision intense + 5 minutes de pause. Répétez 4 fois avant une grande pause." },
    { emoji: "📵", title: "Détox Digitale", desc: "Supprimez temporairement Instagram, TikTok et jeux pendant ces 10 jours décisifs." },
    { emoji: "✍️", title: "Fiches Manuscrites", desc: "Écrire de sa propre main stimule l'ancrage mémoriel bien plus que la simple lecture." },
    { emoji: "🧘", title: "Gestion du Stress", desc: "Avant de commencer l'épreuve, pratiquez la cohérence cardiaque (5s inspiration, 5s expiration)." },
  ];

  return (
    <section id="ressources" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag={`📦 Ressources ${subject.name}`}
          title={<>Tout ce dont tu as <span className="text-gradient">besoin</span></>}
          sub={`Accédez aux documents officiels et examens sur AlloSchool pour préparer ${subject.name}.`}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.link}
              target="_blank"
              rel="noopener"
              className="group border-glow rounded-3xl p-6 hover:scale-105 transition-all duration-300 hover:border-violet-500/50 bg-white/[0.02] shadow-xl block"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition duration-300 shadow-lg`}>
                {r.icon}
              </div>
              <h3 className="font-black text-xl text-white mb-2">{r.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed font-medium">{r.desc}</p>
              <div className="mt-6 text-xs font-bold text-violet-300 flex items-center gap-2 group-hover:text-white transition">
                <span>Accéder aux documents</span>
                <span className="group-hover:translate-x-1.5 transition duration-300 text-base">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-28">
          <SectionHeader
            tag="💡 Conseils Pratiques"
            title={<>Kit de survie des <span className="text-gradient">10 derniers jours</span></>}
            sub="Recommandations pédagogiques et psychologiques pour maximiser vos capacités le jour J."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {tips.map((t) => (
              <div key={t.title} className="border-glow rounded-3xl p-6 hover:bg-white/[0.05] transition duration-300 bg-white/[0.01] shadow-lg">
                <div className="text-4xl mb-4 p-3 inline-block rounded-2xl bg-white/5 border border-white/10">{t.emoji}</div>
                <h3 className="font-black text-xl text-white mb-2">{t.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed font-medium">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
