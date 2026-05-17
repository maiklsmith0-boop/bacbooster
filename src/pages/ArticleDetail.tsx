import { useParams, Link } from "react-router-dom";
import { blogArticles } from "../data/blogArticles";
import ImageCarousel from "../components/ImageCarousel";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="pt-36 pb-20 px-6 text-center max-w-2xl mx-auto min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-black text-white mb-4">المقال غير موجود</h1>
        <p className="text-white/60 mb-8">عذراً، المقال لي كتقلب عليه ما كاينش أو تم حذفه.</p>
        <Link 
          to="/blog" 
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold transition-all shadow-lg hover:opacity-90"
        >
          رجع لمدونة BacBoost
        </Link>
      </main>
    );
  }

  // Related articles (filter out current)
  const relatedArticles = blogArticles.filter((a) => a.slug !== article.slug);

  return (
    <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 blur-3xl rounded-full pointer-events-none" />

      {/* Back Button */}
      <div className="mb-8 relative z-10 flex justify-end">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition-all text-sm font-medium"
        >
          <span>←</span>
          <span>رجوع للمدونة</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-10 text-right dir-rtl relative z-10">
        <div className="flex items-center justify-end gap-3 mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">
            {article.category}
          </span>
          <span className="text-xs text-white/50 flex items-center gap-1 font-medium">
            <span>⏱️</span> {article.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
          {article.title}
        </h1>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 inline-block mb-2">
          <p className="text-sm font-bold text-fuchsia-300 italic m-0">
            💡 "{article.motivationalQuote}"
          </p>
        </div>
      </header>

      {/* Hero Carousel */}
      <div className="mb-12 relative z-10 shadow-2xl rounded-3xl overflow-hidden border border-white/10">
        <ImageCarousel images={article.images} heightClass="h-64 sm:h-80 md:h-96" />
      </div>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none text-right dir-rtl relative z-10 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 mb-16 shadow-xl">
        {/* Intro */}
        <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 font-medium border-r-4 border-violet-500 pr-4 py-1 bg-violet-500/5 rounded-l-xl">
          {article.content.intro}
        </p>

        {/* Sections */}
        <div className="space-y-12">
          {article.content.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white text-gradient inline-block mb-3 border-b border-white/10 pb-2">
                {sec.heading}
              </h2>
              <ul className="space-y-3 pr-4 list-none">
                {sec.points.map((pt, pIdx) => (
                  <li key={pIdx} className="text-white/80 leading-relaxed text-base sm:text-lg flex items-start gap-3">
                    <span className="text-violet-400 font-bold select-none text-lg leading-none mt-1">▪</span>
                    <span className="flex-1">{pt}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">خلاصة القول 🎯</h3>
          <p className="text-white/80 leading-relaxed text-base sm:text-lg bg-white/5 p-6 rounded-2xl border border-white/10">
            {article.content.conclusion}
          </p>
        </div>
      </article>

      {/* Related Articles Section */}
      <section className="relative z-10 border-t border-white/10 pt-16">
        <div className="flex items-center justify-between mb-8 text-right dir-rtl">
          <Link 
            to="/blog" 
            className="text-sm text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>شوف كاع المقالات</span>
            <span>←</span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black text-white">مقالات أخرى تهمك 📚</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {relatedArticles.map((rel) => (
            <div 
              key={rel.slug} 
              className="bg-white/[0.03] border border-white/10 hover:border-violet-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col group"
            >
              <div className="p-2 pb-0">
                <ImageCarousel images={rel.images} heightClass="h-44" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between text-right dir-rtl">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">
                      {rel.category}
                    </span>
                    <span className="text-xs text-white/50">⏱️ {rel.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                    {rel.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <Link 
                    to={`/blog/${rel.slug}`} 
                    className="text-xs font-bold text-fuchsia-300 group-hover:text-fuchsia-200 flex items-center gap-1 transition-colors"
                  >
                    <span>قرأ المقال</span>
                    <span>←</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
