import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck, ArrowLeft, Check, Package, Building2, Search,
  TrendingUp, FileText, Megaphone, FileSignature, Lock,
  CheckSquare, Square, Settings2, Layers, CalendarClock,
  ChevronDown, ChevronUp, AlertCircle, Download, Star,
  CreditCard, CheckCircle, Users, Briefcase, ClipboardList,
  Shield, Zap, BadgeCheck, Landmark, ChevronRight, X,
  MapPin, Calendar, ShoppingCart, Plus, Minus, FileCheck,
} from 'lucide-react';

const STEPS = [
  { label: 'Marketplace' },
  { label: 'Checkout' },
  { label: 'Financing Request' },
  { label: 'Assessment' },
  { label: 'Credit Calculator' },
  { label: 'Disbursement' },
  { label: 'Contract' },
];

const PRODUCTS = [
  { id: 1, name: 'Heavy Excavator', price: 450000, seller: 'BuildTech Construction', category: 'Heavy Machinery', city: 'Riyadh', stock: 15 },
  { id: 2, name: 'Tower Crane', price: 680000, seller: 'Global Materials', category: 'Heavy Machinery', city: 'Jeddah', stock: 8 },
  { id: 3, name: 'Concrete Mixer', price: 125000, seller: 'Heavy Equipment Co.', category: 'Heavy Machinery', city: 'Dammam', stock: 22 },
  { id: 4, name: 'Steel Bars (Bulk)', price: 850, seller: 'Global Materials', category: 'Building Materials', city: 'Riyadh', stock: 500 },
  { id: 5, name: 'Welding Equipment Set', price: 85000, seller: 'BuildTech Construction', category: 'Heavy Machinery', city: 'Riyadh', stock: 12 },
  { id: 6, name: 'Safety Helmet Pack (50)', price: 1200, seller: 'Safety First Ltd.', category: 'Safety Equipment', city: 'Mecca', stock: 45 },
];

const COVENANTS = [
  { icon: Megaphone, ar: 'زيادة العروض التسويقية', en: 'Increase Marketing Offers', desc: 'Maintain active marketing campaigns on the platform throughout the credit period.' },
  { icon: Package, ar: 'زيادة المنتجات', en: 'Increase Products', desc: 'Grow your product catalogue on Mezzanine during the financing term.' },
  { icon: FileSignature, ar: 'العقود', en: 'Contracts', desc: 'Execute and fulfil contracts via the platform while the credit is active.' },
];

const INSTALLMENTS = [
  { label: 'Month 4', amount: 166667, date: 'Apr 2025' },
  { label: 'Month 8', amount: 166667, date: 'Aug 2025' },
  { label: 'Month 12', amount: 166666, date: 'Dec 2025' },
];

const ENHANCE_ACTIONS = [
  [
    { label: 'Upload Q1 financial statement', done: false },
    { label: 'Add 2 new products to marketplace', done: false },
    { label: 'Complete at least 1 active contract', done: false },
  ],
  [
    { label: 'Submit invoice reconciliation report', done: false },
    { label: 'Maintain 3+ active customer contracts', done: false },
    { label: 'Achieve 90%+ platform engagement score', done: false },
  ],
];

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

const ProgressBar = ({ step, onStepClick }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-3 z-50 shadow-lg">
    <div className="max-w-4xl mx-auto flex items-center">
      {STEPS.map((s, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick(num)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all hover:scale-110 ${
                  done ? 'bg-teal-500 text-white' :
                  active ? 'bg-teal-500 text-white ring-4 ring-teal-100' :
                  'bg-gray-200 text-gray-400'
                }`}
              >
                {done ? <Check size={11} /> : num}
              </button>
              <span onClick={() => onStepClick(num)} className={`text-[8px] mt-0.5 text-center hidden sm:block cursor-pointer max-w-[55px] leading-tight ${active ? 'text-teal-600 font-semibold' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-1 mx-1 rounded-full transition-all ${step > num ? 'bg-teal-500' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

const ScoreBar = ({ label, value }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="text-sm font-bold text-teal-600">{value}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div className="bg-gradient-to-r from-teal-400 to-teal-600 h-2.5 rounded-full transition-all" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export const CreditControl = () => {
  const { setCurrentView } = useApp();
  const [step, setStep] = useState(1);

  // Step 1 state
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Step 2 state
  const [qty, setQty] = useState(1);

  // Step 3 state
  const [amount, setAmount] = useState(500000);
  const [purpose, setPurpose] = useState('Equipment Financing');
  const [duration, setDuration] = useState('12 Months');
  const [repaymentSource, setRepaymentSource] = useState('Sales Receivables');
  const [acknowledged, setAcknowledged] = useState(false);
  const [creditReportConsent, setCreditReportConsent] = useState(false);

  // Step 5 state
  const [showTerms, setShowTerms] = useState(false);
  const [showInstallments, setShowInstallments] = useState(true);
  const [terms, setTerms] = useState({ requireApproval: false, notifyEach: true, freezeOnMiss: false });
  const [enhanceActions, setEnhanceActions] = useState(ENHANCE_ACTIONS);

  // Step 6 state
  const [disbReqs, setDisbReqs] = useState(DISBURSE_REQS);

  const scores = { behavioral: 61, financial: 60, market: 78, technical: 76, governmental: 78, overall: 70, creditLimit: 500000 };

  const goNext = () => { if (step < STEPS.length) setStep(s => s + 1); };

  const filteredProducts = PRODUCTS.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase())
  );

  const totalPrice = selectedProduct ? selectedProduct.price * qty : 0;

  const toggleEnhanceAction = (installIdx, actionIdx) => {
    setEnhanceActions(prev => prev.map((group, gi) =>
      gi === installIdx ? group.map((a, ai) => ai === actionIdx ? { ...a, done: !a.done } : a) : group
    ));
  };

  const toggleDisbReq = (disbIdx, reqIdx) => {
    setDisbReqs(prev => prev.map((d, di) =>
      di === disbIdx ? { ...d, reqs: d.reqs.map((r, ri) => ri === reqIdx ? { ...r, done: !r.done } : r) } : d
    ));
  };

  const inputCls = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm transition-all';

  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-28">
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <button onClick={() => setCurrentView('b2b-platform')} className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Marketplace
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4">

        {/* ── STEP 1: Marketplace ─────────────────────────────────────────── */}
        {step === 1 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Credit Control Journey</h2>
                <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">Step 1 — Browse & Select</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-6">Browse the marketplace and select a product to finance through Mezzanine Finance.</p>

            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products or sellers…"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {filteredProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`bg-white rounded-xl p-4 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${selectedProduct?.id === p.id ? 'border-teal-500 shadow-md ring-4 ring-teal-100' : 'border-transparent hover:border-teal-200'}`}
                >
                  <div className="w-full h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center">
                    <Package size={28} className="text-slate-400" />
                  </div>
                  <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{p.category}</span>
                  <h4 className="font-bold text-slate-900 mt-1.5 mb-1 text-sm">{p.name}</h4>
                  <p className="text-teal-600 font-bold text-sm">SAR {p.price.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{p.seller}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-slate-400" />
                    <span className="text-xs text-slate-400">{p.city}</span>
                  </div>
                  {selectedProduct?.id === p.id && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-teal-600 font-semibold">
                      <Check size={13} /> Selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => { if (selectedProduct) { setQty(1); goNext(); } }}
              disabled={!selectedProduct}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${selectedProduct ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              <ShoppingCart size={18} />
              {selectedProduct ? `Finance "${selectedProduct.name}" with Mezzanine Finance` : 'Select a product to continue'}
            </button>
          </div>
        )}

        {/* ── STEP 2: Checkout ────────────────────────────────────────────── */}
        {step === 2 && selectedProduct && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Checkout</h2>
            <p className="text-slate-500 text-sm mb-6">Review your order and proceed to financing.</p>

            <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package size={28} className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-semibold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">{selectedProduct.category}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedProduct.name}</h3>
                  <p className="text-sm text-slate-500">{selectedProduct.seller} · {selectedProduct.city}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm mb-5">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Order Details</p>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Quantity</p>
                  <p className="text-xs text-slate-400">Available: {selectedProduct.stock} units</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center transition-all">
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold text-slate-900 w-8 text-center">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(selectedProduct.stock, q + 1))} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center transition-all">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Unit price</span>
                  <span className="font-semibold text-slate-800">SAR {selectedProduct.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Quantity</span>
                  <span className="font-semibold text-slate-800">× {qty}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-slate-100 pt-2">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-xl text-teal-600">SAR {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <Landmark size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-800">Pay with Mezzanine Finance</p>
                <p className="text-xs text-blue-600 mt-0.5">This purchase will be financed through Mezzanine Finance. You'll complete a financing request in the next step.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={goNext} className="flex-1 py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Landmark size={18} /> Continue to Financing Request
              </button>
              <button onClick={() => setStep(1)} className="px-5 py-3.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all">
                Back
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Financing Request ────────────────────────────────────── */}
        {step === 3 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Financing Request</h2>
            <p className="text-slate-500 text-sm mb-6">Submit your financing details. Mezzanine Finance will use your credit profile to evaluate your request.</p>

            {/* Linked product */}
            {selectedProduct && (
              <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 mb-5 border border-slate-200">
                <FileText className="text-teal-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Linked Product</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedProduct.name} — SAR {totalPrice.toLocaleString()}</p>
                </div>
              </div>
            )}

            {/* Credit Report Consent — KEY NEW SECTION */}
            <div className={`rounded-2xl border-2 p-5 mb-5 transition-all ${creditReportConsent ? 'border-teal-500 bg-teal-50' : 'border-amber-300 bg-amber-50'}`}>
              <div className="flex items-start gap-3 mb-3">
                <Shield size={20} className={creditReportConsent ? 'text-teal-600' : 'text-amber-500'} />
                <div>
                  <p className="font-bold text-slate-900 text-sm">Credit Report Data Sharing Authorization</p>
                  <p className="text-xs text-slate-500 mt-0.5">Required to generate your assessment score</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 mb-4 border border-slate-200">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">What will be shared with Mezzanine Finance:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Business Identity (KYB verified)',
                    'Regulatory Documents',
                    'Products & Marketplace Activity',
                    'Organizational Structure',
                    'Customer & Project Data',
                    'Invoice & Cash Flow History',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <Check size={9} className="text-teal-600" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCreditReportConsent(p => !p)}
                className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all ${creditReportConsent ? 'border-teal-400 bg-white' : 'border-amber-300 bg-white hover:border-teal-300'}`}
              >
                {creditReportConsent ? <CheckSquare size={18} className="text-teal-500 flex-shrink-0" /> : <Square size={18} className="text-amber-400 flex-shrink-0" />}
                <p className={`text-xs text-left leading-snug ${creditReportConsent ? 'text-teal-700 font-semibold' : 'text-slate-600'}`}>
                  I authorize Mezzanine to share my Joint Operation credit report with the financing company to generate my assessment score.
                </p>
              </button>
            </div>

            {/* Covenants */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-amber-500" />
                <p className="text-sm font-bold text-slate-900">شروط الالتزام خلال فترة التمويل</p>
              </div>
              <p className="text-xs text-slate-500 mb-3">Credit Period Mandatory Covenants — enforced automatically by Mezzanine Finance</p>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
                <Lock size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  These obligations are <span className="font-bold">binding conditions</span> tied to your credit. Non-compliance is automatically detected and will impact your Mezzanine Finance score and available credit limit.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {COVENANTS.map(({ icon: Icon, ar, en, desc }) => (
                  <div key={en} className="flex flex-col gap-2 rounded-2xl border-2 border-teal-400 bg-gradient-to-b from-teal-50 to-teal-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow">
                        <Icon size={14} className="text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-teal-600 bg-teal-100 border border-teal-300 rounded-full px-2 py-0.5">Enforced</span>
                    </div>
                    <p className="text-xs font-bold text-teal-800 leading-tight" dir="rtl">{ar}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Request form */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Financing Amount (SAR)</label>
                <input type="number" value={amount} onChange={e => setAmount(+e.target.value || 0)} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Purpose</label>
                <select value={purpose} onChange={e => setPurpose(e.target.value)} className={`${inputCls} bg-white`}>
                  <option>Equipment Financing</option>
                  <option>Inventory Purchase</option>
                  <option>Operating Capital</option>
                  <option>Raw Materials</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Duration</label>
                <select value={duration} onChange={e => setDuration(e.target.value)} className={`${inputCls} bg-white`}>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                  <option>24 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Repayment Source</label>
                <select value={repaymentSource} onChange={e => setRepaymentSource(e.target.value)} className={`${inputCls} bg-white`}>
                  <option>Sales Receivables</option>
                  <option>Bank Facility</option>
                  <option>Company Cash Flow</option>
                  <option>Contract Milestone Payments</option>
                </select>
              </div>
            </div>

            {/* Acknowledgment */}
            <button type="button" onClick={() => setAcknowledged(p => !p)}
              className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 mb-5 transition-all ${acknowledged ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-slate-50 hover:border-teal-300'}`}>
              {acknowledged ? <CheckSquare size={18} className="text-teal-500 flex-shrink-0" /> : <Square size={18} className="text-gray-300 flex-shrink-0" />}
              <p className={`text-xs text-left leading-snug ${acknowledged ? 'text-teal-700 font-medium' : 'text-gray-500'}`}>
                I understand and accept the mandatory covenants above. I commit to maintaining them throughout the entire financing period.
              </p>
            </button>

            <button
              onClick={() => { if (acknowledged && creditReportConsent) goNext(); }}
              disabled={!acknowledged || !creditReportConsent}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${acknowledged && creditReportConsent ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              <Zap size={18} />
              {acknowledged && creditReportConsent ? 'Generate Assessment Score' : 'Accept both consents to continue'}
            </button>
          </div>
        )}

        {/* ── STEP 4: Assessment Score ─────────────────────────────────────── */}
        {step === 4 && (
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
              <p className="text-xs text-amber-800">Complete your financial documents and bank statements to increase your score and unlock higher financing limits. You can enhance your score between disbursements in the next steps.</p>
            </div>

            <button onClick={goNext} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Landmark size={18} /> Proceed to Mezzanine Finance Credit Calculator
            </button>
          </div>
        )}

        {/* ── STEP 5: Mezzanine Finance Credit Calculator ───────────────────── */}
        {step === 5 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Mezzanine Finance Credit Calculator</h2>
            <p className="text-slate-500 text-sm mb-6">AI-powered credit analysis based on your company profile and assessment score.</p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              {/* Score bars */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">AI Credit Analysis</h3>
                <ScoreBar label="Behavioral" value={scores.behavioral} />
                <ScoreBar label="Financial" value={scores.financial} />
                <ScoreBar label="Market" value={scores.market} />
                <ScoreBar label="Technical and Operational" value={scores.technical} />
                <ScoreBar label="Governmental and Regulatory" value={scores.governmental} />
              </div>

              {/* Circular gauge */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 mb-4">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle cx="96" cy="96" r="84" stroke="#f1f5f9" strokeWidth="18" fill="none" />
                    <circle cx="96" cy="96" r="84" stroke="url(#ccgrad)" strokeWidth="18" fill="none"
                      strokeDasharray={`${2 * Math.PI * 84}`}
                      strokeDashoffset={`${2 * Math.PI * 84 * (1 - scores.overall / 100)}`}
                      strokeLinecap="round" />
                    <defs>
                      <linearGradient id="ccgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6bc4cc" />
                        <stop offset="100%" stopColor="#4a9aa0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">{scores.overall}%</span>
                    <span className="text-xs text-slate-500 mt-1">Overall Score</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-4 text-center w-full">
                  <p className="text-xs text-slate-500 mb-1">Available Credit Limit</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                    SAR {scores.creditLimit.toLocaleString()}
                  </p>
                  <span className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1 mt-1">
                    <CheckCircle size={12} /> Approved
                  </span>
                </div>
              </div>
            </div>

            {/* Approval banner */}
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 border-2 border-teal-500 rounded-2xl p-5 mb-5">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-teal-600 flex-shrink-0 mt-0.5" size={32} />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Approved! Congratulations!</h3>
                  <p className="text-sm text-slate-600">You are eligible for Mezzanine Finance. Your credit limit has been approved based on your profile assessment.</p>
                </div>
              </div>
            </div>

            {/* Financing Control Terms */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${showTerms ? 'border-teal-500 shadow-md' : 'border-gray-200'}`}>
                <button onClick={() => setShowTerms(p => !p)} className={`w-full flex items-center justify-between gap-3 p-4 transition-colors ${showTerms ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-gray-50 hover:bg-teal-50/40'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${showTerms ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-white shadow-sm'}`}>
                      <Settings2 size={17} className={showTerms ? 'text-white' : 'text-teal-500'} />
                    </div>
                    <div dir="rtl" className="text-right">
                      <p className={`text-sm font-bold ${showTerms ? 'text-teal-700' : 'text-slate-900'}`}>شروط التحكم بالتمويل</p>
                      <p className="text-[10px] text-gray-400">Financing Control Terms</p>
                    </div>
                  </div>
                  {showTerms ? <ChevronUp size={16} className="text-teal-500" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {showTerms && (
                  <div className="px-4 pb-4 pt-3 bg-white space-y-3">
                    {[
                      { key: 'requireApproval', ar: 'دفعة مقدمة', en: 'Require manager approval' },
                      { key: 'notifyEach', ar: 'التحصيل التبادلي', en: 'Notify on each disbursement' },
                      { key: 'freezeOnMiss', ar: 'استقطاع من حساب الطوارئ', en: 'Freeze on missed payment' },
                    ].map(({ key, ar, en }) => (
                      <button key={key} onClick={() => setTerms(p => ({ ...p, [key]: !p[key] }))}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-all ${terms[key] ? 'border-teal-400 bg-teal-50' : 'border-gray-100 bg-gray-50 hover:border-teal-200'}`}>
                        <div dir="rtl" className="text-right">
                          <p className={`text-xs font-semibold ${terms[key] ? 'text-teal-700' : 'text-slate-900'}`}>{ar}</p>
                          <p className="text-[10px] text-gray-400">{en}</p>
                        </div>
                        {terms[key] ? <CheckSquare size={16} className="text-teal-500 flex-shrink-0" /> : <Square size={16} className="text-gray-300 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Installments with enhance score */}
              <div className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${showInstallments ? 'border-teal-500 shadow-md' : 'border-gray-200'}`}>
                <button onClick={() => setShowInstallments(p => !p)} className={`w-full flex items-center justify-between gap-3 p-4 transition-colors ${showInstallments ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-gray-50 hover:bg-teal-50/40'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${showInstallments ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-white shadow-sm'}`}>
                      <Layers size={17} className={showInstallments ? 'text-white' : 'text-teal-500'} />
                    </div>
                    <div dir="rtl" className="text-right">
                      <p className={`text-sm font-bold ${showInstallments ? 'text-teal-700' : 'text-slate-900'}`}>الصرف على دفعات</p>
                      <p className="text-[10px] text-gray-400">Disbursement in Installments</p>
                    </div>
                  </div>
                  {showInstallments ? <ChevronUp size={16} className="text-teal-500" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {showInstallments && (
                  <div className="px-4 pb-4 pt-3 bg-white">
                    <div className="flex items-center gap-1.5 mb-4 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                      <Lock size={11} className="text-slate-400 flex-shrink-0" />
                      <p className="text-[10px] text-slate-500"><span className="font-semibold text-slate-600">System Generated</span> · Calculated from project timeline & risk profile</p>
                    </div>

                    {/* Installments + enhance score between them */}
                    <div className="space-y-3">
                      {INSTALLMENTS.map((inst, i) => (
                        <div key={i}>
                          {/* Installment card */}
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex-shrink-0 ring-2 ring-teal-100" />
                            <div className="flex-1 bg-teal-50 border border-teal-200 rounded-xl px-3 py-2.5 flex items-center justify-between">
                              <div>
                                <p className="text-xs font-bold text-teal-700">{inst.label}</p>
                                <p className="text-[10px] text-slate-500">{inst.date}</p>
                              </div>
                              <p className="text-sm font-bold text-slate-900">SAR {inst.amount.toLocaleString()}</p>
                            </div>
                          </div>

                          {/* Enhance score section between installments */}
                          {i < INSTALLMENTS.length - 1 && enhanceActions[i] && (
                            <div className="ml-7 mt-2 mb-1">
                              <div className="w-px h-2 bg-teal-200 ml-1 mb-1" />
                              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <Star size={13} className="text-purple-500" />
                                  <p className="text-xs font-bold text-purple-700">Enhance Score Before Next Disbursement</p>
                                </div>
                                <p className="text-[10px] text-slate-500 mb-2">Complete these to improve your assessment score:</p>
                                <div className="space-y-1.5">
                                  {enhanceActions[i].map((action, ai) => (
                                    <button key={ai} onClick={() => toggleEnhanceAction(i, ai)}
                                      className={`w-full flex items-center gap-2 text-left px-2.5 py-1.5 rounded-lg border transition-all text-xs ${action.done ? 'border-purple-300 bg-white text-purple-700 font-medium' : 'border-gray-200 bg-white/60 text-slate-600 hover:border-purple-200'}`}>
                                      <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border ${action.done ? 'bg-purple-500 border-purple-500' : 'border-gray-300'}`}>
                                        {action.done && <Check size={9} className="text-white" />}
                                      </div>
                                      {action.label}
                                    </button>
                                  ))}
                                </div>
                                {enhanceActions[i].every(a => a.done) && (
                                  <div className="mt-2 flex items-center gap-1.5 text-xs text-purple-700 font-semibold">
                                    <CheckCircle size={13} className="text-purple-500" />
                                    Score enhanced! Next disbursement unlocked.
                                  </div>
                                )}
                              </div>
                              <div className="w-px h-2 bg-teal-200 ml-1 mt-1" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-gray-400 text-center mt-3">
                      Total: <span className="font-semibold text-slate-700">SAR 500,000</span> · {INSTALLMENTS.length} installments
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button onClick={goNext} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <ChevronRight size={18} /> Continue to Disbursement Requirements
            </button>
          </div>
        )}

        {/* ── STEP 6: Disbursement Requirements ───────────────────────────── */}
        {step === 6 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Disbursement Requirements</h2>
            <p className="text-slate-500 text-sm mb-2">Your company will not receive funds until the requirements for each disbursement are fully met and verified by Mezzanine Finance.</p>

            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
              <Lock size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Each disbursement is <span className="font-bold">locked</span> until all requirements are verified. Requirements are checked automatically by Mezzanine platform data.
              </p>
            </div>

            <div className="space-y-4">
              {disbReqs.map((disb, di) => {
                const allDone = disb.reqs.every(r => r.done);
                const statusColor = disb.status === 'Disbursed' ? 'emerald' : disb.status === 'Requirements Pending' ? 'amber' : 'slate';
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
                          disb.status === 'Requirements Pending' ? 'bg-amber-100' :
                          'bg-slate-100'
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
                          onClick={() => disb.status !== 'Disbursed' && toggleDisbReq(di, ri)}
                          disabled={disb.status === 'Disbursed' || disb.status === 'Locked'}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                            req.done ? 'border-emerald-300 bg-emerald-50' :
                            disb.status === 'Locked' ? 'border-slate-100 bg-slate-50 opacity-60' :
                            'border-slate-200 bg-slate-50 hover:border-teal-300 hover:bg-teal-50'
                          }`}>
                          <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                            req.done ? 'bg-emerald-500 border-emerald-500' :
                            disb.status === 'Locked' ? 'bg-slate-200 border-slate-300' :
                            'bg-white border-slate-300'
                          }`}>
                            {req.done && <Check size={11} className="text-white" />}
                            {disb.status === 'Locked' && !req.done && <Lock size={9} className="text-slate-400" />}
                          </div>
                          <span className={`text-xs font-medium ${req.done ? 'text-emerald-700 line-through' : disb.status === 'Locked' ? 'text-slate-400' : 'text-slate-700'}`}>
                            {req.label}
                          </span>
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

            <button onClick={goNext} className="w-full mt-6 py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <FileSignature size={18} /> View Digital Contract
            </button>
          </div>
        )}

        {/* ── STEP 7: Digital Contract ─────────────────────────────────────── */}
        {step === 7 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Digital Contract</h2>
                <p className="text-slate-500 text-sm">Active financing agreement for this transaction</p>
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

            {/* Contract parties */}
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

            {/* Contract terms */}
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
              <div className="flex items-center gap-2">
                {INSTALLMENTS.map((inst, i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex-1 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${i === 0 ? 'bg-emerald-500' : 'bg-teal-200'}`}>
                        {i === 0 ? <Check size={14} className="text-white" /> : <span className="text-xs font-bold text-teal-600">{i + 1}</span>}
                      </div>
                      <p className="text-xs font-bold text-teal-700">{inst.label}</p>
                      <p className="text-xs text-slate-500">SAR {inst.amount.toLocaleString()}</p>
                      {i === 0 && <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Disbursed</span>}
                    </div>
                    {i < INSTALLMENTS.length - 1 && <div className="flex-shrink-0 h-px w-4 bg-teal-300" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Download size={18} /> Download Contract PDF
              </button>
              <button onClick={() => setCurrentView('b2b-platform')} className="flex-1 py-3.5 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <ChevronRight size={18} /> Back to Marketplace
              </button>
            </div>
          </div>
        )}

      </div>
      <ProgressBar step={step} onStepClick={setStep} />
    </div>
  );
};
