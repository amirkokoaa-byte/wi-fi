
import React, { useState, useEffect, useRef } from 'react';
import { 
  CpuChipIcon, 
  StopIcon, 
  PlayIcon, 
  CheckBadgeIcon, 
  CommandLineIcon,
  ClipboardIcon,
  KeyIcon
} from '@heroicons/react/24/solid';

interface PasswordLabProps {
  targetSsid: string;
}

const PasswordLab: React.FC<PasswordLabProps> = ({ targetSsid }) => {
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'BRUTING' | 'FOUND'>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('----------');
  const [speed, setSpeed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [foundPassword, setFoundPassword] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const startBruteForce = () => {
    if (!targetSsid) return;
    
    setStatus('SCANNING');
    setLogs([]);
    setFoundPassword(null);
    setProgress(0);
    setElapsedTime(0);
    
    addLog(`Initializing backend wireless interface...`);
    addLog(`Capturing Handshake for ${targetSsid}...`);
    
    setTimeout(() => {
      addLog(`Handshake Captured! Starting Brute-force...`);
      setStatus('BRUTING');
      
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
      let p = 0;
      
      timerRef.current = window.setInterval(() => {
        p += 0.4;
        setProgress(Math.min(p, 100));
        setElapsedTime(prev => prev + 0.1);
        setSpeed(Math.floor(Math.random() * 8000) + 25000);
        
        // محاكاة محاولة الباسوردات
        let attempt = "";
        for(let i=0; i<8; i++) attempt += charset.charAt(Math.floor(Math.random() * charset.length));
        setCurrentGuess(attempt);

        if (p >= 100) {
          // الباسورد "الحقيقي" الذي تم فكه (محاكاة احترافية)
          const finalPass = `${targetSsid.split('_')[0].toLowerCase()}@2025!`;
          setFoundPassword(finalPass);
          setStatus('FOUND');
          addLog(`Password Found: ${finalPass}`);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 50);
    }, 2000);
  };

  const stopAction = () => {
    setStatus('IDLE');
    if (timerRef.current) clearInterval(timerRef.current);
    addLog(`Operation aborted by operator.`);
  };

  const copyResult = () => {
    if (foundPassword) {
      navigator.clipboard.writeText(foundPassword);
      alert("تم نسخ كلمة المرور بنجاح");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-slate-900 border border-blue-500/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
        {/* Mobile-Friendly Header */}
        <div className="bg-blue-600/10 p-4 md:p-6 border-b border-blue-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <KeyIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm md:text-lg font-bold text-white">وحدة فك التشفير</h3>
              <p className="text-[10px] text-blue-400 font-mono">TARGET: {targetSsid || 'None'}</p>
            </div>
          </div>
          {status !== 'IDLE' && (
            <div className="text-right">
              <span className="block text-[10px] text-slate-500 uppercase">Speed</span>
              <span className="text-xs md:text-sm font-mono text-blue-400 font-bold">{speed.toLocaleString()} H/s</span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 space-y-4">
          {!targetSsid ? (
            <div className="text-center py-10 opacity-50">
              <CommandLineIcon className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">بانتظار تحديد هدف من الرادار...</p>
            </div>
          ) : (
            <>
              {/* Terminal Display */}
              <div className="bg-black/80 rounded-xl p-3 font-mono text-[10px] md:text-xs h-32 overflow-y-auto custom-scrollbar border border-slate-800">
                {logs.map((log, i) => (
                  <div key={i} className="text-slate-400 mb-1">
                    <span className="text-blue-500 mr-1">$</span> {log}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>

              {/* Brute-force Visualizer */}
              <div className="bg-slate-950 py-6 md:py-10 rounded-2xl border border-blue-500/10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-[10px] text-blue-500/50 font-mono absolute top-2 uppercase tracking-widest">Brute-Force Engine Active</div>
                <div className="text-2xl md:text-5xl font-black text-blue-400 tracking-widest font-mono">
                  {status === 'FOUND' ? foundPassword : currentGuess}
                </div>
                {status === 'BRUTING' && (
                  <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {status === 'IDLE' || status === 'FOUND' ? (
                  <button 
                    onClick={startBruteForce}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <PlayIcon className="w-5 h-5" />
                    بدء محاكاة الاستخراج
                  </button>
                ) : (
                  <button 
                    onClick={stopAction}
                    className="w-full bg-red-600/20 text-red-500 border border-red-500/30 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <StopIcon className="w-5 h-5" />
                    إلغاء العملية
                  </button>
                )}
              </div>

              {/* Result Card */}
              {status === 'FOUND' && (
                <div className="mt-4 bg-green-500/10 border border-green-500/30 p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckBadgeIcon className="w-6 h-6 text-green-500" />
                    <span className="text-sm font-bold text-green-400">تم فك التشفير بنجاح!</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                    <code className="text-white font-mono text-lg">{foundPassword}</code>
                    <button onClick={copyResult} className="text-blue-400 hover:text-white transition-colors">
                      <ClipboardIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase">Time</p>
          <p className="text-xs font-mono text-blue-400">{elapsedTime.toFixed(1)}s</p>
        </div>
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase">Entropy</p>
          <p className="text-xs font-mono text-blue-400">High</p>
        </div>
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase">Threads</p>
          <p className="text-xs font-mono text-blue-400">128-bit</p>
        </div>
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase">Security</p>
          <p className="text-xs font-mono text-blue-400">AES/WPA2</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordLab;
