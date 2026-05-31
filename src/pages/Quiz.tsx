import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, RotateCcw, CheckCircle, XCircle, Award, HelpCircle, Star, Share2 } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Who was the Prime Minister when India introduced its landmark LPG (Liberalization, Privatization, Globalization) reforms in 1991?",
    options: ["Rajiv Gandhi", "P.V. Narasimha Rao", "Atal Bihari Vajpayee", "Manmohan Singh"],
    answer: 1,
    explanation: "P.V. Narasimha Rao was the Prime Minister in 1991, and along with his Finance Minister Manmohan Singh, spearheaded the economic liberalization that transformed modern India."
  },
  {
    id: 2,
    question: "Which Indian space mission successfully achieved a soft landing near the lunar south pole in August 2023?",
    options: ["Chandrayaan-1", "Chandrayaan-2", "Chandrayaan-3", "Gaganyaan"],
    answer: 2,
    explanation: "Chandrayaan-3 successfully landed near the Moon's south pole on August 23, 2023, making India the first country in the world to reach that region."
  },
  {
    id: 3,
    question: "In which year did the government launch the Mahatma Gandhi National Rural Employment Guarantee Act (MNREGA)?",
    options: ["2001", "2004", "2006", "2009"],
    answer: 2,
    explanation: "MNREGA was launched in 2006 under PM Manmohan Singh's administration, providing a legal guarantee of 100 days of wage employment per year to rural households."
  },
  {
    id: 4,
    question: "Which Prime Minister coined the famous patriotic slogan 'Jai Jawan Jai Kisan' during the 1965 Indo-Pakistani War?",
    options: ["Jawaharlal Nehru", "Lal Bahadur Shastri", "Indira Gandhi", "Morarji Desai"],
    answer: 1,
    explanation: "Lal Bahadur Shastri gave the slogan 'Jai Jawan Jai Kisan' (Hail the Soldier, Hail the Farmer) to boost morale during the food shortage and war of 1965."
  },
  {
    id: 5,
    question: "Under which national program did India build over 11 Crore (110 million) toilets to eliminate open defecation?",
    options: ["Swachh Bharat Mission", "Smart Cities Mission", "AMRUT Mission", "PM Awas Yojana"],
    answer: 0,
    explanation: "The Swachh Bharat Mission (Clean India Mission), launched in 2014, drove a massive sanitation campaign to build over 11 Crore household toilets nationwide."
  },
  {
    id: 6,
    question: "What instant real-time payment system, developed by NPCI in 2016, propelled India to the top of global digital transaction charts?",
    options: ["NEFT", "RTGS", "UPI (Unified Payments Interface)", "IMPS"],
    answer: 2,
    explanation: "UPI (Unified Payments Interface) revolutionized digital banking in India, processing billions of merchant and peer-to-peer transactions monthly."
  },
  {
    id: 7,
    question: "What is India's target year to achieve net-zero carbon emissions, as announced at the COP26 climate summit?",
    options: ["2030", "2047", "2050", "2070"],
    answer: 3,
    explanation: "India has pledged to transition to net-zero carbon emissions by the year 2070, focusing on massive solar and hydrogen energy expansions."
  },
  {
    id: 8,
    question: "Which solar observatory spacecraft did ISRO launch in September 2023 to study the Sun's atmosphere?",
    options: ["Aditya-L1", "AstroSat", "Gaganyaan-1", "EOS-04"],
    answer: 0,
    explanation: "Aditya-L1 was launched in September 2023 and successfully placed in a halo orbit around the Lagrange point 1 (L1) to monitor solar activity."
  },
  {
    id: 9,
    question: "Which Constitutional Amendment Act granted constitutional status and structural power to rural Panchayati Raj institutions in 1993?",
    options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "74th Amendment"],
    answer: 2,
    explanation: "The 73rd Constitutional Amendment Act of 1992 (enacted in 1993) formalised the three-tier Panchayati Raj system, empowering rural local self-governance."
  },
  {
    id: 10,
    question: "Which nationwide cooperative dairy project, launched in 1970, turned India from a milk-deficient nation into the world's largest milk producer?",
    options: ["Green Revolution", "Operation Flood (White Revolution)", "Blue Revolution", "Yellow Revolution"],
    answer: 1,
    explanation: "Operation Flood (White Revolution), led by Dr. Verghese Kurien and the NDDB, created a nationwide cooperative grid that made India the global dairy leader."
  }
];

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizComplete(false);
  };

  const handleSelect = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || hasSubmitted) return;
    setHasSubmitted(true);
    if (selectedOpt === QUIZ_QUESTIONS[currentIdx].answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(c => c + 1);
      setSelectedOpt(null);
      setHasSubmitted(false);
    } else {
      setQuizComplete(true);
    }
  };

  const getBadgeInfo = (finalScore: number) => {
    if (finalScore === 10) return { title: "Swaraj Samrat (Supreme Scholar)", color: "text-amber-500", desc: "Perfection! You possess absolute mastery over India's development history." };
    if (finalScore >= 8) return { title: "Matrix Maha-Guru", color: "text-emerald-500", desc: "Superb job! Exceptional understanding of key policies and scientific records." };
    if (finalScore >= 5) return { title: "Dharma Adhikari", color: "text-saffron", desc: "Good effort! Solid knowledge of India's growth path since independence." };
    return { title: "Knowledge Seeker", color: "text-slate-400", desc: "Keep exploring the dashboards to learn more about India's historic journey!" };
  };

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border-l-4 border-pink-500 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha Logo" className="h-14 w-auto object-contain flex-shrink-0 dark:invert" />
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">India Matrix Challenge</h1>
            <p className="text-slate-500 dark:text-white/50 text-sm">Test your knowledge of India's space records, economic reforms, and rural milestones.</p>
          </div>
        </div>
        <div className="p-3 bg-pink-500/10 rounded-xl text-pink-500 flex-shrink-0">
          <Trophy size={28} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!started && (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-2xl p-8 text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                <Trophy size={40} />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Are you ready to test your knowledge?</h2>
              <p className="text-sm text-slate-500 dark:text-white/60 max-w-md mx-auto">
                You will be presented with 10 questions covering major achievements, national policy shifts, and historic timelines. Correct answers build up your rank!
              </p>
            </div>
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Start Challenge
            </button>
          </motion.div>
        )}

        {started && !quizComplete && (
          <motion.div
            key={`question-${currentIdx}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-6 space-y-6"
          >
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-500 dark:text-white/40">
                <span>QUESTION {currentIdx + 1} OF {QUIZ_QUESTIONS.length}</span>
                <span>SCORE: {score}</span>
              </div>
              <div className="h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-500 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="text-pink-500 shrink-0 mt-1" size={20} />
                <h2 className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((opt, oIdx) => {
                let optStyles = "border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-white/80";
                
                if (selectedOpt === oIdx && !hasSubmitted) {
                  optStyles = "border-pink-500 bg-pink-500/10 text-pink-500 dark:text-pink-400 font-medium";
                }
                
                if (hasSubmitted) {
                  if (oIdx === currentQuestion.answer) {
                    optStyles = "border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                  } else if (selectedOpt === oIdx) {
                    optStyles = "border-red-500 bg-red-500/10 dark:bg-red-500/10 text-red-600 dark:text-red-400";
                  } else {
                    optStyles = "border-slate-100 dark:border-white/5 opacity-40 text-slate-400";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(oIdx)}
                    disabled={hasSubmitted}
                    className={`w-full flex items-center justify-between text-left p-4 rounded-xl border text-sm transition-all duration-200 ${optStyles}`}
                  >
                    <span>{opt}</span>
                    {hasSubmitted && oIdx === currentQuestion.answer && (
                      <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                    )}
                    {hasSubmitted && selectedOpt === oIdx && oIdx !== currentQuestion.answer && (
                      <XCircle size={16} className="text-red-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Explanation Box */}
            <AnimatePresence>
              {hasSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    selectedOpt === currentQuestion.answer 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {selectedOpt === currentQuestion.answer ? "🎉 Correct!" : "❌ Incorrect"}
                  </div>
                  {currentQuestion.explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions Bar */}
            <div className="flex justify-end pt-2">
              {!hasSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOpt === null}
                  className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-lg shadow-pink-500/10 transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {currentIdx + 1 === QUIZ_QUESTIONS.length ? "Finish Quiz" : "Next Question"} <ArrowRight size={14} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {started && quizComplete && (
          <motion.div
            key="result-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-8 text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-xl">
                  <Award size={48} />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-sm border-4 border-white dark:border-[#0a0f1e]">
                  {score}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Challenge Completed!</h2>
              <p className="text-sm text-slate-500 dark:text-white/40">You scored {score} out of {QUIZ_QUESTIONS.length} correct answers.</p>
            </div>

            {/* Badge Card */}
            <div className="glass-saffron max-w-sm mx-auto p-4 rounded-2xl border border-saffron/20 bg-saffron/5">
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase font-bold text-saffron mb-1">
                <Star size={12} fill="currentColor" /> Rank Awarded <Star size={12} fill="currentColor" />
              </div>
              <div className={`font-display font-extrabold text-lg ${getBadgeInfo(score).color}`}>
                {getBadgeInfo(score).title}
              </div>
              <p className="text-sm text-slate-600 dark:text-white/60 mt-1 leading-normal">
                {getBadgeInfo(score).desc}
              </p>
            </div>

            {/* Share Score Section */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-slate-400 dark:text-white/30 uppercase tracking-wider font-mono">Share Your Achievement</p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I scored ${score}/10 on the India Matrix Challenge! Rank: ${getBadgeInfo(score).title}. Test your knowledge here:`)}&url=${encodeURIComponent(window.location.origin)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-black text-white hover:bg-slate-900 rounded-xl text-xs font-semibold transition-all shadow-md"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Post on X</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#0077b5] text-white hover:bg-[#006297] rounded-xl text-xs font-semibold transition-all shadow-md"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <button
                  onClick={() => {
                    const shareText = `I scored ${score}/10 on the India Matrix Challenge! Rank: ${getBadgeInfo(score).title}. Test your knowledge of India's development history here: ${window.location.origin}`;
                    navigator.clipboard.writeText(shareText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white/80 rounded-xl text-xs font-semibold transition-all border border-slate-200 dark:border-white/10 shadow-sm"
                >
                  <Share2 size={13} />
                  <span>{copied ? "Copied Link!" : "Copy Results"}</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 mx-auto shadow-md transition-all active:scale-95"
            >
              <RotateCcw size={14} /> Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
