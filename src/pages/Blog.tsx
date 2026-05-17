import { Link } from "react-router-dom";
import { blogArticles } from "../data/blogArticles";
import ImageCarousel from "../components/ImageCarousel";

export default function Blog() {
  return (
    <main className="pt-28 pb-20 relative px-6 max-w-7xl mx-auto">
      {/* Background glowing effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold mb-4 shadow-lg shadow-violet-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          نصائح وتوجيهات حصرية لطلاب الباكالوريا
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          مدونة <span className="text-gradient">BacBoost</span> للتفوق
        </h1>
        <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
          مقالات عملية، نصائح ذهبية، واستراتيجيات مجربة باش توجد للوطني بذكاء وبلا ضغط نفسي. كولشي مكتوب بالدارجة باش تفهم مزيان وتطبق ديريكت.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {blogArticles.map((article) => (
          <article 
            key={article.slug}
            className="flex flex-col bg-white/[0.03] border border-white/10 hover:border-violet-500/40 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 group"
          >
            {/* Carousel Section */}
            <div className="p-3 pb-0">
              <ImageCarousel images={article.images} heightClass="h-56" />
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">
                    {article.category}
                  </span>
                  <span className="text-xs text-white/50 flex items-center gap-1 font-medium">
                    <span>⏱️</span> {article.readingTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-snug text-right dir-rtl">
                  {article.title}
                </h2>

                <p className="text-white/70 text-sm leading-relaxed mb-6 text-right dir-rtl">
                  {article.shortDescription}
                </p>
              </div>

              {/* Motivational Quote & Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-bold text-fuchsia-300 italic text-right sm:text-left dir-rtl">
                  "{article.motivationalQuote}"
                </div>

                <Link 
                  to={`/blog/${article.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 group-hover:scale-[1.02]"
                >
                  <span>قرأ المقال</span>
                  <span className="text-lg leading-none">←</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Motivational Banner */}
      <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-violet-900/30 via-fuchsia-900/20 to-cyan-900/30 border border-white/10 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
          الوطني كيبغي الاستمرارية والتركيز 🎯
        </h3>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
          ما تضغطش على راسك كثر من القياس، خذ وقتك فالمراجعة وتبع المنهجية الصحيحة. حنا معاك حتى لنهار الامتحان!
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all shadow-lg hover:scale-105"
        >
          <span>رجع لجدول المراجعة (10 أيام)</span>
          <span>🚀</span>
        </Link>
      </div>
    </main>
  );
}
