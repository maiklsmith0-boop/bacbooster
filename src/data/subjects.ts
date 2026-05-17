export type Subject = {
  id: string;
  name: string;
  nameAr: string;
  emoji: string;
  color: string;
  chapters: Chapter[];
  plan: Day[];
  aiPrompt: string;
};

export type Chapter = {
  id: string;
  title: string;
  titleAr: string;
  semester: 1 | 2;
  difficulty: 1 | 2 | 3;
  estimatedHours: number;
  keyPoints: string[];
  formulas: string[];
  link?: string;
  docUrl?: string;
  pdfUrl?: string;
  coursUrl?: string;
};

export type Day = {
  day: number;
  theme: string;
  themeAr: string;
  color: string;
  chapterIds: string[];
  tip: string;
  focus: string;
};

export const subjects: Subject[] = [
  {
    id: "math",
    name: "Mathématiques",
    nameAr: "الرياضيات",
    emoji: "📐",
    color: "from-violet-500 to-fuchsia-600",
    chapters: [
      { id: "limites", title: "Limites et Dérivation", titleAr: "النهايات والاشتقاق", semester: 1, difficulty: 1, estimatedHours: 2, keyPoints: ["Formes indéterminées", "Dérivées usuelles"], formulas: ["lim sinx/x=1", "(uv)'=u'v+uv'"], link: "https://www.alloschool.com/element/122859" },
      { id: "continuite", title: "Continuité & TVI", titleAr: "الاتصال", semester: 1, difficulty: 2, estimatedHours: 3, keyPoints: ["Définition continuité", "Théorème Valeurs Intermédiaires"], formulas: ["f(a)·f(b)<0 ⇒ ∃c f(c)=0"], link: "https://www.alloschool.com/element/122860" },
      { id: "etude_fonctions", title: "Étude des Fonctions", titleAr: "دراسة الدوال", semester: 1, difficulty: 3, estimatedHours: 4, keyPoints: ["Tableau de variations", "Asymptotes", "Convexité"], formulas: ["f'' > 0 ⇒ convexe"], link: "https://www.alloschool.com/element/122862" },
      { id: "suites", title: "Suites Numériques", titleAr: "المتتاليات", semester: 1, difficulty: 2, estimatedHours: 2.5, keyPoints: ["Convergence", "Monotonie"], formulas: ["u_{n+1}=f(u_n)"], link: "https://www.alloschool.com/element/122864" },
      { id: "log_exp", title: "Log & Exponentielle", titleAr: "لوغاريتم و أسية", semester: 1, difficulty: 3, estimatedHours: 3, keyPoints: ["ln & exp propriétés"], formulas: ["(ln u)' = u'/u"], link: "https://www.alloschool.com/element/122866" },
      { id: "integrale", title: "Calcul Intégral", titleAr: "التكامل", semester: 2, difficulty: 3, estimatedHours: 4, keyPoints: ["Primitives", "IPP"], formulas: ["∫u'v = uv - ∫uv'"], link: "https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques-biof" },
      { id: "complexes", title: "Nombres Complexes", titleAr: "الأعداد العقدية", semester: 2, difficulty: 3, estimatedHours: 3.5, keyPoints: ["Module, argument", "Forme trigonométrique"], formulas: ["Moivre"], link: "https://www.alloschool.com/element/122870" },
    ],
    plan: [
      { day: 1, theme: "Limites & Continuité", themeAr: "النهايات والاتصال", color: "from-violet-500 to-purple-600", chapterIds: ["limites", "continuite"], tip: "Bda b les bases — très important.", focus: "Maîtriser les formes indéterminées et TVI" },
      { day: 2, theme: "Étude des Fonctions", themeAr: "دراسة الدوال", color: "from-fuchsia-500 to-pink-600", chapterIds: ["etude_fonctions"], tip: "Apprends le plan d'étude par cœur.", focus: "Variations, asymptotes, concavité" },
      { day: 3, theme: "Suites & Log/Exponentielle", themeAr: "المتتاليات والأسية", color: "from-cyan-500 to-blue-600", chapterIds: ["suites", "log_exp"], tip: "Compare croissance ln, x, exp.", focus: "Récurrence et primitives" },
      { day: 4, theme: "Intégrales", themeAr: "التكامل", color: "from-emerald-500 to-teal-600", chapterIds: ["integrale"], tip: "Maîtrise IPP et changement de variable.", focus: "Aires et primitives" },
      { day: 5, theme: "Nombres Complexes", themeAr: "الأعداد العقدية", color: "from-amber-500 to-orange-600", chapterIds: ["complexes"], tip: "Géométrie + Moivre = clé.", focus: "Rotations et racines" },
      { day: 6, theme: "Révision Math 1er Semestre", themeAr: "مراجعة النصف الأول", color: "from-rose-500 to-red-600", chapterIds: ["limites", "continuite", "etude_fonctions"], tip: "Refais 3 examens nationaux.", focus: "Exercices mixtes" },
      { day: 7, theme: "Révision Intégrales + Suites", themeAr: "التكامل والمتتاليات", color: "from-purple-500 to-violet-600", chapterIds: ["integrale", "suites"], tip: "Mélange les chapitres.", focus: "Problèmes complets" },
      { day: 8, theme: "Complexes Avancés", themeAr: "العقدية المتقدمة", color: "from-indigo-500 to-blue-600", chapterIds: ["complexes"], tip: "Fais des transformations géométriques.", focus: "Euler & Moivre" },
      { day: 9, theme: "Examen Blanc Math", themeAr: "امتحان وطني", color: "from-pink-500 to-rose-600", chapterIds: ["etude_fonctions", "integrale", "complexes"], tip: "3 heures chrono.", focus: "Simulation réelle" },
      { day: 10, theme: "Révision Finale & Points Faibles", themeAr: "المراجعة النهائية", color: "from-violet-500 to-fuchsia-600", chapterIds: ["limites", "log_exp", "integrale"], tip: "Concentre-toi sur tes points faibles.", focus: "Flashcards + formules" },
    ],
    aiPrompt: "Tu es un professeur de Mathématiques 2 BAC Sciences Physiques BIOF. Réponds toujours en mélange de français et darija marocain.",
  },
  {
    id: "pc",
    name: "Physique & Chimie",
    nameAr: "الفيزياء والكيمياء",
    emoji: "⚛️",
    color: "from-blue-500 to-cyan-600",
    chapters: [
      { id: "ondes", title: "Ondes Mécaniques Progressives", titleAr: "الموجات الميكانيكية", semester: 1, difficulty: 2, estimatedHours: 3, keyPoints: ["Équation de propagation", "Vitesse, période, longueur d'onde"], formulas: ["v = f·λ", "y = A sin(2π(ft - x/λ))"], link: "https://www.alloschool.com/course/physique-et-chimie-2eme-bac-sciences-physiques-biof" },
      { id: "rlc", title: "Circuits RLC", titleAr: "دوائر RLC", semester: 1, difficulty: 3, estimatedHours: 4, keyPoints: ["Impédance", "Résonance"], formulas: ["Z = R + j(Lω - 1/Cω)"], link: "https://www.alloschool.com/course/physique-et-chimie-2eme-bac-sciences-physiques-biof" },
      { id: "mouvement", title: "Mouvements Plan", titleAr: "الحركة في المستوى", semester: 1, difficulty: 2, estimatedHours: 3, keyPoints: ["Projectile", "Champ magnétique"], formulas: ["F = q(v × B)"], link: "https://www.alloschool.com/course/physique-et-chimie-2eme-bac-sciences-physiques-biof" },
      { id: "chimie_cinetique", title: "Cinétique Chimique", titleAr: "الحركية الكيميائية", semester: 2, difficulty: 3, estimatedHours: 3.5, keyPoints: ["Vitesse de réaction", "Ordre"], formulas: ["v = k [A]^m [B]^n"], link: "https://www.alloschool.com/course/physique-et-chimie-2eme-bac-sciences-physiques-biof" },
      { id: "piles", title: "Piles & Électrolyse", titleAr: "البطاريات والتحليل الكهربائي", semester: 2, difficulty: 2, estimatedHours: 2.5, keyPoints: ["Potentiel d'électrode", "Lois de Faraday"], formulas: ["ΔG = -nFE"], link: "https://www.alloschool.com/course/physique-et-chimie-2eme-bac-sciences-physiques-biof" },
    ],
    plan: [
      { day: 1, theme: "Ondes", themeAr: "الموجات", color: "from-blue-500 to-cyan-500", chapterIds: ["ondes"], tip: "Hfed l'équation de la sinusoïde.", focus: "Interférences et diffraction" },
      { day: 2, theme: "Circuits Oscillants", themeAr: "الدوائر المتذبذبة", color: "from-cyan-500 to-sky-600", chapterIds: ["rlc"], tip: "La résonance est très demandée.", focus: "Facteur de qualité Q" },
      { day: 3, theme: "Mécanique Newtonienne Avancée", themeAr: "الميكانيكا", color: "from-sky-500 to-blue-600", chapterIds: ["mouvement"], tip: "Projectile + champ B = classique.", focus: "Mouvement dans champ E et B" },
      { day: 4, theme: "Cinétique Chimique", themeAr: "الحركية الكيميائية", color: "from-purple-500 to-pink-600", chapterIds: ["chimie_cinetique"], tip: "Ordre global et demi-vie.", focus: "Mécanisme réactionnel" },
      { day: 5, theme: "Électrochimie", themeAr: "الكيمياء الكهربائية", color: "from-rose-500 to-red-600", chapterIds: ["piles"], tip: "Pile vs électrolyse.", focus: "Pile Daniell, loi de Faraday" },
      { day: 6, theme: "Révision Physique 1", themeAr: "مراجعة الفيزياء", color: "from-blue-500 to-indigo-600", chapterIds: ["ondes", "rlc"], tip: "Exercices de régime sinusoïdal.", focus: "RLC série et parallèle" },
      { day: 7, theme: "Révision Chimie", themeAr: "مراجعة الكيمياء", color: "from-violet-500 to-purple-600", chapterIds: ["chimie_cinetique", "piles"], tip: "Mélange cinétique + piles.", focus: "Calculs d'enthalpie et entropie" },
      { day: 8, theme: "Ondes + Mouvements", themeAr: "موجات وحركات", color: "from-cyan-500 to-teal-600", chapterIds: ["ondes", "mouvement"], tip: "Exercices mixtes.", focus: "Applications technologiques" },
      { day: 9, theme: "Examen Blanc PC", themeAr: "امتحان وطني فيزياء وكيمياء", color: "from-pink-500 to-rose-600", chapterIds: ["rlc", "chimie_cinetique", "piles"], tip: "3h sous conditions d'examen.", focus: "Simulation complète" },
      { day: 10, theme: "Synthèse Finale PC", themeAr: "المراجعة الشاملة", color: "from-blue-500 to-cyan-600", chapterIds: ["ondes", "rlc", "piles"], tip: "Fais des fiches de formules.", focus: "Points faibles identifiés" },
    ],
    aiPrompt: "Tu es un professeur de Physique et Chimie pour 2 BAC Sciences Physiques. Réponds en français/darija avec formules et schémas textuels.",
  },
  {
    id: "svt",
    name: "SVT",
    nameAr: "علوم الحياة والأرض",
    emoji: "🧬",
    color: "from-emerald-500 to-teal-600",
    chapters: [
      { id: "genetique", title: "Génétique & ADN", titleAr: "الوراثة والدنا", semester: 1, difficulty: 2, estimatedHours: 3.5, keyPoints: ["Réplication, transcription, traduction"], formulas: ["Code génétique"], link: "https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-svt-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof" },
      { id: "immunologie", title: "Immunologie", titleAr: "المناعة", semester: 1, difficulty: 3, estimatedHours: 3, keyPoints: ["Réponse immunitaire spécifique"], formulas: ["Antigène-Anticorps"], link: "https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-svt-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof" },
      { id: "ecologie", title: "Écologie & Flux d'énergie", titleAr: "البيئة وتدفق الطاقة", semester: 2, difficulty: 2, estimatedHours: 2.5, keyPoints: ["Chaînes alimentaires", "Pyramides écologiques"], formulas: ["Productivité primaire"], link: "https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-svt-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof" },
      { id: "geologie", title: "Géologie & Tectonique", titleAr: "الجيولوجيا والصفائح", semester: 2, difficulty: 3, estimatedHours: 3, keyPoints: ["Tectonique des plaques", "Orogénèse"], formulas: ["Subduction, rift"], link: "https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-svt-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof" },
      { id: "evolution", title: "Évolution & Génétique des Populations", titleAr: "التطور", semester: 2, difficulty: 3, estimatedHours: 3, keyPoints: ["Sélection naturelle", "Hardy-Weinberg"], formulas: ["p² + 2pq + q² = 1"], link: "https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-svt-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof" },
    ],
    plan: [
      { day: 1, theme: "Génétique Moléculaire", themeAr: "الوراثة الجزيئية", color: "from-emerald-500 to-cyan-600", chapterIds: ["genetique"], tip: "Maîtrise transcription et traduction.", focus: "Code génétique et mutations" },
      { day: 2, theme: "Immunologie", themeAr: "المناعة", color: "from-teal-500 to-green-600", chapterIds: ["immunologie"], tip: "Différence entre immunité innée et acquise.", focus: "Lymphocytes B et T" },
      { day: 3, theme: "Écologie", themeAr: "علم البيئة", color: "from-lime-500 to-emerald-600", chapterIds: ["ecologie"], tip: "Pyramides et flux d'énergie.", focus: "Écosystèmes et biodiversité" },
      { day: 4, theme: "Tectonique des Plaques", themeAr: "التكتونية", color: "from-cyan-500 to-blue-600", chapterIds: ["geologie"], tip: "Les 3 types de limites de plaques.", focus: "Séismes et volcans" },
      { day: 5, theme: "Évolution", themeAr: "نظرية التطور", color: "from-green-500 to-emerald-600", chapterIds: ["evolution"], tip: "Hardy-Weinberg très important.", focus: "Mécanismes de l'évolution" },
      { day: 6, theme: "Révision Génétique + Immuno", themeAr: "مراجعة الوراثة والمناعة", color: "from-teal-500 to-cyan-600", chapterIds: ["genetique", "immunologie"], tip: "Fais des schémas.", focus: "Biotechnologies" },
      { day: 7, theme: "Écologie & Géologie", themeAr: "البيئة والجيولوجيا", color: "from-emerald-500 to-teal-600", chapterIds: ["ecologie", "geologie"], tip: "Relie tectonique et climat.", focus: "Cycle du carbone" },
      { day: 8, theme: "Synthèse SVT 1er Semestre", themeAr: "مراجعة النصف الأول", color: "from-green-500 to-lime-600", chapterIds: ["genetique", "immunologie"], tip: "Exercices de QCM.", focus: "Génétique humaine" },
      { day: 9, theme: "Examen Blanc SVT", themeAr: "امتحان وطني SVT", color: "from-emerald-500 to-cyan-600", chapterIds: ["evolution", "geologie", "ecologie"], tip: "3 heures.", focus: "Simulation d'examen" },
      { day: 10, theme: "Révision Finale SVT", themeAr: "المراجعة الشاملة", color: "from-teal-500 to-emerald-600", chapterIds: ["genetique", "evolution"], tip: "Revois toutes tes fiches.", focus: "Points clés + schémas" },
    ],
    aiPrompt: "Tu es un professeur de SVT (Sciences de la Vie et de la Terre) pour 2 BAC BIOF. Explique avec des schémas textuels et exemples concrets en darija/français.",
  },
];

export const getSubject = (id: string): Subject => {
  return subjects.find(s => s.id === id) || subjects[0];
};

export const defaultSubjectId = "math";
