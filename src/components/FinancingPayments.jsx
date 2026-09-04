import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Check, Lock, AlertCircle, CheckCircle,
  CreditCard, Landmark, ArrowDownCircle, ArrowUpCircle,
  Clock, ChevronRight,
} from 'lucide-react';

const fmt = (n) => `SAR ${Number(n).toLocaleString()}`;

const INIT_DISB = [
  {
    id: 'DISB-01', label: 'Disbursement 1 — Month 4', amount: 166667, status: 'Disbursed', date: 'Apr 2025',
    reqs: [
      { label: 'KYB identity verified', done: true },
      { label: 'Joint Operation profile completed', done: true },
      { label: 'Digital contract signed', done: true },
    ],
  },
  {
    id: 'DISB-02', label: 'Disbursement 2 — Month 8', amount: 166667, status: 'Requirements Pending', date: 'Aug 2025',
    reqs: [
      { label: 'Q1 financial statements uploaded', done: false },
      { label: 'Minimum 2 new products added to marketplace', done: false },
      { label: 'At least 1 active contract executed', done: false },
    ],
  },
  {
    id: 'DISB-03', label: 'Disbursement 3 — Month 12', amount: 166666, status: 'Locked', date: 'Dec 2025',
    reqs: [
      { label: 'Invoice reconciliation submitted', done: false },
      { label: '3+ active customer contracts maintained', done: false },
      { label: 'Platform engagement score ≥ 90%', done: false },
    ],
  },
];

const REPAYMENTS = [
  { id: 'INST-01', date: 'Sep 14, 2026', amount: 150000, status: 'Paid' },
  { id: 'INST-02', date: 'Oct 15, 2026', amount: 150000, status: 'Paid' },
  { id: 'INST-03', date: 'Nov 13, 2026', amount: 150000, status: 'Paid' },
  { id: 'INST-04', date: 'Dec 15, 2026', amount: 150000, status: 'Due' },
  { id: 'INST-05', date: 'Jan 15, 2027',  amount: 150000, status: 'Due' },
  { id: 'INST-06', date: 'Feb 15, 2027',  amount: 150000, status: 'Due' },
];

const TOTAL_FINANCED  = 900000;
const TOTAL_DISBURSED = 166667;
const TOTAL_PAID_BACK = 450000;
const TOTAL_REMAINING = TOTAL_FINANCED - TOTAL_PAID_BACK;

// ── Shared section UIs ────────────────────────────────────────────────────────

export const DisbursementSection = ({ disb, onToggle }) => (
  <div className="space-y-4">
    {disb.map((d, di) => {
      const allDone = d.reqs.every(r => r.done);
      return (
        <div key={d.id} className={`bg-white rounded-2xl border-2 p-5 transition-all ${
          d.status === 'Disbursed' ? 'border-emerald-300' :
          d.status === 'Requirements Pending' ? 'border-amber-300' : 'border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                d.status === 'Disbursed' ? 'bg-emerald-100' :
                d.status === 'Requirements Pending' ? 'bg-amber-100' : 'bg-slate-100'
              }`}>
                {d.status === 'Disbursed'
                  ? <CheckCircle size={20} className="text-emerald-600" />
                  : d.status === 'Locked'
                  ? <Lock size={20} className="text-slate-400" />
                  : <AlertCircle size={20} className="text-amber-500" />}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{d.label}</p>
                <p className="text-xs text-slate-500">{fmt(d.amount)} · {d.date}</p>
              </div>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${
              d.status === 'Disbursed' ? 'bg-emerald-100 text-emerald-700' :
              d.status === 'Requirements Pending' ? 'bg-amber-100 text-amber-700' :
              'bg-slate-100 text-slate-500'
            }`}>{d.status}</span>
          </div>

          {/* Conditions */}
          <div className="bg-slate-50 rounded-xl p-3 space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Lock size={10} />
              الشروط المطلوبة · Conditions Required
            </p>
            {d.reqs.map((req, ri) => (
              <button key={ri}
                onClick={() => onToggle && d.status !== 'Disbursed' && d.status !== 'Locked' && onToggle(di, ri)}
                disabled={d.status === 'Disbursed' || d.status === 'Locked'}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                  req.done ? 'border-emerald-300 bg-emerald-50' :
                  d.status === 'Locked' ? 'border-slate-100 bg-white opacity-50' :
                  'border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50'
                }`}>
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                  req.done ? 'bg-emerald-500 border-emerald-500' :
                  d.status === 'Locked' ? 'bg-slate-200 border-slate-300' : 'bg-white border-slate-300'
                }`}>
                  {req.done && <Check size={11} className="text-white" />}
                  {d.status === 'Locked' && !req.done && <Lock size={9} className="text-slate-400" />}
                </div>
                <span className={`text-xs font-medium ${
                  req.done ? 'text-emerald-700 line-through' :
                  d.status === 'Locked' ? 'text-slate-400' : 'text-slate-700'
                }`}>{req.label}</span>
              </button>
            ))}
          </div>

          {d.status !== 'Disbursed' && allDone && (
            <div className="mt-3 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle size={13} /> جميع الشروط مستوفاة — All conditions met
              </span>
              <button className="text-xs font-bold text-white bg-emerald-500 px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-all">
                Request Release
              </button>
            </div>
          )}
        </div>
      );
    })}
  </div>
);

export const RepaymentSection = () => {
  const paidCount = REPAYMENTS.filter(r => r.status === 'Paid').length;
  return (
    <div>
      {/* Progress summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-blue-700">{paidCount} of {REPAYMENTS.length} installments paid</span>
            <span className="text-xs font-semibold text-blue-600">{fmt(TOTAL_PAID_BACK)} / {fmt(TOTAL_FINANCED)}</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all"
              style={{ width: `${(paidCount / REPAYMENTS.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {REPAYMENTS.map((inst) => (
          <div key={inst.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
            inst.status === 'Paid' ? 'border-emerald-200 bg-emerald-50' : 'border-blue-200 bg-white hover:border-blue-400'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              inst.status === 'Paid' ? 'bg-emerald-500' : 'bg-blue-100'
            }`}>
              {inst.status === 'Paid'
                ? <Check size={18} className="text-white" />
                : <Clock size={18} className="text-blue-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900">{inst.id}</p>
              <p className="text-xs text-slate-500">{inst.status === 'Paid' ? 'Paid on' : 'Due'} {inst.date}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-slate-900">{fmt(inst.amount)}</p>
            </div>
            <div className="flex-shrink-0 w-24 text-right">
              {inst.status === 'Paid' ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
                  <Check size={11} /> Paid
                </span>
              ) : (
                <button className="text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 px-3 py-1.5 rounded-lg hover:shadow-md transition-all">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Standalone page (accessible from B2BPlatform) ─────────────────────────────

export const FinancingPayments = () => {
  const { setCurrentView } = useApp();
  const [disb, setDisb] = useState(INIT_DISB);

  const toggleDisb = (di, ri) =>
    setDisb(prev => prev.map((d, i) =>
      i === di ? { ...d, reqs: d.reqs.map((r, j) => j === ri ? { ...r, done: !r.done } : r) } : d
    ));

  return (
    <div className="min-h-screen bg-[#f7f4e8]">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => setCurrentView('b2b-platform')} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
              <CreditCard size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">مدفوعات التمويل</h1>
              <p className="text-xs text-slate-500">Mezzanine Finance Payments · CF-2025-0041</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <PageContent disb={disb} onToggle={toggleDisb} />
      </div>
    </div>
  );
};

// ── Shared content (used by both standalone + CC journey) ─────────────────────

export const PageContent = ({ disb, onToggle, footer }) => (
  <div className="space-y-6">
    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { label: 'Total Financed',    value: fmt(TOTAL_FINANCED),  sub: 'Facility amount',      color: 'from-slate-700 to-slate-900', icon: Landmark },
        { label: 'Disbursed to You',  value: fmt(TOTAL_DISBURSED), sub: '1 of 3 released',      color: 'from-teal-500 to-teal-700',   icon: ArrowDownCircle },
        { label: 'Paid Back',         value: fmt(TOTAL_PAID_BACK), sub: '3 of 6 installments',  color: 'from-emerald-500 to-emerald-700', icon: CheckCircle },
        { label: 'Remaining Balance', value: fmt(TOTAL_REMAINING), sub: 'Outstanding to pay',   color: 'from-blue-500 to-blue-700',   icon: ArrowUpCircle },
      ].map(({ label, value, sub, color, icon: Icon }) => (
        <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-3`}>
            <Icon size={17} className="text-white" />
          </div>
          <p className="text-lg font-bold text-slate-900 leading-tight">{value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          <p className="text-[10px] text-slate-400">{sub}</p>
        </div>
      ))}
    </div>

    {/* Section 1: Disbursements (Mezzanine → Company) */}
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-teal-500 to-teal-700 flex items-center justify-center flex-shrink-0">
          <ArrowDownCircle size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">صرف التمويل · Fund Disbursements</h2>
          <p className="text-xs text-slate-500">Mezzanine Finance → Your Company · لا يتم الصرف إلا بعد استيفاء الشروط</p>
        </div>
      </div>
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
        <Lock size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 leading-relaxed">
          لن تستلم شركتك أي مبالغ حتى يتم التحقق من استيفاء جميع الشروط المطلوبة تلقائياً عبر منصة ميزانين.
          <span className="block text-slate-600 mt-0.5">Your company will not receive funds until all conditions are automatically verified by Mezzanine platform data.</span>
        </p>
      </div>
      <DisbursementSection disb={disb} onToggle={onToggle} />
    </div>

    {/* Divider */}
    <div className="relative flex items-center gap-4">
      <div className="flex-1 h-px bg-slate-200" />
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
        <ChevronRight size={12} />
        Then you repay
        <ChevronRight size={12} />
      </div>
      <div className="flex-1 h-px bg-slate-200" />
    </div>

    {/* Section 2: Repayments (Company → Mezzanine) */}
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
          <ArrowUpCircle size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">جدول السداد · Repayment Schedule</h2>
          <p className="text-xs text-slate-500">Your Company → Mezzanine Finance · 6 monthly installments · {fmt(TOTAL_FINANCED)} total</p>
        </div>
      </div>
      <RepaymentSection />
    </div>

    {footer}
  </div>
);
