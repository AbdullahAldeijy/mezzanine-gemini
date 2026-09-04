import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck, ArrowLeft, Check, Package, Building2, Search,
  TrendingUp, FileText, Megaphone, FileSignature, Lock,
  CheckSquare, Square, Settings2, Layers,
  AlertCircle, Download, Star, CheckCircle, MapPin, Calendar,
  Zap, BadgeCheck, Landmark, ChevronRight, ChevronDown, X,
  FileCheck, User, LayoutDashboard, LogIn, LogOut, ArrowRight,
  Menu, Send,
} from 'lucide-react';
import { PageContent } from './FinancingPayments';

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
  id: 'CF-2025-0041', type: 'Credit Facility', title: 'Credit Facility Agreement',
  financier: 'Mezzanine Finance Co.', borrower: 'BuildTech Construction Ltd.',
  amount: 'SAR 500,000', issueDate: '01 Jan 2025', expiryDate: '01 Jan 2026',
  duration: '12 Months', profitRate: '4.5% per annum', repayment: 'Sales Receivables',
  collateral: 'Trade Receivables Assignment', law: 'Kingdom of Saudi Arabia', pages: 12, status: 'Active',
};

const SCORES = { behavioral: 61, financial: 60, market: 78, technical: 76, governmental: 78, overall: 70, creditLimit: 500000 };

// ── Shared ────────────────────────────────────────────────────────────────────

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
              <button onClick={() => onStepClick(num)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all hover:scale-110 ${done ? 'bg-teal-500 text-white' : active ? 'bg-teal-500 text-white ring-4 ring-teal-100' : 'bg-gray-200 text-gray-400'}`}>
                {done ? <Check size={11} /> : num}
              </button>
              <span onClick={() => onStepClick(num)} className={`text-[8px] mt-0.5 text-center hidden sm:block cursor-pointer max-w-[55px] leading-tight ${active ? 'text-teal-600 font-semibold' : 'text-gray-400'}`}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-1 mx-1 rounded-full ${step > num ? 'bg-teal-500' : 'bg-gray-200'}`} />}
          </div>
        );
      })}
    </div>
  </div>
);

const card = 'bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60';
const inputCls = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm transition-all bg-white';
const fmt = (n) => `SAR ${Number(n).toLocaleString()}`;

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

// ── Main ──────────────────────────────────────────────────────────────────────

export const CreditControl = () => {
  const { setCurrentView, isLoggedIn, logout, userData } = useApp();
  const [step, setStep] = useState(1);

  // Step 1 — marketplace state (same as B2BPlatform)
  const [showRFQModal, setShowRFQModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCity, setActiveCity] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [contactSeller, setContactSeller] = useState(null);

  // Step 1 → shared product selection
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

  const goNext = () => { if (step < STEPS.length) setStep(s => s + 1); };

  const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === delivery);
  const productTotal = selectedProduct ? selectedProduct.price * qty : 0;
  const deliveryFee = selectedDelivery?.price ?? 0;
  const finalTotal = productTotal + deliveryFee;

  const toggleEnhance = (gi, ai) =>
    setEnhance(prev => prev.map((g, i) => i === gi ? g.map((a, j) => j === ai ? { ...a, done: !a.done } : a) : g));

  const toggleDisb = (di, ri) =>
    setDisb(prev => prev.map((d, i) => i === di ? { ...d, reqs: d.reqs.map((r, j) => j === ri ? { ...r, done: !r.done } : r) } : d));

  // B2BPlatform data (exact same)
  const categories = ['All', 'Heavy Machinery', 'Building Materials', 'Safety Equipment', 'Electrical & Plumbing', 'Logistics Services'];
  const cities = ['All', 'Riyadh', 'Jeddah', 'Dammam', 'Mecca'];
  const opportunityTypes = ['All', 'Products', 'RFQs'];

  const companies = [
    { name: 'BuildTech', rating: 4.8, icon: Building2 },
    { name: 'Global Materials', rating: 4.7, icon: Building2 },
    { name: 'Heavy Equipment Co.', rating: 4.9, icon: Building2 },
    { name: 'Safety First Ltd.', rating: 4.6, icon: Building2 },
  ];

  const products = [
    { id: 1, name: 'Heavy Excavator', price: 450000, seller: 'BuildTech Construction', stock: 15, category: 'Heavy Machinery', city: 'Riyadh', image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=300' },
    { id: 2, name: 'Tower Crane', price: 680000, seller: 'Global Materials', stock: 8, category: 'Heavy Machinery', city: 'Jeddah', image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=300' },
    { id: 3, name: 'Concrete Mixer', price: 125000, seller: 'Heavy Equipment Co.', stock: 22, category: 'Heavy Machinery', city: 'Dammam', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300' },
    { id: 4, name: 'Welding Equipment', price: 85000, seller: 'BuildTech Construction', stock: 12, category: 'Heavy Machinery', city: 'Riyadh', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300' },
    { id: 5, name: 'Steel Bars', price: 850, seller: 'Global Materials', stock: 150, category: 'Building Materials', city: 'Riyadh', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300' },
    { id: 6, name: 'Safety Helmets', price: 1200, seller: 'Safety First Ltd.', stock: 45, category: 'Safety Equipment', city: 'Mecca', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300' },
    { id: 7, name: 'Power Tools', price: 5500, seller: 'Heavy Equipment Co.', stock: 30, category: 'Electrical & Plumbing', city: 'Jeddah', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300' },
    { id: 8, name: 'Cement Bags', price: 450, seller: 'BuildTech Construction', stock: 200, category: 'Building Materials', city: 'Riyadh', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300' },
  ];

  const liveRFQs = [
    { id: 1, title: '500 Tons of Reinforcing Steel', company: 'BuildTech Construction', location: 'Riyadh', deadline: '2 Days', quantity: 'Bulk', category: 'Building Materials' },
    { id: 2, title: '3 Heavy Excavators', company: 'Al-Noor Trading Co.', location: 'Jeddah', deadline: '5 Days', quantity: '3 Units', category: 'Heavy Machinery' },
    { id: 3, title: 'Safety Equipment Package', company: 'Qassim Heavy Metals', location: 'Dammam', deadline: '1 Day', quantity: '200+ Items', category: 'Safety Equipment' },
    { id: 4, title: 'Concrete Mixers & Pumps', company: 'Modern Contracting Ltd.', location: 'Riyadh', deadline: '3 Days', quantity: '5 Units', category: 'Heavy Machinery' },
    { id: 5, title: 'Electrical Wiring Materials', company: 'Global Materials', location: 'Mecca', deadline: '4 Days', quantity: 'Bulk', category: 'Electrical & Plumbing' },
    { id: 6, title: 'Tower Crane Rental (6 Months)', company: 'Riyadh Steel Works', location: 'Riyadh', deadline: '7 Days', quantity: '2 Units', category: 'Heavy Machinery' },
  ];

  const filteredProducts = products.filter(p => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchCity = activeCity === 'All' || p.city === activeCity;
    return matchSearch && matchCat && matchCity;
  });

  const filteredRFQs = liveRFQs.filter(r => {
    const matchSearch = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === 'All' || r.category === activeCategory;
    const matchCity = activeCity === 'All' || r.location === activeCity;
    return matchSearch && matchCat && matchCity;
  });

  const showProducts = activeType === 'All' || activeType === 'Products';
  const showRFQs = activeType === 'All' || activeType === 'RFQs';

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setQty(1);
    setStep(2);
  };

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

  // ── STEP 1: Exact B2BPlatform ─────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="min-h-screen bg-cream pb-28">

        {/* CC journey notice strip */}
        <div className="bg-teal-600 text-white text-center py-2 text-xs font-semibold tracking-wide">
          <ShieldCheck size={13} className="inline mr-1.5 mb-0.5" />
          Credit Control Journey — Step 1: Select a product to finance with Mezzanine Finance
        </div>

        {/* Top Header — identical to B2BPlatform */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between gap-2 md:gap-6">
              <h1 onClick={() => setCurrentView('b2b-platform')}
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap">
                Mezzanine
              </h1>
              <div className="hidden md:flex flex-1 max-w-2xl">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input type="text" placeholder="Search products, suppliers, materials..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <button onClick={() => setShowRFQModal(true)} className="px-6 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
                  <FileText size={18} /> Submit RFQ
                </button>
                {isLoggedIn ? (
                  <button onClick={logout} className="px-4 py-2 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center gap-2">
                    <LogOut size={18} />
                  </button>
                ) : (
                  <button onClick={() => setCurrentView('auth')} className="px-4 py-2 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center gap-2">
                    <LogIn size={18} />
                  </button>
                )}
                <button onClick={() => setCurrentView('crm-dashboard')} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                  <LayoutDashboard size={20} className="text-slate-600" />
                </button>
                <button onClick={() => setCurrentView('investor-report')} className="flex items-center gap-2 px-3 py-2 bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 rounded-xl font-medium text-sm transition-all">
                  <TrendingUp size={16} /><span className="hidden lg:inline whitespace-nowrap">AI Growth Engine</span>
                </button>
                <button onClick={() => setCurrentView('admin-risk-portal')} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                  <Lock size={16} className="text-slate-400 hover:text-slate-600" />
                </button>
                {isLoggedIn && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white">
                    <User size={20} />
                  </div>
                )}
              </div>
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu size={24} className="text-slate-600" />
              </button>
            </div>
            <div className="md:hidden mt-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm" />
              </div>
            </div>
          </div>
          {showMobileMenu && (
            <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
              <button onClick={() => { setShowRFQModal(true); setShowMobileMenu(false); }} className="w-full py-2 px-4 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                <FileText size={18} /> Submit RFQ
              </button>
              {isLoggedIn ? (
                <button onClick={() => { logout(); setShowMobileMenu(false); }} className="w-full py-2 px-4 border-2 border-teal-500 text-teal-500 rounded-xl font-medium flex items-center justify-center gap-2">
                  <LogOut size={18} /> Log Out
                </button>
              ) : (
                <button onClick={() => { setCurrentView('auth'); setShowMobileMenu(false); }} className="w-full py-2 px-4 border-2 border-teal-500 text-teal-500 rounded-xl font-medium flex items-center justify-center gap-2">
                  <LogIn size={18} /> Login
                </button>
              )}
              <button onClick={() => { setCurrentView('crm-dashboard'); setShowMobileMenu(false); }} className="w-full py-2 px-4 bg-gray-100 text-slate-700 rounded-xl font-medium flex items-center justify-center gap-2">
                <LayoutDashboard size={18} /> CRM Dashboard
              </button>
            </div>
          )}
        </nav>

        {/* Filters Bar — identical */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 space-y-2">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-teal-500 text-white' : 'bg-white/50 hover:bg-teal-100 text-slate-700'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {cities.map(c => (
                  <button key={c} onClick={() => setActiveCity(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCity === c ? 'bg-slate-700 text-white' : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-100'}`}>
                    {c === 'All' ? 'All Cities' : c}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 ml-auto">
                {opportunityTypes.map(t => (
                  <button key={t} onClick={() => setActiveType(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeType === t ? 'bg-teal-600 text-white' : 'bg-white border border-teal-200 text-teal-600 hover:bg-teal-50'}`}>
                    {t === 'All' ? 'All Types' : t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content — identical to B2BPlatform */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">

          {/* Sukuk Banner */}
          <div onClick={() => setCurrentView('sukuk-portal')}
            className="relative mb-10 rounded-3xl overflow-hidden cursor-pointer group"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #1c1917 100%)' }}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
              <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="sk-grid-cc" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#f59e0b" strokeWidth="0.5" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#sk-grid-cc)" />
              </svg>
              {[[8,20],[92,15],[15,80],[88,75],[50,10],[50,90]].map(([x,y],i) => (
                <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/30" style={{left:`${x}%`,top:`${y}%`}} />
              ))}
            </div>
            <div className="relative px-5 md:px-10 py-6 md:py-10 flex flex-col md:flex-row items-center gap-5 md:gap-10">
              <div className="flex-shrink-0 flex md:flex-col items-center gap-3">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-900/50 group-hover:scale-110 transition-transform duration-500">
                  <Star size={26} className="text-white fill-white md:hidden" />
                  <Star size={32} className="text-white fill-white hidden md:block" />
                </div>
                <span className="text-[9px] font-bold border border-amber-500/40 bg-amber-500/10 text-amber-400 rounded-full px-3 py-1 uppercase tracking-widest whitespace-nowrap">
                  طرح خاص · Private Offering
                </span>
              </div>
              <div className="flex-1 text-center md:text-right">
                <p className="text-[10px] font-semibold text-amber-500/80 uppercase tracking-widest mb-1.5 hidden md:block">Mezzanine Investment · للمستثمرين المؤهلين والمؤسسيين</p>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-2 leading-tight" dir="rtl">
                  استثمر في{' '}<span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">صكوك ميزانين</span>
                </h2>
                <p className="hidden md:block text-sm text-slate-400 leading-relaxed max-w-xl mx-auto md:mx-0" dir="rtl">
                  صكوك متوافقة مع الشريعة الإسلامية، مدعومة بمحفظة متنوعة من مستحقات التجارة B2B في المملكة العربية السعودية.
                </p>
                <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5 justify-center md:justify-start md:flex-wrap">
                  {[
                    { label: 'عائد سنوي', value: '8.5%', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
                    { label: 'إجمالي الإصدارات', value: '112M SAR', color: 'text-teal-400 border-teal-500/30 bg-teal-500/10' },
                    { label: 'مجمعات نشطة', value: '3 Pools', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
                    { label: 'تصنيف ائتماني', value: 'A-', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className={`flex-shrink-0 border rounded-xl px-3 py-1.5 text-center ${color}`}>
                      <p className="text-[8px] opacity-70 mb-0.5">{label}</p>
                      <p className="text-xs font-bold leading-tight">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
                <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2">
                  <Star size={16} className="fill-white" /> اكتشف الصكوك <ArrowRight size={16} />
                </button>
                <p className="text-[9px] text-slate-600 text-center">للمستثمرين المؤهلين فقط · Qualified Investors Only</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          </div>

          {/* Featured Companies */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">Top Suppliers & Contractors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {companies.map(company => {
                const Icon = company.icon;
                return (
                  <div key={company.name} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm p-3 md:p-4 hover:shadow-md transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mb-2 md:mb-3">
                      <Icon className="text-white" size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 text-sm md:text-base">{company.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs md:text-sm font-medium text-slate-700">{company.rating}</span>
                    </div>
                    <button onClick={() => setCurrentView('company-profile')} className="text-xs md:text-sm text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1">
                      View Profile <ArrowRight size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Products Grid — Buy button advances journey */}
          {showProducts && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">
                Trending Products {filteredProducts.length < products.length && <span className="text-base text-slate-400 font-normal">({filteredProducts.length} results)</span>}
              </h2>
              {filteredProducts.length === 0 ? (
                <p className="text-slate-400 text-sm py-8 text-center">No products match your filters.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all">
                      <div className="h-40 bg-lightgray overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-slate-900 text-sm mb-1 truncate">{product.name}</h3>
                        <p className="text-xs text-slate-500 mb-2 truncate">Sold by: {product.seller}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-xs text-slate-600">Qty: {product.stock} Units</span>
                        </div>
                        <p className="text-base md:text-lg font-bold text-teal-500 mb-3">SAR {product.price.toLocaleString()}</p>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <button onClick={() => handleBuy(product)}
                              className="flex-1 py-2.5 md:py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg text-xs font-medium hover:shadow-md transition-all min-h-[44px] md:min-h-0">
                              Buy
                            </button>
                            <button onClick={() => setShowRFQModal(true)}
                              className="flex-1 py-2.5 md:py-2 border border-teal-500 text-teal-500 rounded-lg text-xs font-medium hover:bg-teal-50 transition-all min-h-[44px] md:min-h-0">
                              RFQ
                            </button>
                          </div>
                          <button onClick={() => setContactSeller(product)} className="w-full text-xs text-teal-500 hover:text-teal-600 font-medium py-1">
                            Contact Seller
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Live RFQs — identical */}
          {showRFQs && (
            <div className="mt-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    Live Public RFQs (Bidding Board) {filteredRFQs.length < liveRFQs.length && <span className="text-base text-slate-400 font-normal">({filteredRFQs.length} results)</span>}
                  </h2>
                  <p className="text-sm text-slate-600">Browse active requests from contractors and submit your quotes.</p>
                </div>
                <button className="text-teal-500 hover:text-teal-600 font-semibold text-sm mt-3 sm:mt-0 flex items-center gap-1">
                  View All RFQs <ArrowRight size={16} />
                </button>
              </div>
              {filteredRFQs.length === 0 ? (
                <p className="text-slate-400 text-sm py-8 text-center">No RFQs match your filters.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRFQs.map(rfq => (
                    <div key={rfq.id} className="bg-white/90 border-l-4 border-teal-500 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">{rfq.title}</h3>
                      <p className="text-xs text-slate-500 mb-4">Requested by: <span className="font-semibold text-slate-700">{rfq.company}</span></p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin size={14} className="text-teal-500 flex-shrink-0" />
                          <span className="text-xs">Location: <span className="font-medium">{rfq.location}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} className="text-teal-500 flex-shrink-0" />
                          <span className="text-xs">Deadline: <span className="font-medium">Closes in {rfq.deadline}</span></span>
                        </div>
                      </div>
                      <button className="w-full py-2.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                        Submit Quote
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer — identical */}
        <footer className="bg-slate-900 text-white mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-teal-400 mb-2 md:mb-3">Mezzanine</h3>
                <p className="text-gray-400 text-sm">Elevating Business Financial Intelligence.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 md:mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><button className="hover:text-teal-400 transition-all">Marketplace</button></li>
                  <li><button className="hover:text-teal-400 transition-all">Suppliers</button></li>
                  <li><button onClick={() => setShowRFQModal(true)} className="hover:text-teal-400 transition-all">Post RFQ</button></li>
                  <li><button onClick={() => setCurrentView('crm-dashboard')} className="hover:text-teal-400 transition-all">CRM Login</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2 md:mb-3">Contact Info</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Riyadh, Saudi Arabia</li>
                  <li>info@mezzanine.sa</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-4 md:pt-6 text-center text-xs md:text-sm text-gray-500">
              © 2026 Mezzanine B2B Platform. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Contact Seller Modal — identical */}
        {contactSeller && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900">Contact Seller</h3>
                <button onClick={() => setContactSeller(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="flex items-center gap-3 mb-5 p-3 bg-teal-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold">{contactSeller.seller[0]}</div>
                <div>
                  <p className="font-semibold text-slate-900">{contactSeller.seller}</p>
                  <p className="text-xs text-slate-500">Regarding: {contactSeller.name}</p>
                </div>
              </div>
              <div className="space-y-3">
                <textarea rows={3} placeholder="Write your message..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none text-sm resize-none" />
                <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none text-sm" />
                <input type="text" placeholder="Your phone / email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none text-sm" />
                <button onClick={() => { alert('Message sent!'); setContactSeller(null); }} className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium">Send Message</button>
              </div>
            </div>
          </div>
        )}

        {/* RFQ Modal — identical */}
        {showRFQModal && (
          <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
            <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 md:p-6 border-b md:border-0 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Request a Custom Quote</h3>
                  <button onClick={() => setShowRFQModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
                </div>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Product/Material Needed</label>
                  <input type="text" placeholder="e.g., Heavy Excavator" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                    <input type="number" placeholder="1" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Required Date</label>
                    <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Location</label>
                  <input type="text" placeholder="Riyadh, Saudi Arabia" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium">Send Request</button>
              </div>
            </div>
          </div>
        )}

        <ProgressBar step={step} onStepClick={setStep} />
      </div>
    );
  }

  // ── STEPS 2–7 ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-28">
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <button onClick={() => setStep(s => Math.max(1, s - 1))} className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4">

        {/* ── STEP 2: Checkout ─────────────────────────────────── */}
        {step === 2 && selectedProduct && (
          <div className={card}>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Checkout</h2>
            <p className="text-slate-500 text-sm mb-6">Review your order before submitting a financing request.</p>

            <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-2xl p-5 mb-5 flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-semibold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">{selectedProduct.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedProduct.name}</h3>
                <p className="text-sm text-slate-500">{selectedProduct.seller} · {selectedProduct.city}</p>
                <p className="text-teal-600 font-bold mt-1">{fmt(selectedProduct.price)} / unit</p>
              </div>
            </div>

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

            <div className="mb-4">
              <p className="text-sm font-bold text-slate-700 mb-3">Delivery Options</p>
              <div className="space-y-2">
                {DELIVERY_OPTIONS.map(opt => (
                  <label key={opt.id} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${delivery === opt.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-300 bg-white'}`}>
                    <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id} onChange={e => setDelivery(e.target.value)} className="w-4 h-4 text-teal-500" />
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
              <p className="text-xs text-blue-700 font-medium">This purchase will be financed through <strong>Mezzanine Finance</strong>. Complete a financing request in the next step.</p>
            </div>

            <div className="flex gap-3">
              <button
                disabled
                title="Buy Now is not available — this product requires Mezzanine Finance"
                className="flex-1 py-3.5 rounded-xl font-bold text-sm border-2 border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed flex items-center justify-center gap-2"
              >
                Buy Now
                <span className="text-[10px] font-medium bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Requires financing</span>
              </button>
              <button onClick={goNext} className="flex-1 py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Landmark size={18} /> Finance with Mezzanine
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Financing Request ─────────────────────────── */}
        {step === 3 && (
          <div className={card}>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Financing Request</h2>
            <p className="text-slate-500 text-sm mb-6">Submit your financing details. Mezzanine Finance will use your credit report to evaluate this request.</p>

            {selectedProduct && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3 mb-5">
                <FileText className="text-teal-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Linked Product</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedProduct.name} — {fmt(finalTotal)}</p>
                </div>
              </div>
            )}

            <div className={`rounded-2xl border-2 p-5 mb-5 transition-all ${creditReportConsent ? 'border-teal-500 bg-teal-50' : 'border-amber-300 bg-amber-50'}`}>
              <div className="flex items-start gap-3 mb-3">
                <ShieldCheck size={18} className={creditReportConsent ? 'text-teal-600' : 'text-amber-500'} />
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

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={15} className="text-amber-500" />
                <p className="text-sm font-bold text-slate-900">شروط الالتزام خلال فترة التمويل</p>
              </div>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
                <Lock size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700">These obligations are <strong>binding conditions</strong>. Non-compliance is automatically detected and will impact your credit limit.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {COVENANTS.map(({ icon: Icon, ar, en, desc }) => (
                  <div key={en} className="rounded-2xl border-2 border-teal-400 bg-gradient-to-b from-teal-50 to-teal-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow"><Icon size={14} className="text-white" /></div>
                      <span className="text-[9px] font-bold text-teal-600 bg-teal-100 border border-teal-300 rounded-full px-2 py-0.5">Enforced</span>
                    </div>
                    <p className="text-xs font-bold text-teal-800 mb-1 leading-tight" dir="rtl">{ar}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

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

        {/* ── STEP 4: Assessment ──────────────────────────────────── */}
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
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center"><FileCheck size={18} className="text-white" /></div>
                  <div><p className="font-bold text-slate-900 text-sm">Profile Completion</p><p className="text-xs text-slate-500">Data & documents filled</p></div>
                </div>
                <div className="flex items-end gap-2 mb-3"><span className="text-5xl font-bold text-blue-500">75</span><span className="text-2xl font-bold text-blue-400 mb-1">%</span></div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4"><div className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: '75%' }} /></div>
                <div className="space-y-2">
                  {[{ label: 'Business Identity Verified', done: true }, { label: 'Organizational Structure', done: true }, { label: 'Products Listed', done: true }, { label: 'Regulatory Documents', done: true }, { label: 'Financial Statements', done: false }].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500' : 'bg-gray-200'}`}>{item.done && <Check size={10} className="text-white" />}</div>
                      <span className={`text-xs ${item.done ? 'text-slate-700' : 'text-slate-400'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center"><TrendingUp size={18} className="text-white" /></div>
                  <div><p className="font-bold text-slate-900 text-sm">Mezzanine Credit Score</p><p className="text-xs text-slate-500">Initial financing eligibility</p></div>
                </div>
                <div className="flex items-end gap-2 mb-1"><span className="text-5xl font-bold text-teal-500">68</span><span className="text-xl font-bold text-slate-400 mb-1">/ 100</span></div>
                <p className="text-xs text-amber-600 font-medium mb-3">Good — Eligible for Mezzanine Finance</p>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4"><div className="h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: '68%' }} /></div>
                <div className="space-y-2">
                  {[{ label: 'Business Verification', score: '20/20', color: 'text-emerald-600' }, { label: 'Organizational Structure', score: '18/20', color: 'text-emerald-600' }, { label: 'Product Portfolio', score: '15/20', color: 'text-amber-600' }, { label: 'Financial Documents', score: '10/20', color: 'text-red-400' }, { label: 'Market Presence', score: '5/20', color: 'text-red-400' }].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">{item.label}</span><span className={`text-xs font-semibold ${item.color}`}>{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <AlertCircle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">Complete your financial documents to increase your score. You can also enhance your score between disbursements in the next step.</p>
            </div>
            <button onClick={goNext} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Landmark size={18} /> Proceed to Credit Calculator
            </button>
          </div>
        )}

        {/* ── STEP 5: Credit Calculator ──────────────────────────── */}
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
                    <circle cx="88" cy="88" r="76" stroke="url(#cg)" strokeWidth="16" fill="none"
                      strokeDasharray={`${2 * Math.PI * 76}`}
                      strokeDashoffset={`${2 * Math.PI * 76 * (1 - SCORES.overall / 100)}`}
                      strokeLinecap="round" />
                    <defs><linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6bc4cc" /><stop offset="100%" stopColor="#4a9aa0" /></linearGradient></defs>
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
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className={`rounded-2xl border-2 overflow-hidden ${showTerms ? 'border-teal-500' : 'border-slate-200'}`}>
                <button onClick={() => setShowTerms(p => !p)} className={`w-full flex items-center justify-between gap-3 p-4 ${showTerms ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-slate-50 hover:bg-teal-50/40'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${showTerms ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-white shadow-sm'}`}><Settings2 size={15} className={showTerms ? 'text-white' : 'text-teal-500'} /></div>
                    <div dir="rtl" className="text-right"><p className={`text-sm font-bold ${showTerms ? 'text-teal-700' : 'text-slate-900'}`}>شروط التحكم بالتمويل</p><p className="text-[10px] text-slate-400">Financing Control Terms</p></div>
                  </div>
                  {showTerms ? <ChevronDown size={15} className="text-teal-500 rotate-180" /> : <ChevronRight size={15} className="text-slate-400" />}
                </button>
                {showTerms && (
                  <div className="px-4 pb-4 pt-3 bg-white space-y-2">
                    {[{ key: 'requireApproval', ar: 'دفعة مقدمة', en: 'Require manager approval' }, { key: 'notifyEach', ar: 'التحصيل التبادلي', en: 'Notify on each disbursement' }, { key: 'freezeOnMiss', ar: 'استقطاع من حساب الطوارئ', en: 'Freeze on missed payment' }].map(({ key, ar, en }) => (
                      <button key={key} onClick={() => setTerms(p => ({ ...p, [key]: !p[key] }))}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-all ${terms[key] ? 'border-teal-400 bg-teal-50' : 'border-slate-100 bg-slate-50 hover:border-teal-200'}`}>
                        <div dir="rtl" className="text-right"><p className={`text-xs font-semibold ${terms[key] ? 'text-teal-700' : 'text-slate-800'}`}>{ar}</p><p className="text-[10px] text-slate-400">{en}</p></div>
                        {terms[key] ? <CheckSquare size={15} className="text-teal-500 flex-shrink-0" /> : <Square size={15} className="text-slate-300 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className={`rounded-2xl border-2 overflow-hidden ${showInstallments ? 'border-teal-500' : 'border-slate-200'}`}>
                <button onClick={() => setShowInstallments(p => !p)} className={`w-full flex items-center justify-between gap-3 p-4 ${showInstallments ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-slate-50 hover:bg-teal-50/40'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${showInstallments ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-white shadow-sm'}`}><Layers size={15} className={showInstallments ? 'text-white' : 'text-teal-500'} /></div>
                    <div dir="rtl" className="text-right"><p className={`text-sm font-bold ${showInstallments ? 'text-teal-700' : 'text-slate-900'}`}>الصرف على دفعات</p><p className="text-[10px] text-slate-400">Disbursement in Installments</p></div>
                  </div>
                  {showInstallments ? <ChevronDown size={15} className="text-teal-500 rotate-180" /> : <ChevronRight size={15} className="text-slate-400" />}
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
                              <div><p className="text-[10px] font-bold text-teal-700">{inst.label}</p><p className="text-[9px] text-slate-400">{inst.date}</p></div>
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
                                      <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center border ${a.done ? 'bg-purple-500 border-purple-500' : 'border-slate-300'}`}>{a.done && <Check size={8} className="text-white" />}</div>
                                      {a.label}
                                    </button>
                                  ))}
                                </div>
                                {enhance[i].every(a => a.done) && (
                                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-purple-700 font-semibold"><CheckCircle size={11} className="text-purple-500" /> Score enhanced!</div>
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

        {/* ── STEP 6: Financing Payments (Disbursements + Repayments) ─ */}
        {step === 6 && (
          <PageContent
            disb={disb}
            onToggle={toggleDisb}
            footer={
              <button onClick={goNext} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <FileSignature size={18} /> View Digital Contract
              </button>
            }
          />
        )}

        {/* ── STEP 7: Contract ────────────────────────────────────── */}
        {step === 7 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 bg-teal-600 text-white px-5 py-3 rounded-2xl shadow-lg">
              <CheckCircle size={18} className="flex-shrink-0" />
              <p className="text-sm font-semibold">Credit Control Journey — Active Contract</p>
              <span className="ml-auto text-xs text-teal-200 hidden sm:block">Generated from your financing request</span>
            </div>
            <div className="flex items-center justify-between">
              <div><h2 className="text-2xl font-bold text-slate-900">Active Contracts</h2><p className="text-sm text-slate-500 mt-0.5">1 active contract from this journey</p></div>
            </div>
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
                      <Building2 size={13} />{CONTRACT.financier}
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
                  {[{ label: 'Issue Date', value: CONTRACT.issueDate }, { label: 'Expiry Date', value: CONTRACT.expiryDate }, { label: 'Pages', value: `${CONTRACT.pages} pgs` }, { label: 'Profit Rate', value: CONTRACT.profitRate }].map(m => (
                    <div key={m.label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 mb-0.5">{m.label}</p><p className="text-sm font-bold text-slate-800">{m.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 rounded-xl p-4 mb-5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Contract Terms</p>
                  <div className="grid grid-cols-2 gap-x-8">
                    {[{ label: 'Financing Type', value: 'Murabaha (Cost-plus)' }, { label: 'Repayment Source', value: CONTRACT.repayment }, { label: 'Duration', value: CONTRACT.duration }, { label: 'Collateral', value: CONTRACT.collateral }, { label: 'Borrower', value: CONTRACT.borrower }, { label: 'Governing Law', value: CONTRACT.law }].map(t => (
                      <div key={t.label} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
                        <span className="text-xs text-slate-500">{t.label}</span><span className="text-xs font-semibold text-slate-800">{t.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-all"><FileText size={14} /> Preview</button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all">
                    <Download size={15} /> Download Contract PDF
                  </button>
                </div>
              </div>
            </div>
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
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all"><Download size={14} /></button>
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
