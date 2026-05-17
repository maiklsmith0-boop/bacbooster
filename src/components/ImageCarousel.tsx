import { useState, useEffect, useRef } from "react";

type CarouselProps = {
  images: string[];
  heightClass?: string;
};

export default function ImageCarousel({ images, heightClass = "h-48" }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isInteracting.current) return;
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length;
        if (scrollRef.current) {
          const width = scrollRef.current.clientWidth;
          scrollRef.current.scrollTo({
            left: width * next,
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    const scrollLeft = scrollRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div 
      className={`relative w-full ${heightClass} rounded-2xl overflow-hidden group bg-white/5 border border-white/10`}
      onMouseEnter={() => (isInteracting.current = true)}
      onMouseLeave={() => (isInteracting.current = false)}
      onTouchStart={() => (isInteracting.current = true)}
      onTouchEnd={() => {
        setTimeout(() => (isInteracting.current = false), 3000);
      }}
    >
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="w-full h-full flex-shrink-0 snap-center relative"
          >
            <img 
              src={src} 
              alt={`Slide ${idx + 1}`} 
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07060d]/60 via-transparent to-transparent opacity-60" />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "w-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/50" 
                : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
