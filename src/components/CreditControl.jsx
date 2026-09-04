import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck, ArrowLeft, Check, Building2, FileText,
  TrendingUp, FileCheck, AlertCircle, CheckCircle,
  Lock, Download, Landmark, FileSignature, ChevronRight,
  Package, ShoppingCart, Zap, BadgeCheck, Users, Briefcase,
  ClipboardList, BarChart2, Star, X,
} from 'lucide-react';

// ── Journey intro ─────────────────────────────────────────────────────────────
export const CreditControl = () => {
  const { startCreditControl, setCurrentView } = useApp();

  const steps = [
    { icon: ShoppingCart, label: 'Marketplace', desc: 'Browse & select a product' },
    { icon: FileText, label: 'Checkout', desc: 'Review order with Mezzanine Finance' },
    { icon: FileSignature, label: 'Financing Request', desc: 'Submit request & share credit report' },
    { icon: BadgeCheck, label: 'Assessment', desc: 'AI-generated credit score' },
    { icon: Zap, label: 'Credit Calculator', desc: 'Approval, limits & installments' },
    { icon: Lock, label: 'Disbursement', desc: 'Requirements before funds release' },
    { icon: Download, label: 'Digital Contract', desc: 'Active financing contract' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-10">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <button onClick={() => setCurrentView('b2b-platform')} className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all mb-8">
          <ArrowLeft size={16} /> Back to Marketplace
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200">
            <ShieldCheck size={30} className="text-white" />
          </div>
          <span className="text-xs font-bold text-teal-500 uppercase tracking-widest block mb-2">Competitive Advantage · 02</span>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Credit Control</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            End-to-end financing journey — from marketplace purchase to digital contract, powered by Mezzanine Finance AI scoring.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60 mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">The 7-Step Journey</p>
          <div className="space-y-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow">
                    {i + 1}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={startCreditControl}
          className="w-full py-4 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3"
        >
          <ShieldCheck size={22} /> Begin Credit Control Journey
        </button>
      </div>
    </div>
  );
};

// ── Step 4: Assessment Score ──────────────────────────────────────────────────
export const CreditAssessment = () => {
  const { proceedToCalculator, exitCreditControl } = useApp();

  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-28">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
        <button onClick={exitCreditControl} className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Exit Journey
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
              <BadgeCheck size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Assessment Score</h2>
              <p className="text-xs text-slate-500">Generated from your Joint Operation credit report</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Profile Completion */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <FileCheck size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Profile Completion</p>
                  <p className="text-xs text-slate-500">Data & documents filled</p>
                </div>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-5xl font-bold text-blue-500">75</span>
                <span className="text-2xl font-bold text-blue-400 mb-1">%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: '75%' }} />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Business Identity Verified', done: true },
                  { label: 'Organizational Structure', done: true },
                  { label: 'Products Listed', done: true },
                  { label: 'Regulatory Documents', done: true },
                  { label: 'Financial Statements', done: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                      {item.done && <Check size={10} className="text-white" />}
                    </div>
                    <span className={`text-xs ${item.done ? 'text-slate-700' : 'text-slate-400'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mezzanine Credit Score */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Mezzanine Credit Score</p>
                  <p className="text-xs text-slate-500">Initial financing eligibility</p>
                </div>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-bold text-teal-500">68</span>
                <span className="text-xl font-bold text-slate-400 mb-1">/ 100</span>
              </div>
              <p className="text-xs text-amber-600 font-medium mb-3">Good — Eligible for Mezzanine Finance</p>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: '68%' }} />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Business Verification', score: '20/20', color: 'text-emerald-600' },
                  { label: 'Organizational Structure', score: '18/20', color: 'text-emerald-600' },
                  { label: 'Product Portfolio', score: '15/20', color: 'text-amber-600' },
                  { label: 'Financial Documents', score: '10/20', color: 'text-red-400' },
                  { label: 'Market Presence', score: '5/20', color: 'text-red-400' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{item.label}</span>
                    <span className={`text-xs font-semibold ${item.color}`}>{item.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">Complete your financial documents and bank statements to increase your score. You can also enhance your score between disbursements in the Credit Calculator.</p>
          </div>

          <button onClick={proceedToCalculator} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
            <Landmark size={18} /> Proceed to Mezzanine Finance Credit Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Step 6: Disbursement Requirements ─────────────────────────────────────────
const DISBURSE_REQS = [
  {
    installment: 'Disbursement 1 — Month 4', amount: 166667, status: 'Disbursed',
    reqs: [
      { label: 'KYB Identity Verified', done: true },
      { label: 'Joint Operation profile completed', done: true },
      { label: 'Digital contract signed', done: true },
    ],
  },
  {
    installment: 'Disbursement 2 — Month 8', amount: 166667, status: 'Requirements Pending',
    reqs: [
      { label: 'Q1 financial statements uploaded', done: false },
      { label: 'Minimum 2 new products added to marketplace', done: false },
      { label: 'At least 1 active contract executed', done: false },
    ],
  },
  {
    installment: 'Disbursement 3 — Month 12', amount: 166666, status: 'Locked',
    reqs: [
      { label: 'Invoice reconciliation submitted', done: false },
      { label: '3+ active customer contracts maintained', done: false },
      { label: 'Platform engagement score ≥ 90%', done: false },
    ],
  },
];

export const CreditDisbursement = () => {
  const { goToContract, exitCreditControl } = useApp();
  const [reqs, setReqs] = useState(DISBURSE_REQS);

  const toggle = (di, ri) => {
    setReqs(prev => prev.map((d, idx) =>
      idx === di ? { ...d, reqs: d.reqs.map((r, ri2) => ri2 === ri ? { ...r, done: !r.done } : r) } : d
    ));
  };

  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-28">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
        <button onClick={exitCreditControl} className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Exit Journey
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Disbursement Requirements</h2>
          <p className="text-slate-500 text-sm mb-2">Your company will not receive funds until the requirements for each disbursement are fully met and verified.</p>

          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
            <Lock size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Each disbursement is <span className="font-bold">locked</span> until all requirements are verified automatically by Mezzanine platform data.
            </p>
          </div>

          <div className="space-y-4">
            {reqs.map((disb, di) => {
              const allDone = disb.reqs.every(r => r.done);
              return (
                <div key={di} className={`bg-white rounded-2xl border-2 p-5 transition-all ${
                  disb.status === 'Disbursed' ? 'border-emerald-300' :
                  disb.status === 'Requirements Pending' ? 'border-amber-300' :
                  'border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        disb.status === 'Disbursed' ? 'bg-emerald-100' :
                        disb.status === 'Requirements Pending' ? 'bg-amber-100' : 'bg-slate-100'
                      }`}>
                        {disb.status === 'Disbursed'
                          ? <CheckCircle size={20} className="text-emerald-600" />
                          : disb.status === 'Locked'
                          ? <Lock size={20} className="text-slate-400" />
                          : <AlertCircle size={20} className="text-amber-500" />
                        }
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{disb.installment}</p>
                        <p className="text-xs text-slate-500">SAR {disb.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      disb.status === 'Disbursed' ? 'bg-emerald-100 text-emerald-700' :
                      disb.status === 'Requirements Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>{disb.status}</span>
                  </div>

                  <div className="space-y-2">
                    {disb.reqs.map((req, ri) => (
                      <button key={ri}
                        onClick={() => disb.status !== 'Disbursed' && disb.status !== 'Locked' && toggle(di, ri)}
                        disabled={disb.status === 'Disbursed' || disb.status === 'Locked'}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                          req.done ? 'border-emerald-300 bg-emerald-50' :
                          disb.status === 'Locked' ? 'border-slate-100 bg-slate-50 opacity-50' :
                          'border-slate-200 bg-slate-50 hover:border-teal-300 hover:bg-teal-50'
                        }`}>
                        <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                          req.done ? 'bg-emerald-500 border-emerald-500' :
                          disb.status === 'Locked' ? 'bg-slate-200 border-slate-300' : 'bg-white border-slate-300'
                        }`}>
                          {req.done && <Check size={11} className="text-white" />}
                          {disb.status === 'Locked' && !req.done && <Lock size={9} className="text-slate-400" />}
                        </div>
                        <span className={`text-xs font-medium ${
                          req.done ? 'text-emerald-700 line-through' :
                          disb.status === 'Locked' ? 'text-slate-400' : 'text-slate-700'
                        }`}>{req.label}</span>
                      </button>
                    ))}
                  </div>

                  {disb.status !== 'Disbursed' && allDone && (
                    <div className="mt-3 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle size={14} /> All requirements met — Ready for disbursement
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

          <button onClick={goToContract} className="w-full mt-6 py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
            <FileSignature size={18} /> View Digital Contract
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Step 7: Digital Contract ───────────────────────────────────────────────────
const INSTALLMENTS = [
  { label: 'Month 4', amount: 166667, date: 'Apr 2025', done: true },
  { label: 'Month 8', amount: 166667, date: 'Aug 2025', done: false },
  { label: 'Month 12', amount: 166666, date: 'Dec 2025', done: false },
];

export const CreditContract = () => {
  const { exitCreditControl, selectedProduct } = useApp();

  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-28">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
        <button onClick={exitCreditControl} className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Exit Journey
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Digital Contract</h2>
              <p className="text-slate-500 text-sm">Active financing agreement</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <CheckCircle size={13} /> Active
            </span>
          </div>

          {/* Contract header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-6 mb-5 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-teal-200 text-xs font-semibold uppercase tracking-wider mb-1">Mezzanine Finance</p>
                <h3 className="text-xl font-bold">Credit Facility Agreement</h3>
                <p className="text-teal-300 text-sm">Murabaha-based financing structure</p>
              </div>
              <div className="text-right">
                <p className="text-teal-300 text-xs">Contract ID</p>
                <p className="font-bold text-lg">CF-2025-0041</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Amount', value: 'SAR 500,000' },
                { label: 'Duration', value: '12 Months' },
                { label: 'Disbursements', value: '3 installments' },
                { label: 'Issued', value: 'Jan 2025' },
              ].map(s => (
                <div key={s.label} className="bg-white/10 rounded-xl p-3">
                  <p className="text-teal-300 text-xs mb-0.5">{s.label}</p>
                  <p className="font-bold text-white text-sm">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Parties */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Financier</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Landmark size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Mezzanine Finance Co.</p>
                  <p className="text-xs text-slate-500">Licensed Financial Institution</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Borrower</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Building2 size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">BuildTech Construction Ltd.</p>
                  <p className="text-xs text-slate-500">CR: 1010123456</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Key Contract Terms</p>
            <div className="space-y-2.5">
              {[
                { label: 'Financing Type', value: 'Murabaha (Cost-plus financing)' },
                { label: 'Purpose', value: selectedProduct ? selectedProduct.name : 'Equipment Financing' },
                { label: 'Profit Rate', value: '4.5% per annum' },
                { label: 'Repayment Source', value: 'Sales Receivables' },
                { label: 'Collateral', value: 'Trade Receivables Assignment' },
                { label: 'Governing Law', value: 'Kingdom of Saudi Arabia' },
              ].map(t => (
                <div key={t.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-slate-500">{t.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{t.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disbursement schedule */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 mb-6">
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">Disbursement Schedule</p>
            <div className="flex items-center">
              {INSTALLMENTS.map((inst, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex-1 flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 shadow ${inst.done ? 'bg-emerald-500' : 'bg-teal-200'}`}>
                      {inst.done ? <Check size={16} className="text-white" /> : <span className="text-sm font-bold text-teal-600">{i + 1}</span>}
                    </div>
                    <p className="text-xs font-bold text-teal-700">{inst.label}</p>
                    <p className="text-xs text-slate-500">SAR {inst.amount.toLocaleString()}</p>
                    <span className={`text-[10px] font-semibold mt-0.5 ${inst.done ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {inst.done ? 'Disbursed' : inst.date}
                    </span>
                  </div>
                  {i < INSTALLMENTS.length - 1 && <div className="flex-shrink-0 h-px w-6 bg-teal-300 mx-1" />}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Download size={18} /> Download Contract PDF
            </button>
            <button onClick={exitCreditControl} className="flex-1 py-3.5 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <ChevronRight size={18} /> Back to Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
