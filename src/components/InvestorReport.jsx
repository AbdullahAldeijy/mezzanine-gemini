import { useApp } from '../context/AppContext';
import { ArrowLeft, Database, FileText, Building2, Shield, Cpu, TrendingUp, TrendingDown, Target, Award } from 'lucide-react';

export const InvestorReport = () => {
  const { setCurrentView } = useApp();

  const dataSources = [
    { icon: Database, title: 'B2B Platform Activity', desc: 'Transaction volumes, RFQ frequency, behavioral data' },
    { icon: FileText, title: 'ERP Integrations', desc: 'Cash conversion cycle (CCC), accounts receivable/payable' },
    { icon: Shield, title: 'Credit Application Data', desc: 'Historical underwriting logic, condition completion rates' },
    { icon: Building2, title: 'Ministry of Commerce (APIs)', desc: 'Legal compliance, licensing, organizational age' },
  ];

  const timeline = [
    {
      year: 'Year 1',
      subtitle: 'Small Contracting (Qassim)',
      focus: 'Operating capital & supply chain support',
      kpi: 'Transform "Conditional" SMEs to "Accepted" (target: 59% conversion)',
      color: 'from-teal-400 to-teal-600',
    },
    {
      year: 'Year 2',
      subtitle: 'Small Food Manufacturing (Madinah)',
      focus: 'Production funding & Compliance visibility',
      kpi: 'Improve CCC by 10 days, utilize predictive supply/demand data',
      color: 'from-blue-400 to-blue-600',
    },
    {
      year: 'Year 3',
      subtitle: 'Small Cold Storage (Eastern Province)',
      focus: 'Expansion funding & Energy indicators (SDG alignment)',
      kpi: 'Achieve 91%+ Traceability for institutional investors',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => setCurrentView('b2b-platform')}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all"
          >
            <ArrowLeft size={18} />
            Back to Prototype
          </button>
          <h1 className="text-4xl font-bold mb-3">Mezzanine Growth Engine: Predictive Credit Scaling</h1>
          <p className="text-xl text-white/90">
            How we leverage B2B ecosystem data to unlock new segments and minimize risk over the next 3 years.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Data Ingestion Engine */}
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The Data Ingestion Engine</h2>
          
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {dataSources.map((source, idx) => {
                const Icon = source.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mb-4">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{source.title}</h3>
                    <p className="text-sm text-slate-600">{source.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Central AI Core */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-teal-400 to-teal-600 rounded-full p-8 shadow-2xl">
                  <Cpu className="text-white" size={48} />
                </div>
              </div>
            </div>
            <p className="text-center mt-4 text-lg font-bold text-slate-900">Mezzanine AI Underwriting Core</p>
          </div>
        </div>

        {/* 3-Year Roadmap */}
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">3-Year Segment Expansion Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map((phase, idx) => (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                style={{ animationDelay: `${(idx + 4) * 100}ms` }}
              >
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${phase.color} text-white rounded-full font-bold mb-4`}>
                  {phase.year}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{phase.subtitle}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Focus</p>
                    <p className="text-sm text-slate-700">{phase.focus}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">KPI Goal</p>
                    <p className="text-sm text-slate-700">{phase.kpi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Impact Dashboard */}
        <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Investor Impact Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1: Reach */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-500" size={24} />
                <h3 className="font-bold text-slate-900">SMEs Reached</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Year 1</span>
                  <span className="font-bold text-slate-900">2,100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Year 3</span>
                  <span className="font-bold text-teal-500">7,500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>

            {/* Metric 2: Default Rate */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="text-green-500" size={24} />
                <h3 className="font-bold text-slate-900">Default Rate (ECL)</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Year 1</span>
                    <span className="text-sm font-bold text-slate-900">1.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: '1.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Year 3</span>
                    <span className="text-sm font-bold text-green-600">0.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0.7%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">High portfolio quality</p>
              </div>
            </div>

            {/* Metric 3: Traceability */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="text-teal-500" size={24} />
                <h3 className="font-bold text-slate-900">Decision Traceability</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r="56" stroke="#eeeeee" strokeWidth="12" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.919)}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6bc4cc" />
                        <stop offset="100%" stopColor="#4a9aa0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-teal-500">91.9%</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 text-center mt-3">Fully auditable credit decisions</p>
              </div>
            </div>

            {/* SDG Alignment */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-teal-500" size={24} />
                <h3 className="font-bold text-slate-900">SDG Alignment</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold">
                    8
                  </div>
                  <span className="text-sm font-medium text-slate-900">Economic Growth</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    9
                  </div>
                  <span className="text-sm font-medium text-slate-900">Innovation</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                    12
                  </div>
                  <span className="text-sm font-medium text-slate-900">Responsible Production</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
