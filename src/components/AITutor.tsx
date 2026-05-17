import { useEffect, useRef, useState } from "react";
import { getAIResponse, type Message } from "../data/aiResponses";
import { SectionHeader } from "./PlanSection";
import { type Subject } from "../data/subjects";

const SUGGESTIONS = [
  "Comment dériver ln(x²+1) ?",
  "Explique-moi le TVI",
  "Plan de révision 10 jours",
  "Formule de Moivre ?",
  "Stress dyal examen 😰",
  "Théorème de Bézout",
];

export default function AITutor({ subject }: { subject: Subject }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "🤖 Salam! Ana **BacBoost AI**, mou3alim dyalk dyal Math.\n\nN9der nsaedek f :\n• Cours w formules (limites, dérivées, intégrales...)\n• Méthodes dyal exercices\n• Plan dyal révision\n• Techniques bach tg7lab le stress\n\nS9siwni 3la chi 7aja!",
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
          tag="🧠 AI Tutor"
          title={<>Ton <span className="text-gradient">mou3alim</span> personnel</>}
          sub="S9si chi swal — kaymaththel cours, méthodes, formules, w nasi7at psychologiques bach tnaja7."
        />

        <div className="mt-12 border-glow rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/[0.02]">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-lg shadow-lg">
                🤖
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#07060d]" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-white">BacBoost AI</div>
              <div className="text-xs text-emerald-400">● En ligne · Spécialiste Math BAC</div>
            </div>
            <button
              onClick={() => setMessages([messages[0]])}
              className="text-xs text-white/40 hover:text-white/70 transition"
            >
              🗑 Reset
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[480px] overflow-y-auto scrollbar-thin p-6 space-y-4 bg-gradient-to-b from-transparent to-violet-950/10"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} msg={m} />
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-sm">🤖</div>
                <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="px-4 pt-3 pb-2 border-t border-white/10 flex gap-2 overflow-x-auto scrollbar-thin">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 text-white/70 hover:text-white transition"
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
            className="p-4 border-t border-white/10 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ktab swalek... (mathali: kifash ndir intégrale par parties?)"
              className="flex-1 bg-white/5 border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-white transition glow"
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
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm ${
        isUser
          ? "bg-white/10"
          : "bg-gradient-to-br from-violet-500 to-fuchsia-600"
      }`}>
        {isUser ? "🧑‍🎓" : "🤖"}
      </div>
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
        isUser
          ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-tr-sm"
          : "bg-white/[0.06] border border-white/5 text-white/90 rounded-tl-sm"
      }`}>
        {formatMessage(msg.text)}
      </div>
    </div>
  );
}

function formatMessage(text: string) {
  // Bold **text** support
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} className="text-violet-300">{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}
