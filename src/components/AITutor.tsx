import { useEffect, useRef, useState } from "react";
import { getAIResponse, type Message } from "../data/aiResponses";
import { SectionHeader } from "./PlanSection";

const SUGGESTIONS = [
  "📐 Dériver ln(x²+1)",
  "⚡ Circuit RLC & modulation",
  "🧬 ATP & Respiration",
  "🏛️ La personne & autrui",
  "🇬🇧 Future perfect (by 2030)",
  "😰 Stress dyal examen",
];

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "🤖 Salam! Ana **BacBoost AI**, mou3alim dyalk personnel l'ga3 mawad 2ème BAC SP BIOF (Maths, PC, SVT, Philo, Anglais).\n\nS9siwni 3la n'importe quel chapitre ou notion :\n• 📐 Formules de Maths (limites, dérivées, TVI, suites, intégrales...)\n• ⚡ Physique-Chimie (Ondes, nucléaire, RC/RL/RLC, acide-base, Newton...)\n• 🧬 SVT (ATP, muscle strié, ADN, méiose, lois statistiques...)\n• 🏛️ Philosophie (Personne, autrui, vérité, méthodologie de dissertation...)\n• 🇬🇧 Anglais (Tenses, passive voice, reported speech, linking words, writing...)\n• 💆 Gestion du stress w plan dyal révision",
      time: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text, time: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const aiText = getAIResponse(text);
      setMessages((m) => [...m, { role: "ai", text: aiText, time: Date.now() }]);
      setThinking(false);
    }, 700 + Math.random() * 600);
  };

  return (
    <section id="ai-tutor" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="🧠 AI Tutor 2.0"
          title={<>Ton <span className="text-gradient">professeur</span> polyvalent</>}
          sub="Posez votre question en darija ou français sur n'importe quelle matière du Bac. L'IA analyse les mots-clés et fournit le cours synthétique."
        />

        <div className="mt-12 border-glow rounded-3xl overflow-hidden bg-white/[0.02] shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 p-5 border-b border-white/10 bg-black/40">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg animate-pulse-slow">
                🤖
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#07060d] shadow-sm" />
            </div>
            <div className="flex-1">
              <div className="font-black text-lg text-white flex items-center gap-2">
                <span>BacBoost AI 2.0</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Online
                </span>
              </div>
              <div className="text-xs text-white/50 font-medium mt-0.5">Spécialiste 2 BAC SP BIOF (Toutes matières)</div>
            </div>
            <button
              onClick={() => setMessages([messages[0]])}
              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition flex items-center gap-1.5"
            >
              <span>🔄 Réinitialiser</span>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[520px] overflow-y-auto scrollbar-thin p-6 space-y-6 bg-gradient-to-b from-transparent via-violet-950/5 to-black/40"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} msg={m} />
            ))}
            {thinking && (
              <div className="flex gap-4 items-start animate-fade-in">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-lg shadow-md shrink-0">
                  🤖
                </div>
                <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl rounded-tl-sm flex items-center shadow-md">
                  <div className="flex gap-1.5 items-center py-1">
                    <span className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2.5 h-2.5 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="px-5 py-3.5 border-t border-white/10 bg-black/20 flex gap-2.5 overflow-x-auto scrollbar-thin">
            <span className="text-xs font-bold text-white/40 uppercase tracking-wider shrink-0 flex items-center mr-1">
              Suggestions :
            </span>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="shrink-0 text-xs px-4 py-2 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 border border-white/10 text-white/80 hover:text-white font-bold transition-all duration-300 shadow-sm hover:scale-105"
              >
                {s}
            </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-5 border-t border-white/10 flex gap-3 bg-black/40"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question (ex: Kifash ndir tableau d'avancement? Wla TVI?)"
              className="flex-1 bg-white/5 border border-white/10 focus:border-violet-500/60 rounded-2xl px-5 py-4 text-base text-white placeholder:text-white/30 outline-none transition duration-300 shadow-inner font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed font-black text-white text-lg transition-all duration-300 glow flex items-center justify-center shadow-lg"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-4 items-start ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center text-lg shadow-md ${
        isUser
          ? "bg-white/15 border border-white/20 text-white"
          : "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 text-white"
      }`}>
        {isUser ? "🧑‍🎓" : "🤖"}
      </div>
      <div className={`max-w-[85%] px-6 py-4.5 rounded-3xl whitespace-pre-wrap text-base font-medium leading-relaxed shadow-lg ${
        isUser
          ? "bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-white rounded-tr-sm"
          : "bg-white/[0.05] border border-white/10 text-white/95 rounded-tl-sm backdrop-blur-sm"
      }`}>
        {formatMessage(msg.text)}
      </div>
    </div>
  );
}

function formatMessage(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} className="text-violet-300 font-extrabold">{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}
