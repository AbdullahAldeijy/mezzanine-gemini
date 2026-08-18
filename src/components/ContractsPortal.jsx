import { useState } from 'react';
import {
  FileCheck, Clock, CheckCircle2, Archive, Download, Eye, PenLine,
  ChevronRight, Search, Bell, Filter, Shield, FileText, Building2,
  AlertCircle, CalendarDays, DollarSign, Stamp, LayoutDashboard,
  Package, BarChart3, TrendingUp, Megaphone, CheckSquare, Briefcase,
  ShieldCheck, Database, X, ArrowLeft, Info, BadgeCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const pendingContracts = [
  {
    id: 'CF-2025-0041',
    title: 'Credit Facility Agreement',
    counterparty: 'BuildTech Ltd.',
    amount: '500,000 SAR',
    type: 'Credit Facility',
    generated: 'Today',
    deadline: '2 days left',
    urgency: 'high',
    status: 'Awaiting Nafath Verification',
    statusColor: 'amber',
    pages: 12,
    description: 'Revolving credit facility for procurement financing — Tranche A.',
  },
  {
    id: 'PN-2025-0038',
    title: 'Promissory Note (سند لأمر)',
    counterparty: 'AlNoor Steel Co.',
    amount: '1,200,000 SAR',
    type: 'Promissory Note',
    generated: 'Yesterday',
    deadline: '5 days left',
    urgency: 'medium',
    status: 'Pending Counterparty Review',
    statusColor: 'orange',
    pages: 4,
    description: 'Promissory note issued under Murabaha structure for raw materials.',
  },
  {
    id: 'MU-2025-0035',
    title: 'Murabaha Purchase Agreement',
    counterparty: 'Gulf Cement Group',
    amount: '780,000 SAR',
    type: 'Murabaha',
    generated: '3 days ago',
    deadline: '7 days left',
    urgency: 'low',
    status: 'Awaiting Nafath Verification',
    statusColor: 'amber',
    pages: 18,
    description: 'Commodity Murabaha agreement for construction equipment financing.',
  },
  {
    id: 'CF-2025-0033',
    title: 'Supply Chain Finance Agreement',
    counterparty: 'Riyadh Logistics LLC',
    amount: '330,000 SAR',
    type: 'Credit Facility',
    generated: '4 days ago',
    deadline: '10 days left',
    urgency: 'low',
    status: 'Draft — Awaiting Legal Review',
    statusColor: 'slate',
    pages: 9,
    description: 'Dynamic discounting facility for approved invoices under SCF program.',
  },
];

const activeContracts = [
  {
    id: 'CF-2025-0028',
    type: 'Credit Facility',
    counterparty: 'BuildTech Ltd.',
    amount: '2,500,000 SAR',
    issueDate: '01 Mar 2025',
    expiryDate: '01 Mar 2026',
    status: 'Active',
  },
  {
    id: 'PN-2025-0025',
    type: 'Promissory Note',
    counterparty: 'AlNoor Steel Co.',
    amount: '900,000 SAR',
    issueDate: '15 Feb 2025',
    expiryDate: '15 Aug 2025',
    status: 'Active',
  },
  {
    id: 'MU-2025-0022',
    type: 'Murabaha',
    counterparty: 'Gulf Cement Group',
    amount: '1,100,000 SAR',
    issueDate: '10 Feb 2025',
    expiryDate: '10 Feb 2026',
    status: 'Active',
  },
  {
    id: 'CF-2025-0019',
    type: 'Credit Facility',
    counterparty: 'Horizon Contractors',
    amount: '650,000 SAR',
    issueDate: '28 Jan 2025',
    expiryDate: '28 Jan 2026',
    status: 'Active',
  },
  {
    id: 'PN-2025-0015',
    type: 'Promissory Note',
    counterparty: 'Riyadh Logistics LLC',
    amount: '420,000 SAR',
    issueDate: '12 Jan 2025',
    expiryDate: '12 Jul 2025',
    status: 'Near Expiry',
  },
  {
    id: 'MU-2025-0011',
    type: 'Murabaha',
    counterparty: 'NorthStar Trading Co.',
    amount: '3,200,000 SAR',
    issueDate: '05 Jan 2025',
    expiryDate: '05 Jan 2027',
    status: 'Active',
  },
];

const archivedContracts = [
  {
    id: 'CF-2024-0087',
    type: 'Credit Facility',
    counterparty: 'BuildTech Ltd.',
    amount: '1,800,000 SAR',
    issueDate: '10 Jun 2024',
    closedDate: '10 Dec 2024',
    reason: 'Fully Repaid',
  },
  {
    id: 'PN-2024-0071',
    type: 'Promissory Note',
    counterparty: 'Gulf Cement Group',
    amount: '500,000 SAR',
    issueDate: '01 Apr 2024',
    closedDate: '01 Oct 2024',
    reason: 'Fully Repaid',
  },
  {
    id: 'MU-2024-0062',
    type: 'Murabaha',
    counterparty: 'AlNoor Steel Co.',
    amount: '750,000 SAR',
    issueDate: '15 Feb 2024',
    closedDate: '15 Aug 2024',
    reason: 'Terminated by Mutual Agreement',
  },
  {
    id: 'CF-2024-0045',
    type: 'Credit Facility',
    counterparty: 'Riyadh Logistics LLC',
    amount: '220,000 SAR',
    issueDate: '10 Jan 2024',
    closedDate: '10 Jul 2024',
    reason: 'Fully Repaid',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge = ({ status, color }) => {
  const styles = {
    amber: 'bg-amber-100 text-amber-700 border border-amber-200',
    orange: 'bg-orange-100 text-orange-700 border border-orange-200',
    slate: 'bg-slate-100 text-slate-600 border border-slate-200',
    emerald: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    red: 'bg-red-100 text-red-700 border border-red-200',
    blue: 'bg-blue-100 text-blue-800 border border-blue-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[color] ?? styles.slate}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        color === 'amber' ? 'bg-amber-500' :
        color === 'orange' ? 'bg-orange-500' :
        color === 'emerald' ? 'bg-emerald-500' :
        color === 'red' ? 'bg-red-500' :
        color === 'blue' ? 'bg-blue-600' :
        'bg-slate-400'
      }`} />
      {status}
    </span>
  );
};

const TypePill = ({ type }) => {
  const map = {
    'Credit Facility': 'bg-blue-900/10 text-blue-900',
    'Promissory Note': 'bg-purple-100 text-purple-700',
    'Murabaha': 'bg-teal-100 text-teal-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${map[type] ?? 'bg-slate-100 text-slate-600'}`}>
      {type}
    </span>
  );
};

// ─── KPI Bar ─────────────────────────────────────────────────────────────────

const KPIBar = () => {
  const kpis = [
    { label: 'Pending Signatures', value: pendingContracts.length, icon: Clock, accent: 'amber' },
    { label: 'Active Contracts', value: activeContracts.length, icon: CheckCircle2, accent: 'emerald' },
    { label: 'Total Contracted Value', value: '10.57M SAR', icon: DollarSign, accent: 'blue' },
    { label: 'Archived', value: archivedContracts.length, icon: Archive, accent: 'slate' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map(({ label, value, icon: Icon, accent }) => (
        <div key={label} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
            accent === 'amber' ? 'bg-amber-100' :
            accent === 'emerald' ? 'bg-emerald-100' :
            accent === 'blue' ? 'bg-blue-900/10' :
            'bg-slate-100'
          }`}>
            <Icon size={20} className={
              accent === 'amber' ? 'text-amber-600' :
              accent === 'emerald' ? 'text-emerald-600' :
              accent === 'blue' ? 'text-blue-900' :
              'text-slate-500'
            } />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Pending Signatures Tab ───────────────────────────────────────────────────

const PendingSignaturesTab = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500">
          {pendingContracts.length} contracts awaiting your digital signature
        </p>
        <button className="flex items-center gap-2 px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-white transition-all">
          <Filter size={14} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {pendingContracts.map((contract) => (
          <div
            key={contract.id}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden hover:shadow-md transition-all group"
          >
            {/* Card accent bar */}
            <div className={`h-1 w-full ${
              contract.urgency === 'high' ? 'bg-amber-400' :
              contract.urgency === 'medium' ? 'bg-orange-300' :
              'bg-slate-200'
            }`} />

            <div className="p-5">
              {/* Header row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <TypePill type={contract.type} />
                    <span className="text-xs text-slate-400 font-mono">{contract.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {contract.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <Building2 size={13} />
                    {contract.counterparty}
                  </p>
                </div>
                <button
                  onClick={() => setExpandedCard(expandedCard === contract.id ? null : contract.id)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-all text-slate-400 hover:text-slate-600 ml-2 flex-shrink-0"
                >
                  <Info size={16} />
                </button>
              </div>

              {/* Expanded description */}
              {expandedCard === contract.id && (
                <div className="mb-3 px-3 py-2 bg-blue-900/5 rounded-xl border border-blue-900/10 text-xs text-slate-600 leading-relaxed">
                  {contract.description}
                </div>
              )}

              {/* Meta grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-slate-400 mb-0.5">Amount</p>
                  <p className="text-sm font-bold text-slate-800">{contract.amount}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-slate-400 mb-0.5">Generated</p>
                  <p className="text-sm font-semibold text-slate-700">{contract.generated}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-slate-400 mb-0.5">Pages</p>
                  <p className="text-sm font-semibold text-slate-700">{contract.pages} pgs</p>
                </div>
              </div>

              {/* Status badge */}
              <div className="flex items-center justify-between mb-4">
                <StatusBadge status={contract.status} color={contract.statusColor} />
                <span className={`text-xs font-medium ${
                  contract.urgency === 'high' ? 'text-amber-600' :
                  contract.urgency === 'medium' ? 'text-orange-500' :
                  'text-slate-400'
                }`}>
                  <Clock size={12} className="inline mr-1" />
                  {contract.deadline}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-all">
                  <Eye size={14} />
                  Preview
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all">
                  <Stamp size={15} />
                  Review & Sign via Nafath
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Active Contracts Tab ─────────────────────────────────────────────────────

const ActiveContractsTab = () => {
  const [search, setSearch] = useState('');

  const filtered = activeContracts.filter(
    (c) =>
      c.counterparty.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5 gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contracts…"
            className="w-full pl-9 pr-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900/40 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all whitespace-nowrap">
          <FileText size={15} />
          New Contract
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden border border-white/60">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-100">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Contract ID
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Counterparty
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  PDF
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contract, idx) => (
                <tr
                  key={contract.id}
                  className={`border-b border-slate-100 hover:bg-blue-900/[0.025] transition-colors group ${
                    idx === filtered.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs font-semibold text-blue-900 bg-blue-900/8 px-2 py-1 rounded-lg">
                      {contract.id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <TypePill type={contract.type} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-900/10 flex items-center justify-center flex-shrink-0">
                        <Building2 size={13} className="text-blue-900" />
                      </div>
                      <span className="text-sm font-medium text-slate-900">{contract.counterparty}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-slate-900">{contract.amount}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">{contract.issueDate}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">{contract.expiryDate}</span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge
                      status={contract.status}
                      color={contract.status === 'Active' ? 'emerald' : 'amber'}
                    />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      title="Download PDF"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all"
                    >
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <FileCheck size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No contracts match your search.</p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-3 text-right">
        Showing {filtered.length} of {activeContracts.length} active contracts
      </p>
    </div>
  );
};

// ─── Archived Tab ─────────────────────────────────────────────────────────────

const ArchivedTab = () => (
  <div>
    <p className="text-sm text-slate-500 mb-5">
      {archivedContracts.length} closed contracts — retained for compliance and audit purposes.
    </p>

    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden border border-white/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-100">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contract ID</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Counterparty</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Issued</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Closed</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Reason</th>
              <th className="text-center px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">PDF</th>
            </tr>
          </thead>
          <tbody>
            {archivedContracts.map((contract, idx) => (
              <tr
                key={contract.id}
                className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                  idx === archivedContracts.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-4">
                  <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                    {contract.id}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <TypePill type={contract.type} />
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-700">{contract.counterparty}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-slate-600">{contract.amount}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-500">{contract.issueDate}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-500">{contract.closedDate}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    contract.reason === 'Fully Repaid'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {contract.reason}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button
                    title="Download archived PDF"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-all"
                  >
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const ContractsPortalContent = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const tabs = [
    {
      id: 'pending',
      label: 'Pending Signatures',
      icon: Clock,
      count: pendingContracts.length,
    },
    {
      id: 'active',
      label: 'Active Contracts',
      icon: CheckCircle2,
      count: activeContracts.length,
    },
    {
      id: 'archived',
      label: 'Archived',
      icon: Archive,
      count: archivedContracts.length,
    },
  ];

  return (
    <div>
      {/* Page heading */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
          Digital Contracts &amp; Promissory Notes
          <span className="block text-base md:text-lg font-semibold text-slate-400 mt-0.5">
            العقود الرقمية والسندات لأمر
          </span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
          <Shield size={13} className="text-blue-900" />
          All contracts are legally binding under Saudi E-Transaction Law. Signatures require Nafath identity verification.
        </p>
      </div>

      {/* KPI bar */}
      <KPIBar />

      {/* ── Tab Navigation ── */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-1.5 shadow-sm mb-6 flex gap-1">
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === id
                ? 'bg-blue-900 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === id
                ? 'bg-white/20 text-white'
                : 'bg-slate-100 text-slate-500'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === 'pending' && <PendingSignaturesTab />}
      {activeTab === 'active' && <ActiveContractsTab />}
      {activeTab === 'archived' && <ArchivedTab />}
    </div>
  );
};

export const ContractsPortal = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-[#f7f4e8]">
      {/* ── Top Navbar ── */}
      <header className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-40 border-b border-slate-100">
        <div className="px-4 md:px-8 py-0 flex items-center h-16 gap-4">
          {/* Back button */}
          <button
            onClick={() => setCurrentView('crm-dashboard')}
            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-900 transition-colors text-sm font-medium mr-2 flex-shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Logo / Brand */}
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileCheck size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-blue-900 leading-none tracking-tight">
                Mezzanine
                <span className="font-light text-slate-400 mx-1.5">|</span>
                <span className="text-blue-900">Contracts</span>
              </h1>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5 font-medium uppercase tracking-wider">
                Digital E-Signature Platform
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Nafath verified badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700">
              <BadgeCheck size={13} />
              Nafath Verified
            </div>

            {/* Notification bell */}
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-all text-slate-500">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-900 rounded-full" />
            </button>

            {/* New contract */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all">
              <PenLine size={14} />
              New Contract
            </button>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto">
        <ContractsPortalContent />
      </main>
    </div>
  );
};
