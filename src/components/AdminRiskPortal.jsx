import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Shield, TrendingDown, CheckCircle2, AlertTriangle,
  Building2, Database, Activity, CreditCard, ChevronRight, Download, Zap, Clock
} from 'lucide-react';

const manualReviewApps = [
  {
    id: 2,
    company: 'Qassim Heavy Metals',
    amount: 120000,
    purpose: 'Equipment Financing',
    status: 'Manual Review',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    type: 'manual',
    reason: 'High Amount Threshold',
    aiConfidence: 75,
    ecl: 4.7,
    eclLevel: 'caution',
    recommendation: 'MANUAL REVIEW',
    recommendedLimit: 80000,
    govApi: { status: 'Active', age: '2 Years', compliance: 'Pending' },
    erp: { ccc: '-3 days worsened', invoices: 7 },
    platform: { pos: 3, rating: 3.9 },
    bureau: { defaults: 1, history: '1 Late Payment (2023)' },
  },
  {
    id: 3,
    company: 'Al-Noor Trading Co.',
    amount: 95000,
    purpose: 'Inventory Purchase',
    status: 'Manual Review',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    type: 'manual',
    reason: 'New Customer Profile',
    aiConfidence: 68,
    ecl: 3.2,
    eclLevel: 'caution',
    recommendation: 'MANUAL REVIEW',
    recommendedLimit: 70000,
    govApi: { status: 'Active', age: '1 Year', compliance: 'Verified' },
    erp: { ccc: '+2 days improved', invoices: 4 },
    platform: { pos: 1, rating: 4.2 },
    bureau: { defaults: 0, history: 'Limited History' },
  },
];

const autoApprovedApps = [
  {
    id: 1,
    company: 'BuildTech Construction',
    amount: 45000,
    purpose: 'Operating Capital',
    status: 'Auto-Approved ✅',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    type: 'auto',
    reason: 'All criteria met',
    aiConfidence: 94,
    ecl: 1.2,
    eclLevel: 'safe',
    recommendation: 'AUTO-APPROVED',
    recommendedLimit: 45000,
    approvedAt: '2024-01-15 09:23:14',
    govApi: { status: 'Active', age: '5 Years', compliance: 'Verified' },
    erp: { ccc: '+6 days improved', invoices: 2 },
    platform: { pos: 12, rating: 4.8 },
    bureau: { defaults: 0, history: 'Clean' },
  },
  {
    id: 4,
    company: 'Riyadh Steel Works',
    amount: 38000,
    purpose: 'Raw Materials',
    status: 'Auto-Approved ✅',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    type: 'auto',
    reason: 'All criteria met',
    aiConfidence: 96,
    ecl: 0.9,
    eclLevel: 'safe',
    recommendation: 'AUTO-APPROVED',
    recommendedLimit: 38000,
    approvedAt: '2024-01-15 08:47:32',
    govApi: { status: 'Active', age: '7 Years', compliance: 'Verified' },
    erp: { ccc: '+8 days improved', invoices: 1 },
    platform: { pos: 18, rating: 4.9 },
    bureau: { defaults: 0, history: 'Excellent' },
  },
  {
    id: 5,
    company: 'Modern Contracting Ltd.',
    amount: 52000,
    purpose: 'Equipment Lease',
    status: 'Auto-Approved ✅',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    type: 'auto',
    reason: 'All criteria met',
    aiConfidence: 92,
    ecl: 1.5,
    eclLevel: 'safe',
    recommendation: 'AUTO-APPROVED',
    recommendedLimit: 52000,
    approvedAt: '2024-01-15 07:12:08',
    govApi: { status: 'Active', age: '4 Years', compliance: 'Verified' },
    erp: { ccc: '+4 days improved', invoices: 3 },
    platform: { pos: 9, rating: 4.7 },
    bureau: { defaults: 0, history: 'Clean' },
  },
];

const ECLBar = ({ value }) => {
  const pct = Math.min((value / 10) * 100, 100);
  const color = value <= 2 ? 'bg-emerald-500' : value <= 5 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="w-full bg-white/30 rounded-full h-2 mt-1">
      <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
};

const DataCard = ({ icon: Icon, title, children, accent }) => (
  <div className={`bg-white/40 backdrop-blur-md border rounded-2xl p-4 ${accent || 'border-white/60'}`}>
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-[#56afb6]/20 flex items-center justify-center">
        <Icon size={14} className="text-[#56afb6]" />
      </div>
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
    </div>
    {children}
  </div>
);

export const AdminRiskPortal = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState('manual');
  const [selected, setSelected] = useState(manualReviewApps[0]);
  const [creditLimit, setCreditLimit] = useState(selected.recommendedLimit);
  const [actionDone, setActionDone] = useState(null);

  const handleSelect = (app) => {
    setSelected(app);
    setCreditLimit(app.recommendedLimit);
    setActionDone(null);
  };

  const handleAction = (type) => {
    setActionDone(type);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newSelected = tab === 'manual' ? manualReviewApps[0] : autoApprovedApps[0];
    setSelected(newSelected);
    setCreditLimit(newSelected.recommendedLimit);
    setActionDone(null);
  };

  const isApproved = selected.eclLevel === 'safe';
  const isAutoApproved = selected.type === 'auto';
  const currentList = activeTab === 'manual' ? manualReviewApps : autoApprovedApps;

  return (
    <div className="min-h-screen bg-[#f7f4e8] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('b2b-platform')}
            className="p-2 hover:bg-slate-800 rounded-lg transition-all text-slate-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#56afb6]/20 border border-[#56afb6]/40 flex items-center justify-center">
              <Shield size={16} className="text-[#56afb6]" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm tracking-wide">MEZZANINE RISK COMMAND CENTER</h1>
              <p className="text-slate-400 text-xs">Torbiona AI Credit Engine · Internal Use Only</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-slate-400 text-xs uppercase tracking-wider">Portfolio at Risk</p>
            <p className="text-white font-bold text-lg">170,000 <span className="text-slate-400 text-sm font-normal">SAR</span></p>
          </div>
          <div className="w-px h-10 bg-slate-700" />
          <div className="text-right">
            <p className="text-slate-400 text-xs uppercase tracking-wider">Avg. ECL</p>
            <p className="text-emerald-400 font-bold text-lg">1.2%</p>
          </div>
          <div className="w-px h-10 bg-slate-700" />
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">Engine Online</span>
          </div>
        </div>
      </header>

      {/* KPI Cards Row */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-slate-400" />
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Requests (Today)</p>
            </div>
            <p className="text-3xl font-bold text-white">142</p>
          </div>
          <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-emerald-400" />
              <p className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">Auto-Approved by Torbiona (STP)</p>
            </div>
            <p className="text-3xl font-bold text-emerald-400">128 <span className="text-lg text-emerald-300">(90%)</span></p>
          </div>
          <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-amber-400" />
              <p className="text-xs text-amber-400 uppercase tracking-wider font-semibold">Pending Manual Review</p>
            </div>
            <p className="text-3xl font-bold text-amber-400">14</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 185px)' }}>
        {/* Left Column — Queue with Tabs */}
        <aside className="w-80 bg-slate-900/95 border-r border-slate-700 flex flex-col overflow-hidden flex-shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => handleTabChange('manual')}
              className={`flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'manual'
                  ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Pending Manual Review
            </button>
            <button
              onClick={() => handleTabChange('auto')}
              className={`flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'auto'
                  ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Auto-Approved Log
            </button>
          </div>
          <div className="px-4 py-3 border-b border-slate-700">
            <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">
              {activeTab === 'manual' ? 'Edge Cases' : 'STP Processed'}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">{currentList.length} applications</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {currentList.map((app) => {
              const isActive = selected.id === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => handleSelect(app)}
                  className={`w-full text-left rounded-xl p-4 border transition-all ${
                    isActive
                      ? 'bg-[#56afb6]/15 border-[#56afb6]/50'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#56afb6]/20' : 'bg-slate-700'}`}>
                        <Building2 size={14} className={isActive ? 'text-[#56afb6]' : 'text-slate-400'} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {app.company}
                        </p>
                        <p className="text-slate-500 text-xs">{app.amount.toLocaleString()} SAR</p>
                      </div>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-[#56afb6] mt-1" />}
                  </div>
                  <div className="space-y-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${app.statusColor}`}>
                      {app.status}
                    </span>
                    {app.reason && (
                      <p className="text-xs text-slate-500 mt-1">Reason: {app.reason}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">ECL</span>
                      <span className={app.eclLevel === 'safe' ? 'text-emerald-400' : 'text-amber-400'}>{app.ecl}%</span>
                    </div>
                    <ECLBar value={app.ecl} />
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column — Detail */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 p-6 space-y-5 pb-28">
            {/* Application Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-[#56afb6]/20 border border-[#56afb6]/30 flex items-center justify-center">
                    <Building2 size={18} className="text-[#56afb6]" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{selected.company}</h2>
                </div>
                <p className="text-slate-500 text-sm ml-13 pl-13">
                  Credit Request: <span className="font-semibold text-slate-700">{selected.amount.toLocaleString()} SAR</span> for {selected.purpose}
                </p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${selected.statusColor}`}>
                {selected.status}
              </span>
            </div>

            {/* AI Alert for Manual Review */}
            {!isAutoApproved && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-900 mb-1">
                    ⚠️ AI Confidence is {selected.aiConfidence}%
                  </p>
                  <p className="text-xs text-amber-700">
                    Reason: {selected.reason}. Human override required.
                  </p>
                </div>
              </div>
            )}

            {/* AI Verdict Card */}
            <div className={`rounded-2xl border p-5 backdrop-blur-md ${
              isAutoApproved
                ? 'bg-emerald-50/80 border-emerald-200'
                : isApproved
                ? 'bg-emerald-50/80 border-emerald-200'
                : 'bg-amber-50/80 border-amber-200'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isApproved ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                  <Shield size={16} className={isApproved ? 'text-emerald-600' : 'text-amber-600'} />
                </div>
                <span className="font-bold text-slate-700 text-sm uppercase tracking-wider">Torbiona AI Verdict</span>
                {isAutoApproved && (
                  <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold border border-emerald-300">
                    STP Executed
                  </span>
                )}
                {!isAutoApproved && (
                  <span className="ml-auto text-xs text-slate-400">Confidence: {selected.aiConfidence}%</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/60 rounded-xl p-4 border border-white/80">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">ECL Score</p>
                  <p className={`text-3xl font-bold ${isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>{selected.ecl}%</p>
                  <ECLBar value={selected.ecl} />
                  <p className={`text-xs mt-1.5 font-medium ${isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {isApproved ? '✓ Safe Zone (< 2%)' : '⚠ Caution Zone'}
                  </p>
                </div>
                <div className="bg-white/60 rounded-xl p-4 border border-white/80 col-span-2">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Recommendation</p>
                  <div className="flex items-center gap-3">
                    {isApproved
                      ? <CheckCircle2 size={28} className="text-emerald-500 flex-shrink-0" />
                      : <AlertTriangle size={28} className="text-amber-500 flex-shrink-0" />
                    }
                    <div>
                      <p className={`text-xl font-bold ${isAutoApproved || isApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {isAutoApproved ? '✅ AUTO-APPROVED' : isApproved ? '✅ APPROVED' : '⚠️ MANUAL REVIEW'}
                      </p>
                      {isAutoApproved && (
                        <p className="text-xs text-emerald-600 mt-1">Approved at: {selected.approvedAt}</p>
                      )}
                      <p className="text-slate-600 text-sm">
                        Recommended Limit: <span className="font-bold">{selected.recommendedLimit.toLocaleString()} SAR</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Grid — Data Sources */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Data Sources & Justification</p>
              <div className="grid grid-cols-2 gap-4">
                {/* Gov API */}
                <DataCard icon={Building2} title="Ministry of Commerce (Gov API)">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Registration Status</span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {selected.govApi.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Company Age</span>
                      <span className="text-xs font-semibold text-slate-700">{selected.govApi.age}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Legal Compliance</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        selected.govApi.compliance === 'Verified'
                          ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                          : 'text-amber-600 bg-amber-50 border-amber-200'
                      }`}>
                        {selected.govApi.compliance}
                      </span>
                    </div>
                  </div>
                </DataCard>

                {/* ERP */}
                <DataCard icon={Database} title="ERP Integrations">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Cash Conversion Cycle</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        selected.erp.ccc.includes('Improved') || selected.erp.ccc.includes('improved')
                          ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                          : 'text-red-600 bg-red-50 border-red-200'
                      }`}>
                        {selected.erp.ccc}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Outstanding Invoices</span>
                      <span className={`text-xs font-semibold ${selected.erp.invoices <= 3 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {selected.erp.invoices} invoices
                      </span>
                    </div>
                    <div className="w-full bg-white/40 rounded-full h-1.5 mt-1">
                      <div
                        className={`h-1.5 rounded-full ${selected.erp.invoices <= 3 ? 'bg-emerald-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(selected.erp.invoices * 10, 100)}%` }}
                      />
                    </div>
                  </div>
                </DataCard>

                {/* Platform Behavior */}
                <DataCard icon={Activity} title="Platform Behavior (Mezzanine B2B)">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Successful POs</span>
                      <span className="text-xs font-bold text-[#56afb6]">{selected.platform.pos} completed</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Delivery Rating</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-700">{selected.platform.rating}/5</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`w-2 h-2 rounded-sm ${i <= Math.round(selected.platform.rating) ? 'bg-[#56afb6]' : 'bg-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-white/40 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-[#56afb6]" style={{ width: `${(selected.platform.rating / 5) * 100}%` }} />
                    </div>
                  </div>
                </DataCard>

                {/* Credit Bureau */}
                <DataCard icon={CreditCard} title="Credit Bureau (SIMAH / Bayan)">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Defaults</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        selected.bureau.defaults === 0
                          ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                          : 'text-red-600 bg-red-50 border-red-200'
                      }`}>
                        {selected.bureau.defaults === 0 ? 'None' : `${selected.bureau.defaults} Default`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Credit History</span>
                      <span className={`text-xs font-semibold ${selected.bureau.defaults === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {selected.bureau.history}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <TrendingDown size={12} className={selected.bureau.defaults === 0 ? 'text-emerald-500' : 'text-red-500'} />
                      <span className={`text-xs ${selected.bureau.defaults === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {selected.bureau.defaults === 0 ? 'No adverse credit events' : 'Adverse events on record'}
                      </span>
                    </div>
                  </div>
                </DataCard>
              </div>
            </div>
          </div>

          {/* CRO Action Bar — Sticky Bottom */}
          <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-6 py-4">
            {isAutoApproved ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 size={16} />
                  🔒 Automatically Approved and Executed by Torbiona. No human action required.
                </div>
                <button
                  className="w-full py-2.5 bg-slate-100 border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download Audit Trail
                </button>
              </div>
            ) : actionDone ? (
              <div className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm ${
                actionDone === 'approve' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                actionDone === 'reject' ? 'bg-red-50 text-red-700 border border-red-200' :
                'bg-slate-50 text-slate-700 border border-slate-200'
              }`}>
                <CheckCircle2 size={16} />
                {actionDone === 'approve' && `Financing Approved — ${creditLimit.toLocaleString()} SAR`}
                {actionDone === 'reject' && 'Application Rejected'}
                {actionDone === 'docs' && 'Additional Documents Requested'}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <label className="text-xs text-slate-500 font-medium mb-1">Adjust Credit Limit (SAR)</label>
                  <input
                    type="number"
                    value={creditLimit}
                    onChange={(e) => setCreditLimit(Number(e.target.value))}
                    className="w-40 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none"
                  />
                </div>
                <div className="w-px h-12 bg-slate-200 mx-1" />
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-teal-500/25 transition-all"
                >
                  Approve Financing
                </button>
                <button
                  onClick={() => handleAction('reject')}
                  className="flex-1 py-2.5 border-2 border-red-400 text-red-500 rounded-xl font-semibold text-sm hover:bg-red-50 transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAction('docs')}
                  className="flex-1 py-2.5 border-2 border-slate-300 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all"
                >
                  Request Documents
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
