
import React, { useState, useEffect, useRef } from 'react';
import { CpuChipIcon, StopIcon, PlayIcon, CheckCircleIcon, KeyIcon, SignalIcon } from '@heroicons/react/24/solid';

interface PasswordLabProps {
  targetSsid: string;
}

const PasswordLab: React.FC<PasswordLabProps> = ({ targetSsid }) => {
  const [isBruting, setIsBruting] = useState(false);
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [foundPassword, setFoundPassword] = useState<string | null>(null);
  const [found, setFound] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  const startBruteForce = () => {
    if (!targetSsid) return;
    setIsBruting(true);
    setFound(false);
    setFoundPassword(null);
    setAttempts(0);
    
    // محاكاة تجربة جميع الأرقام والرموز والحروف
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let count = 0;
    
    timerRef.current = window.setInterval(() => {
      count += Math.floor(Math.random() * 85);
      setAttempts(count);
      
      // إنشاء محاولة تخمين عشوائية سريعة للعرض البصري
      let randomGuess = "";
      for(let i=0; i<8; i++) {
        randomGuess += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setCurrentGuess(randomGuess);

      // محاكاة إيجاد الباسورد بعد عدد معين من المحاولات (للأغراض التعليمية)
      if (count > 2500) {
        const correctPwd = "Wifi_" + targetSsid.split('_')[0] + "2024";
        setCurrentGuess(correctPwd);
        setFoundPassword(correctPwd);
        setFound(true);
        setIsBruting(false);
        if (timerRef.current) clearInterval(timerRef.current);
        
        // إبلاغ المستخدم عبر تنبيه النظام
        if (Notification.permission === "granted") {
          new Notification("تم اكتشاف الباسورد!", { body: `الشبكة: ${targetSsid}\nكلمة المرور: ${correctPwd}` });
        } else {
          alert(`🎉 نجاح العملية!\nتم تحديد الباسورد للشبكة (${targetSsid}):\n${correctPwd}`);
        }
      }
    }, 40);
  };

  const stopBruteForce = () => {
    setIsBruting(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Background Decorative Signal */}
        <SignalIcon className="absolute -right-10 -bottom-10 w-64 h-64 text-blue-500/5 rotate-12" />

        <div className="relative z-10 text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 flex justify-center items-center gap-3">
            <CpuChipIcon className="w-10 h-10 text-blue-500" />
            وحدة التخمين الشامل
          </h2>
          <p className="text-slate-400">
            تجربة جميع الأرقام والرموز والحروف لفك تشفير الشبكة المحددة
          </p>
        </div>

        {!targetSsid ? (
          <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-xl text-center">
            <p className="text-amber-500 font-bold mb-2">تنبيه: لم يتم التقاط هدف بعد</p>
            <p className="text-slate-400 text-sm">يجب عليك تحديد شبكة من قائمة "فحص الشبكات" أولاً للبدء في عملية التخمين.</p>
          </div>
        ) : (
          <div className="space-y-6 relative z-10">
            {/* Target Card */}
            <div className="bg-slate-800 p-4 rounded-xl border border-blue-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <KeyIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <span className="text-[10px] text-blue-400 uppercase font-bold tracking-widest">Target SSID</span>
                  <div className="text-xl font-mono font-bold text-white">{targetSsid}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Security Protocol</span>
                <span className="text-xs font-bold text-slate-300">WPA2/AES-CCMP</span>
              </div>
            </div>

            {/* Bruteforce Monitor */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono relative overflow-hidden">
              <div className="flex justify-between items-end mb-4">
                <div className="text-sm text-blue-500">CONSOLE_STATUS: {isBruting ? 'RUNNING' : found ? 'COMPLETED' : 'READY'}</div>
                <div className="text-xs text-slate-600">ATTEMPTS: {attempts.toLocaleString()}</div>
              </div>
              
              <div className="text-3xl md:text-5xl font-black text-center py-8 text-blue-400 tracking-tighter break-all">
                {isBruting ? currentGuess : foundPassword ? foundPassword : '---- ---- ----'}
              </div>

              {isBruting && (
                <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 animate-[shimmer_2s_infinite] w-full" style={{background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)'}}></div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              {!isBruting ? (
                <button 
                  onClick={startBruteForce}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-900/30 group"
                >
                  <PlayIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  بدء تجربة جميع الرموز (Brute Force)
                </button>
              ) : (
                <button 
                  onClick={stopBruteForce}
                  className="flex-1 bg-red-600 hover:bg-red-500 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-900/30"
                >
                  <StopIcon className="w-6 h-6" />
                  إيقاف العملية فوراً
                </button>
              )}
            </div>

            {found && (
              <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-4 animate-bounce-short">
                <div className="bg-green-500 p-2 rounded-full">
                  <CheckCircleIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-green-400 text-lg">تم العثور على الباسورد الصحيح!</h4>
                  <p className="text-sm text-green-200/70">الآن يمكنك استخدام كلمة المرور <span className="font-mono text-white font-bold px-2 bg-slate-800 rounded">{foundPassword}</span> لتسجيل الدخول.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase">مصفوفة البحث</h4>
          <p className="text-sm text-slate-400">نظام البحث يشمل (A-Z, a-z, 0-9) بالإضافة إلى الرموز الخاصة مثل (!@#$%^&*). يتم اختبار آلاف التوليفات في الثانية.</p>
        </div>
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase">ملاحظة أمنية</h4>
          <p className="text-sm text-slate-400">هذه المحاكاة توضح أهمية استخدام كلمات مرور طويلة، حيث أن تجربة كل الاحتمالات قد تستغرق وقتاً طويلاً جداً في الواقع.</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordLab;
