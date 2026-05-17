import { Link, useLocation } from "react-router-dom";
import { type Subject } from "../data/subjects";

type NavbarProps = {
  currentSubject: Subject;
  onChangeSubject: (id: string) => void;
  subjects: Subject[];
};

export default function Navbar({ currentSubject, onChangeSubject, subjects }: NavbarProps) {
  const location = useLocation();
  const isBlog = location.pathname.startsWith("/blog");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#07060d]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-lg sm:text-2xl shadow-xl group-hover:scale-105 transition-transform">
              {isBlog ? "📝" : currentSubject.emoji}
            </div>
            <div>
              <div className="font-black text-xl sm:text-2xl tracking-tighter text-white flex items-center gap-1">
                <span>BacBoost</span> <span className="text-gradient">AI</span>
              </div>
              <div className="text-[10px] sm:text-xs text-white/50 -mt-1 hidden xs:block">
                {isBlog ? "مدونة التفوق فالبكالوريا" : "2 BAC SP & BIOF • 10 Jours"}
              </div>
            </div>
          </Link>

          {/* Main Navigation & Subject Tabs */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none py-1">
            {!isBlog ? (
              // Subject Tabs on Home Page
              <div className="flex items-center gap-1 bg-white/5 rounded-2xl p-1 border border-white/10 shrink-0">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => onChangeSubject(subject.id)}
                    className={`px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                      currentSubject.id === subject.id 
                        ? "bg-white text-black shadow font-bold" 
                        : "hover:bg-white/10 text-white/70"
                    }`}
                  >
                    <span>{subject.emoji}</span>
                    <span className="whitespace-nowrap">{subject.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              // Back to Home Link on Blog Page
              <Link
                to="/"
                className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all flex items-center gap-2 shrink-0"
              >
                <span>🏠</span>
                <span>الرئيسية (جدول المراجعة)</span>
              </Link>
            )}

            {/* Blog Button */}
            {!isBlog && (
              <Link
                to="/blog"
                className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 transition-all flex items-center gap-1.5 shrink-0 animate-pulse-slow"
              >
                <span>📝</span>
                <span className="whitespace-nowrap">مدونة الباك</span>
              </Link>
            )}

            {/* AlloSchool Link */}
            <a
              href="https://www.alloschool.com"
              target="_blank"
              rel="noopener"
              className="text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 hover:bg-white/5 text-white/70 hover:text-white flex items-center gap-1.5 transition shrink-0 hidden md:flex"
            >
              <span>📚</span>
              <span className="hidden sm:inline">AlloSchool</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
