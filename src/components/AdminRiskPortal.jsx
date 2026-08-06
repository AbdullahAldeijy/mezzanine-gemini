import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Shield, CheckCircle2, AlertTriangle, Building2,
  Database, Activity, CreditCard, Download, Zap, Clock, TrendingUp, Users, Briefcase,
  LayoutDashboard, Network, Bell, Percent, ArrowUpRight, FileText, CheckSquare,
  Lock, DollarSign, ClipboardCheck, Eye, Edit3, HelpCircle, XCircle
} from 'lucide-react';

const sectorDistribution = [
  { label: 'Construction', value: 128 },
  { label: 'Trading', value: 76 },
  { label: 'Manufacturing', value: 58 },
  { label: 'Logistics', value: 44 },
  { label: 'Other', value: 36 },
];
const regionDistribution = [
  { label: 'Riyadh', value: 142 },
  { label: 'Jeddah', value: 88 },
  { label: 'Dammam', value: 61 },
  { label: 'Qassim', value: 33 },
  { label: 'Other', value: 18 },
];
const sizeDistribution = [
  { label: 'Small (1-49 employees)', value: 210 },
  { label: 'Medium (50-249 employees)', value: 96 },
  { label: 'Large (250+ employees)', value: 36 },
];
const opsAlerts = [
  { level: 'high', text: 'Qassim Heavy Metals — ECL spiked to 4.7%, manual review recommended' },
  { level: 'medium', text: '3 companies approaching 90% credit limit utilization' },
  { level: 'medium', text: 'Al-Noor Trading Co. — new profile, limited bureau history' },
  { level: 'low', text: 'Riyadh Construction Pool ECL trending down (-0.2pp this month)' },
];

const manualReviewApps = [
  {
    id: 2,
    company: 'Qassim Heavy Metals',
    amount: 120000,
    purpose: 'Equipment Financing',
    status: 'Manual Review',
    type: 'manual',
    reason: 'High Amount Threshold',
    aiConfidence: 75,
    ecl: 4.7,
    recommendedLimit: 80000,
    govApi: { status: 'Active', age: '2 Years', compliance: 'Pending' },
    erp: { ccc: '-3 days worsened', invoices: 7 },
    platform: { pos: 3, rating: 3.9 },
    bureau: { defaults: 1, history: '1 Late Payment (2023)' },
    companySummary: 'Qassim Heavy Metals — 4 yrs, heavy equipment manufacturing',
    financials: 'Audited FY2023 statements verified',
    fiveCs: 'Character, Capacity, Capital, Collateral, Conditions — reviewed',
    mezzanineIndex: 612,
    expectedCashFlows: 'SAR 640K projected over 12 months',
    structuring: {
      capacity: '80,000 SAR', pricing: '11% APR', duration: '9 Months',
      reserveRatio: '8%', disbursementTerms: '2 tranches tied to milestones',
      controlPlan: 'Monthly ERP sync + escrow release',
    },
  },
  {
    id: 3,
    company: 'Al-Noor Trading Co.',
    amount: 95000,
    purpose: 'Inventory Purchase',
    status: 'Manual Review',
    type: 'manual',
    reason: 'New Customer Profile',
    aiConfidence: 68,
    ecl: 3.2,
    recommendedLimit: 70000,
    govApi: { status: 'Active', age: '1 Year', compliance: 'Verified' },
    erp: { ccc: '+2 days improved', invoices: 4 },
    platform: { pos: 1, rating: 4.2 },
    bureau: { defaults: 0, history: 'Limited History' },
    companySummary: 'Al-Noor Trading Co. — 1 yr, retail & distribution',
    financials: 'Unaudited FY2023 statements — pending CPA sign-off',
    fiveCs: 'Character, Capacity, Capital, Collateral, Conditions — reviewed',
    mezzanineIndex: 588,
    expectedCashFlows: 'SAR 410K projected over 12 months',
    structuring: {
      capacity: '70,000 SAR', pricing: '10.5% APR', duration: '6 Months',
      reserveRatio: '7%', disbursementTerms: 'Single tranche, escrow controlled',
      controlPlan: 'Quarterly ERP sync + platform activity review',
    },
  },
];

const autoApprovedApps = [
  {
    id: 1,
    company: 'BuildTech Construction',
    amount: 45000,
    purpose: 'Operating Capital',
    status: 'Auto-Approved ✅',
    type: 'auto',
    aiConfidence: 94,
    ecl: 1.2,
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
    type: 'auto',
    aiConfidence: 96,
    ecl: 0.9,
    recommendedLimit: 38000,
    approvedAt: '2024-01-15 08:47:32',
    govApi: { status: 'Active', age: '7 Years', compliance: 'Verified' },
    erp: { ccc: '+8 days improved', invoices: 1 },
    platform: { pos: 18, rating: 4.9 },
    bureau: { defaults: 0, history: 'Excellent' },
  },
];

const decisionOptions = [
  { id: 'approve', icon: CheckCircle2, label: 'Approval', labelAr: 'موافقة', accent: 'emerald' },
  { id: 'conditional', icon: AlertTriangle, label: 'Conditional Approval', labelAr: 'موافقة بشروط', accent: 'teal' },
  { id: 'amend', icon: Edit3, label: 'Amend Amount', labelAr: 'تعديل المبلغ', accent: 'amber' },
  { id: 'info', icon: HelpCircle, label: 'Request Information', labelAr: 'طلب معلومات', accent: 'slate' },
  { id: 'reject', icon: XCircle, label: 'Rejection', labelAr: 'رفض', accent: 'red' },
];
const decisionAccent = {
  emerald: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700',
  teal: 'bg-[#56afb6]/10 border-[#56afb6]/40 text-[#56afb6]',
  amber: 'bg-amber-500/10 border-amber-500/40 text-amber-700',
  slate: 'bg-slate-500/10 border-slate-400/40 text-slate-600',
  red: 'bg-red-500/10 border-red-500/40 text-red-600',
};

export const AdminRiskPortal = () => {
  const { setCurrentView } = useApp();
  const [hubTab, setHubTab] = useState('operations');
  const [activeTab, setActiveTab] = useState('manual');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [creditLimit, setCreditLimit] = useState(0);
  const [decision, setDecision] = useState('conditional');
  const [portfolios, setPortfolios] = useState([
    {
      id: 1,
      name: 'Riyadh Construction Pool',
      companies: 45,
      value: 5000000,
      ecl: 1.1,
      status: 'ready',
      investor: null,
      issued: false,
    },
    {
      id: 2,
      name: 'Qassim Industrial Pool',
      companies: 12,
      value: 2400000,
      ecl: 1.8,
      status: 'active',
      investor: 'Al Rajhi Bank',
      issued: true,
    },
    {
      id: 3,
      name: 'Jeddah Trade Pool',
      companies: 28,
      value: 3800000,
      ecl: 1.4,
      status: 'ready',
      investor: null,
      issued: false,
    },
  ]);

  const currentList = activeTab === 'manual' ? manualReviewApps : autoApprovedApps;
  const isAutoApproved = selectedRequest?.type === 'auto';

  const handleSelectRequest = (app) => {
    setSelectedRequest(app);
    setCreditLimit(app.recommendedLimit);
    setDecision('conditional');
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f4e8] flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('b2b-platform')}
            className="p-2 hover:bg-slate-800 rounded-lg transition-all text-slate-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[#56afb6]" />
              <h1 className="text-white font-bold text-sm md:text-base">Admin Portal</h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 ml-6">Operations, Credit Underwriting & Sukuk Issuance</p>
          </div>
        </div>
      </header>

      {/* Hub Tabs */}
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-2 bg-slate-900/50 rounded-xl p-1">
          <button
            onClick={() => setHubTab('operations')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              hubTab === 'operations'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Mezzanine Operations Dashboard</span>
            <span className="sm:hidden">Operations</span>
          </button>
          <button
            onClick={() => setHubTab('credit-risk')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              hubTab === 'credit-risk'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield size={16} />
            <span className="hidden sm:inline">Credit Underwriting (Torbiona AI)</span>
            <span className="sm:hidden">Credit Risk</span>
          </button>
          <button
            onClick={() => setHubTab('investment-portfolios')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              hubTab === 'investment-portfolios'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp size={16} />
            <span className="hidden sm:inline">Investment & Sukuk Portfolios</span>
            <span className="sm:hidden">Portfolios</span>
          </button>
        </div>
      </div>

      {/* Mezzanine Operations Dashboard */}
      {hubTab === 'operations' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Mezzanine Operations Dashboard</h2>
              <p className="text-sm text-slate-600">Portfolio-wide view of registered companies, financing eligibility, relationships and risk</p>
            </div>

            {/* Top KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 size={14} className="text-slate-400" />
                  <p className="text-xs text-slate-400 uppercase font-semibold">Registered Companies</p>
                </div>
                <p className="text-2xl font-bold text-white">342</p>
              </div>
              <div className="bg-[#56afb6]/10 rounded-xl p-4 border border-[#56afb6]/30">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={14} className="text-[#56afb6]" />
                  <p className="text-xs text-[#56afb6] uppercase font-semibold">Eligible for Financing</p>
                </div>
                <p className="text-2xl font-bold text-[#56afb6]">218 <span className="text-sm text-slate-500">(64%)</span></p>
              </div>
              <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <Percent size={14} className="text-emerald-500" />
                  <p className="text-xs text-emerald-600 uppercase font-semibold">Avg Mezzanine Index</p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">742<span className="text-sm text-slate-500">/1000</span></p>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-amber-600" />
                  <p className="text-xs text-amber-600 uppercase font-semibold">Creditworthiness Improvement</p>
                </div>
                <p className="text-2xl font-bold text-amber-600">+12.4%</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/60">
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={14} className="text-slate-500" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Financing Requests Volume</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">48.6M <span className="text-sm text-slate-500">SAR</span></p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/60">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard size={14} className="text-slate-500" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Authorized Transactions</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">1,284</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/60">
                <div className="flex items-center gap-2 mb-1">
                  <Network size={14} className="text-slate-500" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Mapped Relationships</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">1,967</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/60">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowUpRight size={14} className="text-slate-500" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Projected Q3 Flows</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">+9.2%</p>
              </div>
            </div>

            {/* Distribution: Sector / Region / Size */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-3">Distribution by Sector, Region & Size</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'By Sector', data: sectorDistribution },
                  { title: 'By Region', data: regionDistribution },
                  { title: 'By Size', data: sizeDistribution },
                ].map((group) => {
                  const max = Math.max(...group.data.map((d) => d.value));
                  return (
                    <div key={group.title} className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-4">
                      <p className="text-sm font-bold text-slate-700 mb-3">{group.title}</p>
                      <div className="space-y-2">
                        {group.data.map((d) => (
                          <div key={d.label}>
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                              <span>{d.label}</span>
                              <span className="font-semibold text-slate-700">{d.value}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#56afb6] to-teal-500 rounded-full"
                                style={{ width: `${(d.value / max) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Relationships + Forecasts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Network size={16} className="text-[#56afb6]" />
                  <p className="text-sm font-bold text-slate-700">Company, Customer & Supplier Relationships</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-slate-900">342</p>
                    <p className="text-xs text-slate-500">Companies</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-slate-900">1,120</p>
                    <p className="text-xs text-slate-500">Customer Links</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-slate-900">847</p>
                    <p className="text-xs text-slate-500">Supplier Links</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">1,284 authorized financial & operational transactions flowing through the mapped network this month.</p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-[#56afb6]" />
                  <p className="text-sm font-bold text-slate-700">Forecast: Future Flows & Relationships</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3">
                    <span className="text-xs text-slate-600">Next Quarter Financing Volume</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><ArrowUpRight size={14} />+9.2%</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3">
                    <span className="text-xs text-slate-600">New Relationships Expected</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><ArrowUpRight size={14} />+184</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3">
                    <span className="text-xs text-slate-600">Eligible Companies Growth</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><ArrowUpRight size={14} />+6.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts & Risk Indicators */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Bell size={16} className="text-[#56afb6]" />
                <p className="text-xs font-bold text-slate-400 uppercase">Alerts & Risk Indicators</p>
              </div>
              <div className="space-y-2">
                {opsAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 rounded-xl p-3 border ${
                      alert.level === 'high'
                        ? 'bg-red-50 border-red-200'
                        : alert.level === 'medium'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    <AlertTriangle
                      size={16}
                      className={`flex-shrink-0 mt-0.5 ${
                        alert.level === 'high' ? 'text-red-500' : alert.level === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                      }`}
                    />
                    <p className="text-sm text-slate-700">{alert.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      {hubTab === 'credit-risk' && (
        <div className="px-4 py-4 bg-slate-800 border-b border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={14} className="text-slate-400" />
              <p className="text-xs text-slate-400 uppercase font-semibold">Total Requests</p>
            </div>
            <p className="text-2xl font-bold text-white">142</p>
          </div>
          <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-emerald-400" />
              <p className="text-xs text-emerald-400 uppercase font-semibold">Auto-Approved (STP)</p>
            </div>
            <p className="text-2xl font-bold text-emerald-400">128 <span className="text-sm">(90%)</span></p>
          </div>
          <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-amber-400" />
              <p className="text-xs text-amber-400 uppercase font-semibold">Pending Review</p>
            </div>
            <p className="text-2xl font-bold text-amber-400">14</p>
          </div>
        </div>
        </div>
      )}

      {hubTab === 'investment-portfolios' && (
        <div className="px-4 py-4 bg-slate-800 border-b border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase size={14} className="text-slate-400" />
                <p className="text-xs text-slate-400 uppercase font-semibold">Total Securitized Assets</p>
              </div>
              <p className="text-2xl font-bold text-white">15.2M <span className="text-sm text-slate-400">SAR</span></p>
            </div>
            <div className="bg-[#56afb6]/10 rounded-xl p-3 border border-[#56afb6]/30">
              <div className="flex items-center gap-2 mb-1">
                <Users size={14} className="text-[#56afb6]" />
                <p className="text-xs text-[#56afb6] uppercase font-semibold">Active Institutional Investors</p>
              </div>
              <p className="text-2xl font-bold text-[#56afb6]">8 <span className="text-sm text-slate-400">(Banks, Govt Funds)</span></p>
            </div>
            <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-emerald-400" />
                <p className="text-xs text-emerald-400 uppercase font-semibold">Average Yield</p>
              </div>
              <p className="text-2xl font-bold text-emerald-400">8.5%</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Master-Detail Pattern */}
      {hubTab === 'credit-risk' && (
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 md:grid-cols-3">
          {/* Queue List - Hidden on mobile when request selected */}
          <aside className={`${selectedRequest ? 'hidden md:block' : 'block'} bg-slate-900 overflow-y-auto`}>
            {/* Tabs */}
            <div className="flex border-b border-slate-700">
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 px-4 py-3 text-xs font-semibold uppercase ${
                  activeTab === 'manual'
                    ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400'
                    : 'text-slate-500'
                }`}
              >
                Pending Review
              </button>
              <button
                onClick={() => setActiveTab('auto')}
                className={`flex-1 px-4 py-3 text-xs font-semibold uppercase ${
                  activeTab === 'auto'
                    ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                Auto-Approved
              </button>
            </div>

            {/* List */}
            <div className="p-3 space-y-2">
              {currentList.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleSelectRequest(app)}
                  className={`w-full text-left rounded-xl p-3 border transition-all ${
                    selectedRequest?.id === app.id
                      ? 'bg-[#56afb6]/15 border-[#56afb6]/50'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={16} className="text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">{app.company}</p>
                      <p className="text-xs text-slate-500">{app.amount.toLocaleString()} SAR</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    app.type === 'auto'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {app.status}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Details Panel - Hidden on mobile when no request selected */}
          <main className={`${selectedRequest ? 'block' : 'hidden md:block'} md:col-span-2 bg-[#f7f4e8] overflow-y-auto`}>
            {selectedRequest ? (
              <div className="flex flex-col h-full">
                {/* Mobile Back Button */}
                <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-10">
                  <button
                    onClick={handleBackToList}
                    className="flex items-center gap-2 text-slate-600 hover:text-[#56afb6] font-medium"
                  >
                    <ArrowLeft size={18} />
                    <span>Back to List</span>
                  </button>
                </div>

                <div className="flex-1 p-4 md:p-6 space-y-4 pb-32">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[#56afb6]/20 border border-[#56afb6]/30 flex items-center justify-center">
                        <Building2 size={18} className="text-[#56afb6]" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900">{selectedRequest.company}</h2>
                    </div>
                    <p className="text-sm text-slate-600">
                      Credit Request: <span className="font-semibold">{selectedRequest.amount.toLocaleString()} SAR</span> for {selectedRequest.purpose}
                    </p>
                    {selectedRequest.companySummary && (
                      <p className="text-xs text-slate-500 mt-1">{selectedRequest.companySummary}</p>
                    )}
                  </div>

                  {/* AI Alert for Manual Review */}
                  {!isAutoApproved && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-amber-900">⚠️ AI Confidence: {selectedRequest.aiConfidence}%</p>
                        <p className="text-xs text-amber-700">Reason: {selectedRequest.reason}. Human override required.</p>
                      </div>
                    </div>
                  )}

                  {/* AI Verdict */}
                  <div className={`rounded-2xl border p-4 ${
                    isAutoApproved ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield size={16} className={isAutoApproved ? 'text-emerald-600' : 'text-amber-600'} />
                      <span className="text-xs font-bold text-slate-700 uppercase">Torbiona AI Verdict</span>
                      {isAutoApproved && (
                        <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                          STP Executed
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white/60 rounded-xl p-3 border border-white/80">
                        <p className="text-xs text-slate-500 uppercase mb-1">ECL Score</p>
                        <p className={`text-2xl font-bold ${isAutoApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {selectedRequest.ecl}%
                        </p>
                      </div>
                      <div className="bg-white/60 rounded-xl p-3 border border-white/80 sm:col-span-2">
                        <p className="text-xs text-slate-500 uppercase mb-1">Recommendation</p>
                        <p className={`text-lg font-bold ${isAutoApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {isAutoApproved ? '✅ AUTO-APPROVED' : '⚠️ MANUAL REVIEW'}
                        </p>
                        {isAutoApproved && (
                          <p className="text-xs text-emerald-600 mt-1">Approved at: {selectedRequest.approvedAt}</p>
                        )}
                        <p className="text-xs text-slate-600 mt-1">
                          Limit: <span className="font-bold">{selectedRequest.recommendedLimit.toLocaleString()} SAR</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Data Sources */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Data Sources</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Gov API */}
                      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 size={14} className="text-[#56afb6]" />
                          <span className="text-xs font-bold text-slate-500 uppercase">Gov API</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Status</span>
                            <span className="font-semibold text-emerald-600">{selectedRequest.govApi.status}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Age</span>
                            <span className="font-semibold">{selectedRequest.govApi.age}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Compliance</span>
                            <span className={`font-semibold ${
                              selectedRequest.govApi.compliance === 'Verified' ? 'text-emerald-600' : 'text-amber-600'
                            }`}>
                              {selectedRequest.govApi.compliance}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ERP */}
                      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Database size={14} className="text-[#56afb6]" />
                          <span className="text-xs font-bold text-slate-500 uppercase">ERP</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">CCC</span>
                            <span className={`font-semibold ${
                              selectedRequest.erp.ccc.includes('improved') ? 'text-emerald-600' : 'text-red-600'
                            }`}>
                              {selectedRequest.erp.ccc}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Invoices</span>
                            <span className="font-semibold">{selectedRequest.erp.invoices}</span>
                          </div>
                        </div>
                      </div>

                      {/* Platform */}
                      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity size={14} className="text-[#56afb6]" />
                          <span className="text-xs font-bold text-slate-500 uppercase">Platform</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">POs</span>
                            <span className="font-semibold text-[#56afb6]">{selectedRequest.platform.pos}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Rating</span>
                            <span className="font-semibold">{selectedRequest.platform.rating}/5</span>
                          </div>
                        </div>
                      </div>

                      {/* Bureau */}
                      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard size={14} className="text-[#56afb6]" />
                          <span className="text-xs font-bold text-slate-500 uppercase">Credit Bureau</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Defaults</span>
                            <span className={`font-semibold ${
                              selectedRequest.bureau.defaults === 0 ? 'text-emerald-600' : 'text-red-600'
                            }`}>
                              {selectedRequest.bureau.defaults === 0 ? 'None' : selectedRequest.bureau.defaults}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">History</span>
                            <span className="font-semibold text-xs">{selectedRequest.bureau.history}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Underwriting Inputs (5Cs, Financials, Cash Flows) */}
                  {selectedRequest.structuring && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-3">Mezzanine Finance Inputs</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText size={14} className="text-[#56afb6]" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Financial Statements</span>
                          </div>
                          <p className="text-xs text-slate-700">{selectedRequest.financials}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckSquare size={14} className="text-[#56afb6]" />
                            <span className="text-xs font-bold text-slate-500 uppercase">5Cs Assessment</span>
                          </div>
                          <p className="text-xs text-slate-700">{selectedRequest.fiveCs}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Percent size={14} className="text-[#56afb6]" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Mezzanine Index</span>
                          </div>
                          <p className="text-xs text-slate-700">{selectedRequest.mezzanineIndex} / 1000</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp size={14} className="text-[#56afb6]" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Expected Cash Flows</span>
                          </div>
                          <p className="text-xs text-slate-700">{selectedRequest.expectedCashFlows}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Structuring Result */}
                  {selectedRequest.structuring && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-3">Structuring Result</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><DollarSign size={12} className="text-emerald-600" /><span className="text-xs text-emerald-700 uppercase font-semibold">Capacity</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.capacity}</p>
                        </div>
                        <div className="bg-[#56afb6]/10 border border-[#56afb6]/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><Clock size={12} className="text-[#56afb6]" /><span className="text-xs text-[#56afb6] uppercase font-semibold">Duration</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.duration}</p>
                        </div>
                        <div className="bg-[#56afb6]/10 border border-[#56afb6]/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><Percent size={12} className="text-[#56afb6]" /><span className="text-xs text-[#56afb6] uppercase font-semibold">Pricing</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.pricing}</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><Lock size={12} className="text-amber-600" /><span className="text-xs text-amber-700 uppercase font-semibold">Reserve Ratio</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.reserveRatio}</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><ClipboardCheck size={12} className="text-amber-600" /><span className="text-xs text-amber-700 uppercase font-semibold">Disbursement</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.disbursementTerms}</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><Eye size={12} className="text-amber-600" /><span className="text-xs text-amber-700 uppercase font-semibold">Monitoring</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.controlPlan}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Bar - Sticky Bottom */}
                <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 py-3">
                  {isAutoApproved ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={16} />
                        ✅ Auto-Approved by Torbiona AI
                      </div>
                      <button className="w-full py-2 bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 flex items-center justify-center gap-2">
                        <Download size={16} />
                        Download Audit Trail
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase">Financier's Decision</label>
                        <span className="text-xs text-slate-400">قرار الممول</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {decisionOptions.map(({ id, icon: Icon, label, labelAr, accent }) => {
                          const isActive = decision === id;
                          return (
                            <button
                              key={id}
                              onClick={() => setDecision(id)}
                              className={`text-left rounded-xl p-2 border-2 transition-all ${
                                isActive ? decisionAccent[accent] : 'bg-white/60 border-slate-200 text-slate-400 hover:border-slate-300'
                              }`}
                            >
                              <Icon size={14} className="mb-1" />
                              <p className={`text-[11px] font-bold leading-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>{label}</p>
                              <p className="text-[10px]">{labelAr}</p>
                            </button>
                          );
                        })}
                      </div>

                      {(decision === 'approve' || decision === 'conditional' || decision === 'amend') && (
                        <div className="flex flex-col md:w-48">
                          <label className="text-xs text-slate-500 font-medium mb-1">Credit Limit (SAR)</label>
                          <input
                            type="number"
                            value={creditLimit}
                            onChange={(e) => setCreditLimit(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none"
                          />
                        </div>
                      )}

                      <button className={`w-full py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${
                        decision === 'reject' ? 'from-red-500 to-red-600' : 'from-[#56afb6] to-teal-500'
                      }`}>
                        Confirm {decisionOptions.find((d) => d.id === decision)?.label}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex h-full items-center justify-center p-6">
                <div className="text-center text-slate-400">
                  <Shield size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold">Select a request to view details</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      )}

      {/* Control & Monitoring (Mezzanine Finance) */}
      {hubTab === 'credit-risk' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f7f4e8] border-t border-slate-200">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">Control & Monitoring</h2>
              <p className="text-sm text-slate-400">التحكم والمراقبة (ميزانين المالية)</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Control & Monitoring Plan */}
              <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lock size={16} className="text-[#56afb6]" />
                  <p className="text-sm font-bold text-slate-700">Control & Monitoring Plan Defines</p>
                </div>
                <div className="space-y-2">
                  {[
                    ['Amount per Disbursement', 'مبلغ كل دفعة'],
                    ['Disbursement Conditions', 'شروط الصرف'],
                    ['Beneficiary', 'المستفيد'],
                    ['Required Documents', 'المستندات المطلوبة'],
                    ['Suspension & Hold Rules', 'قواعد التعليق والإيقاف'],
                    ['Reserve Ratio', 'نسبة الاحتياطي'],
                    ['Repayment Schedule', 'جدول السداد'],
                  ].map(([en, ar]) => (
                    <div key={en} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2 bg-slate-50 rounded-lg px-3 py-2">
                      <span className="text-xs font-medium text-slate-700">{en}</span>
                      <span className="text-xs text-slate-400">{ar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mezzanine Tech Automation */}
              <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} className="text-[#56afb6]" />
                  <p className="text-sm font-bold text-white">Mezzanine Tech Automatically</p>
                </div>
                <div className="space-y-2">
                  {[
                    ['Applies Conditions Technically', 'تطبيق الشروط تقنيًا'],
                    ['Verifies Invoices', 'التحقق من الفواتير'],
                    ['Monitors Usage', 'مراقبة الاستخدام'],
                    ['Tracks Execution', 'متابعة التنفيذ'],
                    ['Issues Alerts', 'إصدار التنبيهات'],
                    ['Updates Company Index', 'تحديث مؤشر المنشأة'],
                    ['Monitors Repayment Source', 'مراقبة مصدر السداد'],
                  ].map(([en, ar]) => (
                    <div key={en} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2 bg-slate-800/60 rounded-lg px-3 py-2">
                      <span className="text-xs font-medium text-slate-200">{en}</span>
                      <span className="text-xs text-slate-500">{ar}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investment & Sukuk Portfolios Content */}
      {hubTab === 'investment-portfolios' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Regional Securitization Pools</h2>
              <p className="text-sm text-slate-600">Bundle B2B credit portfolios by region into investable Sukuk instruments for institutional investors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#56afb6] to-teal-500 flex items-center justify-center">
                        <Briefcase size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{portfolio.name}</h3>
                        <p className="text-xs text-slate-500">{portfolio.companies} Active Companies</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Portfolio Value</p>
                      <p className="text-2xl font-bold text-slate-900">{(portfolio.value / 1000000).toFixed(1)}M <span className="text-sm text-slate-500">SAR</span></p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Avg ECL (Risk)</p>
                        <p className={`text-lg font-bold ${
                          portfolio.ecl < 1.5 ? 'text-emerald-600' : 'text-amber-600'
                        }`}>{portfolio.ecl}%</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Companies</p>
                        <p className="text-lg font-bold text-[#56afb6]">{portfolio.companies}</p>
                      </div>
                    </div>

                    {portfolio.status === 'active' && portfolio.investor && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                        <p className="text-xs text-emerald-700 font-semibold mb-1">✓ Active Investor</p>
                        <p className="text-sm font-bold text-emerald-900">{portfolio.investor}</p>
                      </div>
                    )}

                    {portfolio.status === 'ready' && (
                      <div className="bg-[#56afb6]/10 border border-[#56afb6]/30 rounded-xl p-3">
                        <p className="text-xs text-[#56afb6] font-semibold">⚡ Ready for Issuance</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (!portfolio.issued) {
                        setPortfolios(portfolios.map(p => 
                          p.id === portfolio.id 
                            ? { ...p, issued: true, status: 'active', investor: 'Pending Settlement' }
                            : p
                        ));
                      }
                    }}
                    disabled={portfolio.issued}
                    className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      portfolio.issued
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {portfolio.issued ? (
                      <>
                        <CheckCircle2 size={16} />
                        ✅ Sukuk Issued & Listed
                      </>
                    ) : (
                      <>
                        <TrendingUp size={16} />
                        Issue Sukuk (Securitize)
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Info Panel */}
            <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#56afb6]/20 border border-[#56afb6]/30 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-[#56afb6]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">How Mezzanine Securitization Works</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Mezzanine bundles vetted B2B credit portfolios (approved by Torbiona AI) into regional pools. 
                    These pools are then securitized into Sharia-compliant Sukuk instruments and offered to institutional investors 
                    (banks, sovereign wealth funds, pension funds). This creates liquidity for SME lending while offering 
                    institutional-grade fixed-income products with 8-9% yields backed by diversified trade receivables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
