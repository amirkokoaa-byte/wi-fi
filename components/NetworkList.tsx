
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

  // استعادة البيانات من الذاكرة المحلية عند بدء التشغيل
  useEffect(() => {
    const saved = localStorage.getItem('captured_networks');
    if (saved) {
      setNetworks(JSON.parse(saved));
    } else {
      simulateScan();
    }
  }, []);

  // حفظ البيانات تلقائياً عند تغيير القائمة
  useEffect(() => {
    localStorage.setItem('captured_networks', JSON.stringify(networks));
  }, [networks]);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const mockNetworks: Network[] = [
        { id: '1', ssid: 'Fiber_Home_EXT', strength: 92, security: 'WPA3' },
        { id: '2', ssid: 'TP-Link_Guest_Area', strength: 45, security: 'WPA2' },
        { id: '3', ssid: 'HUAWEI-5G-B311', strength: 78, security: 'WPA2' },
      ];
      
      setNetworks(prev => {
        const manualOnes = prev.filter(n => n.isReal);
        // نمنع التكرار
        const newOnes = mockNetworks.filter(mn => !manualOnes.find(mo => mo.ssid === mn.ssid));
        return [...manualOnes, ...newOnes];
      });
      setScanning(false);
    }, 2000);
  };

  const handleAddManual = () => {
    if (!manualSsid || networks.find(n => n.ssid === manualSsid)) return;
    const newNet: Network = {
      id: `real_${Date.now()}`,
      ssid: manualSsid,
      strength: Math.floor(Math.random() * (100 - 80 + 1)) + 80,
      security: 'WPA2/AES',
      isReal: true
    };
    setNetworks([newNet, ...networks]);
    setManualSsid('');
    onSelectNetwork(manualSsid);
  };

  const clearStorage = () => {
    localStorage.removeItem('captured_networks');
    setNetworks([]);
    simulateScan();
  };

  return (
    <div className="space-y-6 relative overflow-hidden">
      {scanning && <div className="absolute inset-0 pointer-events-none z-10 scan-line"></div>}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-400">
            <CursorArrowRaysIcon className="w-6 h-6" />
            رادار التقاط الأهداف
          </h2>
          <p className="text-slate-500 text-sm">تم العثور على {networks.length} هدف نشط في النطاق</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={clearStorage}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            مسح القائمة
          </button>
          <button 
            onClick={simulateScan}
            disabled={scanning}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 px-4 py-2 rounded-xl transition-all text-sm border border-slate-700"
          >
            <ArrowPathIcon className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
            تحديث المسح
          </button>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-blue-500/20 p-5 rounded-2xl shadow-inner group transition-all hover:border-blue-500/40">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <input 
              type="text"
              value={manualSsid}
              onChange={(e) => setManualSsid(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddManual()}
              placeholder="اكتب اسم الشبكة الحقيقية هنا..."
              className="w-full bg-[#111] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono text-sm"
            />
          </div>
          <button 
            onClick={handleAddManual}
            className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
          >
            <PlusIcon className="w-5 h-5" />
            التقاط الآن
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-center">
          * أدخل اسم الشبكة كما يظهر في إعدادات الواي فاي بجهازك
        </p>
      </div>

      <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {networks.length === 0 && !scanning && (
          <div className="text-center py-20 text-slate-700 border-2 border-dashed border-slate-900 rounded-2xl">
            الرادار فارغ حالياً.. ابدأ بالمسح أو الإضافة اليدوية
          </div>
        )}
        {networks.map((net) => (
          <div 
            key={net.id} 
            onClick={() => onSelectNetwork(net.ssid)}
            className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between group ${
              selectedSsid === net.ssid ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500' : 'bg-[#0c0c0c] border-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${net.strength > 70 ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                <SignalIcon className={`w-6 h-6 ${net.strength > 70 ? 'text-green-500' : 'text-yellow-500'}`} />
              </div>
              <div>
                <h3 className="font-bold flex items-center gap-2 text-slate-200">
                  {net.ssid}
                  {net.isReal && <span className="bg-blue-500/20 text-blue-400 text-[9px] px-2 py-0.5 rounded-full border border-blue-500/30 font-mono">REAL_TARGET</span>}
                </h3>
                <div className="flex gap-3 mt-1">
                   <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase">
                    <LockClosedIcon className="w-3 h-3" /> {net.security}
                   </span>
                   <span className="text-[10px] text-slate-500">POWER: {net.strength}%</span>
                </div>
              </div>
            </div>
            {selectedSsid === net.ssid && (
              <div className="flex flex-col items-end">
                <span className="text-blue-400 text-[10px] font-bold animate-pulse">DEPLOYED</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 shadow-[0_0_8px_#3b82f6]"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-slate-800 p-4 rounded-xl flex items-start gap-3">
        <InformationCircleIcon className="w-5 h-5 text-blue-500 shrink-0" />
        <p className="text-slate-500 text-[11px] leading-relaxed">
          تنبيه: هذا النظام يعمل كمحاكي أمني (Sandbox). يتم تخزين بيانات الشبكات "الملتقطة" محلياً في متصفحك لضمان تجربة مستمرة. المتصفح لا يملك صلاحية التحكم في الهاردوير الحقيقي لدواعي الأمان.
        </p>
      </div>
    </div>
  );
};

export default NetworkList;
