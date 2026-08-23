import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Settings2, Layers, ChevronDown, ChevronUp, CheckSquare, Square, Lock, CalendarClock } from 'lucide-react';

const SYSTEM_INSTALLMENTS = [
  { label: 'Month 4',  amount: 166667 },
  { label: 'Month 8',  amount: 166667 },
  { label: 'Month 12', amount: 166666 },
];

export const TorbionaModal = () => {
  const { closeTorbiona, completePurchase, setCurrentView } = useApp();
  const [showTerms, setShowTerms] = useState(false);
  const [showInstallments, setShowInstallments] = useState(false);
  const [terms, setTerms] = useState({
    requireApproval: false,
    notifyEach: true,
    freezeOnMiss: false,
  });

  const toggleTerm = (key) => setTerms((p) => ({ ...p, [key]: !p[key] }));

  const scores = {
    behavioral: 61,
    financial: 60,
    market: 78,
    technical: 76,
    governmental: 78,
    overall: 70,
    creditLimit: 500000,
  };

  const ScoreBar = ({ label, value }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-darkslate">{label}</span>
        <span className="text-sm font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">{value}%</span>
      </div>
      <div className="w-full bg-lightgray rounded-full h-3">
        <div
          className="bg-gradient-to-r from-teal-400 to-teal-600 h-3 rounded-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold text-darkslate">Torbiona Credit Calculator</h2>
          <button onClick={closeTorbiona} className="text-gray-500 hover:text-darkslate transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left: Score Bars */}
            <div>
              <h3 className="text-xl font-bold text-darkslate mb-6">AI Credit Analysis</h3>
              <ScoreBar label="Behavioral" value={scores.behavioral} />
              <ScoreBar label="Financial" value={scores.financial} />
              <ScoreBar label="Market" value={scores.market} />
              <ScoreBar label="Technical and Operational" value={scores.technical} />
              <ScoreBar label="Governmental and Regulatory" value={scores.governmental} />
            </div>

            {/* Right: Circular Progress */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-56 h-56 mb-6">
                <svg className="transform -rotate-90 w-56 h-56">
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="#eeeeee"
                    strokeWidth="20"
                    fill="none"
                  />
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 100}`}
                    strokeDashoffset={`${2 * Math.PI * 100 * (1 - scores.overall / 100)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6bc4cc" />
                      <stop offset="100%" stopColor="#4a9aa0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                    {scores.overall}%
                  </span>
                  <span className="text-sm text-gray-600 mt-2">Overall Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Card */}
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 border-2 border-teal-500 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-teal-600 flex-shrink-0" size={40} />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-darkslate mb-2">
                  ✅ Approved! Congratulations!
                </h3>
                <p className="text-gray-700 mb-4">
                  You are eligible for the Torbiona payment method.
                </p>
                <div className="bg-white rounded-xl p-4 inline-block">
                  <p className="text-sm text-gray-600 mb-1">Available Credit Limit</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                    ${scores.creditLimit.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Financing Control Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">

            {/* Card 1 — إضافة شروط التحكم بالتمويل */}
            <div className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${showTerms ? 'border-teal-500 shadow-md' : 'border-gray-200'}`}>
              <button
                onClick={() => setShowTerms((p) => !p)}
                className={`w-full flex items-center justify-between gap-3 p-4 transition-colors ${showTerms ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-lightgray hover:bg-teal-50/40'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${showTerms ? 'bg-gradient-to-br from-teal-400 to-teal-600 shadow' : 'bg-white shadow-sm'}`}>
                    <Settings2 size={17} className={showTerms ? 'text-white' : 'text-teal-500'} />
                  </div>
                  <div className="text-right" dir="rtl">
                    <p className={`text-sm font-bold ${showTerms ? 'text-teal-700' : 'text-darkslate'}`}>شروط التحكم بالتمويل</p>
                    <p className="text-[10px] text-gray-400">Financing Control Terms</p>
                  </div>
                </div>
                {showTerms ? <ChevronUp size={16} className="text-teal-500 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
              </button>

              {showTerms && (
                <div className="px-4 pb-4 pt-3 bg-white space-y-3">
                  {[
                    { key: 'requireApproval', ar: 'دفعة مقدمة', en: 'Require manager approval' },
                    { key: 'notifyEach', ar: 'التحصيل التبادلي', en: 'Notify on each disbursement' },
                    { key: 'freezeOnMiss', ar: 'استقطاع من حساب الطوارئ', en: 'Freeze on missed payment' },
                  ].map(({ key, ar, en }) => (
                    <button
                      key={key}
                      onClick={() => toggleTerm(key)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-all ${terms[key] ? 'border-teal-400 bg-teal-50' : 'border-gray-100 bg-lightgray hover:border-teal-200'}`}
                    >
                      <div dir="rtl" className="text-right">
                        <p className={`text-xs font-semibold ${terms[key] ? 'text-teal-700' : 'text-darkslate'}`}>{ar}</p>
                        <p className="text-[10px] text-gray-400">{en}</p>
                      </div>
                      {terms[key]
                        ? <CheckSquare size={16} className="text-teal-500 flex-shrink-0" />
                        : <Square size={16} className="text-gray-300 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Card 2 — الصرف على دفعات */}
            <div className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${showInstallments ? 'border-teal-500 shadow-md' : 'border-gray-200'}`}>
              <button
                onClick={() => setShowInstallments((p) => !p)}
                className={`w-full flex items-center justify-between gap-3 p-4 transition-colors ${showInstallments ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-lightgray hover:bg-teal-50/40'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${showInstallments ? 'bg-gradient-to-br from-teal-400 to-teal-600 shadow' : 'bg-white shadow-sm'}`}>
                    <Layers size={17} className={showInstallments ? 'text-white' : 'text-teal-500'} />
                  </div>
                  <div className="text-right" dir="rtl">
                    <p className={`text-sm font-bold ${showInstallments ? 'text-teal-700' : 'text-darkslate'}`}>الصرف على دفعات</p>
                    <p className="text-[10px] text-gray-400">Disbursement in Installments</p>
                  </div>
                </div>
                {showInstallments ? <ChevronUp size={16} className="text-teal-500 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
              </button>

              {showInstallments && (
                <div className="px-4 pb-4 pt-3 bg-white">
                  {/* System badge */}
                  <div className="flex items-center gap-1.5 mb-4 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                    <Lock size={11} className="text-slate-400 flex-shrink-0" />
                    <p className="text-[10px] text-slate-500">
                      <span className="font-semibold text-slate-600">System Generated</span> · Calculated from project timeline & risk profile
                    </p>
                  </div>

                  {/* Header row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <CalendarClock size={13} className="text-teal-500" />
                      <p className="text-xs font-bold text-darkslate" dir="rtl">عدد الدفعات</p>
                    </div>
                    <span className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-0.5">
                      {SYSTEM_INSTALLMENTS.length} Installments
                    </span>
                  </div>

                  {/* Timeline */}
                  <div className="relative flex items-stretch gap-0 mb-3">
                    {SYSTEM_INSTALLMENTS.map((inst, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0">
                        {/* Dot + line */}
                        <div className="flex items-center w-full">
                          <div className={`h-px flex-1 ${i === 0 ? 'bg-transparent' : 'bg-gradient-to-r from-teal-300 to-teal-400'}`} />
                          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 shadow flex-shrink-0 ring-2 ring-teal-100" />
                          <div className={`h-px flex-1 ${i === SYSTEM_INSTALLMENTS.length - 1 ? 'bg-transparent' : 'bg-gradient-to-r from-teal-400 to-teal-300'}`} />
                        </div>
                        {/* Card */}
                        <div className="mt-2 w-full bg-teal-50 border border-teal-200 rounded-xl px-2 py-2.5 flex flex-col items-center gap-1">
                          <p className="text-[10px] text-teal-500 font-semibold">{inst.label}</p>
                          <p className="text-sm font-bold text-darkslate">{inst.amount.toLocaleString()}</p>
                          <p className="text-[9px] text-gray-400">SAR</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-gray-400 text-center">
                    Total: <span className="font-semibold text-darkslate">500,000 SAR</span> · Disbursed across {SYSTEM_INSTALLMENTS.length} equal payments
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                closeTorbiona();
                setCurrentView('investor-report');
              }}
              className="flex-1 py-4 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Proceed with Torbiona
            </button>
            <button
              onClick={closeTorbiona}
              className="flex-1 py-4 border-2 border-gray-300 text-darkslate rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
