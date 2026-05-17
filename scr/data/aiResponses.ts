export type Message = { role: "user" | "ai"; text: string; time: number };

const knowledge: { keywords: string[]; response: string }[] = [
  // MATH
  {
    keywords: ["limite", "limites", "نهاية", "lim"],
    response: "📐 **Les limites (Maths)** :\n\n• Forme 0/0 : factorise w simplifie (souvent par (x-a))\n• Forme ∞/∞ : factorise par le terme de plus haut degré\n• Forme ∞-∞ : multiplie par la quantité conjuguée si racines\n• Formes usuelles : lim sin(x)/x = 1 quand x→0\n\n💡 Tip darija: ila lqitiha forme indéterminée, ma t9rab — bda transformi l'expression!",
  },
  {
    keywords: ["dériv", "dérivée", "اشتقاق", "derive"],
    response: "📏 **Dérivation (Maths)** :\n\n• (uv)' = u'v + uv'\n• (u/v)' = (u'v - uv')/v²\n• (f∘g)'(x) = g'(x)·f'(g(x))  ← composée\n• (ln u)' = u'/u\n• (e^u)' = u'·e^u\n\n💡 Bach tdir tableau de variation : 7sb f'(x) → drass l'signe dyalha → variations dyal f.",
  },
  {
    keywords: ["continu", "tvi", "اتصال", "intermédiaire"],
    response: "🎯 **Continuité & TVI (Maths)** :\n\nf continue en a ⟺ lim_{x→a} f(x) = f(a)\n\n🔥 TVI : Si f continue sur [a,b] et f(a)·f(b) < 0, alors ∃ c ∈ ]a,b[ tel que f(c) = 0.\n\n💡 Strict + monotone = unicité dyal la solution! Kayn dima f l'examen.",
  },
  {
    keywords: ["suite", "suites", "متتالية", "récurren"],
    response: "🔢 **Suites (Maths)** :\n\n• Suite croissante + majorée ⟹ convergente\n• Théorème des gendarmes : si v_n ≤ u_n ≤ w_n et v_n, w_n → L, alors u_n → L\n• Suite u_{n+1} = f(u_n) : si u_n → L alors L = f(L)\n\n💡 Bach tprouvi monotonie : drass u_{n+1} - u_n.",
  },
  {
    keywords: ["log", "ln", "لوغاريتم", "logarithm"],
    response: "📊 **Fonction ln (Maths)** :\n\n• Df = ]0, +∞[\n• ln(ab) = ln(a) + ln(b)\n• ln(aⁿ) = n·ln(a)\n• (ln x)' = 1/x  ;  (ln u)' = u'/u\n• lim x→0⁺ ln(x) = -∞ ; lim x→+∞ ln(x)/x = 0\n\n💡 Croissance comparée : x^n >> ln(x) f l'infini.",
  },
  {
    keywords: ["exp", "exponentielle", "أسية", "e^x"],
    response: "📈 **Exponentielle (Maths)** :\n\n• e^(a+b) = e^a · e^b\n• (e^u)' = u'·e^u\n• lim e^x/x^n = +∞ quand x→+∞\n• y' = ay + b ⟺ y(x) = C·e^(ax) - b/a\n\n💡 exp w ln réciproques : ln(e^x) = x, e^(ln x) = x.",
  },
  {
    keywords: ["intégr", "primitive", "تكامل", "integral", "ipp"],
    response: "∫ **Intégrales & Primitives (Maths)** :\n\n• ∫ x^n dx = x^(n+1)/(n+1) + C\n• ∫ u'·u^n dx = u^(n+1)/(n+1)\n• ∫ u'/u dx = ln|u|\n\n🔥 IPP : ∫u'v = [uv] - ∫uv'\nKhtar 'v' li dérivée dyalha bsi6a (souvent x ou ln x).\n\n💡 Aire = ∫_a^b |f(x) - g(x)| dx",
  },
  {
    keywords: ["complex", "عقدي", "moivre", "imagi"],
    response: "ℂ **Nombres complexes (Maths)** :\n\n• z = a + ib, z̄ = a - ib, |z|² = a²+b²\n• Forme exp : z = r·e^(iθ)\n• Moivre : (e^(iθ))^n = e^(inθ)\n• Euler : cos θ = (e^(iθ)+e^(-iθ))/2\n\n🔁 Rotation centre ω, angle α : z' - ω = e^(iα)(z - ω)",
  },

  // PHYSIQUE CHIMIE
  {
    keywords: ["onde", "ondes", "موجة", "موجات", "diffraction", "celerite", "célérité", "retard"],
    response: "🌊 **Les Ondes (Physique)** :\n\n• Célérité : v = d / Δt = λ / T = λ · f\n• Retard temporel : τ = M1M2 / v\n• Relation de l'élongation : y_M(t) = y_S(t - τ)\n\n🎯 **Diffraction** : Condition pour diffracter : a ≤ λ (ou a de l'ordre de λ).\nÉcart angulaire : θ = λ / a = L / (2D)\n\n💡 Tip : F l'examen, chouf mzyan l'échelle f la courbe bach tjbd la période T wla le retard τ.",
  },
  {
    keywords: ["nucléaire", "radioact", "demi-vie", "noyau", "soddy", "fission", "fusion", "نووي", "اشعاع"],
    response: "☢️ **Nucléaire (Physique)** :\n\n• Loi de Soddy : Conservation du nombre de masse A et de charge Z : A1+A2 = A3+A4 et Z1+Z2 = Z3+Z4.\n• Loi de décroissance : N(t) = N0 · e^(-λt)\n• Demi-vie : t_{1/2} = ln(2) / λ\n• Activité : a(t) = a0 · e^(-λt)  (en Becquerel Bq)\n\n⚡ **Énergie** : Défaut de masse Δm = [Z·mp + (A-Z)mn] - m_X\nÉnergie de liaison El = Δm · c² (en MeV). Plus El/A est grand, plus le noyau est stable!",
  },
  {
    keywords: ["rc", "condensateur", "rl", "bobine", "rlc", "modulation", "كهرباء", "تذبذب"],
    response: "⚡ **Électricité RC / RL / RLC (Physique)** :\n\n🔋 **Dipôle RC** : u_R + u_C = E ⟹ τ = R·C. Charge u_C(t) = E(1 - e^(-t/τ)). Énergie E_e = 1/2 C·u_C².\n\n🌀 **Dipôle RL** : u_L = r·i + L(di/dt). Constante τ = L / R_tot. Énergie E_m = 1/2 L·i².\n\n📻 **Circuit RLC** : Période propre T0 = 2π√(LC). Amortissement dû à la résistance. Entretien : R0 = R_tot.\n\n📡 **Modulation** : Taux m = (Umax-Umin)/(Umax+Umin). Bonne modulation : m < 1 et f_p >> f_s.",
  },
  {
    keywords: ["cinetique", "vitesse volumique", "demi-reaction", "حركية", "تتبع"],
    response: "🧪 **Cinétique Chimique & Suivi (Chimie)** :\n\n• Vitesse volumique : v = (1/V) · (dx/dt). Graphiquement, c'est proportionnel à la pente de la tangente.\n• Facteurs cinétiques : Température et concentration initiale des réactifs (accélèrent la réaction).\n• Temps de demi-réaction t_{1/2} : Durée pour atteindre x(t) = x_max / 2.\n\n💡 Tip : On peut suivre l'avancement x par mesure de pression P, de volume V ou par conductimétrie σ.",
  },
  {
    keywords: ["acide", "base", "ph", "pka", "titrage", "حمض", "قاعدة", "معايرة"],
    response: "🧪 **Acide-Base & Titrage (Chimie)** :\n\n• pH = -log[H3O+] ⟺ [H3O+] = 10^(-pH)\n• Constante d'acidité : Ka = ([A-][H3O+]) / [AH]. pKa = -log(Ka).\n• Relation d'Henderson : pH = pKa + log([A-] / [AH]).\n• Taux d'avancement : τ = x_f / x_max = 10^(-pH) / C. Si τ < 1, acide faible.\n\n🎯 **Titrage** : À l'équivalence, les réactifs sont introduits dans les proportions stœchiométriques : C_A · V_A = C_B · V_BE.",
  },
  {
    keywords: ["pile", "piles", "electrolyse", "anode", "cathode", "عمود", "تحليل"],
    response: "🔋 **Piles & Électrolyse (Chimie)** :\n\n• **Anode** = Oxydation (Perte d'e-). Borne (-) dans la pile, (+) dans l'électrolyse.\n• **Cathode** = Réduction (Gain d'e-). Borne (+) dans la pile, (-) dans l'électrolyse.\n• Quantité d'électricité : Q = I · Δt = n(e-) · F (avec F = 96500 C/mol).\n\n💡 Calcul de la variation de masse de l'électrode : Δm = n(métal) · M = [I · Δt · M] / (z · F).",
  },
  {
    keywords: ["newton", "chute", "projectile", "mecanique", "euler", "lorentz", "ميكانيك", "قذيفة"],
    response: "🚀 **Mécanique (Physique)** :\n\n• 2ème Loi de Newton : dans un référentiel galiléen, Σ F_ext = m · a_G.\n• Chute verticale avec frottements : v_lim = √(m·g / k). Méthode d'Euler : a_i = f(v_i) et v_{i+1} = v_i + a_i·Δt.\n• Mouvement du projectile : a_x = 0 (MRU) et a_y = -g (MRUV). Trajectoire parabolique y = f(x).\n• Force de Lorentz : F = q(v ∧ B). Le mouvement d'une particule chargée dans un champ B uniforme perpendiculaire est circulaire uniforme R = mv/(|q|B).",
  },

  // SVT
  {
    keywords: ["atp", "respiration", "glycolyse", "fermentation", "mitochondrie", "تنفس", "تخمر"],
    response: "🧬 **Consommation de la matière organique (SVT)** :\n\n• **Glycolyse** (hyaloplasme) : Glucose → 2 Pyruvate + 2 ATP + 2 NADH,H+ (Anaérobie).\n• **Respiration** (mitochondrie) : Cycle de Krebs + chaîne respiratoire. Bilan global : 38 ATP. Rendement ~ 40.8%.\n• **Fermentation** (cytoplasme) : Lactique ou alcoolique. Dégradation incomplète. Bilan : 2 ATP. Rendement ~ 2.1%.\n\n💡 Les crêtes mitochondriales contiennent les sphères pédonculées (ATP synthase) qui synthétisent l'ATP grâce au gradient de protons H+.",
  },
  {
    keywords: ["muscle", "sarcomere", "actine", "myosine", "myofilament", "عضلة", "تقلص"],
    response: "💪 **Le Muscle Strié (SVT)** :\n\n• Sarcomère : Unité fonctionnelle de la contraction, délimité par 2 stries Z.\n• Mécanisme : L'influx nerveux libère Ca2+ du réticulum sarcoplasmique → Ca2+ se fixe sur la troponine → démasquage des sites de liaison myosine-actine.\n• L'hydrolyse de l'ATP sur les têtes de myosine fournit l'énergie pour le pivotement des têtes (glissement d'actine vers le centre du sarcomère).\n• Voies de régénération d'ATP : Phosphocréatine (très rapide), Fermentation (moyenne), Respiration aérobie (lente, durable).",
  },
  {
    keywords: ["adn", "arn", "replication", "transcription", "traduction", "mitose", "codon", "وراثة", "جين"],
    response: "🧬 **Information Génétique & Protéines (SVT)** :\n\n• ADN : Double hélice complémentaire (A=T, C≡G). Réplication semi-conservative par l'ADN polymérase.\n• Transcription : ADN transcrit en ARNm dans le noyau par l'ARN polymérase.\n• Traduction : ARNm lu par le ribosome dans le cytoplasme. Chaque codon (3 bases) correspond à 1 acide aminé (amené par l'ARNt). Codons stop : UAA, UAG, UGA.\n\n💡 Mitose : Prophase (condensation), Métaphase (plaque équatoriale), Anaphase (ascension polaire), Télophase (division).",
  },
  {
    keywords: ["meiose", "brassage", "genetique", "crossing-over", "gamete", "انقسام اختزالي", "تخليط"],
    response: "🔄 **Méiose & Brassage Génétique (SVT)** :\n\n• Méiose : 1 division réductionnelle (2n → n, séparation des chromosomes homologues) + 1 division équationnelle (séparation des chromatides).\n• Brassage intrachromosomique : Crossing-over en Prophase I (échange de fragments de chromatides entre homologues).\n• Brassage interchromosomique : Répartition aléatoire des chromosomes homologues en Anaphase I (2^n combinaisons possibles).\n\n💡 La fécondation amplifie cette diversité en unissant aléatoirement 2 gamètes uniques.",
  },
  {
    keywords: ["mendel", "monohybridisme", "dihybridisme", "test-cross", "genes lies", "احصائية", "هجونة"],
    response: "📊 **Lois Statistiques (SVT)** :\n\n• 1ère loi de Mendel : Homogénéité de la F1 (si parents purs). Exception : gène lié au sexe.\n• Monohybridisme F2 : 3/4 et 1/4 (Dominance), 1/2, 1/4, 1/4 (Codominance), 2/3 et 1/3 (Gène létal).\n• Dihybridisme F2 : Si 9/16, 3/16, 3/16, 1/16 → gènes indépendants. Si on fait un test-cross et on a 4 phénotypes 25% → indépendants. Si % parentaux >> % recombinés → gènes liés.\n• Distance génétique : d = (% de recombinés) cM.",
  },
  {
    keywords: ["pollution", "dechet", "effet de serre", "eutrophisation", "lixiviat", "تلوث", "نفايات"],
    response: "🌍 **Pollution & Gestion des Déchets (SVT)** :\n\n• Déchets solides : Valorisation par tri, recyclage, compostage (engrais organique) ou méthanisation (production de biogaz CH4).\n• Lixiviat : Jus de déchets toxique qui pollue les nappes phréatiques.\n• Eutrophisation : Pollution des eaux par excès de nitrates et phosphates (engrais) → prolifération d'algues → asphyxie de la faune aquatique.\n• Gaz à effet de serre : CO2, CH4, CFC → Réchauffement climatique et destruction de la couche d'ozone.",
  },

  // PHILOSOPHIE
  {
    keywords: ["personne", "identite", "valeur", "liberte", "kant", "descartes", "sartre", "شخص", "هوية", "قيمة"],
    response: "🏛️ **La Personne (Philosophie)** :\n\n• Identité : Qu'est-ce qui fait que je reste le même ? Descartes : La conscience/pensée ('Cogito'). Locke : La mémoire et la conscience qui lient le passé au présent. Schopenhauer : La volonté de vivre.\n• Valeur : D'où vient la dignité humaine ? Kant : L'Homme est un être moral, une 'fin en soi' qui n'a pas de prix mais une dignité. Gusdorf : La personne n'a de valeur que dans la solidarité avec sa communauté.\n• Liberté : L'Homme est-il libre ? Sartre : Liberté absolue ('l'existence précède l'essence'). Spinoza : Illusion de liberté due à l'ignorance des causes qui nous déterminent.",
  },
  {
    keywords: ["autrui", "solipsisme", "regard", "hegel", "sympathie", "غير", "علاقة"],
    response: "🏛️ **Autrui (Philosophie)** :\n\n• Existence d'autrui : Sartre affirme qu'autrui est l'intermédiaire indispensable entre moi et moi-même. Son regard me fige en objet mais me fait exister.\n• Connaissance d'autrui : Malebranche soutient l'incommunicabilité des sentiments. Merleau-Ponty défend la possibilité de communication via la sympathie et le dialogue.\n• Relation avec autrui : Hegel explique que la relation humaine est un rapport de force et de reconnaissance (dialectique du maître et de l'esclave). Kant propose l'amitié morale fondée sur le respect.",
  },
  {
    keywords: ["histoire", "marx", "progres", "ibn khaldoun", "تاريخ", "تقدم"],
    response: "📜 **L'Histoire (Philosophie)** :\n\n• Connaissance : Ibn Khaldoun fait de l'histoire une science rigoureuse de vérification (Al-Omran). Marrou rappelle que l'histoire reste une reconstruction subjective par l'historien.\n• Progrès : Pour Hegel, l'histoire progresse vers la liberté (l'Esprit). Pour Karl Marx, le moteur de l'histoire est économique et social : c'est la lutte des classes.\n• Le rôle de l'Homme : Les hommes font-ils l'histoire ou sont-ils manipulés par elle (ruse de la raison chez Hegel) ?",
  },
  {
    keywords: ["verite", "theorie", "experience", "bachelard", "claude bernard", "حقيقة", "نظرية", "تجربة"],
    response: "🔬 **Théorie, Expérience & Vérité (Philosophie)** :\n\n• Empirisme vs Rationalisme : Claude Bernard formalise la méthode expérimentale (Observation → Hypothèse → Expérimentation → Loi). Bachelard insiste sur le fait que la science avance par rupture épistémologique contre le sens commun ('Rien n'est donné, tout est construit').\n• Critères de vérité : Évidence rationnelle (Descartes) vs Cohérence logique vs Utilité pragmatique (William James : est vrai ce qui réussit et s'avère utile en pratique).",
  },
  {
    keywords: ["etat", "pouvoir", "violence", "hobbes", "spinoza", "weber", "دولة", "سلطة", "عنف"],
    response: "⚖️ **L'État (Philosophie)** :\n\n• Légitimité : Thomas Hobbes fonde l'État sur un contrat de sécurité (le Léviathan) pour sortir de la guerre de tous contre tous. Spinoza proclame que la véritable fin de l'État est la liberté de penser et d'agir sans crainte.\n• Droit et Violence : Max Weber définit l'État moderne par son monopole de la violence physique légitime. Machiavel conseille au Prince d'allier la force du lion et la ruse du renard pour préserver le pouvoir.",
  },
  {
    keywords: ["dissertation", "methodologie", "commentaire", "texte", "philo", "منهجية", "فلسفة"],
    response: "📝 **Méthodologie Philosophie (Bac)** :\n\n1. **Introduction** (4 pts) : Situer le sujet (domaine/concept) → Définir le paradoxe (مفارقة) → Poser la problématique et les questions.\n2. **Analyse (تحليل)** (5 pts) : Dégager la thèse du texte ou du sujet → Expliquer les concepts clés → Détailler les arguments et la structure logique.\n3. **Discussion (مناقشة)** (5 pts) : Mettre en valeur la portée de la thèse → Apporter d'autres positions philosophiques (soutien ou opposition).\n4. **Synthèse (تركيب)** (3 pts) : Résumer le débat → Donner une position personnelle argumentée.\n5. **Présentation** (3 pts) : Clarté, style, transitions.",
  },

  // ANGLAIS
  {
    keywords: ["english", "anglais", "grammar", "perfect", "tenses", "will have", "had", "tenses", "reported", "passive"],
    response: "🇬🇧 **English Grammar Mastery (Anglais)** :\n\n⏰ **Tenses to look for** :\n• 'By 2030 / By next year' ⟹ Future Perfect : **will have + past participle (V3)**\n• When 2 past actions happen, the older one is Past Perfect : **had + V3**\n\n🔄 **Passive Voice** : \n• Look at the verb tense in active, put BE in that exact tense, add V3.\n• Example: 'They are building a school' → 'A school is being built by them.'\n\n🗣️ **Reported Speech** :\n• Present → Simple Past. Simple Past → Past Perfect.\n• 'I saw Ali yesterday' → He said that he had seen Ali the day before.",
  },
  {
    keywords: ["conditional", "wish", "if only", "regret", "modals", "phrasal", "linking", "words"],
    response: "🇬🇧 **Conditionals, Wishes & Linking Words (Anglais)** :\n\n🎯 **Conditionals & Wishes** :\n• Type 3 (Past regret) : If + Past Perfect, would have + V3. (If I had studied, I would have passed).\n• Past regret with Wish : I wish / If only I **had studied** harder.\n• Modals in past : You **must have** been tired (certainty). You **should have** called me (regret).\n\n🔗 **Linking Words** :\n• Contrast : Although + clause (Subject + Verb) vs Despite + Noun/V-ing.\n• Cause & Effect : Because of / Due to + Noun. Therefore / Consequently + clause.\n\n📚 **Top Phrasal Verbs** : bring about (cause), turn down (refuse), put off (postpone), look forward to (+ V-ing).",
  },
  {
    keywords: ["writing", "paragraph", "essay", "email", "letter", "in conclusion", "to begin with"],
    response: "✍️ **English Writing Tips (10 points)** :\n\nStructure is everything in writing!\n\n1. **Topic Sentence** : State clearly what the paragraph or essay is about.\n2. **Supporting Sentences** : Use linkers : 'First and foremost, ... Secondly, ... Furthermore, ... For instance, ...'\n3. **Concluding Sentence** : 'To sum up, / In conclusion, it is evident that...'\n\n💡 Make sure to check your punctuation (commas after transition words) and avoid making very long run-on sentences. Keep sentences concise (Subject + Verb + Object).",
  },

  // GENERAL & STRESS
  {
    keywords: ["stress", "khayef", "peur", "examen", "خايف", "قلق", "توتر"],
    response: "💪 **Hadi nasi7a dyali l'kolla bachelier** :\n\n• N3ass mzyan lila 9bel examen — sahar makayfid walou, l'cerveau kaykoun 3eyan.\n• 9ra l'énoncé kaml 9bel matbda.\n• Bda dima b les questions li sahlin (f maths w pc w svt kayn dima 6-8 points directes).\n• Maytah lik 9albek 3la question wahda s3iba — dima 3tiha waqt w rja3 liha mn b3d.\n• Vérifi calculs simples (signes, unités bhal kJ, MeV, ms).\n\n🇲🇦 Nta capable! Khdemti w drsti, w rabi makaydi3ch ajar dyal bnadem li drb tamara.",
  },
  {
    keywords: ["plan", "organis", "kifach", "comment", "خطة", "تنظيم"],
    response: "📅 **Plan 10 jours optimal pour toutes les matières** :\n\nKolla nhar 9sem waqt dyalk 3la 3 wla 4 matières f 2 Bac SP :\n• 2h Maths (suivi du plan du jour)\n• 2h PC (Ondes, Élec, Méca ou Chimie)\n• 1.5h SVT (Fiches de cours + analyse de doc)\n• 1h Philo wla Anglais en alternance\n\n⏰ 6h à 7h par jour f had 10 jours lakhrin hiya l'clé. Koul mzyan, n3ass 8h, w bla réseaux sociaux!",
  },
];

export function getAIResponse(userText: string): string {
  const text = userText.toLowerCase();
  
  const matches = knowledge.filter(k => 
    k.keywords.some(kw => text.includes(kw.toLowerCase()))
  );

  if (matches.length === 0) {
    return "🤖 Salam! Ana **BacBoost AI**, mssa3dek f révision 2ème BAC SP BIOF.\n\nS9siwni 3la n'importe quelle matière :\n• 📐 **Maths** : Limites, dérivées, TVI, suites, ln, exp, intégrales, complexes\n• ⚡ **Physique-Chimie** : Ondes, RLC, nucléaire, cinétique, acide-base, piles, Newton\n• 🧬 **SVT** : ATP, contraction musculaire, génétique, méiose, lois de Mendel, pollution\n• 🏛️ **Philosophie** : La personne, autrui, l'histoire, la vérité, l'État, méthodologie\n• 🇬🇧 **Anglais** : Tenses (will have+V3), passive voice, reported speech, linking words, writing\n\nWla 9oul 'stress' wla 'plan' bach n3tik nasi7a 💜";
  }

  return matches.map(m => m.response).join("\n\n━━━━━━━━━━━\n\n");
}

// Quiz questions by subject
export type QuizQ = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
};

export const quizQuestionsBySubject: Record<string, QuizQ[]> = {
  math: [
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
      question: "Forme exponentielle de z = 1 + i ?",
      options: ["√2·e^(iπ/4)", "2·e^(iπ/4)", "√2·e^(iπ/2)", "e^(iπ/4)"],
      correct: 0,
      explanation: "|z| = √2, arg(z) = π/4 (1er quadrant), donc z = √2·e^(iπ/4).",
      topic: "Complexes",
    },
    {
      question: "lim_{x→+∞} ln(x)/x = ?",
      options: ["+∞", "1", "0", "-∞"],
      correct: 2,
      explanation: "Par croissance comparée, x l'emporte sur ln(x) en +∞, donc la limite est 0.",
      topic: "Logarithme",
    },
    {
      question: "∫ e^(2x) dx = ?",
      options: ["e^(2x) + C", "2·e^(2x) + C", "1/2·e^(2x) + C", "e^(x) + C"],
      correct: 2,
      explanation: "La primitive de e^(ax) est (1/a)·e^(ax) + C.",
      topic: "Intégrales",
    },
    {
      question: "Si f''(x) > 0 sur un intervalle I, alors sur I :",
      options: ["f est décroissante", "f est concave", "f est convexe", "f est constante"],
      correct: 2,
      explanation: "Une dérivée seconde strictement positive indique que la fonction est convexe sur cet intervalle.",
      topic: "Étude de fonctions",
    },
  ],
  pc: [
    {
      question: "Quelle est la relation de l'écart angulaire de diffraction θ ?",
      options: ["θ = a / λ", "θ = λ / a", "θ = λ · a", "θ = 2λ / a"],
      correct: 1,
      explanation: "L'écart angulaire est θ = λ / a (en radians).",
      topic: "Ondes",
    },
    {
      question: "Quelle est la formule de la demi-vie radioactive t_{1/2} ?",
      options: ["t_{1/2} = λ / ln(2)", "t_{1/2} = ln(2) / λ", "t_{1/2} = 2 / λ", "t_{1/2} = λ · ln(2)"],
      correct: 1,
      explanation: "Au bout de t_{1/2}, la moitié des noyaux s'est désintégrée : t_{1/2} = ln(2) / λ.",
      topic: "Nucléaire",
    },
    {
      question: "Dans un circuit RC série, que vaut la constante de temps τ ?",
      options: ["τ = R / C", "τ = C / R", "τ = R · C", "τ = 1 / (RC)"],
      correct: 2,
      explanation: "La constante de temps d'un dipôle RC est le produit de la résistance par la capacité : τ = R · C.",
      topic: "Électricité RC",
    },
    {
      question: "Dans un circuit RLC en régime d'oscillations libres amorties, quelle énergie diminue au cours du temps ?",
      options: ["L'énergie électrique seule", "L'énergie magnétique seule", "L'énergie totale du circuit", "Aucune énergie ne diminue"],
      correct: 2,
      explanation: "À cause de la résistance totale (effet Joule), l'énergie totale (électrique + magnétique) diminue au cours du temps.",
      topic: "Électricité RLC",
    },
    {
      question: "Quelle est l'unité de l'activité radioactive dans le système international ?",
      options: ["Le Curie (Ci)", "Le Becquerel (Bq)", "Le Rutherford (Rd)", "Le Sievert (Sv)"],
      correct: 1,
      explanation: "Le Becquerel (Bq) correspond à 1 désintégration par seconde.",
      topic: "Nucléaire",
    },
    {
      question: "Comment varie le taux d'avancement final τ d'un acide faible lorsqu'on dilue la solution ?",
      options: ["Il diminue", "Il augmente", "Il reste constant", "Il s'annule"],
      correct: 1,
      explanation: "Selon la loi d'Ostwald, la dilution favorise la dissociation d'un acide ou d'une base faible, donc le taux d'avancement τ augmente.",
      topic: "Chimie Acide-Base",
    },
    {
      question: "Dans une pile électrochimique en fonctionnement, à quelle électrode a lieu l'oxydation ?",
      options: ["À l'anode (pôle -)", "À la cathode (pôle +)", "Aux deux électrodes", "Dans le pont salin"],
      correct: 0,
      explanation: "L'oxydation (perte d'électrons) a toujours lieu à l'anode, qui constitue le pôle négatif de la pile.",
      topic: "Chimie Piles",
    },
    {
      question: "Que vaut la vitesse limite v_lim pour une bille en chute verticale soumise à un frottement fluide f = -k·v ?",
      options: ["v_lim = (k·g)/m", "v_lim = (m·g)/k", "v_lim = √(m·g/k)", "v_lim = m/(k·g)"],
      correct: 1,
      explanation: "En régime permanent, l'accélération s'annule. P - f = 0 ⟹ m·g = k·v_lim ⟹ v_lim = (m·g)/k (si on néglige la poussée d'Archimède).",
      topic: "Mécanique Newton",
    },
    {
      question: "Quelle est la condition pour obtenir une bonne modulation d'amplitude ?",
      options: ["m > 1 et f_p << f_s", "m < 1 et f_p >> f_s", "m = 1 et f_p = f_s", "m > 2 et f_p < f_s"],
      correct: 1,
      explanation: "Le taux de modulation m doit être inférieur à 1 pour éviter la surmodulation, et la fréquence de la porteuse f_p doit être très supérieure à celle du signal f_s.",
      topic: "Modulation",
    },
    {
      question: "Quelle est l'expression de la force de Lorentz subie par une particule de charge q et de vitesse v dans un champ B ?",
      options: ["F = q(v · B)", "F = q(B / v)", "F = q(v ∧ B)", "F = q(v + B)"],
      correct: 2,
      explanation: "La force magnétique (Lorentz) est le produit vectoriel de la vitesse par le champ magnétique multiplié par la charge q.",
      topic: "Mouvement dans un champ B",
    },
  ],
  svt: [
    {
      question: "Quel est le bilan net d'ATP produit lors de la glycolyse d'une molécule de glucose ?",
      options: ["38 ATP", "2 ATP", "4 ATP", "36 ATP"],
      correct: 1,
      explanation: "La glycolyse produit 4 ATP mais en consomme 2 au départ, soit un bilan net de 2 ATP.",
      topic: "Consommation de matière organique",
    },
    {
      question: "Où se déroule le cycle de Krebs dans la cellule ?",
      options: ["Le hyaloplasme", "La matrice mitochondriale", "L'espace intermembranaire", "Le noyau"],
      correct: 1,
      explanation: "Le cycle de Krebs a lieu exclusivement dans la matrice des mitochondries.",
      topic: "Respiration cellulaire",
    },
    {
      question: "Quel ion déclenche la contraction musculaire en se fixant sur la troponine ?",
      options: ["Na+", "K+", "Ca2+", "Mg2+"],
      correct: 2,
      explanation: "La libération d'ions calcium Ca2+ par le réticulum sarcoplasmique permet le démasquage des sites de fixation actine-myosine.",
      topic: "Le Muscle Strié",
    },
    {
      question: "Quelle enzyme est responsable de la transcription de l'ADN en ARNm ?",
      options: ["ADN polymérase", "ARN polymérase", "Ligase", "Hélicase"],
      correct: 1,
      explanation: "L'ARN polymérase ouvre l'ADN et synthétise l'ARNm par complémentarité de bases.",
      topic: "Information génétique",
    },
    {
      question: "Lors de quelle phase de la méiose se déroule le brassage intrachromosomique (crossing-over) ?",
      options: ["Prophase I", "Métaphase I", "Anaphase I", "Prophase II"],
      correct: 0,
      explanation: "Les enjambements (crossing-over) entre chromatides homologues ont lieu en prophase de la première division méiotique.",
      topic: "Méiose et Brassage",
    },
    {
      question: "Si dans un croisement dihybride F1 × F1 on obtient les proportions 9/16, 3/16, 3/16, 1/16, on déduit que :",
      options: ["Les gènes sont liés", "Les gènes sont indépendants", "Il y a un gène létal", "L'hérédité est liée au sexe"],
      correct: 1,
      explanation: "Les proportions 9:3:3:1 sont caractéristiques de la ségrégation indépendante de deux couples d'allèles (3ème loi de Mendel).",
      topic: "Lois statistiques",
    },
    {
      question: "Comment s'appelle l'unité de mesure de la distance génétique sur une carte chromosomique ?",
      options: ["Le Nanomètre (nm)", "Le Centimorgan (cM)", "Le Micromètre (µm)", "Le Dalton (Da)"],
      correct: 1,
      explanation: "1% de crossing-over (taux de recombinaison) correspond à une distance de 1 centimorgan (cM).",
      topic: "Génétique diploïde",
    },
    {
      question: "Quel est le codon initiateur universel de la traduction qui code pour la Méthionine ?",
      options: ["UAG", "UAA", "AUG", "UGA"],
      correct: 2,
      explanation: "Le codon AUG marque le début de la traduction sur l'ARNm et apporte l'acide aminé méthionine.",
      topic: "Traduction",
    },
    {
      question: "Qu'est-ce que le lixiviat en écologie et gestion des déchets ?",
      options: ["Un gaz naturel", "Un jus de déchet liquide hautement polluant", "Un engrais bio", "Une roche calcaire"],
      correct: 1,
      explanation: "Le lixiviat (ou 'jus de décharge') résulte de la filtration de l'eau de pluie à travers les déchets, chargeant l'eau en polluants toxiques.",
      topic: "Pollution",
    },
    {
      question: "Dans le génie génétique, quel vecteur bactérien est couramment utilisé pour introduire un gène dans une plante ?",
      options: ["E. coli", "Agrobacterium tumefaciens", "Salmonella", "Lactobacillus"],
      correct: 1,
      explanation: "Le plasmide Ti de la bactérie du sol Agrobacterium tumefaciens est l'outil privilégié de transformation des végétaux.",
      topic: "Génie génétique",
    },
  ],
  philo: [
    {
      question: "Pour Descartes, sur quoi repose fondamentalement la permanence de l'identité personnelle ?",
      options: ["Le corps physique", "La mémoire du passé", "La pensée et la conscience (Cogito)", "Le regard de la société"],
      correct: 2,
      explanation: "'Je pense, donc je suis' : pour Descartes, la substance pensante assure la continuité du moi.",
      topic: "La Personne",
    },
    {
      question: "Que signifie la célèbre maxime de Kant : 'La personne est une fin en soi' ?",
      options: ["Qu'elle a un prix marchand", "Qu'elle possède une dignité absolue et ne doit pas être utilisée comme simple moyen", "Qu'elle est égoïste", "Qu'elle est soumise à la nature"],
      correct: 1,
      explanation: "La morale kantienne interdit d'instrumentaliser l'être humain, lui conférant une dignité inaliénable.",
      topic: "La Personne et la Valeur",
    },
    {
      question: "À quel philosophe attribue-t-on la citation : 'L'enfer, c'est les autres' dans sa pièce Huis clos ?",
      options: ["Jean-Paul Sartre", "Emmanuel Kant", "René Descartes", "Baruch Spinoza"],
      correct: 0,
      explanation: "Sartre souligne ici la souffrance causée par le regard d'autrui qui me chosifie et juge mes actes.",
      topic: "Autrui",
    },
    {
      question: "Dans la philosophie de Hegel, comment s'établit la conscience de soi face à autrui ?",
      options: ["Par une indifférence totale", "Par une sympathie immédiate", "Par une lutte pour la reconnaissance (Maître et Esclave)", "Par un accord juridique"],
      correct: 2,
      explanation: "Pour Hegel, la relation avec autrui passe par un affrontement dialectique où chaque conscience cherche à se faire reconnaître par l'autre.",
      topic: "Relation avec autrui",
    },
    {
      question: "Pour Karl Marx, quel est le moteur principal de l'Histoire humaine ?",
      options: ["L'intervention divine", "La lutte des classes", "La ruse de la raison", "Le hasard biologique"],
      correct: 1,
      explanation: "Selon la conception matérialiste de Marx, l'affrontement entre dominants et dominés (lutte des classes) fait évoluer la société.",
      topic: "L'Histoire",
    },
    {
      question: "Que veut dire Gaston Bachelard par 'Rien n'est donné, tout est construit' ?",
      options: ["La vérité scientifique s'élabore par le travail rationnel contre les illusions immédiates", "La science est inutile", "Les sens donnent la vérité absolue", "Tout est faux en philosophie"],
      correct: 0,
      explanation: "Bachelard rejette l'empirisme naïf : l'esprit scientifique doit rompre avec l'expérience immédiate pour construire la théorie.",
      topic: "Théorie et Expérience",
    },
    {
      question: "Dans la conception pragmatiste de William James, qu'est-ce qui définit une idée vraie ?",
      options: ["Son évidence géométrique", "Son ancienneté", "Son utilité et son efficacité concrète dans l'action", "Son esthétique"],
      correct: 2,
      explanation: "Le pragmatisme évalue la vérité d'une idée à ses conséquences pratiques bénéfiques et à sa capacité à résoudre des problèmes réels.",
      topic: "La Vérité",
    },
    {
      question: "Selon Max Weber, quelle est la spécificité de l'État moderne ?",
      options: ["Le partage fraternel des biens", "Le monopole de la violence physique légitime", "L'absence totale de lois", "L'égalité parfaite des revenus"],
      correct: 1,
      explanation: "Weber montre que seul l'État a le droit d'utiliser la force de contrainte (police, armée, justice) de manière reconnue légale sur son territoire.",
      topic: "L'État",
    },
    {
      question: "Dans l'épreuve philosophique du Bac, quel est le rôle premier de l'introduction ?",
      options: ["Donner son avis personnel final", "Recopier le texte sans réfléchir", "Mettre en évidence le paradoxe (مفارقة) et formuler la problématique", "Citer 10 dates historiques"],
      correct: 2,
      explanation: "L'introduction doit problématiser le sujet en dégageant la tension interne (paradoxe) qui justifie le débat philosophique.",
      topic: "Méthodologie",
    },
    {
      question: "Que défend Spinoza concernant le rôle et le but ultime de l'État dans son Traité théologico-politique ?",
      options: ["L'asservissement des citoyens", "La gloire militaire du Prince", "La liberté de penser et de s'exprimer dans la paix", "La suppression de la propriété"],
      correct: 2,
      explanation: "Pour Spinoza, l'État ne vise pas à transformer les hommes en bêtes, mais à leur garantir la sécurité pour jouir pleinement de leur liberté de raison.",
      topic: "L'État et la Liberté",
    },
  ],
  eng: [
    {
      question: "'By 2030, Morocco _________ new high-speed train lines.' Which verb form is correct?",
      options: ["will build", "will have built", "built", "is building"],
      correct: 1,
      explanation: "The expression 'By + future time' requires Future Perfect : will have + past participle.",
      topic: "Grammar: Tenses",
    },
    {
      question: "'When the police arrived, the thieves _________ away.'",
      options: ["had already run", "ran", "were running", "run"],
      correct: 0,
      explanation: "When two actions occur in the past, the earlier completed action takes the Past Perfect (had + past participle).",
      topic: "Grammar: Tenses",
    },
    {
      question: "Active: 'The company launched a new app.' Transform to Passive:",
      options: ["A new app is launched by the company.", "A new app was launched by the company.", "A new app has been launched by the company.", "A new app launched the company."],
      correct: 1,
      explanation: "The active verb 'launched' is simple past. In passive, we use past BE ('was') + past participle ('launched').",
      topic: "Grammar: Passive Voice",
    },
    {
      question: "Direct: 'I am doing my homework,' Sara said. Reported Speech:",
      options: ["Sara said that she is doing her homework.", "Sara said that she was doing her homework.", "Sara said that she had done her homework.", "Sara said I was doing my homework."],
      correct: 1,
      explanation: "Present continuous shifts back to past continuous when reporting in the past : am doing → was doing.",
      topic: "Grammar: Reported Speech",
    },
    {
      question: "'_________ having a lot of money, Mr. Karim lives a very modest life.'",
      options: ["Although", "Because", "Despite", "Therefore"],
      correct: 2,
      explanation: "'Despite' is followed by a noun phrase or a gerund (V-ing), whereas 'Although' requires a full subject+verb clause.",
      topic: "Linking Words",
    },
    {
      question: "Which phrasal verb means 'to refuse an offer or invitation'?",
      options: ["Turn down", "Bring about", "Put off", "Set up"],
      correct: 0,
      explanation: "'Turn down' means to reject or decline an offer/invitation.",
      topic: "Phrasal Verbs",
    },
    {
      question: "Conditional Type 3: 'If Salma _________ hard, she would have got a better grade.'",
      options: ["studied", "had studied", "studies", "would study"],
      correct: 1,
      explanation: "Third conditional expresses unreal past situations : If + Past Perfect (had studied) , would have + V3.",
      topic: "Conditionals",
    },
    {
      question: "'I failed my driving test yesterday. I wish I _________ more careful.'",
      options: ["was", "had been", "am", "would be"],
      correct: 1,
      explanation: "To express regret about a past situation with 'I wish / If only', we use the Past Perfect (had + past participle).",
      topic: "Wishes and Regret",
    },
    {
      question: "What is the primary function of a 'Topic Sentence' in a well-written paragraph?",
      options: ["To summarize the entire essay", "To introduce the main idea of that specific paragraph", "To provide statistical numbers", "To say goodbye to the reader"],
      correct: 1,
      explanation: "The topic sentence tells the reader exactly what the central point or theme of the paragraph will be.",
      topic: "Writing Skills",
    },
    {
      question: "'Ahmed got a terrible grade in math. He _________ have studied at all!'",
      options: ["must", "should", "can't", "will"],
      correct: 2,
      explanation: "'Can't have + V3' is used for a strong logical deduction in the past expressing impossibility.",
      topic: "Modals in the Past",
    },
  ],
};
