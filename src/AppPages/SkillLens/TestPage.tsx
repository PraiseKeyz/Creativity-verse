import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string; // correct answer (mock for now)
};

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Transfer Markup Language",
      "Hyperlink and Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    id: 2,
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
  },
  {
    id: 3,
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: "Facebook",
  },
];

const TestPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve from location.state or fallback to localStorage
  const storedData = JSON.parse(localStorage.getItem("skillLensData") || "{}");
  const { skill, level, name } = (location.state as any) || storedData;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isEnded, setIsEnded] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      endTest("⏰ Time’s up! Your test has ended.");
      return;
    }
    if (!isEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isEnded]);

  // Detect tab switch or minimize
  useEffect(() => {
    const handleBlur = () => {
      if (!isEnded) {
        endTest("❌ Test ended because you minimized/switched tab.");
      }
    };

    if (!isEnded) {
      window.addEventListener("blur", handleBlur);
    }
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [isEnded]);

  // Kick out if no onboarding data
  useEffect(() => {
    const storedData = localStorage.getItem("skillLensData");
    if (!storedData) {
      navigate("/verse/skill-lens/onboarding");
    }
  }, [navigate]);

  const endTest = (msg: string) => {
    if (isEnded) return; // prevent double triggers
    setIsEnded(true);
      window.removeEventListener("blur", () => {});

    // Clear localStorage after test ends
    localStorage.removeItem("skillLensData");

    alert(msg);
    navigate("/verse/skill-lens"); // redirect to main page if force-ended
  };

  const handleAnswer = (qId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    let score = 0;
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) score++;
    });

    setIsEnded(true);
    localStorage.removeItem("skillLensData");

    // Navigate to result page with data
    navigate(`/verse/skill-lens/result/${id}`, {
      state: { name, skill, level, score, total: mockQuestions.length },
    });
  };

  // Format timer mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <h1 className="text-2xl font-bold mb-2">SkillLens Test</h1>
      <p className="text-gray-400 mb-6">
        Candidate: <span className="text-white font-semibold">{name}</span> | 
        Skill: <span className="text-white font-semibold">{skill}</span> | 
        Level: <span className="text-white font-semibold capitalize">{level}</span>
      </p>

      {/* Timer */}
      <div className="mb-6 text-lg font-semibold text-[var(--color-brand-orange)]">
        Time Left: {formatTime(timeLeft)}
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {mockQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-[#232323] p-6 rounded-xl border border-gray-700 shadow"
          >
            <p className="mb-4 font-medium">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt) => (
                <label
                  key={opt}
                  className={`block px-4 py-2 rounded-md cursor-pointer transition ${
                    answers[q.id] === opt
                      ? "bg-[var(--color-brand-orange)] text-black font-semibold"
                      : "bg-[#1a1a1a] border border-gray-600 text-gray-300 hover:border-[var(--color-brand-orange)]"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleAnswer(q.id, opt)}
                    className="hidden"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isEnded}
        className="mt-8 w-full py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition disabled:opacity-50"
      >
        Submit Test
      </button>
    </main>
  );
};

export default TestPage;
