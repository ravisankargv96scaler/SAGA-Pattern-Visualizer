import React, { useState, useEffect } from 'react';
import { ServerIcon, RefreshCwIcon, ArrowRightIcon } from './icons';

export const Tab4Orchestration: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step > 0 && step < 4) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 h-full max-w-5xl mx-auto p-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Approach 2: Orchestration</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Centralized approach. A dedicated Orchestrator (Saga Manager) tells participants what to do.
          Provides better visibility and control over the workflow.
        </p>
      </div>

      <div className="relative w-full h-[400px] bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
        
        {/* Orchestrator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-slate-800 dark:bg-slate-700 text-white rounded-xl shadow-xl flex flex-col items-center justify-center z-20 border-2 border-slate-600">
          <span className="font-bold text-lg">SAGA Orchestrator</span>
          <span className="text-xs text-slate-300 mt-1">State Machine</span>
        </div>

        {/* Order Service - Left */}
        <div className={`absolute top-1/2 left-10 transform -translate-y-1/2 flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300 ${step >= 1 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-700'}`}>
          <ServerIcon className="w-10 h-10 mb-2" />
          <span className="font-bold">Order</span>
        </div>

        {/* Payment Service - Top */}
        <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300 ${step >= 2 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-700'}`}>
          <ServerIcon className="w-10 h-10 mb-2" />
          <span className="font-bold">Payment</span>
        </div>

        {/* Inventory Service - Right */}
        <div className={`absolute top-1/2 right-10 transform -translate-y-1/2 flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300 ${step >= 3 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-700'}`}>
          <ServerIcon className="w-10 h-10 mb-2" />
          <span className="font-bold">Inventory</span>
        </div>

        {/* Connection Lines & Arrows (SVG Overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
             <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
               <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
             </marker>
             <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
               <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
             </marker>
          </defs>

          {/* Line to Order */}
          <line x1="40%" y1="50%" x2="15%" y2="50%" 
                stroke={step === 1 ? "#3b82f6" : "#cbd5e1"} 
                strokeWidth={step === 1 ? "3" : "2"} 
                markerEnd={step === 1 ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                className="transition-all duration-500" />
          
           {/* Line to Payment */}
          <line x1="50%" y1="40%" x2="50%" y2="20%" 
                stroke={step === 2 ? "#3b82f6" : "#cbd5e1"} 
                strokeWidth={step === 2 ? "3" : "2"} 
                markerEnd={step === 2 ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                className="transition-all duration-500" />

           {/* Line to Inventory */}
          <line x1="60%" y1="50%" x2="85%" y2="50%" 
                stroke={step === 3 ? "#3b82f6" : "#cbd5e1"} 
                strokeWidth={step === 3 ? "3" : "2"} 
                markerEnd={step === 3 ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                className="transition-all duration-500" />
        </svg>

      </div>

      <div className="flex gap-4">
        <button onClick={() => setStep(1)} disabled={step > 0} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-lg shadow-md transition-all">
          Start Workflow
        </button>
        <button onClick={() => setStep(0)} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2">
          <RefreshCwIcon className="w-5 h-5" /> Reset
        </button>
      </div>

       <div className="h-8 text-center font-mono font-bold text-lg text-slate-600 dark:text-slate-300">
         {step === 0 && "Orchestrator Idle."}
         {step === 1 && "Orchestrator commands Order Service: 'Create Order'"}
         {step === 2 && "Orchestrator commands Payment Service: 'Process Payment'"}
         {step === 3 && "Orchestrator commands Inventory Service: 'Reserve Stock'"}
         {step === 4 && "Workflow Completed successfully."}
       </div>
    </div>
  );
};