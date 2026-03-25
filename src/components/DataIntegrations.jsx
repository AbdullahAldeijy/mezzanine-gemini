import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Landmark, ShieldAlert, Wallet, FileText, Database, 
  CheckCircle2, Plus, ChevronDown, Shield
} from 'lucide-react';

export const DataIntegrations = () => {
  const { setCurrentView } = useApp();
  const [selectedERP, setSelectedERP] = useState('');

  const integrations = [
    {
      id: 1,
      name: 'Ministry of Commerce (Wathiq API)',
      icon: Landmark,
      description: 'Auto-syncs CR details, ownership, and legal status.',
      status: 'connected',
      statusText: '✅ Connected via Nafath',
      dataPoints: ['CR Details', 'Capital', 'Legal Status', 'Ownership Structure'],
      color: 'emerald',
      action: null,
    },
    {
      id: 2,
      name: 'SIMAH (Saudi Credit Bureau)',
      icon: ShieldAlert,
      description: 'Link your credit profile to verify payment history and obligations.',
      status: 'pending',
      statusText: 'Not Connected',
      dataPoints: ['Credit Limits', 'Payment History', 'Defaults', 'Credit Score'],
      color: 'amber',
      action: { type: 'button', label: 'Provide Digital Consent', style: 'outline' },
    },
    {
      id: 3,
      name: 'Open Banking (Tarbott / Lean Tech)',
      icon: Wallet,
      description: 'Connect your corporate bank account for real-time cash flow analysis.',
      status: 'pending',
      statusText: 'Not Connected',
      dataPoints: ['Average Balance', 'Cash Inflows', 'Cash Outflows', 'Transaction Patterns'],
      color: 'blue',
      action: { type: 'button', label: 'Connect Bank Account', style: 'solid' },
    },
    {
      id: 4,
      name: 'ZATCA (Zakat, Tax and Customs)',
      icon: FileText,
      description: 'Sync VAT returns and filing regularity.',
      status: 'pending',
      statusText: 'Not Connected',
      dataPoints: ['VAT Returns', 'Tax Status', 'Filing Regularity', 'Compliance Score'],
      color: 'purple',
      action: { type: 'button', label: 'Upload / Sync ZATCA', style: 'outline' },
    },
    {
      id: 5,
      name: 'ERP & Accounting (Qoyod, Odoo, Xero)',
      icon: Database,
      description: 'Connect your accounting software for automated B2B revenue and seasonality tracking.',
      status: 'pending',
      statusText: 'Not Connected',
      dataPoints: ['Revenue Range', 'Number of Employees', 'Seasonality', 'Invoice Volume'],
      color: 'teal',
      action: { type: 'dropdown', label: 'Select ERP Provider', options: ['Qoyod', 'Odoo', 'Xero', 'QuickBooks', 'SAP'] },
    },
  ];

  const handleConnect = (integration) => {
    console.log(`Connecting to ${integration.name}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f4e8]">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('b2b-platform')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#56afb6]/20 flex items-center justify-center">
                <Shield size={20} className="text-[#56afb6]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">Data & API Integrations</h1>
                <p className="text-xs md:text-sm text-slate-500">
                  Connect your business data sources to unlock higher credit limits and AI-powered financing
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#56afb6]/10 to-teal-500/10 border border-[#56afb6]/30 rounded-2xl p-4 md:p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#56afb6]/20 border border-[#56afb6]/30 flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-[#56afb6]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How Data Integrations Boost Your Credit Limit</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mezzanine's Torbiona AI analyzes data from multiple trusted sources to build a comprehensive credit profile. 
                The more data sources you connect, the higher your credit limit and the faster your approval. 
                All connections are secure, encrypted, and compliant with Saudi data protection regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div
                key={integration.id}
                className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${integration.color}-100 flex items-center justify-center`}>
                    <Icon size={24} className={`text-${integration.color}-600`} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      integration.status === 'connected'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {integration.statusText}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">{integration.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{integration.description}</p>

                {/* Data Points */}
                <div className="bg-slate-50 rounded-xl p-3 mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Data Points Fetched:</p>
                  <div className="space-y-1">
                    {integration.dataPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#56afb6]"></div>
                        <span className="text-xs text-slate-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                {integration.action && (
                  <div>
                    {integration.action.type === 'button' && (
                      <button
                        onClick={() => handleConnect(integration)}
                        className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                          integration.action.style === 'solid'
                            ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white hover:shadow-lg'
                            : 'border-2 border-[#56afb6] text-[#56afb6] hover:bg-[#56afb6]/10'
                        }`}
                      >
                        <Plus size={16} />
                        {integration.action.label}
                      </button>
                    )}

                    {integration.action.type === 'dropdown' && (
                      <div className="relative">
                        <select
                          value={selectedERP}
                          onChange={(e) => setSelectedERP(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#56afb6] text-sm font-semibold text-slate-700 bg-white focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none appearance-none cursor-pointer"
                        >
                          <option value="">{integration.action.label}</option>
                          {integration.action.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={18}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#56afb6] pointer-events-none"
                        />
                      </div>
                    )}
                  </div>
                )}

                {integration.status === 'connected' && (
                  <div className="flex items-center justify-center gap-2 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-semibold">
                    <CheckCircle2 size={16} />
                    Active & Syncing
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Info Panel */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#56afb6]/20 border border-[#56afb6]/30 flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-[#56afb6]" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Security & Compliance</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                All data integrations are encrypted end-to-end and comply with Saudi Data & AI Authority (SDAIA) regulations. 
                Mezzanine never stores sensitive credentials and uses OAuth 2.0 / API tokens for secure access.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#56afb6]/20 border border-[#56afb6]/30 rounded-full text-xs font-semibold">
                  ISO 27001 Certified
                </span>
                <span className="px-3 py-1 bg-[#56afb6]/20 border border-[#56afb6]/30 rounded-full text-xs font-semibold">
                  SDAIA Compliant
                </span>
                <span className="px-3 py-1 bg-[#56afb6]/20 border border-[#56afb6]/30 rounded-full text-xs font-semibold">
                  PCI DSS Level 1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Limit Impact Indicator */}
        <div className="mt-6 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Your Credit Limit Potential</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Current Connected Sources</span>
              <span className="text-lg font-bold text-[#56afb6]">1 / 5</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-[#56afb6] to-teal-500 h-3 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500 mb-1">Current Limit</p>
                <p className="text-xl font-bold text-slate-900">50,000 SAR</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                <p className="text-xs text-emerald-700 mb-1">Potential Limit</p>
                <p className="text-xl font-bold text-emerald-700">500,000 SAR</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-3">
              Connect all 5 data sources to unlock your maximum credit limit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
