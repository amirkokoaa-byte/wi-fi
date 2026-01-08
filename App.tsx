
import React, { useState } from 'react';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SignalIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import PasswordLab from './components/PasswordLab';
import NetworkList from './components/NetworkList';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'networks' | 'lab' | 'tips'>('networks');
  const [selectedSsid, setSelectedSsid] = useState<string>('');

  const handleSelectNetwork = (ssid: string) => {
    setSelectedSsid(ssid);
    setActiveTab('lab'); // الانتقال تلقائياً لمختبر التخمين عند اختيار شبكة
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-6 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">رادار الشبكات الذكي</h1>
              <p className="text-blue-400 text-xs font-mono">NETWORK SECURITY ANALYZER v2.1</p>
            </div>
          </div>
          
          <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveTab('networks')}
              className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${activeTab === 'networks' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <SignalIcon className="w-4 h-4" />
              فحص الشبكات
            </button>
            <button 
              onClick={() => setActiveTab('lab')}
              className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${activeTab === 'lab' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <CpuChipIcon className="w-4 h-4" />
              مختبر التخمين
            </button>
            <button 
              onClick={() => setActiveTab('tips')}
              className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${activeTab === 'tips' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <InformationCircleIcon className="w-4 h-4" />
              نصائح الحماية
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full p-6">
        <div className="bg-slate-900/40 rounded-3xl p-4 md:p-8 backdrop-blur-md border border-slate-800 shadow-inner">
          {activeTab === 'networks' && <NetworkList onSelectNetwork={handleSelectNetwork} selectedSsid={selectedSsid} />}
          {activeTab === 'lab' && <PasswordLab targetSsid={selectedSsid} />}
          {activeTab === 'tips' && (
            <div className="space-y-6 animate-fade-in text-right">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <InformationCircleIcon className="w-7 h-7 text-blue-400" />
                دليلك لحماية خصوصيتك الرقمية
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-colors">
                  <h3 className="text-lg font-bold text-blue-300 mb-2">تفعيل WPA3-SAE</h3>
                  <p className="text-slate-400 text-sm">أحدث معيار أمان يمنع الهجمات التي تحاول تخمين كلمات المرور حتى لو كانت قصيرة.</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-colors">
                  <h3 className="text-lg font-bold text-blue-300 mb-2">إلغاء تفعيل WPS</h3>
                  <p className="text-slate-400 text-sm">خاصية (Wi-Fi Protected Setup) تعتبر ثغرة كلاسيكية تتيح الدخول بـ PIN سهل التخمين.</p>
                </div>
              </div>

              <div className="mt-8 bg-amber-900/20 border border-amber-500/30 p-6 rounded-2xl flex gap-4 items-start">
                <ExclamationTriangleIcon className="w-10 h-10 text-amber-500 shrink-0" />
                <div className="space-y-2">
                  <p className="text-amber-200 font-bold underline">إخلاء مسؤولية قانوني:</p>
                  <p className="text-amber-100/70 text-sm leading-relaxed">
                    هذا البرنامج تم تطويره لأغراض **تعليمية وبحثية** فقط لتوضيح مخاطر كلمات المرور الضعيفة. استخدام هذه الأدوات لاختراق شبكات الغير دون إذن يعتبر جريمة يعاقب عليها القانون.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-950 p-6 border-t border-slate-900 text-center text-slate-600 text-xs">
        &copy; {new Date().getFullYear()} مختبر تحليل الشبكات المتقدم - تم التطوير لغرض التوعية الأمنية.
      </footer>
    </div>
  );
};

export default App;
