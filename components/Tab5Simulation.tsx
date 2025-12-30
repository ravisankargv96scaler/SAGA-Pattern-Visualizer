import React, { useState } from 'react';
import { ArrowRightIcon, RefreshCwIcon, CheckCircleIcon, XCircleIcon, UndoIcon } from './icons';

type SimStep = 'start' | 'reserve' | 'charge' | 'confirm' | 'unreserve';
type SimStatus = 'idle' | 'active' | 'success' | 'failed' | 'compensated';

interface StepState {
  id: SimStep;
  label: string;
  status: SimStatus;
}

export const Tab5Simulation: React.FC = () => {
  const initialSteps: StepState[] = [
    { id: 'start', label: 'Start', status: 'idle' },
    { id: 'reserve', label: 'Reserve Stock', status: 'idle' },
    { id: 'charge', label: 'Charge Card', status: 'idle' },
    { id: 'confirm', label: 'Confirm Order', status: 'idle' },
  ];

  const [steps, setSteps] = useState<StepState[]>(initialSteps);
  const [compensationActive, setCompensationActive] = useState(false);

  const runSuccessPath = async () => {
    reset();
    
    const update = (idx: number, status: SimStatus) => {
      setSteps(prev => {
        const next = [...prev];
        next[idx].status = status;
        return next;
      });
    };

    update(0, 'active'); await delay(500); update(0, 'success');
    update(1, 'active'); await delay(800); update(1, 'success');
    update(2, 'active'); await delay(800); update(2, 'success');
    update(3, 'active'); await delay(500); update(3, 'success');
  };

  const runFailurePath = async () => {
    reset();
    const update = (idx: number, status: SimStatus) => {
      setSteps(prev => {
        const next = [...prev];
        next[idx].status = status;
        return next;
      });
    };

    update(0, 'active'); await delay(500); update(0, 'success');
    update(1, 'active'); await delay(800); update(1, 'success');
    update(2, 'active'); await delay(800);
    
    // FAIL
    update(2, 'failed'); 
    await delay(1000);
    
    // COMPENSATE
    setCompensationActive(true);
    await delay(500);
    update(1, 'compensated'); // Un-reserve
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const reset = () => {
    setSteps(initialSteps);
    setCompensationActive(false);
  };

  const getStepColor = (status: SimStatus) => {
    switch (status) {
      case 'idle': return 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400';
      case 'active': return 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 animate-pulse';
      case 'success': return 'bg-emerald-100 dark:bg-emerald-900 border-emerald-500 text-emerald-700';
      case 'failed': return 'bg-rose-100 dark:bg-rose-900 border-rose-500 text-rose-700';
      case 'compensated': return 'bg-amber-100 dark:bg-amber-900 border-amber-500 text-amber-700';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 h-full max-w-5xl mx-auto p-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Live Simulation: E-Commerce Checkout</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Watch the saga orchestrator handle success and failure scenarios in real-time.
        </p>
      </div>

      <div className="w-full p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 min-h-[300px] flex flex-col justify-center">
        
        {/* Main Flow */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`relative z-10 w-40 h-24 rounded-lg border-2 flex flex-col items-center justify-center p-2 text-center transition-all duration-500 ${getStepColor(step.status)}`}>
                <span className="font-bold text-sm">{step.label}</span>
                <span className="text-xs mt-1 uppercase font-mono">{step.status}</span>
                {step.status === 'success' && <CheckCircleIcon className="w-5 h-5 mt-1" />}
                {step.status === 'failed' && <XCircleIcon className="w-5 h-5 mt-1" />}
                {step.status === 'compensated' && <UndoIcon className="w-5 h-5 mt-1" />}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block">
                  <ArrowRightIcon className="text-slate-300" />
                </div>
              )}
              {/* Vertical line for mobile */}
              {index < steps.length - 1 && (
                <div className="block md:hidden h-8 w-0.5 bg-slate-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Compensation Visual Line */}
        {compensationActive && (
          <div className="mt-8 flex justify-center items-center gap-2 animate-pulse">
            <div className="h-0.5 w-1/3 bg-amber-500"></div>
            <span className="text-amber-600 font-bold flex items-center gap-2"><UndoIcon className="w-4 h-4" /> Compensating Transaction Triggered</span>
            <div className="h-0.5 w-1/3 bg-amber-500"></div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={runSuccessPath} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition-all">
          Simulate SUCCESS Path
        </button>
        <button onClick={runFailurePath} className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-md transition-all">
          Simulate FAILURE Path (Card Declined)
        </button>
         <button onClick={reset} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2">
          <RefreshCwIcon className="w-5 h-5" /> Reset
        </button>
      </div>
    </div>
  );
};