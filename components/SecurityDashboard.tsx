
import React from 'react';

const SecurityDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="text-slate-400 text-sm">إجمالي الشبكات</div>
        <div className="text-2xl font-bold">5</div>
      </div>
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="text-slate-400 text-sm">شبكات آمنة (WPA3)</div>
        <div className="text-2xl font-bold text-green-500">1</div>
      </div>
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="text-slate-400 text-sm">شبكات ضعيفة</div>
        <div className="text-2xl font-bold text-red-500">2</div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
