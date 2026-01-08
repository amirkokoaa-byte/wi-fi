
import React, { useState, useEffect } from 'react';
import { SignalIcon, LockClosedIcon, LockOpenIcon, ArrowPathIcon, InformationCircleIcon, PlusIcon, CursorArrowRaysIcon } from '@heroicons/react/24/solid';

interface Network {
  id: string;
  ssid: string;
  strength: number;
  security: string;
  isReal?: boolean;
}

interface NetworkListProps {
  onSelectNetwork: (ssid: string) => void;
  selectedSsid: string;
}

const NetworkList: React.FC<NetworkListProps> = ({ onSelectNetwork, selectedSsid }) => {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [scanning, setScanning] = useState(false);
  const [manualSsid, setManualSsid] = useState('');

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const mockNetworks: Network[] = [
        { id: '1', ssid: 'Home_Fiber_5G', strength: 95, security: 'WPA3' },
        { id: '3', ssid: 'TP-Link_2841', strength: 40, security: 'WPA2' },
      ];
      setNetworks(prev => {
        const realOnes = prev.filter(n => n.isReal);
        return [...realOnes, ...mockNetworks];
      });
      setScanning(false);
    }, 1500);
  };

  const handleAddManual = () => {
    if (!manualSsid) return;
    const newNet: Network = {
      id: Date.now().toString(),
      ssid: manualSsid,
      strength: 100,
      security: 'WPA2/WPA3',
      isReal: true
    };
    setNetworks([newNet, ...networks]);
    setManualSsid('');
    onSelectNetwork(manualSsid);
  };

  useEffect(() => {
    simulateScan();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CursorArrowRaysIcon className="w-6 h-6 text-blue-400" />
            التقاط الأهداف القريبة
          </h2>
          <p className="text-slate-400 text-sm">قم بالتقاط شبكة حقيقية من محيطك للبدء</p>
        </div>
        <button 
          onClick={simulateScan}
          disabled={scanning}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 px-4 py-2 rounded-lg transition-all text-sm border border-slate-600"
        >
          <ArrowPathIcon className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
          تحديث الرادار
        </button>
      </div>

      {/* Manual Capture Input */}
      <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-xl flex flex-col md:flex-row gap-3">
        <div className="flex-grow">
          <input 
            type="text"
            value={manualSsid}
            onChange={(e) => setManualSsid(e.target.value)}
            placeholder="أدخل اسم الشبكة التي تظهر في هاتفك..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button 
          onClick={handleAddManual}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap"
        >
          <PlusIcon className="w-5 h-5" />
          التقاط الشبكة الآن
        </button>
      </div>

      <div className="grid gap-3">
        {networks.length === 0 && !scanning && (
          <div className="text-center py-10 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
            لا توجد أهداف ملتقطة حالياً
          </div>
        )}
        {networks.map((net) => (
          <div 
            key={net.id} 
            onClick={() => onSelectNetwork(net.ssid)}
            className={`cursor-pointer bg-slate-900/80 p-4 rounded-xl border transition-all flex items-center justify-between group ${
              selectedSsid === net.ssid ? 'border-blue-500 ring-1 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <SignalIcon className={`w-6 h-6 ${net.strength > 70 ? 'text-green-500' : 'text-yellow-500'}`} />
              <div>
                <h3 className="font-bold flex items-center gap-2">
                  {net.ssid}
                  {net.isReal && <span className="bg-blue-500 text-[10px] px-2 py-0.5 rounded text-white uppercase">Real Target</span>}
                </h3>
                <span className="text-xs text-slate-500">الحماية: {net.security}</span>
              </div>
            </div>
            {selectedSsid === net.ssid ? (
              <span className="text-blue-400 text-xs font-bold animate-pulse">تم التحديد للعملية...</span>
            ) : (
              <div className="bg-slate-800 px-3 py-1 rounded text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                اضغط لتحديد الهدف
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
        <p className="text-slate-400 text-[11px] leading-relaxed flex items-start gap-2">
          <InformationCircleIcon className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          بما أن المتصفح لا يسمح بالمسح التلقائي المباشر للواي فاي، نستخدم نظام "الالتقاط اليدوي" لتمكينك من ربط البرنامج بأي شبكة حقيقية حولك وتجربة قوة أمانها في المختبر.
        </p>
      </div>
    </div>
  );
};

export default NetworkList;
