import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Shield, CheckCircle2, AlertTriangle, Building2, 
  Database, Activity, CreditCard, Download, Zap, Clock, TrendingUp, Users, Briefcase
} from 'lucide-react';

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

export const AdminRiskPortal = () => {
  const { setCurrentView } = useApp();
  const [hubTab, setHubTab] = useState('credit-risk');
  const [activeTab, setActiveTab] = useState('manual');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [creditLimit, setCreditLimit] = useState(0);
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
              <h1 className="text-white font-bold text-sm md:text-base">Mezzanine Capital & Risk Hub</h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 ml-6">Manage AI Credit Underwriting & Institutional Sukuk Issuance</p>
          </div>
        </div>
      </header>

      {/* Hub Tabs */}
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-2 bg-slate-900/50 rounded-xl p-1">
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
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="flex flex-col md:w-40">
                        <label className="text-xs text-slate-500 font-medium mb-1">Credit Limit (SAR)</label>
                        <input
                          type="number"
                          value={creditLimit}
                          onChange={(e) => setCreditLimit(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none"
                        />
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 flex-1">
                        <button className="w-full py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold">
                          Approve
                        </button>
                        <button className="w-full py-2 border-2 border-red-400 text-red-500 rounded-xl text-sm font-semibold">
                          Reject
                        </button>
                        <button className="w-full py-2 border-2 border-slate-300 text-slate-600 rounded-xl text-sm font-semibold">
                          Request Docs
                        </button>
                      </div>
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
