import React, { useState, useEffect } from 'react';
import { ServerIcon, CloudIcon, RefreshCwIcon } from './icons';

export const Tab3Choreography: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep > 0 && activeStep < 4) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  const start = () => setActiveStep(1);
  const reset = () => setActiveStep(0);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 h-full max-w-5xl mx-auto p-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Approach 1: Choreography</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Decentralized approach. Services listen for events and react. 
          There is no central coordinator. "Smart endpoints, dumb pipes."
        </p>
      </div>

      <div className="relative w-full h-[400px] bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
        
        {/* Central Event Bus */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <CloudIcon className="w-24 h-24 text-blue-400 dark:text-blue-500" />
          <span className="text-xs font-bold uppercase tracking-wider mt-2 text-slate-500 dark:text-slate-400">Event Bus</span>
        </div>

        {/* Services */}
        {/* Order Service - Top Left */}
        <div className={`absolute top-10 left-10 md:left-20 flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-500 ${activeStep >= 1 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-300 dark:border-slate-700'}`}>
          <ServerIcon className="w-10 h-10 mb-2" />
          <span className="font-bold">Order Service</span>
          {activeStep >= 1 && <span className="text-xs text-emerald-600 font-mono mt-1">Pub: OrderCreated</span>}
        </div>

        {/* Payment Service - Top Right */}
        <div className={`absolute top-10 right-10 md:right-20 flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-500 ${activeStep >= 2 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-300 dark:border-slate-700'}`}>
          <ServerIcon className="w-10 h-10 mb-2" />
          <span className="font-bold">Payment Service</span>
          {activeStep >= 2 && <span className="text-xs text-emerald-600 font-mono mt-1">Pub: PaymentProcessed</span>}
        </div>

         {/* Inventory Service - Bottom */}
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-500 ${activeStep >= 3 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-300 dark:border-slate-700'}`}>
          <ServerIcon className="w-10 h-10 mb-2" />
          <span className="font-bold">Inventory Service</span>
          {activeStep >= 3 && <span className="text-xs text-emerald-600 font-mono mt-1">Sub: PaymentProcessed</span>}
        </div>

        {/* Moving Particles (Events) */}
        
        {/* Event 1: Order -> Bus */}
        <div className={`absolute w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-[1500ms] ease-in-out
          ${activeStep === 1 ? 'top-1/2 left-1/2 opacity-100' : 'top-20 left-32 opacity-0'}
          z-20 pointer-events-none
        `}></div>

        {/* Event 2: Bus -> Payment */}
        <div className={`absolute w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-all duration-[1500ms] ease-in-out delay-1000
          ${activeStep === 2 ? 'top-20 right-32 opacity-0' : activeStep > 1 ? 'top-1/2 left-1/2 opacity-100' : 'top-1/2 left-1/2 opacity-0'}
          z-20 pointer-events-none
        `}></div>

        {/* Event 3: Payment -> Bus */}
         <div className={`absolute w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all duration-[1500ms] ease-in-out
          ${activeStep === 3 ? 'top-1/2 left-1/2 opacity-100' : activeStep > 2 ? 'top-20 right-32 opacity-0' : 'top-20 right-32 opacity-0'}
          z-20 pointer-events-none
        `}></div>

        {/* Event 4: Bus -> Inventory */}
         <div className={`absolute w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-[1500ms] ease-in-out delay-1000
          ${activeStep === 3 ? 'bottom-20 left-1/2 opacity-0' : activeStep >= 3 ? 'top-1/2 left-1/2 opacity-100' : 'top-1/2 left-1/2 opacity-0'}
          z-20 pointer-events-none
        `}></div>

      </div>

      <div className="flex gap-4">
        <button onClick={start} disabled={activeStep > 0} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg shadow-md transition-all">
          Start: Order Created Event
        </button>
        <button onClick={reset} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2">
          <RefreshCwIcon className="w-5 h-5" /> Reset
        </button>
      </div>

       <div className="h-8 text-center font-mono font-bold text-lg text-slate-600 dark:text-slate-300">
         {activeStep === 0 && "Waiting for event..."}
         {activeStep === 1 && "Order Service publishes 'OrderCreated'..."}
         {activeStep === 2 && "Payment Service consumes 'OrderCreated', processes, and publishes 'PaymentProcessed'..."}
         {activeStep === 3 && "Inventory Service consumes 'PaymentProcessed' and reserves stock."}
         {activeStep === 4 && "Flow Complete."}
       </div>
    </div>
  );
};