import Hero from "../components/Hero";
import PlanSection from "../components/PlanSection";
import AITutor from "../components/AITutor";
import Quiz from "../components/Quiz";
import Resources from "../components/Resources";
import { type Subject } from "../data/subjects";

type HomeProps = {
  currentSubject: Subject;
  completed: Record<string, boolean>;
  toggleChapter: (id: string) => void;
  progress: number;
};

export default function Home({ currentSubject, completed, toggleChapter, progress }: HomeProps) {
  return (
    <main>
      <Hero progress={progress} currentSubject={currentSubject} />
      <PlanSection 
        subject={currentSubject} 
        completed={completed} 
        toggle={toggleChapter} 
      />
      <AITutor subject={currentSubject} />
      <Quiz subject={currentSubject} />
      <Resources subject={currentSubject} />
    </main>
  );
}
