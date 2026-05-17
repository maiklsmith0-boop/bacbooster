import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import { subjects, getSubject, defaultSubjectId } from "./data/subjects";

const STORAGE_KEY = "bacboost-completed";
const SUBJECT_KEY = "bacboost-current-subject";

export default function App() {
  const [currentSubjectId, setCurrentSubjectId] = useState<string>(() => {
    return localStorage.getItem(SUBJECT_KEY) || defaultSubjectId;
  });
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const currentSubject = getSubject(currentSubjectId);

  useEffect(() => {
    localStorage.setItem(SUBJECT_KEY, currentSubjectId);
  }, [currentSubjectId]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setCompleted(JSON.parse(raw));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const toggleChapter = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const progress = useMemo(() => {
    const total = currentSubject.chapters.length;
    const done = currentSubject.chapters.filter((c) => completed[c.id]).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [completed, currentSubject]);

  const changeSubject = (id: string) => {
    setCurrentSubjectId(id);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen relative bg-[#07060d] text-[#e6e6f0] flex flex-col justify-between">
        <Navbar 
          currentSubject={currentSubject} 
          onChangeSubject={changeSubject} 
          subjects={subjects} 
        />
        <div className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  currentSubject={currentSubject} 
                  completed={completed} 
                  toggleChapter={toggleChapter} 
                  progress={progress} 
                />
              } 
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<ArticleDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
