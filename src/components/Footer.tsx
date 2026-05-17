export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center font-black">∫</div>
          <span className="font-black text-lg">BacBoost <span className="text-gradient">AI</span></span>
        </div>
        <p className="text-sm text-white/40 mb-2">
          Made with 💜 pour les bacheliers marocains · Données pédagogiques de{" "}
          <a href="https://www.alloschool.com" target="_blank" rel="noopener" className="text-violet-300 hover:underline">
            AlloSchool
          </a>
        </p>
        <p className="text-xs text-white/30">
          🇲🇦 Bonne chance f l'examen national! Nta capable. 💪
        </p>
      </div>
    </footer>
  );
}
