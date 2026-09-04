import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck, ArrowLeft, Check, Package, Building2, Search,
  TrendingUp, FileText, Megaphone, FileSignature, Lock,
  CheckSquare, Square, Settings2, Layers, CalendarClock,
  ChevronDown, ChevronUp, AlertCircle, Download, Star,
  CheckCircle, MapPin, ShoppingCart, Plus, Minus, FileCheck,
  Shield, Zap, BadgeCheck, Landmark, ChevronRight, X,
  Users, Briefcase, ClipboardList, BarChart2,
} from 'lucide-react';

// ── Constants ─────────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Marketplace' },
  { label: 'Checkout' },
  { label: 'Financing' },
  { label: 'Assessment' },
  { label: 'Calculator' },
  { label: 'Disbursement' },
  { label: 'Contract' },
];

const PRODUCTS = [
  { id: 1, name: 'Heavy Excavator', price: 450000, seller: 'BuildTech Construction', category: 'Heavy Machinery', city: 'Riyadh', stock: 15 },
  { id: 2, name: 'Tower Crane', price: 680000, seller: 'Global Materials', category: 'Heavy Machinery', city: 'Jeddah', stock: 8 },
  { id: 3, name: 'Concrete Mixer', price: 125000, seller: 'Heavy Equipment Co.', category: 'Heavy Machinery', city: 'Dammam', stock: 22 },
  { id: 4, name: 'Steel Bars (Bulk)', price: 85000, seller: 'Global Materials', category: 'Building Materials', city: 'Riyadh', stock: 500 },
  { id: 5, name: 'Welding Equipment Set', price: 85000, seller: 'BuildTech Construction', category: 'Heavy Machinery', city: 'Riyadh', stock: 12 },
  { id: 6, name: 'Safety Helmet Pack ×50', price: 6000, seller: 'Safety First Ltd.', category: 'Safety Equipment', city: 'Mecca', stock: 45 },
];

const DELIVERY_OPTIONS = [
  { id: 'fast',     name: 'Fast Delivery',     duration: 'Same Day',  price: 750 },
  { id: 'standard', name: 'Standard Delivery', duration: '2–3 Days', price: 350 },
  { id: 'pickup',   name: 'Self Pickup',        duration: 'Free',      price: 0 },
];

const COVENANTS = [
  { icon: Megaphone,     ar: 'زيادة العروض التسويقية', en: 'Increase Marketing Offers', desc: 'Maintain active marketing campaigns on the platform throughout the credit period.' },
  { icon: Package,       ar: 'زيادة المنتجات',          en: 'Increase Products',          desc: 'Grow your product catalogue on Mezzanine during the financing term.' },
  { icon: FileSignature, ar: 'العقود',                   en: 'Contracts',                  desc: 'Execute and fulfil contracts via the platform while the credit is active.' },
];

const INSTALLMENTS = [
  { label: 'Month 4',  amount: 166667, date: 'Apr 2025' },
  { label: 'Month 8',  amount: 166667, date: 'Aug 2025' },
  { label: 'Month 12', amount: 166666, date: 'Dec 2025' },
];

const INIT_ENHANCE = [
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

const INIT_DISB = [
  {
    label: 'Disbursement 1 — Month 4', amount: 166667, status: 'Disbursed',
    reqs: [
      { label: 'KYB identity verified', done: true },
      { label: 'Joint Operation profile completed', done: true },
      { label: 'Digital contract signed', done: true },
    ],
  },
  {
    label: 'Disbursement 2 — Month 8', amount: 166667, status: 'Requirements Pending',
    reqs: [
      { label: 'Q1 financial statements uploaded', done: false },
      { label: 'Minimum 2 new products added to marketplace', done: false },
      { label: 'At least 1 active contract executed', done: false },
    ],
  },
  {
    label: 'Disbursement 3 — Month 12', amount: 166666, status: 'Locked',
    reqs: [
      { label: 'Invoice reconciliation submitted', done: false },
      { label: '3+ active customer contracts maintained', done: false },
      { label: 'Platform engagement score ≥ 90%', done: false },
    ],
  },
];

const CONTRACT = {
  id: 'CF-2025-0041',
  type: 'Credit Facility',
  title: 'Credit Facility Agreement',
  financier: 'Mezzanine Finance Co.',
  borrower: 'BuildTech Construction Ltd.',
  borrowerCR: '1010123456',
  amount: 'SAR 500,000',
  issueDate: '01 Jan 2025',
  expiryDate: '01 Jan 2026',
  duration: '12 Months',
  profitRate: '4.5% per annum',
  repayment: 'Sales Receivables',
  collateral: 'Trade Receivables Assignment',
  law: 'Kingdom of Saudi Arabia',
  pages: 12,
  status: 'Active',
};

const SCORES = { behavioral: 61, financial: 60, market: 78, technical: 76, governmental: 78, overall: 70, creditLimit: 500000 };

// ── Shared UI atoms ──────────────────────────────────────────────────────────

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
              <div className={`flex-1 h-1 mx-1 rounded-full ${step > num ? 'bg-teal-500' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

const card = 'bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60';
const inputCls = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm transition-all bg-white';
const fmt = (n) => `SAR ${Number(n).toLocaleString()}`;

// Contract page helpers
const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
    {status}
  </span>
);

const TypePill = ({ type }) => {
  const map = { 'Credit Facility': 'bg-blue-900/10 text-blue-900', 'Promissory Note': 'bg-purple-100 text-purple-700', 'Murabaha': 'bg-teal-100 text-teal-700' };
  return <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${map[type] ?? 'bg-slate-100 text-slate-600'}`}>{type}</span>;
};

// ── Main component ────────────────────────────────────────────────────────────

export const CreditControl = () => {
  const { setCurrentView } = useApp();
  const [step, setStep] = useState(1);

  // Step 1
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Step 2
  const [qty, setQty] = useState(1);
  const [delivery, setDelivery] = useState('standard');

  // Step 3
  const [creditReportConsent, setCreditReportConsent] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [amount, setAmount] = useState(500000);
  const [purpose, setPurpose] = useState('Equipment Financing');
  const [duration, setDuration] = useState('12 Months');
  const [repayment, setRepayment] = useState('Sales Receivables');

  // Step 5
  const [showTerms, setShowTerms] = useState(false);
  const [showInstallments, setShowInstallments] = useState(true);
  const [terms, setTerms] = useState({ requireApproval: false, notifyEach: true, freezeOnMiss: false });
  const [enhance, setEnhance] = useState(INIT_ENHANCE);

  // Step 6
  const [disb, setDisb] = useState(INIT_DISB);

  const goNext = () => { if (step < STEPS.length) setStep(s => s + 1); else setCurrentView('b2b-platform'); };

  const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === delivery);
  const productTotal = selectedProduct ? selectedProduct.price * qty : 0;
  const deliveryFee = selectedDelivery?.price ?? 0;
  const finalTotal = productTotal + deliveryFee;

  const toggleEnhance = (gi, ai) =>
    setEnhance(prev => prev.map((g, i) => i === gi ? g.map((a, j) => j === ai ? { ...a, done: !a.done } : a) : g));

  const toggleDisb = (di, ri) =>
    setDisb(prev => prev.map((d, i) => i === di ? { ...d, reqs: d.reqs.map((r, j) => j === ri ? { ...r, done: !r.done } : r) } : d));

  const ScoreBar = ({ label, value }) => (
    <div className="mb-3">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-bold text-teal-600">{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: `${value}%` }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-28">
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <button onClick={() => setCurrentView('b2b-platform')} className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Marketplace
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4">

        {/* ── STEP 1: Marketplace ──────────────────────────────────────────── */}
        {step === 1 && (
          <div className={card}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">Credit Control Journey</p>
                <h2 className="text-2xl font-bold text-slate-900">Browse Marketplace</h2>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-6">Select a product to finance through Mezzanine Finance.</p>

            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products or sellers…"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {PRODUCTS.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase())).map(p => (
                <div key={p.id} onClick={() => setSelectedProduct(p)}
                  className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-md ${selectedProduct?.id === p.id ? 'border-teal-500 shadow-md ring-4 ring-teal-100' : 'border-transparent hover:border-teal-200 shadow-sm'}`}>
                  <div className="w-full h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center">
                    <Package size={28} className="text-slate-400" />
                  </div>
                  <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{p.category}</span>
                  <h4 className="font-bold text-slate-900 mt-1.5 mb-1 text-sm">{p.name}</h4>
                  <p className="text-teal-600 font-bold text-sm">{fmt(p.price)}</p>
                  <p className="text-xs text-slate-500">{p.seller}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-slate-400" /><span className="text-xs text-slate-400">{p.city}</span>
                  </div>
                  {selectedProduct?.id === p.id && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-teal-600 font-semibold">
                      <Check size={12} /> Selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button onClick={() => { if (selectedProduct) { setQty(1); goNext(); } }} disabled={!selectedProduct}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${selectedProduct ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              <ShoppingCart size={18} />
              {selectedProduct ? `Finance "${selectedProduct.name}" →` : 'Select a product to continue'}
            </button>
          </div>
        )}

        {/* ── STEP 2: Checkout ─────────────────────────────────────────────── */}
        {step === 2 && selectedProduct && (
          <div className={card}>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Checkout</h2>
            <p className="text-slate-500 text-sm mb-6">Review your order before submitting a financing request.</p>

            {/* Product summary */}
            <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-2xl p-5 mb-5 flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package size={28} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-semibold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">{selectedProduct.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedProduct.name}</h3>
                <p className="text-sm text-slate-500">{selectedProduct.seller} · {selectedProduct.city}</p>
                <p className="text-teal-600 font-bold mt-1">{fmt(selectedProduct.price)} / unit</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Quantity</p>
                  <p className="text-xs text-slate-400">Stock: {selectedProduct.stock} units</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center transition-all font-bold text-xl">−</button>
                  <span className="text-xl font-bold text-slate-900 w-8 text-center">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(selectedProduct.stock, q + 1))} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center transition-all font-bold text-xl">+</button>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-4">
              <p className="text-sm font-bold text-slate-700 mb-3">Delivery Options</p>
              <div className="space-y-2">
                {DELIVERY_OPTIONS.map(opt => (
                  <label key={opt.id} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${delivery === opt.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-300 bg-white'}`}>
                    <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id} onChange={e => setDelivery(e.target.value)} className="w-4 h-4 text-teal-500 focus:ring-teal-500" />
                    <div className="ml-3 flex-1 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{opt.name}</p>
                        <p className="text-xs text-slate-500">{opt.duration}</p>
                      </div>
                      <p className="font-bold text-slate-800 text-sm">{opt.price > 0 ? fmt(opt.price) : 'Free'}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order total */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Product ({qty} × {fmt(selectedProduct.price)})</span>
                  <span className="font-semibold text-slate-800">{fmt(productTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery</span>
                  <span className="font-semibold text-slate-800">{deliveryFee > 0 ? fmt(deliveryFee) : 'Free'}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-teal-600">{fmt(finalTotal)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
              <Landmark size={18} className="text-blue-500 flex-shrink-0" />
              <p className="text-xs text-blue-700 font-medium">This purchase will be financed through <strong>Mezzanine Finance</strong>. You'll complete a financing request next.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={goNext} className="flex-1 py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Landmark size={18} /> Continue to Financing Request
              </button>
              <button onClick={() => setStep(1)} className="px-5 py-3.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all">Back</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Financing Request ─────────────────────────────────────── */}
        {step === 3 && (
          <div className={card}>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Financing Request</h2>
            <p className="text-slate-500 text-sm mb-6">Submit your financing details. Mezzanine Finance will use your credit report to evaluate this request.</p>

            {/* Linked product */}
            {selectedProduct && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3 mb-5">
                <FileText className="text-teal-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Linked Product</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedProduct.name} — {fmt(finalTotal)}</p>
                </div>
              </div>
            )}

            {/* Credit report consent */}
            <div className={`rounded-2xl border-2 p-5 mb-5 transition-all ${creditReportConsent ? 'border-teal-500 bg-teal-50' : 'border-amber-300 bg-amber-50'}`}>
              <div className="flex items-start gap-3 mb-3">
                <Shield size={18} className={creditReportConsent ? 'text-teal-600' : 'text-amber-500'} />
                <div>
                  <p className="font-bold text-slate-900 text-sm">Credit Report Sharing Authorization</p>
                  <p className="text-xs text-slate-500 mt-0.5">Required to generate your assessment score</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 mb-3 border border-slate-200">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">What will be shared with Mezzanine Finance:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Business Identity (KYB verified)', 'Regulatory Documents', 'Products & Marketplace Activity', 'Organizational Structure', 'Customer & Project Data', 'Invoice & Cash Flow History'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0"><Check size={9} className="text-teal-600" /></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setCreditReportConsent(p => !p)}
                className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all ${creditReportConsent ? 'border-teal-400 bg-white' : 'border-amber-300 bg-white hover:border-teal-300'}`}>
                {creditReportConsent ? <CheckSquare size={18} className="text-teal-500 flex-shrink-0" /> : <Square size={18} className="text-amber-400 flex-shrink-0" />}
                <p className={`text-xs text-left leading-snug ${creditReportConsent ? 'text-teal-700 font-medium' : 'text-slate-600'}`}>
                  I authorize Mezzanine to share my Joint Operation credit report with the financing company to generate my assessment score.
                </p>
              </button>
            </div>

            {/* Covenants */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle size={15} className="text-amber-500" />
                <p className="text-sm font-bold text-slate-900">شروط الالتزام خلال فترة التمويل</p>
              </div>
              <p className="text-xs text-slate-500 mb-3">Credit Period Mandatory Covenants — enforced automatically by Mezzanine Finance</p>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
                <Lock size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed">These obligations are <strong>binding conditions</strong> tied to your credit. Non-compliance is automatically detected and will impact your score and available credit limit.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {COVENANTS.map(({ icon: Icon, ar, en, desc }) => (
                  <div key={en} className="rounded-2xl border-2 border-teal-400 bg-gradient-to-b from-teal-50 to-teal-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow">
                        <Icon size={14} className="text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-teal-600 bg-teal-100 border border-teal-300 rounded-full px-2 py-0.5">Enforced</span>
                    </div>
                    <p className="text-xs font-bold text-teal-800 mb-1 leading-tight" dir="rtl">{ar}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financing form */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Financing Amount (SAR)</label>
                <input type="number" value={amount} onChange={e => setAmount(+e.target.value || 0)} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Purpose</label>
                <select value={purpose} onChange={e => setPurpose(e.target.value)} className={inputCls}>
                  <option>Equipment Financing</option><option>Inventory Purchase</option><option>Operating Capital</option><option>Raw Materials</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Duration</label>
                <select value={duration} onChange={e => setDuration(e.target.value)} className={inputCls}>
                  <option>3 Months</option><option>6 Months</option><option>12 Months</option><option>24 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Repayment Source</label>
                <select value={repayment} onChange={e => setRepayment(e.target.value)} className={inputCls}>
                  <option>Sales Receivables</option><option>Bank Facility</option><option>Company Cash Flow</option><option>Contract Milestone Payments</option>
                </select>
              </div>
            </div>

            {/* Acknowledgment */}
            <button type="button" onClick={() => setAcknowledged(p => !p)}
              className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 mb-5 transition-all ${acknowledged ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-slate-50 hover:border-teal-300'}`}>
              {acknowledged ? <CheckSquare size={18} className="text-teal-500 flex-shrink-0" /> : <Square size={18} className="text-gray-300 flex-shrink-0" />}
              <p className={`text-xs text-left leading-snug ${acknowledged ? 'text-teal-700 font-medium' : 'text-gray-500'}`}>
                I understand and accept the mandatory covenants above. I commit to maintaining them throughout the entire financing period.
              </p>
            </button>

            <button onClick={() => { if (acknowledged && creditReportConsent) goNext(); }} disabled={!acknowledged || !creditReportConsent}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${acknowledged && creditReportConsent ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              <Zap size={18} /> {acknowledged && creditReportConsent ? 'Generate Assessment Score' : 'Accept both consents to continue'}
            </button>
          </div>
        )}

        {/* ── STEP 4: Assessment ───────────────────────────────────────────── */}
        {step === 4 && (
          <div className={card}>
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
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <FileCheck size={18} className="text-white" />
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

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
                    <TrendingUp size={18} className="text-white" />
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
              <AlertCircle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">Complete your financial documents and bank statements to increase your score. You can also enhance your score between disbursements in the next step.</p>
            </div>

            <button onClick={goNext} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Landmark size={18} /> Proceed to Credit Calculator
            </button>
          </div>
        )}

        {/* ── STEP 5: Credit Calculator ─────────────────────────────────────── */}
        {step === 5 && (
          <div className={card}>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Mezzanine Finance Credit Calculator</h2>
            <p className="text-slate-500 text-sm mb-6">AI-powered analysis based on your company profile and assessment score.</p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4">AI Credit Analysis</h3>
                <ScoreBar label="Behavioral" value={SCORES.behavioral} />
                <ScoreBar label="Financial" value={SCORES.financial} />
                <ScoreBar label="Market" value={SCORES.market} />
                <ScoreBar label="Technical & Operational" value={SCORES.technical} />
                <ScoreBar label="Governmental & Regulatory" value={SCORES.governmental} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-44 h-44 mb-4">
                  <svg className="transform -rotate-90 w-44 h-44">
                    <circle cx="88" cy="88" r="76" stroke="#f1f5f9" strokeWidth="16" fill="none" />
                    <circle cx="88" cy="88" r="76" stroke="url(#cg5)" strokeWidth="16" fill="none"
                      strokeDasharray={`${2 * Math.PI * 76}`}
                      strokeDashoffset={`${2 * Math.PI * 76 * (1 - SCORES.overall / 100)}`}
                      strokeLinecap="round" />
                    <defs>
                      <linearGradient id="cg5" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6bc4cc" /><stop offset="100%" stopColor="#4a9aa0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">{SCORES.overall}%</span>
                    <span className="text-xs text-slate-500 mt-1">Overall Score</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-4 text-center w-full">
                  <p className="text-xs text-slate-500 mb-1">Approved Credit Limit</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">{fmt(SCORES.creditLimit)}</p>
                  <span className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1 mt-1"><CheckCircle size={11} /> Approved</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-teal-100 border-2 border-teal-400 rounded-2xl p-5 mb-5 flex items-start gap-3">
              <CheckCircle size={28} className="text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-0.5">Approved! Congratulations!</h3>
                <p className="text-sm text-slate-600">You are eligible for Mezzanine Finance. Your credit limit has been approved based on your profile assessment.</p>
              </div>
            </div>

            {/* Collapsible cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              {/* Financing control terms */}
              <div className={`rounded-2xl border-2 overflow-hidden transition-all ${showTerms ? 'border-teal-500' : 'border-slate-200'}`}>
                <button onClick={() => setShowTerms(p => !p)} className={`w-full flex items-center justify-between gap-3 p-4 ${showTerms ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-slate-50 hover:bg-teal-50/40'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${showTerms ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-white shadow-sm'}`}>
                      <Settings2 size={15} className={showTerms ? 'text-white' : 'text-teal-500'} />
                    </div>
                    <div dir="rtl" className="text-right">
                      <p className={`text-sm font-bold ${showTerms ? 'text-teal-700' : 'text-slate-900'}`}>شروط التحكم بالتمويل</p>
                      <p className="text-[10px] text-slate-400">Financing Control Terms</p>
                    </div>
                  </div>
                  {showTerms ? <ChevronUp size={15} className="text-teal-500" /> : <ChevronDown size={15} className="text-slate-400" />}
                </button>
                {showTerms && (
                  <div className="px-4 pb-4 pt-3 bg-white space-y-2">
                    {[
                      { key: 'requireApproval', ar: 'دفعة مقدمة', en: 'Require manager approval' },
                      { key: 'notifyEach', ar: 'التحصيل التبادلي', en: 'Notify on each disbursement' },
                      { key: 'freezeOnMiss', ar: 'استقطاع من حساب الطوارئ', en: 'Freeze on missed payment' },
                    ].map(({ key, ar, en }) => (
                      <button key={key} onClick={() => setTerms(p => ({ ...p, [key]: !p[key] }))}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-all ${terms[key] ? 'border-teal-400 bg-teal-50' : 'border-slate-100 bg-slate-50 hover:border-teal-200'}`}>
                        <div dir="rtl" className="text-right">
                          <p className={`text-xs font-semibold ${terms[key] ? 'text-teal-700' : 'text-slate-800'}`}>{ar}</p>
                          <p className="text-[10px] text-slate-400">{en}</p>
                        </div>
                        {terms[key] ? <CheckSquare size={15} className="text-teal-500 flex-shrink-0" /> : <Square size={15} className="text-slate-300 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Installments + enhance score */}
              <div className={`rounded-2xl border-2 overflow-hidden transition-all ${showInstallments ? 'border-teal-500' : 'border-slate-200'}`}>
                <button onClick={() => setShowInstallments(p => !p)} className={`w-full flex items-center justify-between gap-3 p-4 ${showInstallments ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-slate-50 hover:bg-teal-50/40'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${showInstallments ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-white shadow-sm'}`}>
                      <Layers size={15} className={showInstallments ? 'text-white' : 'text-teal-500'} />
                    </div>
                    <div dir="rtl" className="text-right">
                      <p className={`text-sm font-bold ${showInstallments ? 'text-teal-700' : 'text-slate-900'}`}>الصرف على دفعات</p>
                      <p className="text-[10px] text-slate-400">Disbursement in Installments</p>
                    </div>
                  </div>
                  {showInstallments ? <ChevronUp size={15} className="text-teal-500" /> : <ChevronDown size={15} className="text-slate-400" />}
                </button>
                {showInstallments && (
                  <div className="px-4 pb-4 pt-3 bg-white">
                    <div className="flex items-center gap-1.5 mb-3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                      <Lock size={10} className="text-slate-400 flex-shrink-0" />
                      <p className="text-[10px] text-slate-500"><span className="font-semibold text-slate-600">System Generated</span> · Calculated from project timeline & risk profile</p>
                    </div>
                    <div className="space-y-2">
                      {INSTALLMENTS.map((inst, i) => (
                        <div key={i}>
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex-shrink-0 ring-2 ring-teal-100" />
                            <div className="flex-1 bg-teal-50 border border-teal-200 rounded-xl px-3 py-2 flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-bold text-teal-700">{inst.label}</p>
                                <p className="text-[9px] text-slate-400">{inst.date}</p>
                              </div>
                              <p className="text-sm font-bold text-slate-900">{fmt(inst.amount)}</p>
                            </div>
                          </div>
                          {i < INSTALLMENTS.length - 1 && enhance[i] && (
                            <div className="ml-3 mt-1.5 mb-1">
                              <div className="w-px h-1.5 bg-teal-200 ml-0.5 mb-1" />
                              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-2.5">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <Star size={11} className="text-purple-500" />
                                  <p className="text-[10px] font-bold text-purple-700">Enhance Score Before Next Disbursement</p>
                                </div>
                                <div className="space-y-1">
                                  {enhance[i].map((a, ai) => (
                                    <button key={ai} onClick={() => toggleEnhance(i, ai)}
                                      className={`w-full flex items-center gap-2 text-left px-2 py-1 rounded-lg border text-[10px] transition-all ${a.done ? 'border-purple-300 bg-white text-purple-700 font-medium' : 'border-slate-200 bg-white/60 text-slate-500 hover:border-purple-200'}`}>
                                      <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center border ${a.done ? 'bg-purple-500 border-purple-500' : 'border-slate-300'}`}>
                                        {a.done && <Check size={8} className="text-white" />}
                                      </div>
                                      {a.label}
                                    </button>
                                  ))}
                                </div>
                                {enhance[i].every(a => a.done) && (
                                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-purple-700 font-semibold">
                                    <CheckCircle size={11} className="text-purple-500" /> Score enhanced! Next disbursement unlocked.
                                  </div>
                                )}
                              </div>
                              <div className="w-px h-1.5 bg-teal-200 ml-0.5 mt-1" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-2">Total: <span className="font-semibold text-slate-700">SAR 500,000</span> · {INSTALLMENTS.length} installments</p>
                  </div>
                )}
              </div>
            </div>

            <button onClick={goNext} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <ChevronRight size={18} /> Continue to Disbursement Requirements
            </button>
          </div>
        )}

        {/* ── STEP 6: Disbursement ─────────────────────────────────────────── */}
        {step === 6 && (
          <div className={card}>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Disbursement Requirements</h2>
            <p className="text-slate-500 text-sm mb-3">Your company will not receive funds until all requirements for each disbursement are verified by Mezzanine Finance.</p>
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
              <Lock size={13} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700">Each disbursement is <strong>locked</strong> until requirements are automatically verified by Mezzanine platform data.</p>
            </div>

            <div className="space-y-4">
              {disb.map((d, di) => {
                const allDone = d.reqs.every(r => r.done);
                return (
                  <div key={di} className={`bg-white rounded-2xl border-2 p-5 transition-all ${d.status === 'Disbursed' ? 'border-emerald-300' : d.status === 'Requirements Pending' ? 'border-amber-300' : 'border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.status === 'Disbursed' ? 'bg-emerald-100' : d.status === 'Requirements Pending' ? 'bg-amber-100' : 'bg-slate-100'}`}>
                          {d.status === 'Disbursed' ? <CheckCircle size={20} className="text-emerald-600" /> : d.status === 'Locked' ? <Lock size={20} className="text-slate-400" /> : <AlertCircle size={20} className="text-amber-500" />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{d.label}</p>
                          <p className="text-xs text-slate-500">{fmt(d.amount)}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${d.status === 'Disbursed' ? 'bg-emerald-100 text-emerald-700' : d.status === 'Requirements Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                        {d.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {d.reqs.map((req, ri) => (
                        <button key={ri} onClick={() => d.status !== 'Disbursed' && d.status !== 'Locked' && toggleDisb(di, ri)}
                          disabled={d.status === 'Disbursed' || d.status === 'Locked'}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${req.done ? 'border-emerald-300 bg-emerald-50' : d.status === 'Locked' ? 'border-slate-100 bg-slate-50 opacity-50' : 'border-slate-200 bg-slate-50 hover:border-teal-300 hover:bg-teal-50'}`}>
                          <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${req.done ? 'bg-emerald-500 border-emerald-500' : d.status === 'Locked' ? 'bg-slate-200 border-slate-300' : 'bg-white border-slate-300'}`}>
                            {req.done && <Check size={11} className="text-white" />}
                            {d.status === 'Locked' && !req.done && <Lock size={9} className="text-slate-400" />}
                          </div>
                          <span className={`text-xs font-medium ${req.done ? 'text-emerald-700 line-through' : d.status === 'Locked' ? 'text-slate-400' : 'text-slate-700'}`}>{req.label}</span>
                        </button>
                      ))}
                    </div>
                    {d.status !== 'Disbursed' && allDone && (
                      <div className="mt-3 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5"><CheckCircle size={13} /> All requirements met — Ready for disbursement</span>
                        <button className="text-xs font-bold text-white bg-emerald-500 px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-all">Request Release</button>
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

        {/* ── STEP 7: Contract (matches ContractsPortal Active Contracts) ──── */}
        {step === 7 && (
          <div className="space-y-5">
            {/* Journey banner */}
            <div className="flex items-center gap-3 bg-teal-600 text-white px-5 py-3 rounded-2xl shadow-lg">
              <CheckCircle size={18} className="flex-shrink-0" />
              <p className="text-sm font-semibold">Credit Control Journey — Active Contract</p>
              <span className="ml-auto text-xs text-teal-200 hidden sm:block">Generated from your financing request</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Active Contracts</h2>
                <p className="text-sm text-slate-500 mt-0.5">1 active contract from this journey</p>
              </div>
            </div>

            {/* Detail card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
              <div className="h-1 w-full bg-emerald-400" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TypePill type={CONTRACT.type} />
                      <span className="text-xs text-slate-400 font-mono">{CONTRACT.id}</span>
                      <StatusBadge status={CONTRACT.status} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{CONTRACT.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                      <Building2 size={13} />
                      {CONTRACT.financier}
                      {selectedProduct && <span className="text-slate-400">· for {selectedProduct.name}</span>}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Murabaha-based financing — generated from your Credit Control journey</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-xs text-slate-400 mb-0.5">Contract Value</p>
                    <p className="text-2xl font-bold text-slate-900">{CONTRACT.amount}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'Issue Date', value: CONTRACT.issueDate },
                    { label: 'Expiry Date', value: CONTRACT.expiryDate },
                    { label: 'Pages', value: `${CONTRACT.pages} pgs` },
                    { label: 'Profit Rate', value: CONTRACT.profitRate },
                  ].map(m => (
                    <div key={m.label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 mb-0.5">{m.label}</p>
                      <p className="text-sm font-bold text-slate-800">{m.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Contract Terms</p>
                  <div className="grid grid-cols-2 gap-x-8">
                    {[
                      { label: 'Financing Type', value: 'Murabaha (Cost-plus)' },
                      { label: 'Repayment Source', value: CONTRACT.repayment },
                      { label: 'Duration', value: CONTRACT.duration },
                      { label: 'Collateral', value: CONTRACT.collateral },
                      { label: 'Borrower', value: CONTRACT.borrower },
                      { label: 'Governing Law', value: CONTRACT.law },
                    ].map(t => (
                      <div key={t.label} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
                        <span className="text-xs text-slate-500">{t.label}</span>
                        <span className="text-xs font-semibold text-slate-800">{t.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-all">
                    <FileText size={14} /> Preview
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all">
                    <Download size={15} /> Download Contract PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Table — same style as ContractsPortal */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden border border-white/60">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr className="bg-slate-50 border-b-2 border-slate-100">
                      {['Contract ID', 'Type', 'Counterparty', 'Amount', 'Issue Date', 'Expiry', 'Status', 'PDF'].map((h, i) => (
                        <th key={h} className={`${i === 7 ? 'text-center' : 'text-left'} px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-900/[0.025] transition-colors">
                      <td className="px-5 py-4"><span className="font-mono text-xs font-semibold text-blue-900 bg-blue-900/10 px-2 py-1 rounded-lg">{CONTRACT.id}</span></td>
                      <td className="px-5 py-4"><TypePill type={CONTRACT.type} /></td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-900/10 flex items-center justify-center flex-shrink-0"><Landmark size={13} className="text-blue-900" /></div>
                          <span className="text-sm font-medium text-slate-900">{CONTRACT.financier}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4"><span className="text-sm font-bold text-slate-900">{CONTRACT.amount}</span></td>
                      <td className="px-5 py-4"><span className="text-sm text-slate-600">{CONTRACT.issueDate}</span></td>
                      <td className="px-5 py-4"><span className="text-sm text-slate-600">{CONTRACT.expiryDate}</span></td>
                      <td className="px-5 py-4"><StatusBadge status={CONTRACT.status} /></td>
                      <td className="px-5 py-4 text-center">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all">
                          <Download size={14} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-slate-400 text-right">Showing 1 of 1 active contract from this journey</p>

            <button onClick={() => setCurrentView('b2b-platform')} className="w-full py-3.5 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <ChevronRight size={18} /> Back to Marketplace
            </button>
          </div>
        )}

      </div>
      <ProgressBar step={step} onStepClick={setStep} />
    </div>
  );
};
