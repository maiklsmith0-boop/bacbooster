import { useState } from "react";
import { quizQuestions } from "../data/aiResponses";
import { SectionHeader } from "./PlanSection";
import { type Subject } from "../data/subjects";

export default function Quiz({ subject }: { subject: Subject }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = quizQuestions[current];

  const pick = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= quizQuestions.length) {
      setDone(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswered(false);
  };

  return (
    <section id="quiz" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          tag="🎯 Quiz Express"
          title={<>Test rapide en <span className="text-gradient">10 questions</span></>}
          sub="Tjarrab rasek — kola question kayhmllak point. F lakhir tchouf l'résultat dyalk."
        />

        <div className="mt-12 border-glow rounded-3xl p-8">
          {done ? (
            <ResultView score={score} total={quizQuestions.length} restart={restart} />
          ) : (
            <>
              {/* Progress */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs uppercase text-white/40 tracking-wider">
                  Question {current + 1}/{quizQuestions.length}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">
                  {q.topic}
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                  style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-2xl font-bold text-white mb-6 font-mono">{q.question}</h3>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correct;
                  const isPicked = i === selected;
                  let style = "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-400/40";
                  if (answered) {
                    if (isCorrect) style = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                    else if (isPicked) style = "border-rose-500/50 bg-rose-500/10 text-rose-300";
                    else style = "border-white/10 bg-white/[0.02] opacity-40";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => pick(i)}
                      disabled={answered}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition font-mono flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect && <span>✓</span>}
                      {answered && isPicked && !isCorrect && <span>✗</span>}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <div className="text-xs uppercase text-violet-300 font-bold mb-1">💡 Explication</div>
                  <div className="text-sm text-white/80">{q.explanation}</div>
                  <button
                    onClick={next}
                    className="mt-4 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 font-semibold text-white transition glow"
                  >
                    {current + 1 >= quizQuestions.length ? "🏁 Voir résultat" : "Question suivante →"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ResultView({ score, total, restart }: { score: number; total: number; restart: () => void }) {
  const pct = Math.round((score / total) * 100);
  const verdict =
    pct >= 80 ? { emoji: "🏆", title: "Excellent!", msg: "Nta jahz l'examen national. Continue!", color: "from-emerald-500 to-teal-600" } :
    pct >= 60 ? { emoji: "💪", title: "Bonne base", msg: "Quelques chapitres bgha rappel — mais nta f la bonne voie.", color: "from-violet-500 to-fuchsia-600" } :
    pct >= 40 ? { emoji: "📚", title: "Continue à travailler", msg: "Khassk t3awd l'plan 10 jours. Cha9 wahd jour 3la khak.", color: "from-amber-500 to-orange-600" } :
    { emoji: "🎯", title: "Lbida lwla!", msg: "Bda mn jour 1 dyal le plan. T9der dirha!", color: "from-rose-500 to-pink-600" };

  return (
    <div className="text-center py-8">
      <div className="text-7xl mb-4">{verdict.emoji}</div>
      <h3 className="text-3xl font-black text-white mb-2">{verdict.title}</h3>
      <div className={`inline-block text-7xl font-black bg-gradient-to-br ${verdict.color} bg-clip-text text-transparent`}>
        {score}/{total}
      </div>
      <div className="text-white/60 mt-2">{pct}% de bonnes réponses</div>
      <p className="text-white/70 mt-6 max-w-md mx-auto">{verdict.msg}</p>
      <button
        onClick={restart}
        className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 font-semibold text-white transition glow"
      >
        🔄 Rejouer
      </button>
    </div>
  );
}
