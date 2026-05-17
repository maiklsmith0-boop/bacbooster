// Simple rule-based "AI Tutor" — répond en darija/français selon mots-clés

export type Message = { role: "user" | "ai"; text: string; time: number };

const knowledge: { keywords: string[]; response: string }[] = [
  {
    keywords: ["limite", "limites", "نهاية", "lim"],
    response: "📐 Les limites :\n\n• Forme 0/0 : factorise w simplifie (souvent (x-a))\n• Forme ∞/∞ : factorise par le terme de plus haut degré\n• Forme ∞-∞ : multiplie par la quantité conjuguée si racines\n• Formes usuelles : lim sin(x)/x = 1, lim (1-cos x)/x² = 1/2\n\n💡 Tip darija: ila lqitiha forme indéterminée, ma t9rab — bda transformi l'expression!",
  },
  {
    keywords: ["dériv", "dérivée", "اشتقاق", "derive"],
    response: "📏 Dérivation :\n\n• (uv)' = u'v + uv'\n• (u/v)' = (u'v - uv')/v²\n• (u^n)' = n·u'·u^(n-1)\n• (f∘g)'(x) = g'(x)·f'(g(x))  ← composée\n• (ln u)' = u'/u\n• (e^u)' = u'·e^u\n\n💡 Bach tdir tableau de variation : 7sb f'(x) → drass l'signe dyalha → variations dyal f.",
  },
  {
    keywords: ["continu", "tvi", "اتصال", "intermédiaire"],
    response: "🎯 Continuité & TVI :\n\nf continue en a ⟺ lim_{x→a} f(x) = f(a)\n\n🔥 TVI : Si f continue sur [a,b] et f(a)·f(b) < 0, alors ∃ c ∈ ]a,b[ tel que f(c) = 0.\n\n💡 Strict + monotone = unicité dyal la solution!\nKayn dima f l'examen — chouf signe dyal f(a) w f(b).",
  },
  {
    keywords: ["suite", "suites", "متتالية", "récurren"],
    response: "🔢 Suites :\n\n• Suite croissante + majorée ⟹ convergente\n• Théorème des gendarmes : si v_n ≤ u_n ≤ w_n et v_n, w_n → L, alors u_n → L\n• Suite u_{n+1} = f(u_n) avec f continue : si u_n → L alors L = f(L)\n\n💡 Bach tprouvi monotonie : drass u_{n+1} - u_n wla u_{n+1}/u_n, wla raisonnement par récurrence.",
  },
  {
    keywords: ["log", "ln", "لوغاريتم", "logarithm"],
    response: "📊 Fonction ln :\n\n• Df = ]0, +∞[\n• ln(1) = 0, ln(e) = 1\n• ln(ab) = ln(a) + ln(b)\n• ln(a/b) = ln(a) - ln(b)\n• ln(aⁿ) = n·ln(a)\n• (ln x)' = 1/x  ;  (ln u)' = u'/u\n• lim x→0⁺ ln(x) = -∞ ; lim x→+∞ ln(x)/x = 0\n\n💡 Croissance comparée : x^n >> ln(x) f l'infini.",
  },
  {
    keywords: ["exp", "exponentielle", "أسية", "e^x"],
    response: "📈 Exponentielle :\n\n• e^(a+b) = e^a · e^b\n• (e^x)' = e^x  ;  (e^u)' = u'·e^u\n• e^x > 0 toujours\n• lim e^x/x^n = +∞ quand x→+∞\n• y' = ay ⟺ y(x) = C·e^(ax)\n• y' = ay + b ⟺ y(x) = C·e^(ax) - b/a\n\n💡 exp w ln réciproques : ln(e^x) = x, e^(ln x) = x.",
  },
  {
    keywords: ["intégr", "primitive", "تكامل", "integral"],
    response: "∫ Intégrales :\n\n• ∫ x^n dx = x^(n+1)/(n+1) + C (n≠-1)\n• ∫ 1/x dx = ln|x| + C\n• ∫ e^x dx = e^x + C\n• ∫ u'·u^n dx = u^(n+1)/(n+1)\n• ∫ u'/u dx = ln|u|\n\n🔥 IPP : ∫u'v = [uv] - ∫uv'\nKhtar 'v' li dérivée dyalha bsi6a (souvent x ou ln x).\n\n💡 Aire = ∫_a^b |f(x) - g(x)| dx",
  },
  {
    keywords: ["complex", "عقدي", "moivre", "imagi"],
    response: "ℂ Nombres complexes :\n\n• z = a + ib, z̄ = a - ib, |z|² = z·z̄ = a²+b²\n• Forme exp : z = r·e^(iθ) avec r = |z|, θ = arg(z)\n• Moivre : (e^(iθ))^n = e^(inθ)\n• Euler : cos θ = (e^(iθ)+e^(-iθ))/2\n\n🔁 Rotation centre ω, angle α : z' - ω = e^(iα)(z - ω)\n📐 Triangle équilatéral : (c-a)/(b-a) = e^(±iπ/3)",
  },
  {
    keywords: ["arith", "bezout", "gauss", "pgcd", "congruence", "حساب"],
    response: "🔢 Arithmétique :\n\n• Bézout : pgcd(a,b) = 1 ⟺ ∃ u,v : au + bv = 1\n• Gauss : a|bc et pgcd(a,b)=1 ⟹ a|c\n• Congruences : a ≡ b [n] ⟺ n | (a-b)\n• Petit Fermat : si p premier et p∤a alors a^(p-1) ≡ 1 [p]\n\n💡 Algorithme d'Euclide bach tl9a pgcd : a = bq + r, puis pgcd(a,b)=pgcd(b,r).",
  },
  {
    keywords: ["proba", "binomi", "احتمال", "événement"],
    response: "🎲 Probabilités :\n\n• P(A∪B) = P(A) + P(B) - P(A∩B)\n• P(A|B) = P(A∩B)/P(B)\n• Indépendance : P(A∩B) = P(A)·P(B)\n• Loi binomiale B(n,p) : P(X=k) = C(n,k)·p^k·(1-p)^(n-k)\n• E(X) = np, V(X) = np(1-p)\n\n💡 Si l'expérience tkrar n fois indépendantes b même proba p → binomiale.",
  },
  {
    keywords: ["stress", "khayef", "peur", "examen", "خايف"],
    response: "💪 Hadi nasi7a dyali :\n\n• N3ass mzyan lila 9bel examen — sahar makayfid walou\n• 9ra l'énoncé kaml 9bel mat3awd tabda\n• Lkhdma 3la l'questions sahla l'awla bach tjm3 points\n• Maytah lik 9albek 3la question wahda — 3awd liha mn b3d\n• Vérifi calculs simples (signes, parenthèses)\n\n🇲🇦 Nta capable! Nta drsti 10 jours kamlin m3a BacBoost AI.",
  },
  {
    keywords: ["plan", "organis", "kifach", "comment", "خطة"],
    response: "📅 Plan 10 jours optimal :\n\nJour 1-2 : Limites + Continuité (fondations)\nJour 3-4 : Étude de fonctions complète\nJour 5 : Suites\nJour 6 : Primitives + Logarithme\nJour 7 : Exponentielle\nJour 8 : Calcul intégral\nJour 9 : Complexes (1+2)\nJour 10 : Arith + Proba + Examen blanc\n\n⏰ 4h/jour mzyan. 2h cours + 2h exercices.\n🎯 Kola jour : 7el example mn examens nationaux.",
  },
];

export function getAIResponse(userText: string): string {
  const text = userText.toLowerCase();
  
  const matches = knowledge.filter(k => 
    k.keywords.some(kw => text.includes(kw.toLowerCase()))
  );

  if (matches.length === 0) {
    return "🤖 Salam! Ana BacBoost AI, mssa3dek f révision Math 2 BAC SP.\n\nS9siwni 3la :\n• Limites, dérivées, continuité, TVI\n• Étude de fonctions\n• Suites numériques\n• Logarithme, exponentielle\n• Calcul intégral & primitives\n• Nombres complexes\n• Arithmétique, dénombrement, probabilités\n\nWla 9oul liya 'plan' bach n3tik plan 10 jours, wla 'stress' ila kn3 7ass b stress dyal examen 💜";
  }

  return matches.map(m => m.response).join("\n\n━━━━━━━━━━━\n\n");
}

// Quiz questions
export type QuizQ = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
};

export const quizQuestions: QuizQ[] = [
  {
    question: "lim_{x→0} sin(x)/x = ?",
    options: ["0", "1", "+∞", "n'existe pas"],
    correct: 1,
    explanation: "C'est une limite usuelle fondamentale : sin(x)/x → 1 quand x → 0.",
    topic: "Limites",
  },
  {
    question: "Dérivée de f(x) = ln(x² + 1) ?",
    options: ["2x", "1/(x²+1)", "2x/(x²+1)", "x/(x²+1)"],
    correct: 2,
    explanation: "(ln u)' = u'/u avec u = x²+1, donc f'(x) = 2x/(x²+1).",
    topic: "Logarithme",
  },
  {
    question: "Module de z = 3 + 4i ?",
    options: ["7", "5", "25", "√7"],
    correct: 1,
    explanation: "|z| = √(a² + b²) = √(9 + 16) = √25 = 5.",
    topic: "Complexes",
  },
  {
    question: "Si f continue sur [a,b] et f(a)·f(b) < 0, alors :",
    options: [
      "f est croissante",
      "∃ c ∈ ]a,b[ tel que f(c) = 0",
      "f(a) = f(b)",
      "f n'a pas de racine",
    ],
    correct: 1,
    explanation: "C'est le Théorème des Valeurs Intermédiaires (TVI).",
    topic: "Continuité",
  },
  {
    question: "∫₀¹ x² dx = ?",
    options: ["1", "1/2", "1/3", "2/3"],
    correct: 2,
    explanation: "∫x² dx = x³/3, donc [x³/3]₀¹ = 1/3 - 0 = 1/3.",
    topic: "Intégrales",
  },
  {
    question: "Solution de y' = 2y avec y(0) = 3 ?",
    options: ["y = 3x²", "y = 3·e^(2x)", "y = 2·e^(3x)", "y = e^(2x) + 3"],
    correct: 1,
    explanation: "y' = ay ⟹ y = C·e^(ax). y(0) = C = 3, donc y = 3·e^(2x).",
    topic: "Exponentielle",
  },
  {
    question: "pgcd(48, 36) = ?",
    options: ["6", "12", "18", "24"],
    correct: 1,
    explanation: "48 = 36·1 + 12, puis 36 = 12·3 + 0, donc pgcd = 12.",
    topic: "Arithmétique",
  },
  {
    question: "C(5,2) = ?",
    options: ["7", "10", "20", "25"],
    correct: 1,
    explanation: "C(5,2) = 5!/(2!·3!) = 120/(2·6) = 10.",
    topic: "Dénombrement",
  },
  {
    question: "Forme exponentielle de z = 1 + i ?",
    options: ["√2·e^(iπ/4)", "2·e^(iπ/4)", "√2·e^(iπ/2)", "e^(iπ/4)"],
    correct: 0,
    explanation: "|z| = √2, arg(z) = π/4 (1er quadrant), donc z = √2·e^(iπ/4).",
    topic: "Complexes",
  },
  {
    question: "Dans P(B|A) = P(A∩B)/P(A), comment appelle-t-on P(B|A) ?",
    options: [
      "Probabilité totale",
      "Probabilité conditionnelle",
      "Probabilité marginale",
      "Espérance",
    ],
    correct: 1,
    explanation: "C'est la probabilité de B sachant A, dite probabilité conditionnelle.",
    topic: "Probabilités",
  },
];
