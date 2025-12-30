import React, { useState } from 'react';
import { TabId } from './types';
import { Tab1Problem } from './components/Tab1Problem';
import { Tab2Concept } from './components/Tab2Concept';
import { Tab3Choreography } from './components/Tab3Choreography';
import { Tab4Orchestration } from './components/Tab4Orchestration';
import { Tab5Simulation } from './components/Tab5Simulation';
import { Tab6Quiz } from './components/Tab6Quiz';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.PROBLEM);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const tabs = [
    { id: TabId.PROBLEM, label: '1. The Problem' },
    { id: TabId.CONCEPT, label: '2. SAGA Concept' },
    { id: TabId.CHOREOGRAPHY, label: '3. Choreography' },
    { id: TabId.ORCHESTRATION, label: '4. Orchestration' },
    { id: TabId.SIMULATION, label: '5. Live Sim' },
    { id: TabId.QUIZ, label: '6. Quiz' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SAGA Visualizer</h1>
              <p className="text-xs text-slate-400">Distributed Transaction Patterns</p>
            </div>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 md:space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-3 md:px-6 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow bg-slate-50 dark:bg-slate-950 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
           <div className="animate-fade-in h-full">
            {activeTab === TabId.PROBLEM && <Tab1Problem />}
            {activeTab === TabId.CONCEPT && <Tab2Concept />}
            {activeTab === TabId.CHOREOGRAPHY && <Tab3Choreography />}
            {activeTab === TabId.ORCHESTRATION && <Tab4Orchestration />}
            {activeTab === TabId.SIMULATION && <Tab5Simulation />}
            {activeTab === TabId.QUIZ && <Tab6Quiz />}
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 py-6 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
        <p>Interactive Educational Tool for Distributed Systems Architecture</p>
      </footer>
    </div>
  );
};

export default App;