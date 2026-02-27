import { useApp } from '../context/AppContext';
import { X, CheckCircle } from 'lucide-react';

export const TorbionaModal = () => {
  const { closeTorbiona, completePurchase, setCurrentView } = useApp();

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
        <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-darkslate">Torbiona Credit Calculator</h2>
          <button onClick={closeTorbiona} className="text-gray-500 hover:text-darkslate transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
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
