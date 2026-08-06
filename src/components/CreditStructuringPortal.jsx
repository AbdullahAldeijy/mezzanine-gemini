import { useApp } from '../context/AppContext';
import {
  ArrowLeft, FileText, CheckSquare, Activity, BarChart3, TrendingUp,
  Shield, Target, Wallet, Lock, DollarSign, Clock, Percent, ClipboardCheck,
  Eye, ThumbsUp
} from 'lucide-react';

const inputs = [
  { icon: FileText, title: 'Financial Statements', value: 'Audited FY2023 statements verified' },
  { icon: CheckSquare, title: '5Cs Assessment', value: 'Character, Capacity, Capital, Collateral, Conditions' },
  { icon: Activity, title: 'Operational Evidence (Mezzanine Tech)', value: 'Verified platform activity & ERP signals' },
  { icon: BarChart3, title: 'Mezzanine Index', value: '742 / 1000' },
  { icon: TrendingUp, title: 'Expected Cash Flows', value: 'SAR 1.2M projected over 12 months' },
  { icon: Shield, title: 'Guarantees', value: 'Trade Receivables Assignment' },
  { icon: Target, title: 'Financing Purpose', value: 'Inventory Purchase' },
  { icon: Wallet, title: 'Repayment Source', value: 'Sales Receivables' },
  { icon: Lock, title: 'Disbursement Control', value: 'Milestone-based, escrow controlled' },
];

const results = [
  { icon: DollarSign, title: 'Proposed Financing Capacity', value: '850,000 SAR', accent: 'emerald' },
  { icon: Shield, title: 'Risk Score', value: 'Low (Grade B+)', accent: 'emerald' },
  { icon: Wallet, title: 'Appropriate Financing Amount', value: '1,000,000 SAR', accent: 'teal' },
  { icon: Clock, title: 'Appropriate Duration', value: '12 Months', accent: 'teal' },
  { icon: Percent, title: 'Proposed Pricing', value: '9.5% APR', accent: 'teal' },
  { icon: BarChart3, title: 'Reserve Ratio', value: '5%', accent: 'amber' },
  { icon: ClipboardCheck, title: 'Disbursement Terms', value: '3 tranches tied to milestones', accent: 'amber' },
  { icon: Eye, title: 'Control & Monitoring Plan', value: 'Monthly ERP sync + quarterly review', accent: 'amber' },
];

const accentClasses = {
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600',
  teal: 'bg-[#56afb6]/10 border-[#56afb6]/30 text-[#56afb6]',
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-600',
};

export const CreditStructuringPortal = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => setCurrentView('investor-report')}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
          >
            <ArrowLeft size={18} />
            Back to Growth Engine
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Credit Assessment & Structuring</h1>
          <p className="text-lg text-white/80">Mezzanine Finance — underwriting workspace for institutional financing partners</p>
          <p className="text-sm text-white/50 mt-1">التقييم والهيكلة الائتمانية — ميزانين المالية</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Inputs */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Mezzanine Finance Inputs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inputs.map(({ icon: Icon, title, value }) => (
              <div key={title} className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-3">
                  <Icon className="text-white" size={18} />
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{title}</p>
                <p className="text-sm font-medium text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Structuring Result</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {results.map(({ icon: Icon, title, value, accent }) => (
              <div key={title} className={`rounded-2xl p-4 border shadow-lg ${accentClasses[accent]}`}>
                <Icon size={18} className="mb-2" />
                <p className="text-xs font-semibold uppercase mb-1 text-slate-500">{title}</p>
                <p className="text-lg font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Credit Recommendation */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 rounded-2xl p-6 flex items-start gap-4">
            <ThumbsUp className="text-emerald-600 flex-shrink-0" size={32} />
            <div>
              <p className="text-xs font-semibold text-emerald-700 uppercase mb-1">Credit Recommendation</p>
              <p className="text-xl font-bold text-slate-900">✅ Approve with Conditions</p>
              <p className="text-sm text-slate-600 mt-1">Structure the facility per the terms above; release contingent on milestone verification and monthly ERP reconciliation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
