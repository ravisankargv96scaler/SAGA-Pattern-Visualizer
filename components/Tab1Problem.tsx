import React, { useState } from 'react';
import { DatabaseIcon, XCircleIcon, CheckCircleIcon, RefreshCwIcon } from './icons';

export const Tab1Problem: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'failed'>('idle');
  const [dbStates, setDbStates] = useState({
    order: 'idle',
    payment: 'idle',
    inventory: 'idle'
  });

  const simulateFailure = () => {
    setStatus('running');
    setDbStates({ order: 'pending', payment: 'pending', inventory: 'pending' });

    // Step 1: Attempt to commit all
    setTimeout(() => {
      setDbStates({ order: 'committed', payment: 'error', inventory: 'idle' });
      setStatus('failed');
    }, 1500);
  };

  const reset = () => {
    setStatus('idle');
    setDbStates({ order: 'idle', payment: 'idle', inventory: 'idle' });
  };

  const getBgColor = (state: string) => {
    switch (state) {
      case 'committed': return 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-300';
      case 'error': return 'bg-rose-100 border-rose-500 text-rose-700 dark:bg-rose-900/30 dark:border-rose-500 dark:text-rose-300';
      case 'pending': return 'bg-blue-100 border-blue-500 text-blue-700 animate-pulse dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300';
      default: return 'bg-slate-100 border-slate-300 text-slate-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 h-full max-w-4xl mx-auto p-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">The Problem: Distributed ACID</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
            In a monolithic architecture, a single database transaction guarantees all changes happen or none do (ACID).
            In microservices, data is split across databases. A "Legacy" distributed transaction tries to lock everything (2PC), which is slow and brittle.
            If one fails without proper rollback, we get <strong>data inconsistency</strong>.
        </p>
      </div>

      <div className="relative w-full p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Order DB */}
          <div className={`w-full md:w-1/3 p-6 rounded-lg border-2 transition-colors duration-300 flex flex-col items-center ${getBgColor(dbStates.order)}`}>
            <DatabaseIcon className="w-12 h-12 mb-2" />
            <h3 className="font-bold">Order DB</h3>
            <span className="text-sm font-mono mt-2 uppercase">{dbStates.order === 'idle' ? 'Ready' : dbStates.order}</span>
          </div>

          {/* Payment DB */}
          <div className={`w-full md:w-1/3 p-6 rounded-lg border-2 transition-colors duration-300 flex flex-col items-center ${getBgColor(dbStates.payment)}`}>
            <DatabaseIcon className="w-12 h-12 mb-2" />
            <h3 className="font-bold">Payment DB</h3>
            <span className="text-sm font-mono mt-2 uppercase">{dbStates.payment === 'idle' ? 'Ready' : dbStates.payment}</span>
            {dbStates.payment === 'error' && <XCircleIcon className="absolute top-2 right-2 text-rose-500 w-6 h-6" />}
          </div>

          {/* Inventory DB */}
          <div className={`w-full md:w-1/3 p-6 rounded-lg border-2 transition-colors duration-300 flex flex-col items-center ${getBgColor(dbStates.inventory)}`}>
            <DatabaseIcon className="w-12 h-12 mb-2" />
            <h3 className="font-bold">Inventory DB</h3>
            <span className="text-sm font-mono mt-2 uppercase">{dbStates.inventory === 'idle' ? 'Ready' : dbStates.inventory}</span>
          </div>
        </div>

        {status === 'failed' && (
          <div className="mt-8 p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-lg text-center animate-bounce">
            <h4 className="text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center gap-2">
              <XCircleIcon /> Data Inconsistency Detected!
            </h4>
            <p className="text-rose-600 dark:text-rose-400 text-sm mt-1">
              Order was created (Committed), but Payment failed. Inventory was never touched. The system is now in an invalid state.
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={simulateFailure}
          disabled={status === 'running' || status === 'failed'}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
        >
          <XCircleIcon className="w-5 h-5" /> Simulate Legacy Failure
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
        >
          <RefreshCwIcon className="w-5 h-5" /> Reset
        </button>
      </div>
    </div>
  );
};