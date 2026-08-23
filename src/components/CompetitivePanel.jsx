import { useState } from 'react';
import { Users, ShieldCheck, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const features = [
  {
    icon: Users,
    label: 'Joint\nOperation',
    view: 'joint-operation',
    gradient: 'from-blue-500 to-indigo-600',
    color: 'text-blue-600',
    ring: 'ring-blue-200',
  },
  {
    icon: ShieldCheck,
    label: 'Credit\nControl',
    view: 'credit-control',
    gradient: 'from-teal-400 to-teal-600',
    color: 'text-teal-600',
    ring: 'ring-teal-200',
  },
  {
    icon: Zap,
    label: 'Fuzzy\nLogic',
    view: 'fuzzy-logic',
    gradient: 'from-purple-500 to-violet-600',
    color: 'text-purple-600',
    ring: 'ring-purple-200',
  },
];

export const CompetitivePanel = () => {
  const { currentView, setCurrentView } = useApp();
  const [visible, setVisible] = useState(true);

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center gap-1">
      {/* Buttons */}
      <div
        className={`flex flex-col gap-3 pl-3 transition-all duration-300 ease-in-out ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
      >
        {features.map((f) => {
          const Icon = f.icon;
          const isActive = currentView === f.view;
          return (
            <button
              key={f.view}
              onClick={() => setCurrentView(f.view)}
              className={`flex flex-col items-center gap-2 w-[62px] py-4 px-1 rounded-2xl transition-all duration-300 border ${
                isActive
                  ? `bg-gradient-to-b ${f.gradient} border-transparent shadow-xl scale-110 ring-4 ${f.ring}`
                  : 'bg-white border-gray-100 shadow-md hover:scale-105 hover:shadow-xl'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : f.color} />
              <span
                className={`text-[9px] font-bold leading-tight text-center whitespace-pre-line ${
                  isActive ? 'text-white' : f.color
                }`}
              >
                {f.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toggle tab */}
      <button
        onClick={() => setVisible((p) => !p)}
        className="flex items-center justify-center w-5 h-12 bg-white border border-gray-200 rounded-r-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
        title={visible ? 'Hide panel' : 'Show panel'}
      >
        {visible
          ? <ChevronLeft size={12} className="text-gray-400" />
          : <ChevronRight size={12} className="text-gray-400" />}
      </button>
    </div>
  );
};
