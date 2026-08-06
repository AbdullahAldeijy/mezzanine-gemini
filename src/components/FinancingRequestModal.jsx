import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileText, TrendingUp } from 'lucide-react';

export const FinancingRequestModal = () => {
  const { selectedProduct, closeFinancingRequest, submitFinancingRequest } = useApp();
  const [amount, setAmount] = useState(1000000);
  const [purpose, setPurpose] = useState('Inventory Purchase');
  const [duration, setDuration] = useState('12 Months');
  const [beneficiary, setBeneficiary] = useState(selectedProduct?.seller || '');
  const [repaymentSource, setRepaymentSource] = useState('Sales Receivables');
  const [guarantees, setGuarantees] = useState('Trade Receivables Assignment');

  if (!selectedProduct) return null;

  const initialCapacity = 850000;
  const financedPortion = Math.min(100, Math.round((initialCapacity / amount) * 100));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-darkslate">Financing Request</h2>
            <p className="text-sm text-gray-600">Submit the details of the financing you need for this purchase</p>
          </div>
          <button onClick={closeFinancingRequest} className="text-gray-500 hover:text-darkslate transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Linked Opportunity */}
          <div className="bg-lightgray rounded-xl p-4 flex items-center gap-3">
            <FileText className="text-teal-600 flex-shrink-0" size={22} />
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Linked Opportunity / Offer</p>
              <p className="font-bold text-darkslate">{selectedProduct.name}</p>
            </div>
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
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
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
              className="flex-1 py-4 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Continue to AI Credit Analysis
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
