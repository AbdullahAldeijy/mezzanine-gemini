import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileText, TrendingUp, Megaphone, Package, FileSignature, Lock, ShieldAlert, CheckSquare, Square } from 'lucide-react';

const COVENANTS = [
  {
    icon: Megaphone,
    ar: 'زيادة العروض التسويقية',
    en: 'Increase Marketing Offers',
    desc: 'Maintain active marketing campaigns on the platform throughout the credit period.',
  },
  {
    icon: Package,
    ar: 'زيادة المنتجات',
    en: 'Increase Products',
    desc: 'Grow your product catalogue on Mezzanine during the financing term.',
  },
  {
    icon: FileSignature,
    ar: 'العقود',
    en: 'Contracts',
    desc: 'Execute and fulfil contracts via the platform while the credit is active.',
  },
];

export const FinancingRequestModal = () => {
  const { selectedProduct, closeFinancingRequest, submitFinancingRequest } = useApp();
  const [amount, setAmount] = useState(1000000);
  const [purpose, setPurpose] = useState('Inventory Purchase');
  const [duration, setDuration] = useState('12 Months');
  const [beneficiary, setBeneficiary] = useState(selectedProduct?.seller || '');
  const [repaymentSource, setRepaymentSource] = useState('Sales Receivables');
  const [guarantees, setGuarantees] = useState('Trade Receivables Assignment');
  const [acknowledged, setAcknowledged] = useState(false);

  if (!selectedProduct) return null;

  const initialCapacity = 850000;
  const financedPortion = Math.min(100, Math.round((initialCapacity / amount) * 100));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 md:p-6 border-b border-gray-200 flex justify-between items-center gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-darkslate">Financing Request</h2>
            <p className="text-xs md:text-sm text-gray-600">Submit the details of the financing you need for this purchase</p>
          </div>
          <button onClick={closeFinancingRequest} className="text-gray-500 hover:text-darkslate transition-all flex-shrink-0">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Linked Opportunity */}
          <div className="bg-lightgray rounded-xl p-4 flex items-center gap-3">
            <FileText className="text-teal-600 flex-shrink-0" size={22} />
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Linked Opportunity / Offer</p>
              <p className="font-bold text-darkslate">{selectedProduct.name}</p>
            </div>
          </div>

          {/* Credit Period Covenants */}
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert size={16} className="text-amber-500 flex-shrink-0" />
              <p className="text-sm font-bold text-darkslate">شروط الالتزام خلال فترة التمويل</p>
            </div>
            <p className="text-xs text-gray-500 mb-3">Credit Period Mandatory Covenants — enforced automatically by Torbiona</p>

            {/* Warning banner */}
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
              <Lock size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                These obligations are <span className="font-bold">binding conditions</span> tied to your credit. Non-compliance is automatically detected and will impact your Torbiona score and available credit limit.
              </p>
            </div>

            {/* Covenant cards — always enforced, not toggleable */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {COVENANTS.map(({ icon: Icon, ar, en, desc }) => (
                <div
                  key={en}
                  className="flex flex-col gap-3 rounded-2xl border-2 border-teal-400 bg-gradient-to-b from-teal-50 to-teal-100 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow">
                      <Icon size={16} className="text-white" />
                    </div>
                    <span className="text-[9px] font-bold text-teal-600 bg-teal-100 border border-teal-300 rounded-full px-2 py-0.5 uppercase tracking-wide">
                      Enforced
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-teal-800 leading-tight mb-1" dir="rtl">{ar}</p>
                    <p className="text-[10px] font-semibold text-teal-600 mb-1">{en}</p>
                    <p className="text-[10px] text-gray-500 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Acknowledgment checkbox */}
            <button
              type="button"
              onClick={() => setAcknowledged((p) => !p)}
              className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all ${
                acknowledged
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 bg-lightgray hover:border-teal-300'
              }`}
            >
              {acknowledged
                ? <CheckSquare size={18} className="text-teal-500 flex-shrink-0" />
                : <Square size={18} className="text-gray-300 flex-shrink-0" />}
              <p className={`text-xs text-left leading-snug ${acknowledged ? 'text-teal-700 font-medium' : 'text-gray-500'}`}>
                I understand and accept these mandatory covenants. I commit to maintaining them throughout the entire financing period.
              </p>
            </button>
          </div>

          {/* Request Form */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-darkslate mb-1">Financing Amount Requested (SAR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-teal-500 outline-none font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-darkslate mb-1">Financing Purpose</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-teal-500 outline-none font-semibold"
              >
                <option>Inventory Purchase</option>
                <option>Equipment Financing</option>
                <option>Operating Capital</option>
                <option>Raw Materials</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-darkslate mb-1">Financing Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-teal-500 outline-none font-semibold"
              >
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
                <option>24 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-darkslate mb-1">Supplier / Beneficiary</label>
              <input
                type="text"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder="e.g. BuildTech Construction"
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-teal-500 outline-none font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-darkslate mb-1">Repayment Source</label>
              <select
                value={repaymentSource}
                onChange={(e) => setRepaymentSource(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-teal-500 outline-none font-semibold"
              >
                <option>Sales Receivables</option>
                <option>Bank Facility</option>
                <option>Company Cash Flow</option>
                <option>Contract Milestone Payments</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-darkslate mb-1">Guarantees / Collateral</label>
              <input
                type="text"
                value={guarantees}
                onChange={(e) => setGuarantees(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-teal-500 outline-none font-semibold"
              />
            </div>
          </div>

          {/* Related Contracts & Invoices */}
          <div>
            <label className="block text-sm font-medium text-darkslate mb-1">Related Contracts & Invoices</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-sm text-gray-500 flex items-center justify-between">
              <span>PO-2024-0142.pdf, Invoice-8831.pdf</span>
              <button className="text-teal-600 font-semibold text-sm">+ Attach</button>
            </div>
          </div>

          {/* Creditworthiness Panel */}
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 border-2 border-teal-500 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-teal-600" size={20} />
              <h3 className="text-lg font-bold text-darkslate">Creditworthiness & Financing Capacity</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Torbiona AI improves creditworthiness over time using verified platform activity, invoices, and repayment history — increasing the financed portion available on future requests.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center mb-4">
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Requested Amount</p>
                <p className="text-lg font-bold text-darkslate">{amount.toLocaleString()} SAR</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Initial Financing Capacity</p>
                <p className="text-lg font-bold text-darkslate">{initialCapacity.toLocaleString()} SAR</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Financed Portion</p>
                <p className="text-lg font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">{financedPortion}%</p>
              </div>
            </div>
            <div className="w-full bg-white rounded-full h-3">
              <div
                className="bg-gradient-to-r from-teal-400 to-teal-600 h-3 rounded-full transition-all"
                style={{ width: `${financedPortion}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={submitFinancingRequest}
              disabled={!acknowledged}
              className={`flex-1 py-4 rounded-xl font-medium shadow-lg transition-all ${
                acknowledged
                  ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              {acknowledged ? 'Continue to AI Credit Analysis' : 'Accept Covenants to Continue'}
            </button>
            <button
              onClick={closeFinancingRequest}
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
