import { useState } from 'react';
import { Users, ShieldCheck, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const features = [
  {
    icon: Users,
    label: 'Joint Operation',
    description: 'Register & onboard',
    view: 'joint-operation',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    color: 'text-blue-700',
    iconColor: 'text-blue-500',
    ring: 'ring-blue-300',
  },
  {
    icon: ShieldCheck,
    label: 'Credit Control',
    description: 'Manage credit limits',
    view: 'credit-control',
    gradient: 'from-teal-400 to-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    color: 'text-teal-700',
    iconColor: 'text-teal-500',
    ring: 'ring-teal-300',
  },
  {
    icon: Zap,
    label: 'Fuzzy Logic',
    description: 'AI risk scoring',
    view: 'fuzzy-logic',
    gradient: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    color: 'text-purple-700',
    iconColor: 'text-purple-500',
    ring: 'ring-purple-300',
  },
];

export const CompetitivePanel = () => {
  const { currentView, setCurrentView, startCreditControl } = useApp();
  const [visible, setVisible] = useState(true);

  const handleFeatureClick = (view) => {
    if (view === 'credit-control') startCreditControl();
    else setCurrentView(view);
  };

  return (
    <>
      {/* ── Desktop left panel ─────────────────────────────────────────── */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center gap-0">
        <div
          className={`flex flex-col gap-2 pl-2 transition-all duration-300 ease-in-out ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6 pointer-events-none'
          }`}
        >
          {/* Label */}
          <div className="mb-1 px-1">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Our Edge</p>
          </div>

          {features.map((f) => {
            const Icon = f.icon;
            const isActive = currentView === f.view;
            return (
              <button
                key={f.view}
                onClick={() => handleFeatureClick(f.view)}
                title={f.label}
                className={`group flex flex-col items-center gap-1.5 w-[72px] py-4 px-2 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? `bg-gradient-to-b ${f.gradient} border-transparent shadow-xl scale-105 ring-4 ${f.ring}`
                    : `bg-white ${f.border} shadow-md hover:scale-105 hover:shadow-xl hover:${f.bg}`
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20' : `${f.bg}`
                }`}>
                  <Icon size={20} className={isActive ? 'text-white' : f.iconColor} />
                </div>
                <span className={`text-[10px] font-bold leading-tight text-center ${isActive ? 'text-white' : f.color}`}>
                  {f.label}
                </span>
                <span className={`text-[8px] leading-tight text-center ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  {f.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toggle tab */}
        <button
          onClick={() => setVisible(p => !p)}
          className="flex items-center justify-center w-5 h-16 bg-white border border-gray-200 border-l-0 rounded-r-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 ml-0.5"
          title={visible ? 'Hide panel' : 'Show panel'}
        >
          {visible
            ? <ChevronLeft size={12} className="text-gray-400" />
            : <ChevronRight size={12} className="text-gray-400" />}
        </button>
      </div>

      {/* ── Mobile bottom dock ──────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 py-2 flex justify-around shadow-lg">
        {features.map((f) => {
          const Icon = f.icon;
          const isActive = currentView === f.view;
          return (
            <button
              key={f.view}
              onClick={() => handleFeatureClick(f.view)}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
                isActive ? `bg-gradient-to-b ${f.gradient} shadow-md` : 'hover:bg-gray-50'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : f.iconColor} />
              <span className={`text-[9px] font-bold ${isActive ? 'text-white' : f.color}`}>{f.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
