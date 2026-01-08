
import React, { useState } from 'react';
import { 
  ShieldCheckIcon, 
  SignalIcon,
  CpuChipIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import PasswordLab from './components/PasswordLab';
import NetworkList from './components/NetworkList';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'networks' | 'lab' | 'tips'>('networks');
  const [selectedSsid, setSelectedSsid] = useState<string>('');

  const handleSelectNetwork = (ssid: string) => {
    setSelectedSsid(ssid);
    setActiveTab('lab');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      {/* Dynamic Header */}
      <header className="bg-black/60 border-b border-white/5 p-4 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm md:text-xl font-bold text-white tracking-tight">تدقيق الأمن اللاسلكي</h1>
              <p className="text-[9px] text-blue-500 font-mono uppercase tracking-widest">Status: Ready</p>
            </div>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-[11px] md:text-sm">
            <button 
              onClick={() => setActiveTab('networks')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'networks' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              <SignalIcon className="w-4 h-4 md:hidden inline" />
              <span className="hidden md:inline">الرادار</span>
            </button>
            <button 
              onClick={() => setActiveTab('lab')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'lab' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              <CpuChipIcon className="w-4 h-4 md:hidden inline" />
              <span className="hidden md:inline">المختبر</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 max-w-4xl mx-auto w-full">
        <div className="bg-slate-900/40 rounded-3xl p-4 md:p-8 border border-white/5 backdrop-blur-md">
          {activeTab === 'networks' && <NetworkList onSelectNetwork={handleSelectNetwork} selectedSsid={selectedSsid} />}
          {activeTab === 'lab' && <PasswordLab targetSsid={selectedSsid} />}
          {activeTab === 'tips' && (
            <div className="text-center py-10 space-y-4">
              <InformationCircleIcon className="w-12 h-12 mx-auto text-blue-500" />
              <h2 className="text-xl font-bold">معلومات الأمان</h2>
              <p className="text-slate-400 text-sm">هذا البرنامج للأغراض التعليمية فقط وتجربة منطق التخمين.</p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 p-2 flex justify-around items-center z-50">
        <button onClick={() => setActiveTab('networks')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'networks' ? 'text-blue-500' : 'text-slate-500'}`}>
          <SignalIcon className="w-6 h-6" />
          <span className="text-[10px]">الرادار</span>
        </button>
        <button onClick={() => setActiveTab('lab')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'lab' ? 'text-blue-500' : 'text-slate-500'}`}>
          <CpuChipIcon className="w-6 h-6" />
          <span className="text-[10px]">المختبر</span>
        </button>
        <button onClick={() => setActiveTab('tips')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'tips' ? 'text-blue-500' : 'text-slate-500'}`}>
          <InformationCircleIcon className="w-6 h-6" />
          <span className="text-[10px]">حول</span>
        </button>
      </nav>
      
      <footer className="hidden md:block p-8 text-center text-slate-700 text-[10px] font-mono">
        ENTERPRISE GRADE SECURITY AUDITOR // v3.2.0-STABLE
      </footer>
    </div>
  );
};

export default App;
