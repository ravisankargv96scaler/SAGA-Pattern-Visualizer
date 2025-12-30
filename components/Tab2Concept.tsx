import React, { useState, useEffect } from 'react';
import { RefreshCwIcon, ArrowRightIcon, UndoIcon } from './icons';

export const Tab2Concept: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Idle, 1: T1, 2: T2, 3: T3(Fail), 4: C2, 5: C1, 6: Done
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    let timeout: ReturnType<typeof setTimeout>;

    const sequence = [
      { delay: 1000, next: 1 }, // T1 Done
      { delay: 1000, next: 2 }, // T2 Done
      { delay: 1000, next: 3 }, // T3 Fail
      { delay: 1500, next: 4 }, // Start Compensation -> C2
      { delay: 1000, next: 5 }, // C1
      { delay: 1000, next: 6 }, // Finished
    ];

    const currentSeq = sequence[step];
    if (currentSeq) {
      timeout = setTimeout(() => {
        setStep(currentSeq.next);
        if (currentSeq.next === 6) setIsRunning(false);
      }, currentSeq.delay);
    }

    return () => clearTimeout(timeout);
  }, [step, isRunning]);

  const startSimulation = () => {
    setStep(0);
    setIsRunning(true);
  };

  const getTStyle = (index: number) => {
    // Current step logic for forward path
    if (step === 3 && index === 3) return 'bg-rose-500 text-white border-rose-600 scale-110'; // Fail T3
    if (step >= index && step < 4) return 'bg-emerald-500 text-white border-emerald-600'; // Success T1, T2
    if (step >= 4 && index === 3) return 'bg-rose-500 text-white border-rose-600 opacity-50'; // Failed T3 lingering
    if (step >= 4 && index < 3) return 'bg-slate-300 dark:bg-slate-700 text-slate-500 border-slate-400 opacity-50'; // Old success faded
    return 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-600';
  };

  const getCStyle = (index: number) => {
    // Compensation logic
    if (step === 4 && index === 2) return 'bg-amber-400 text-amber-900 border-amber-500 scale-110 shadow-[0_0_15px_rgba(251,191,36,0.5)]'; // Active C2
    if (step === 5 && index === 1) return 'bg-amber-400 text-amber-900 border-amber-500 scale-110 shadow-[0_0_15px_rgba(251,191,36,0.5)]'; // Active C1
    if (step > 4 && index === 2) return 'bg-amber-200 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-300'; // Done C2
    if (step > 5 && index === 1) return 'bg-amber-200 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-300'; // Done C1
    return 'bg-transparent border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-700';
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 h-full max-w-5xl mx-auto p-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">SAGA Concept: Transactions & Compensations</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          A SAGA is a sequence of local transactions. Each transaction (T) has a corresponding compensating transaction (C). 
          If a step fails, we run compensations in reverse order to undo the changes.
        </p>
      </div>

      <div className="w-full p-10 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden">
        
        {/* Forward Path */}
        <div className="flex justify-center items-center gap-4 mb-12 relative z-10">
            <span className="absolute -left-4 text-xs font-bold text-slate-400 -rotate-90">Happy Path</span>
           {[1, 2, 3].map((i) => (
             <React.Fragment key={`t-${i}`}>
               <div className={`w-24 h-24 rounded-lg border-2 flex flex-col justify-center items-center transition-all duration-500 ${getTStyle(i)}`}>
                 <span className="text-xl font-bold">T{i}</span>
                 <span className="text-xs">Transaction</span>
               </div>
               {i < 3 && <ArrowRightIcon className={`w-6 h-6 ${step >= i && step < 4 ? 'text-emerald-500' : 'text-slate-300'}`} />}
             </React.Fragment>
           ))}
        </div>

        {/* Backward Path (Compensations) */}
        <div className="flex justify-center items-center gap-4 relative z-10">
            <span className="absolute -left-4 text-xs font-bold text-amber-500 -rotate-90">Rollback</span>
           {[1, 2, 3].map((i) => (
             <React.Fragment key={`c-${i}`}>
               <div className={`w-24 h-24 rounded-lg border-2 flex flex-col justify-center items-center transition-all duration-300 ${getCStyle(i)}`}>
                 <span className="text-xl font-bold">C{i}</span>
                 <span className="text-xs">Compensate</span>
                 {i === 3 && <span className="text-[10px] mt-1 text-slate-400">(N/A)</span>}
               </div>
               {i < 3 && <ArrowRightIcon className={`w-6 h-6 rotate-180 ${step >= (6-i) ? 'text-amber-500' : 'text-slate-200 dark:text-slate-800'}`} />}
             </React.Fragment>
           ))}
        </div>

        {/* Visual Connector Lines (CSS) */}
        <div className="absolute top-1/2 left-0 w-full border-t border-slate-100 dark:border-slate-800 -z-0"></div>

      </div>

      <div className="flex gap-4">
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
        >
          {isRunning ? 'Running...' : 'Execute Flow & Fail at T3'}
        </button>
         <button
          onClick={() => { setStep(0); setIsRunning(false); }}
          className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
        >
          <RefreshCwIcon className="w-5 h-5" /> Reset
        </button>
      </div>

       <div className="h-8 text-center font-mono font-bold text-lg text-slate-600 dark:text-slate-300">
          {step === 0 && "System Ready"}
          {step === 1 && "Executing Transaction 1 (Order)... Success"}
          {step === 2 && "Executing Transaction 2 (Payment)... Success"}
          {step === 3 && "Executing Transaction 3 (Inventory)... FAILED!"}
          {step === 4 && "Triggering Rollback... Compensating T2 (Refund Payment)"}
          {step === 5 && "Triggering Rollback... Compensating T1 (Cancel Order)"}
          {step === 6 && "Rollback Complete. System Consistent."}
       </div>
    </div>
  );
};