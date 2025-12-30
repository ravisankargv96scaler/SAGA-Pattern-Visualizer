import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What replaces the concept of 'Rollback' in a SAGA pattern?",
    options: ["2-Phase Commit", "Compensating Transaction", "Database Lock", "Event Sourcing"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which SAGA approach relies on a central coordinator?",
    options: ["Choreography", "Orchestration", "Peer-to-Peer", "Mesh"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Does the SAGA pattern guarantee Immediate Consistency?",
    options: ["Yes, always", "Only in Orchestration", "No, it provides Eventual Consistency", "No, it provides Strong Consistency"],
    correctAnswer: 2
  }
];

export const Tab6Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIndex: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const getScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 h-full max-w-3xl mx-auto p-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Summary & Quiz</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Test your knowledge on Distributed Transactions and the SAGA Pattern.
        </p>
      </div>

      <div className="w-full space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-white">{q.question}</h3>
            <div className="space-y-2">
              {q.options.map((opt, idx) => {
                let btnClass = "w-full text-left px-4 py-3 rounded-md border transition-all ";
                
                if (showResults) {
                  if (idx === q.correctAnswer) {
                    btnClass += "bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
                  } else if (answers[q.id] === idx) {
                    btnClass += "bg-rose-100 border-rose-500 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300";
                  } else {
                    btnClass += "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50";
                  }
                } else {
                  if (answers[q.id] === idx) {
                    btnClass += "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
                  } else {
                    btnClass += "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(q.id, idx)}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showResults && idx === q.correctAnswer && <CheckCircleIcon className="text-emerald-600 w-5 h-5" />}
                      {showResults && answers[q.id] === idx && idx !== q.correctAnswer && <XCircleIcon className="text-rose-600 w-5 h-5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center pt-4 pb-8">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="px-8 py-3 bg-primary hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            Submit Answers
          </button>
        ) : (
          <div className="text-center bg-slate-800 text-white p-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-2">You scored {getScore()} / {questions.length}</h3>
            <button
              onClick={() => { setShowResults(false); setAnswers({}); }}
              className="mt-4 px-6 py-2 bg-white text-slate-900 font-semibold rounded hover:bg-slate-200 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};