import { Zap, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FuzzyLogic = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 pl-[80px]">
      <div className="max-w-5xl mx-auto px-8 pt-8 pb-16">
        {/* Back */}
        <button
          onClick={() => setCurrentView('b2b-platform')}
          className="flex items-center gap-2 text-purple-500 font-medium hover:gap-3 transition-all text-sm mb-10"
        >
          <ArrowLeft size={16} />
          Back to Marketplace
        </button>

        {/* Hero */}
        <div className="flex items-center gap-5 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-xl flex-shrink-0">
            <Zap size={32} className="text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">
              Competitive Advantage · 03
            </span>
            <h1 className="text-4xl font-bold text-slate-900">Fuzzy Logic</h1>
          </div>
        </div>
        <p className="text-slate-500 text-lg max-w-2xl mb-12">
          The story behind this feature is coming soon. Stay tuned.
        </p>

        {/* Stat placeholders */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {['Metric A', 'Metric B', 'Metric C'].map((label) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-50 flex flex-col gap-3"
            >
              <div className="w-24 h-3 bg-purple-100 rounded-full animate-pulse" />
              <div className="w-16 h-7 bg-purple-200 rounded-lg animate-pulse" />
              <div className="w-32 h-2 bg-slate-100 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* Story placeholder */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-sm min-h-[340px] flex flex-col items-center justify-center gap-4 p-12">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
            <Zap size={36} className="text-purple-400" />
          </div>
          <p className="text-slate-500 font-semibold text-lg">Story content will appear here</p>
          <p className="text-slate-300 text-sm text-center max-w-xs">
            Share the Fuzzy Logic story and we'll build the full interactive experience.
          </p>
        </div>
      </div>
    </div>
  );
};
