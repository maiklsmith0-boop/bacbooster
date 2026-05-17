import { useEffect, useState } from "react";
import { quizQuestionsBySubject, QuizQ } from "../data/aiResponses";
import { subjectsData } from "../data/subjects";
import { SectionHeader } from "./PlanSection";

type Props = {
  activeSub: string;
};

export default function Quiz({ activeSub }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answered, setAnswered] = useState(false);

  const questions: QuizQ[] = quizQuestionsBySubject[activeSub] || quizQuestionsBySubject.math;
  const q = questions[current] || questions[0];
  const sub = subjectsData[activeSub];

  useEffect(() => {
    // Reset quiz when switching subject
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswered(false);
  }, [activeSub]);

  const pick = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
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
          tag={`🎯 Quiz ${sub.name}`}
          title={<>Test rapide en <span className="text-gradient">10 questions</span></>}
          sub={`Vérifiez vos connaissances sur les notions fondamentales de ${sub.name}. Chaque bonne réponse vaut 1 point.`}
        />

        <div className="mt-12 border-glow rounded-3xl p-8 bg-white/[0.02] shadow-2xl">
          {done ? (
            <ResultView score={score} total={questions.length} restart={restart} subName={sub.name} />
          ) : (
            <>
              {/* Progress */}
              <div className="flex justify-between items-center mb-6 font-bold">
                <span className="text-xs uppercase text-white/50 tracking-wider">
                  Question {current + 1}/{questions.length}
                </span>
                <span className="text-xs px-3.5 py-1.5 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono shadow-sm">
                  {q.topic}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8 p-0.5 border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-2xl font-bold text-white mb-8 font-mono leading-relaxed">{q.question}</h3>

              <div className="space-y-4">
                {q.options.map((opt: string, i: number) => {
                  const isCorrect = i === q.correct;
                  const isPicked = i === selected;
                  let style = "border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-violet-400/50 text-white";
                  if (answered) {
                    if (isCorrect) style = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/50";
                    else if (isPicked) style = "border-rose-500 bg-rose-500/20 text-rose-300 font-bold ring-2 ring-rose-500/50";
                    else style = "border-white/10 bg-white/[0.02] opacity-30";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => pick(i)}
                      disabled={answered}
                      className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 font-mono flex items-center justify-between text-base ${style}`}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect && <span className="text-xl font-black text-emerald-400">✓</span>}
                      {answered && isPicked && !isCorrect && <span className="text-xl font-black text-rose-400">✗</span>}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 border border-violet-500/30 animate-fade-in shadow-inner">
                  <div className="text-xs uppercase text-violet-300 font-black tracking-wider mb-2">💡 Explication</div>
                  <div className="text-base text-white/90 font-medium leading-relaxed">{q.explanation}</div>
                  <button
                    onClick={next}
                    className="mt-6 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 font-bold text-white text-base transition-all duration-300 glow shadow-lg"
                  >
                    {current + 1 >= questions.length ? "🏁 Voir le résultat final" : "Question suivante →"}
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

function ResultView({ score, total, restart, subName }: { score: number; total: number; restart: () => void; subName: string }) {
  const pct = Math.round((score / total) * 100);
  const verdict =
    pct >= 80 ? { emoji: "🏆", title: "Excellent résultat !", msg: `Tu as parfaitement assimilé les concepts clés de ${subName}. Poursuis ainsi !`, color: "from-emerald-400 to-teal-500" } :
    pct >= 60 ? { emoji: "💪", title: "Bonnes fondations", msg: `Quelques notions à revoir en ${subName}, mais tu es sur la très bonne voie.`, color: "from-violet-400 to-fuchsia-500" } :
    pct >= 40 ? { emoji: "📚", title: "Poursuis tes efforts", msg: `Il est conseillé de relire les fiches de cours de ${subName} et de refaire le quiz.`, color: "from-amber-400 to-orange-500" } :
    { emoji: "🎯", title: "Début d'apprentissage", msg: `Reprends le plan 10 Jours de ${subName} dès le Jour 1. Chaque minute compte !`, color: "from-rose-500 to-pink-500" };

  return (
    <div className="text-center py-12">
      <div className="text-8xl mb-6 animate-bounce">{verdict.emoji}</div>
      <h3 className="text-4xl font-black text-white mb-3">{verdict.title}</h3>
      <div className={`inline-block text-8xl font-black bg-gradient-to-br ${verdict.color} bg-clip-text text-transparent my-4 py-2`}>
        {score}/{total}
      </div>
      <div className="text-xl font-bold text-white/70 mt-2">{pct}% de bonnes réponses</div>
      <p className="text-lg text-white/80 mt-6 max-w-md mx-auto leading-relaxed">{verdict.msg}</p>
      <button
        onClick={restart}
        className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 font-black text-white text-base transition-all duration-300 glow shadow-xl hover:scale-105"
      >
        🔄 Refaire le Quiz {subName}
      </button>
    </div>
  );
}
