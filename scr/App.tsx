import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PlanSection from "./components/PlanSection";
import AITutor from "./components/AITutor";
import Quiz from "./components/Quiz";
import Resources from "./components/Resources";
import Footer from "./components/Footer";
import { subjectsData, Subject } from "./data/subjects";

const STORAGE_KEY = "bacboost-completed-2";

export default function App() {
  const [activeSubKey, setActiveSubKey] = useState<"math" | "pc" | "svt" | "philo" | "eng">("math");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const currentSub: Subject = subjectsData[activeSubKey] || subjectsData.math;

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setCompleted(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const toggle = (id: string) => {
    setCompleted((c) => ({ ...c, [id]: !c[id] }));
  };

  const progress = useMemo(() => {
    const total = currentSub.chapters.length;
    if (total === 0) return 100;
    const done = currentSub.chapters.filter((c) => completed[c.id]).length;
    return Math.round((done / total) * 100);
  }, [completed, currentSub]);

  return (
    <div className="min-h-screen relative bg-[#07060d] text-[#e6e6f0]">
      <Navbar activeSub={activeSubKey} setActiveSub={setActiveSubKey} />
      <Hero progress={progress} subject={currentSub} />
      <PlanSection subject={currentSub} completed={completed} toggle={toggle} />
      <AITutor />
      <Quiz activeSub={activeSubKey} />
      <Resources subject={currentSub} />
      <Footer />
    </div>
  );
}
