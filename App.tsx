
import React, { useState, useEffect } from 'react';
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
    // تأخير بسيط للانتقال لزيادة الشعور بالواقعية
    setTimeout(() => setActiveTab('lab'), 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-200 selection:bg-blue-500/30">
      {/* Glow Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="bg-black/40 border-b border-white/5 p-4 md:p-6 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl shadow-xl shadow-blue-900/20">
                <ShieldCheckIcon className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                محاكي الاختراق الأخلاقي
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/10 text-slate-400 font-mono">v3.0.PRO</span>
              </h1>
              <p className="text-blue-500 text-[10px] font-mono tracking-widest uppercase">System Operational // Signal Intercept Active</p>
            </div>
          </div>
          
          <nav className="flex bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
            <button 
              onClick={() => setActiveTab('networks')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium ${activeTab === 'networks' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
            >
              <SignalIcon className="w-4 h-4" />
              الرادار
            </button>
            <button 
              onClick={() => setActiveTab('lab')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium ${activeTab === 'lab' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
            >
              <CpuChipIcon className="w-4 h-4" />
              المختبر
            </button>
            <button 
              onClick={() => setActiveTab('tips')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium ${activeTab === 'tips' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
            >
              <InformationCircleIcon className="w-4 h-4" />
              الأمان
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full p-4 md:p-8 relative">
        <div className="bg-[#0a0a0a]/80 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-2xl border border-white/5 shadow-2xl overflow-hidden relative">
          {/* Active Status Pulse */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">Live Monitor</span>
          </div>

          <div className="mt-4">
            {activeTab === 'networks' && <NetworkList onSelectNetwork={handleSelectNetwork} selectedSsid={selectedSsid} />}
            {activeTab === 'lab' && <PasswordLab targetSsid={selectedSsid} />}
            {activeTab === 'tips' && (
              <div className="space-y-8 animate-fade-in text-right">
                <div className="border-r-4 border-blue-600 pr-6">
                  <h2 className="text-3xl font-bold text-white mb-2">بروتوكولات الحماية المتقدمة</h2>
                  <p className="text-slate-500 text-sm">كيف تمنع هجمات التخمين التي يحاكيها هذا البرنامج؟</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-tajawal">تفعيل تشفير WPA3</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">يوفر WPA3 حماية ضد هجمات الـ Offline Dictionary Attacks حتى لو كانت كلمة المرور متوسطة القوة.</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ExclamationTriangleIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-tajawal">إيقاف خدمة WPS</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">أكبر ثغرة تتيح للبرامج تخمين الـ PIN في دقائق. تعطيلها يغلق باباً كبيراً أمام المخترقين.</p>
                  </div>
                </div>

                <div className="mt-12 bg-amber-900/10 border border-amber-500/20 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-amber-500/20 p-4 rounded-full">
                    <ExclamationTriangleIcon className="w-10 h-10 text-amber-500" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-amber-500 font-bold text-xl font-tajawal">إخلاء مسؤولية أمني وقانوني</h4>
                    <p className="text-amber-100/60 text-sm leading-relaxed font-tajawal">
                      هذا المشروع "محاكي" تعليمي صُمم لإظهار مخاطر ضعف كلمات المرور. جميع العمليات التي تراها هي محاكاة برمجية آمنة (Simulation). 
                      <span className="block mt-2 font-bold text-amber-400">تذكر دائماً: الوصول غير المصرح به لشبكات الآخرين هو فعل غير قانوني ويعد جريمة معلوماتية.</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="p-8 border-t border-white/5 text-center">
        <p className="text-slate-600 text-[10px] font-mono uppercase tracking-[0.3em]">
          End-to-End Encryption Mode // Research Purposes Only // {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
