import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Check, Lock, AlertCircle, CheckCircle,
  CreditCard, Clock, ArrowDownCircle,
} from 'lucide-react';

const fmt = (n) => n.toLocaleString();

// ── Data ─────────────────────────────────────────────────────────────────────

const INIT_PAYMENTS = [
  { id: 'INST-01', amount: 150000, dueDate: 'Sep 15, 2026', status: 'Paid',     paidDate: 'Sep 14, 2026' },
  { id: 'INST-02', amount: 150000, dueDate: 'Oct 15, 2026', status: 'Paid',     paidDate: 'Oct 15, 2026' },
  { id: 'INST-03', amount: 150000, dueDate: 'Nov 15, 2026', status: 'Paid',     paidDate: 'Nov 13, 2026' },
  { id: 'INST-04', amount: 150000, dueDate: 'Dec 15, 2026', status: 'Upcoming' },
  { id: 'INST-05', amount: 150000, dueDate: 'Jan 15, 2027', status: 'Upcoming' },
  { id: 'INST-06', amount: 150000, dueDate: 'Feb 15, 2027', status: 'Upcoming' },
];

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

// ── Core content (shared between standalone page + CC journey) ────────────────

export const FinancingPaymentsContent = ({ payments, onPay, disb, onToggleDisb, footer }) => {
  const total     = payments.reduce((s, p) => s + p.amount, 0);
  const paid      = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const remaining = total - paid;
  const paidCount = payments.filter(p => p.status === 'Paid').length;
  const pct       = Math.round((paid / total) * 100);

  return (
    <div>

      {/* ── Section 1: Fund Disbursements (Mezzanine → Company) ── */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-baseline justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ArrowDownCircle size={22} className="text-teal-500" />
            Fund Disbursements
          </h2>
          <p className="text-sm text-slate-400">صرف التمويل</p>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
          <Lock size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-bold">لن تستلم شركتك أي مبالغ حتى يتم التحقق من استيفاء الشروط تلقائياً.</span>
            <span className="block text-slate-600 mt-0.5">Your company will not receive funds until all conditions are automatically verified by Mezzanine platform data.</span>
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
          <div className="space-y-3">
            {disb.map((d, di) => {
              const allDone = d.reqs.every(r => r.done);
              return (
                <div key={d.id} className={`rounded-xl border-2 overflow-hidden ${
                  d.status === 'Disbursed' ? 'border-emerald-200' :
                  d.status === 'Requirements Pending' ? 'border-amber-200' : 'border-slate-200'
                }`}>
                  {/* Disbursement header row */}
                  <div className="flex items-center justify-between gap-3 p-3 md:p-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        d.status === 'Disbursed' ? 'bg-emerald-100' :
                        d.status === 'Requirements Pending' ? 'bg-amber-100' : 'bg-slate-100'
                      }`}>
                        {d.status === 'Disbursed'
                          ? <CheckCircle size={18} className="text-emerald-600" />
                          : d.status === 'Locked'
                          ? <Lock size={18} className="text-slate-400" />
                          : <AlertCircle size={18} className="text-amber-600" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{d.label}</p>
                        <p className="text-xs text-slate-500">{d.date} · {fmt(d.amount)} SAR</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      d.status === 'Disbursed' ? 'bg-emerald-100 text-emerald-700' :
                      d.status === 'Requirements Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>{d.status}</span>
                  </div>

                  {/* Conditions */}
                  <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 bg-white space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      الشروط المطلوبة · Conditions Required
                    </p>
                    {d.reqs.map((req, ri) => (
                      <button key={ri}
                        onClick={() => onToggleDisb && d.status !== 'Disbursed' && d.status !== 'Locked' && onToggleDisb(di, ri)}
                        disabled={d.status === 'Disbursed' || d.status === 'Locked'}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all ${
                          req.done ? 'border-emerald-200 bg-emerald-50' :
                          d.status === 'Locked' ? 'border-slate-100 bg-slate-50 opacity-50 cursor-default' :
                          'border-slate-200 bg-gray-50 hover:border-teal-300 hover:bg-teal-50 cursor-pointer'
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
                    {d.status !== 'Disbursed' && allDone && (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mt-2">
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                          <CheckCircle size={12} /> جميع الشروط مستوفاة
                        </span>
                        <button className="text-xs font-bold text-white bg-emerald-500 px-3 py-1 rounded-lg hover:bg-emerald-600 transition-all">
                          Request Release
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section 2: Repayment Schedule — exact CRM style ─────── */}
      <div className="flex items-baseline justify-between mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Mezzanine Finance Payments</h2>
        <p className="text-sm text-slate-400">مدفوعات ميزانين فاينانس</p>
      </div>

      {/* Teal gradient summary card — exact CRM style */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 text-white mb-6 md:mb-8">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard size={18} className="flex-shrink-0" />
          <span className="text-sm font-semibold">Mezzanine Finance Facility — 6 Monthly Installments</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          <div>
            <p className="text-[11px] sm:text-xs text-white/70 mb-1">Total Financed</p>
            <p className="text-base sm:text-xl md:text-2xl font-bold leading-tight">{fmt(total)}<span className="block sm:inline text-[10px] sm:text-xs text-white/70"> SAR</span></p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-white/70 mb-1">Paid So Far</p>
            <p className="text-base sm:text-xl md:text-2xl font-bold leading-tight">{fmt(paid)}<span className="block sm:inline text-[10px] sm:text-xs text-white/70"> SAR</span></p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-white/70 mb-1">Remaining</p>
            <p className="text-base sm:text-xl md:text-2xl font-bold leading-tight">{fmt(remaining)}<span className="block sm:inline text-[10px] sm:text-xs text-white/70"> SAR</span></p>
          </div>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-white/70 mt-2">{paidCount} of {payments.length} installments paid</p>
      </div>

      {/* Payment schedule — exact CRM style */}
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Schedule</h3>
        <div className="space-y-3">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-3 p-3 md:p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  p.status === 'Paid' ? 'bg-emerald-100' : 'bg-amber-100'
                }`}>
                  {p.status === 'Paid'
                    ? <CheckCircle size={18} className="text-emerald-600" />
                    : <Clock size={18} className="text-amber-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{p.id}</p>
                  <p className="text-xs text-slate-500">
                    {p.status === 'Paid' ? `Paid on ${p.paidDate}` : `Due ${p.dueDate}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-900">{fmt(p.amount)} SAR</span>
                {p.status === 'Paid' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-emerald-100 text-emerald-700">
                    Paid
                  </span>
                ) : (
                  <button
                    onClick={() => onPay(p.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-amber-500 text-white hover:bg-amber-600 transition-all"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {footer}
    </div>
  );
};

// ── Standalone page (from B2BPlatform nav) ────────────────────────────────────

export const FinancingPayments = () => {
  const { setCurrentView } = useApp();
  const [payments, setPayments] = useState(INIT_PAYMENTS);
  const [disb, setDisb] = useState(INIT_DISB);

  const handlePay = (id) =>
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'Paid', paidDate: 'Today' } : p));

  const toggleDisb = (di, ri) =>
    setDisb(prev => prev.map((d, i) =>
      i === di ? { ...d, reqs: d.reqs.map((r, j) => j === ri ? { ...r, done: !r.done } : r) } : d
    ));

  return (
    <div className="min-h-screen bg-cream">
      {/* Header — same style as CRM */}
      <div className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-40">
        <div className="px-4 md:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setCurrentView('b2b-platform')} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Mezzanine Finance Payments</h1>
            <p className="text-xs text-slate-400">مدفوعات ميزانين فاينانس · CF-2025-0041</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6 md:py-8 max-w-4xl mx-auto">
        <FinancingPaymentsContent
          payments={payments}
          onPay={handlePay}
          disb={disb}
          onToggleDisb={toggleDisb}
        />
      </div>
    </div>
  );
};
