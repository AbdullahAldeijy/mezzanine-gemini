import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield, CheckCircle, Building2, Calendar, FileCheck,
  Check, Users, Plus, ArrowLeft, Upload, FileText,
  Activity, TrendingUp, CreditCard, Briefcase,
  BarChart2, ClipboardList, ChevronRight, Package,
  Landmark, Edit2, X, Image, Trash2, ImageIcon,
} from 'lucide-react';

const STEPS = [
  { label: 'KYB' },
  { label: 'Verified' },
  { label: 'Products' },
  { label: 'Company Profile' },
  { label: 'Team & Access' },
  { label: 'Dashboard' },
  { label: 'Credit Report' },
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

const UploadRow = ({ label, status, onUpload }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <FileText size={15} className="text-teal-500 flex-shrink-0" />
      <span className="text-sm text-slate-700">{label}</span>
    </div>
    {status === 'uploaded' ? (
      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><Check size={12} /> Uploaded</span>
    ) : (
      <button onClick={onUpload} className="flex items-center gap-1 px-3 py-1 border border-teal-400 text-teal-600 rounded-lg text-xs hover:bg-teal-50 transition-all">
        <Upload size={12} /> Upload
      </button>
    )}
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
    {children}
  </div>
);

const inputCls = 'w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm transition-all';
const selectCls = `${inputCls} bg-white`;

const modules = [
  { id: 'orders', name: 'Orders' },
  { id: 'financing', name: 'Financing' },
  { id: 'catalog', name: 'Products' },
  { id: 'billing', name: 'Billing' },
  { id: 'team', name: 'Team Mgmt' },
];

const initRoles = [
  { id: 1, name: 'Finance Admin', color: 'emerald', permissions: { orders: { view: true, edit: true, approve: true }, financing: { view: true, edit: true, approve: true }, catalog: { view: true, edit: false, approve: false }, billing: { view: true, edit: true, approve: true }, team: { view: true, edit: false, approve: false } } },
  { id: 2, name: 'Procurement Officer', color: 'blue', permissions: { orders: { view: true, edit: true, approve: false }, financing: { view: true, edit: true, approve: false }, catalog: { view: true, edit: true, approve: false }, billing: { view: false, edit: false, approve: false }, team: { view: false, edit: false, approve: false } } },
  { id: 3, name: 'Sales Rep', color: 'purple', permissions: { orders: { view: true, edit: true, approve: false }, financing: { view: false, edit: false, approve: false }, catalog: { view: true, edit: false, approve: false }, billing: { view: false, edit: false, approve: false }, team: { view: false, edit: false, approve: false } } },
];

const initTeam = [
  { id: 1, name: 'Ahmed Al-Rashid', email: 'ahmed@buildtech.sa', roleId: 1, status: 'Active' },
  { id: 2, name: 'Fatima Hassan', email: 'fatima@buildtech.sa', roleId: 2, status: 'Active' },
  { id: 3, name: 'Mohammed Ali', email: 'mohammed@buildtech.sa', roleId: 3, status: 'Active' },
  { id: 4, name: 'Sara Abdullah', email: 'sara@buildtech.sa', roleId: 2, status: 'Pending' },
];

const departments = [
  { name: 'Executive Management', color: 'from-teal-400 to-teal-600', note: 'CEO: Ahmed Al-Rashid' },
  { name: 'Finance', color: 'from-blue-400 to-blue-600' },
  { name: 'HR', color: 'from-purple-400 to-purple-600' },
  { name: 'Operations', color: 'from-orange-400 to-orange-600' },
  { name: 'IT', color: 'from-green-400 to-green-600' },
  { name: 'Sales', color: 'from-pink-400 to-pink-600' },
];

const productCategories = ['Heavy Machinery', 'Building Materials', 'Safety Equipment', 'Electrical & Plumbing', 'Chemicals', 'Raw Materials', 'Logistics Services', 'Other'];

export const JointOperation = () => {
  const { setCurrentView } = useApp();
  const [step, setStep] = useState(1);
  const [nationalId, setNationalId] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // ── Step 3: Products ────────────────────────────────────────────────────
  const [productList, setProductList] = useState([
    { id: 1, name: 'Polyethylene', category: 'Raw Materials', price: '9,375', unit: 'ton', stock: '500', description: 'High-density polyethylene for industrial use', image: null },
    { id: 2, name: 'Specialized Chemicals', category: 'Chemicals', price: '18,750', unit: 'unit', stock: '200', description: 'Industrial-grade specialty chemicals', image: null },
    { id: 3, name: 'Industrial Equipment', category: 'Heavy Machinery', price: '56,250', unit: 'unit', stock: '50', description: 'Heavy-duty construction equipment', image: null },
  ]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productDraft, setProductDraft] = useState({ name: '', category: 'Building Materials', price: '', unit: 'unit', stock: '', description: '' });
  const [productImagePreview, setProductImagePreview] = useState(null);
  const productImageRef = useRef();

  // ── Step 4: Company Profile ─────────────────────────────────────────────
  const [profileTab, setProfileTab] = useState(0);
  const [regulatoryDocs, setRegulatoryDocs] = useState([
    { label: 'Commercial Registration (CR)', status: 'uploaded' },
    { label: 'Business Licenses', status: 'pending' },
    { label: 'Zakat & Tax Certificate', status: 'uploaded' },
    { label: 'National Address', status: 'uploaded' },
    { label: 'Core Contracts', status: 'pending' },
    { label: 'Other Regulatory Documents', status: 'pending' },
  ]);

  const [customerList, setCustomerList] = useState([
    { id: 1, name: 'Riyadh Development Co.', value: '3,200,000', contact: 'Ali Hassan', status: 'Active' },
    { id: 2, name: 'Al-Noor Contracting', value: '1,800,000', contact: 'Omar Saleh', status: 'Active' },
    { id: 3, name: 'Gulf Infrastructure LLC', value: '2,500,000', contact: 'Maha Al-Amin', status: 'Active' },
  ]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerDraft, setCustomerDraft] = useState({ name: '', value: '', contact: '', status: 'Active' });

  const [projectList, setProjectList] = useState([
    { id: 1, name: 'KAFD Tower Block D', client: 'Riyadh Development', value: 'SAR 5.1M', progress: 68, status: 'On Track' },
    { id: 2, name: 'Riyadh Metro Extension', client: 'Riyadh Municipality', value: 'SAR 2.8M', progress: 45, status: 'On Track' },
    { id: 3, name: 'Jeddah Waterfront P2', client: 'Gulf Infrastructure', value: 'SAR 4.2M', progress: 30, status: 'Delayed' },
  ]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectDraft, setProjectDraft] = useState({ name: '', client: '', value: '', progress: 50, status: 'On Track' });

  const [invoiceList, setInvoiceList] = useState([
    { id: 1, ref: 'INV-2024-089', amount: '485,000', status: 'Paid', date: '2024-11', fileName: null },
    { id: 2, ref: 'INV-2024-090', amount: '320,000', status: 'Pending', date: '2024-11', fileName: null },
    { id: 3, ref: 'INV-2024-091', amount: '750,000', status: 'Paid', date: '2024-10', fileName: null },
  ]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceDraft, setInvoiceDraft] = useState({ ref: '', amount: '', status: 'Pending', date: '' });
  const [invoiceFileName, setInvoiceFileName] = useState(null);
  const invoiceFileRef = useRef();

  const [cashFlows, setCashFlows] = useState([
    { period: 'Next 30 days', value: '850,000' },
    { period: 'Next 90 days', value: '2,100,000' },
    { period: 'Next 12 months', value: '8,400,000' },
  ]);

  // ── Step 5: Team & Access ───────────────────────────────────────────────
  const [teamTab, setTeamTab] = useState('departments');
  const [roles, setRoles] = useState(initRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [team] = useState(initTeam);

  const markUploaded = (label) =>
    setRegulatoryDocs(docs => docs.map(d => d.label === label ? { ...d, status: 'uploaded' } : d));

  const handlePermChange = (roleId, moduleId, action, val) => {
    setRoles(prev => prev.map(r => r.id === roleId
      ? { ...r, permissions: { ...r.permissions, [moduleId]: { ...r.permissions[moduleId], [action]: val } } }
      : r
    ));
    setSelectedRole(prev => prev && prev.id === roleId
      ? { ...prev, permissions: { ...prev.permissions, [moduleId]: { ...prev.permissions[moduleId], [action]: val } } }
      : prev
    );
  };

  const goNext = () => {
    if (step < STEPS.length) setStep(s => s + 1);
    else setCurrentView('b2b-platform');
  };

  const getRoleById = (id) => roles.find(r => r.id === id);

  const addProduct = () => {
    if (!productDraft.name || !productDraft.price) return;
    setProductList(prev => [...prev, { ...productDraft, id: Date.now(), image: productImagePreview }]);
    setProductDraft({ name: '', category: 'Building Materials', price: '', unit: 'unit', stock: '', description: '' });
    setProductImagePreview(null);
    setShowProductForm(false);
  };

  const removeProduct = (id) => setProductList(prev => prev.filter(p => p.id !== id));

  const handleProductImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProductImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const addCustomer = () => {
    if (!customerDraft.name) return;
    setCustomerList(prev => [...prev, { ...customerDraft, id: Date.now() }]);
    setCustomerDraft({ name: '', value: '', contact: '', status: 'Active' });
    setShowCustomerForm(false);
  };

  const addProject = () => {
    if (!projectDraft.name) return;
    setProjectList(prev => [...prev, { ...projectDraft, id: Date.now(), value: projectDraft.value ? `SAR ${projectDraft.value}` : '—' }]);
    setProjectDraft({ name: '', client: '', value: '', progress: 50, status: 'On Track' });
    setShowProjectForm(false);
  };

  const addInvoice = () => {
    if (!invoiceDraft.ref || !invoiceDraft.amount) return;
    setInvoiceList(prev => [...prev, { ...invoiceDraft, id: Date.now(), fileName: invoiceFileName }]);
    setInvoiceDraft({ ref: '', amount: '', status: 'Pending', date: '' });
    setInvoiceFileName(null);
    setShowInvoiceForm(false);
  };

  const handleInvoiceFile = (e) => {
    const file = e.target.files[0];
    if (file) setInvoiceFileName(file.name);
  };

  const fmtSAR = (val) => {
    const n = parseInt(val?.toString().replace(/,/g, ''), 10);
    if (!n || isNaN(n)) return '—';
    if (n >= 1_000_000) return `SAR ${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `SAR ${(n / 1_000).toFixed(0)}K`;
    return `SAR ${n}`;
  };

  const totalRevenue = customerList.reduce((sum, c) => sum + (parseInt(c.value?.replace(/,/g, '') || 0)), 0);

  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-28">
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <button onClick={() => setCurrentView('b2b-platform')} className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Marketplace
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4">

        {/* ── STEP 1: KYB ─────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
              <div className="text-center mb-7">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Mezzanine</h1>
                <p className="text-xs text-slate-500 mb-4">B2B Construction Platform</p>
                <div className="flex justify-center gap-1 bg-gray-100 p-1 rounded-xl">
                  {['Company Login', 'Employee Login', 'Register Company'].map((tab, i) => (
                    <button key={tab} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${i === 2 ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400'}`}>{tab}</button>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                  <Shield size={32} className="text-teal-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-1">Business Identity Verification</h2>
              <p className="text-sm text-slate-500 text-center mb-6">Secure KYB verification powered by Wathiq</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">National ID / Iqama Number</label>
                  <input type="text" value={nationalId} onChange={e => setNationalId(e.target.value)} placeholder="10-digit ID" maxLength={10} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Commercial Registration (CR) Number</label>
                  <input type="text" value={crNumber} onChange={e => setCrNumber(e.target.value)} placeholder="e.g., 1010123456" className={inputCls} />
                </div>
                <button onClick={goNext} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2">
                  <Shield size={20} /> Verify Business Identity
                </button>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
                <Shield size={13} className="text-emerald-500" />
                Secured by Wathiq API — Ministry of Commerce
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Identity Verified + JO Terms ────────────────────────── */}
        {step === 2 && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Mezzanine</h1>
                <p className="text-xs text-slate-500">B2B Construction Platform</p>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle size={48} className="text-emerald-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-1">Identity Verified Successfully</h2>
              <p className="text-sm text-slate-600 text-center mb-6">Business data retrieved from Ministry of Commerce</p>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 border border-slate-200 mb-4">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                    <Building2 size={24} className="text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Company Name</p>
                    <p className="text-base font-bold text-slate-900">BuildTech Construction Ltd.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><FileCheck size={16} className="text-slate-400" /><span className="text-sm text-slate-600">CR Number</span></div>
                    <span className="text-sm font-semibold text-slate-900">1010123456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-500" /><span className="text-sm text-slate-600">Status</span></div>
                    <span className="text-sm font-semibold text-emerald-600">Active & Compliant</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" /><span className="text-sm text-slate-600">Established</span></div>
                    <span className="text-sm font-semibold text-slate-900">2015</span>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-5 flex items-center justify-center gap-2">
                <Shield size={14} className="text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Verified via Wathiq API</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
                <p className="text-sm font-bold text-blue-800 text-right mb-2" dir="rtl">الموافقة على التشغيل المشترك</p>
                <p className="text-xs text-blue-700 leading-relaxed mb-3">
                  I agree to the joint operation terms and authorize Mezzanine to access and process my company data for platform services.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} className="w-4 h-4 accent-teal-500" />
                  <span className="text-xs text-blue-700 font-medium">I agree to the terms</span>
                </label>
              </div>
              <button onClick={goNext} className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                Accept & Continue
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Add Products ─────────────────────────────────────────── */}
        {step === 3 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-2xl font-bold text-slate-900">Add Your Products</h2>
              <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">{productList.length} listed</span>
            </div>
            <p className="text-slate-500 text-sm mb-6">List your company's products and services on the Mezzanine marketplace.</p>

            {/* Product grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {productList.map(p => (
                <div key={p.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all group relative">
                  <button onClick={() => removeProduct(p.id)} className="absolute top-2 right-2 w-6 h-6 bg-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-full items-center justify-center hidden group-hover:flex transition-all z-10">
                    <X size={12} />
                  </button>
                  <div className="w-full h-32 rounded-t-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    {p.image
                      ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      : <Package size={36} className="text-slate-400" />
                    }
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{p.category}</span>
                    <h4 className="font-bold text-slate-900 mt-1.5 mb-1">{p.name}</h4>
                    <p className="text-teal-600 font-bold text-sm">SAR {p.price}<span className="text-slate-400 font-normal">/{p.unit}</span></p>
                    <p className="text-xs text-gray-500 mt-0.5">Stock: {p.stock} {p.unit}s</p>
                    {p.description && <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">{p.description}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Add product form toggle */}
            {!showProductForm ? (
              <button onClick={() => setShowProductForm(true)} className="w-full py-3 border-2 border-dashed border-teal-400 text-teal-500 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center justify-center gap-2 mb-6">
                <Plus size={18} /> Add New Product
              </button>
            ) : (
              <div className="bg-slate-50 border border-teal-200 rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900">New Product</h4>
                  <button onClick={() => { setShowProductForm(false); setProductImagePreview(null); }} className="p-1.5 hover:bg-slate-200 rounded-lg transition-all">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>

                {/* Image upload area */}
                <div
                  onClick={() => productImageRef.current?.click()}
                  className="w-full h-36 rounded-xl border-2 border-dashed border-slate-300 hover:border-teal-400 bg-white flex flex-col items-center justify-center cursor-pointer mb-4 transition-all overflow-hidden"
                >
                  {productImagePreview
                    ? <img src={productImagePreview} alt="preview" className="w-full h-full object-cover" />
                    : (
                      <>
                        <ImageIcon size={28} className="text-slate-300 mb-2" />
                        <p className="text-xs text-slate-400 font-medium">Click to upload product image</p>
                        <p className="text-[10px] text-slate-300">PNG, JPG up to 5MB</p>
                      </>
                    )
                  }
                </div>
                <input ref={productImageRef} type="file" accept="image/*" className="hidden" onChange={handleProductImage} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <Field label="Product Name *">
                    <input value={productDraft.name} onChange={e => setProductDraft(d => ({ ...d, name: e.target.value }))} placeholder="e.g., Concrete Mixer" className={inputCls} />
                  </Field>
                  <Field label="Category *">
                    <select value={productDraft.category} onChange={e => setProductDraft(d => ({ ...d, category: e.target.value }))} className={selectCls}>
                      {productCategories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Price (SAR) *">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">SAR</span>
                      <input value={productDraft.price} onChange={e => setProductDraft(d => ({ ...d, price: e.target.value }))} placeholder="0.00" className={`${inputCls} pl-12`} />
                    </div>
                  </Field>
                  <Field label="Unit">
                    <select value={productDraft.unit} onChange={e => setProductDraft(d => ({ ...d, unit: e.target.value }))} className={selectCls}>
                      {['unit', 'ton', 'kg', 'm²', 'm³', 'liter', 'pcs', 'set'].map(u => <option key={u}>{u}</option>)}
                    </select>
                  </Field>
                  <Field label="Available Stock">
                    <input value={productDraft.stock} onChange={e => setProductDraft(d => ({ ...d, stock: e.target.value }))} placeholder="e.g., 500" className={inputCls} />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea value={productDraft.description} onChange={e => setProductDraft(d => ({ ...d, description: e.target.value }))} placeholder="Short product description…" rows={2} className={`${inputCls} resize-none`} />
                </Field>
                <div className="flex gap-2 mt-4">
                  <button onClick={addProduct} className="flex-1 py-2.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Check size={16} /> Add Product
                  </button>
                  <button onClick={() => { setShowProductForm(false); setProductImagePreview(null); }} className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <button onClick={goNext} className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
              Next Step
            </button>
          </div>
        )}

        {/* ── STEP 4: Company Profile ──────────────────────────────────────── */}
        {step === 4 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Company Profile</h2>
            <p className="text-slate-500 text-sm mb-5">Complete your profile to build trust and unlock financing.</p>

            <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
              {[{ icon: FileText, label: 'Regulatory Docs' }, { icon: Activity, label: 'Operational Data' }].map((t, i) => {
                const Icon = t.icon;
                return (
                  <button key={i} onClick={() => setProfileTab(i)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${profileTab === i ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Icon size={14} />{t.label}
                  </button>
                );
              })}
            </div>

            {/* Regulatory Docs */}
            {profileTab === 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">Regulatory Data & Attachments</p>
                {regulatoryDocs.map(doc => (
                  <UploadRow key={doc.label} label={doc.label} status={doc.status} onUpload={() => markUploaded(doc.label)} />
                ))}
              </div>
            )}

            {/* Enhanced Operational Data */}
            {profileTab === 1 && (
              <div className="space-y-5">

                {/* Live stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Active Customers', value: customerList.length, icon: Users, color: 'from-blue-400 to-blue-600' },
                    { label: 'Ongoing Projects', value: projectList.length, icon: Briefcase, color: 'from-teal-400 to-teal-600' },
                    { label: 'Total Invoices', value: invoiceList.length, icon: ClipboardList, color: 'from-purple-400 to-purple-600' },
                    { label: 'Revenue (total)', value: fmtSAR(totalRevenue), icon: TrendingUp, color: 'from-emerald-400 to-emerald-600' },
                  ].map(stat => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                          <Icon size={18} className="text-white" />
                        </div>
                        <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* ── Customers ── */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Customers</p>
                    <button onClick={() => setShowCustomerForm(v => !v)} className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-600 rounded-lg text-xs font-semibold hover:bg-teal-100 transition-all">
                      <Plus size={13} /> Add Customer
                    </button>
                  </div>

                  {showCustomerForm && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-teal-100 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <Field label="Company Name *">
                          <input value={customerDraft.name} onChange={e => setCustomerDraft(d => ({ ...d, name: e.target.value }))} placeholder="e.g., Al-Rashid Contracting" className={inputCls} />
                        </Field>
                        <Field label="Contract Value (SAR)">
                          <input value={customerDraft.value} onChange={e => setCustomerDraft(d => ({ ...d, value: e.target.value }))} placeholder="e.g., 1,500,000" className={inputCls} />
                        </Field>
                        <Field label="Primary Contact">
                          <input value={customerDraft.contact} onChange={e => setCustomerDraft(d => ({ ...d, contact: e.target.value }))} placeholder="Contact person name" className={inputCls} />
                        </Field>
                        <Field label="Status">
                          <select value={customerDraft.status} onChange={e => setCustomerDraft(d => ({ ...d, status: e.target.value }))} className={selectCls}>
                            <option>Active</option><option>Inactive</option><option>Prospect</option>
                          </select>
                        </Field>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={addCustomer} className="px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                          <Check size={13} /> Add Customer
                        </button>
                        <button onClick={() => setShowCustomerForm(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100 transition-all">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {customerList.map(c => (
                    <div key={c.id} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <Building2 size={14} className="text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                          {c.contact && <p className="text-xs text-slate-400">{c.contact}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">{fmtSAR(c.value)}</p>
                          <span className={`text-xs font-medium ${c.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>{c.status}</span>
                        </div>
                        <button onClick={() => setCustomerList(prev => prev.filter(x => x.id !== c.id))} className="p-1.5 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={13} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Projects ── */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Projects</p>
                    <button onClick={() => setShowProjectForm(v => !v)} className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-600 rounded-lg text-xs font-semibold hover:bg-teal-100 transition-all">
                      <Plus size={13} /> Add Project
                    </button>
                  </div>

                  {showProjectForm && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-teal-100 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <Field label="Project Name *">
                          <input value={projectDraft.name} onChange={e => setProjectDraft(d => ({ ...d, name: e.target.value }))} placeholder="e.g., Northern Ring Road" className={inputCls} />
                        </Field>
                        <Field label="Client">
                          <input value={projectDraft.client} onChange={e => setProjectDraft(d => ({ ...d, client: e.target.value }))} placeholder="Client company name" className={inputCls} />
                        </Field>
                        <Field label="Project Value (SAR)">
                          <input value={projectDraft.value} onChange={e => setProjectDraft(d => ({ ...d, value: e.target.value }))} placeholder="e.g., 3,500,000" className={inputCls} />
                        </Field>
                        <Field label="Status">
                          <select value={projectDraft.status} onChange={e => setProjectDraft(d => ({ ...d, status: e.target.value }))} className={selectCls}>
                            <option>On Track</option><option>Delayed</option><option>At Risk</option><option>Completed</option>
                          </select>
                        </Field>
                      </div>
                      <Field label={`Progress — ${projectDraft.progress}%`}>
                        <input type="range" min={0} max={100} value={projectDraft.progress} onChange={e => setProjectDraft(d => ({ ...d, progress: +e.target.value }))}
                          className="w-full accent-teal-500 mt-1" />
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: `${projectDraft.progress}%` }} />
                        </div>
                      </Field>
                      <div className="flex gap-2 mt-3">
                        <button onClick={addProject} className="px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                          <Check size={13} /> Add Project
                        </button>
                        <button onClick={() => setShowProjectForm(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100 transition-all">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {projectList.map(p => (
                    <div key={p.id} className="mb-4 last:mb-0 group">
                      <div className="flex justify-between items-start mb-1">
                        <div className="min-w-0 mr-2">
                          <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.client}{p.value && p.value !== '—' ? ` · ${p.value}` : ''}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : p.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span>
                          <button onClick={() => setProjectList(prev => prev.filter(x => x.id !== p.id))} className="p-1.5 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 size={13} className="text-red-400" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-xs text-teal-600 font-semibold flex-shrink-0">{p.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Invoices ── */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Invoices</p>
                    <div className="flex gap-2">
                      <button onClick={() => invoiceFileRef.current?.click()} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
                        <Upload size={13} /> Upload PDF
                      </button>
                      <button onClick={() => setShowInvoiceForm(v => !v)} className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-600 rounded-lg text-xs font-semibold hover:bg-teal-100 transition-all">
                        <Plus size={13} /> Add Manual
                      </button>
                    </div>
                  </div>
                  <input ref={invoiceFileRef} type="file" accept=".pdf,.jpg,.png,.xlsx" className="hidden" onChange={handleInvoiceFile} />

                  {showInvoiceForm && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-teal-100 mb-4">
                      {invoiceFileName && (
                        <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                          <FileText size={14} className="text-blue-500" />
                          <span className="text-xs font-medium text-blue-700 flex-1 truncate">{invoiceFileName}</span>
                          <button onClick={() => setInvoiceFileName(null)} className="text-blue-400 hover:text-blue-600"><X size={13} /></button>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <Field label="Invoice Number *">
                          <input value={invoiceDraft.ref} onChange={e => setInvoiceDraft(d => ({ ...d, ref: e.target.value }))} placeholder="e.g., INV-2024-092" className={inputCls} />
                        </Field>
                        <Field label="Amount (SAR) *">
                          <input value={invoiceDraft.amount} onChange={e => setInvoiceDraft(d => ({ ...d, amount: e.target.value }))} placeholder="e.g., 250,000" className={inputCls} />
                        </Field>
                        <Field label="Issue Date">
                          <input type="month" value={invoiceDraft.date} onChange={e => setInvoiceDraft(d => ({ ...d, date: e.target.value }))} className={inputCls} />
                        </Field>
                        <Field label="Status">
                          <select value={invoiceDraft.status} onChange={e => setInvoiceDraft(d => ({ ...d, status: e.target.value }))} className={selectCls}>
                            <option>Pending</option><option>Paid</option><option>Overdue</option><option>Draft</option>
                          </select>
                        </Field>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={addInvoice} className="px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                          <Check size={13} /> Save Invoice
                        </button>
                        <button onClick={() => setShowInvoiceForm(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100 transition-all">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {invoiceList.map(inv => (
                    <div key={inv.id} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 group">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${inv.fileName ? 'bg-blue-100' : 'bg-slate-100'}`}>
                          <FileText size={14} className={inv.fileName ? 'text-blue-500' : 'text-slate-400'} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{inv.ref}</p>
                          <p className="text-xs text-slate-400">{inv.date ? inv.date.replace('-', ' / ') : '—'}{inv.fileName && <span className="ml-1 text-blue-400">· {inv.fileName}</span>}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-900">{fmtSAR(inv.amount)}</p>
                          <span className={`text-xs font-medium ${inv.status === 'Paid' ? 'text-emerald-600' : inv.status === 'Overdue' ? 'text-red-500' : 'text-amber-600'}`}>{inv.status}</span>
                        </div>
                        <button onClick={() => setInvoiceList(prev => prev.filter(x => x.id !== inv.id))} className="p-1.5 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={13} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Cash Flows ── */}
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-xs font-semibold text-teal-700 mb-3 uppercase tracking-wider">Expected Cash Flows</p>
                  <div className="grid grid-cols-3 gap-3">
                    {cashFlows.map((cf, i) => (
                      <div key={i} className="bg-white rounded-xl p-3">
                        <p className="text-[10px] text-slate-500 mb-1.5">{cf.period}</p>
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-teal-600">SAR</span>
                          <input
                            value={cf.value}
                            onChange={e => setCashFlows(prev => prev.map((c, idx) => idx === i ? { ...c, value: e.target.value } : c))}
                            className="w-full pl-9 pr-2 py-1.5 text-xs font-bold text-teal-700 border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none bg-teal-50"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            <button onClick={goNext} className="w-full mt-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
              Next Step
            </button>
          </div>
        )}

        {/* ── STEP 5: Org Structure / Team & Access ───────────────────────── */}
        {step === 5 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Organizational Structure & Access</h2>
            <p className="text-slate-500 text-sm mb-5">Define your departments, team members, and their permissions.</p>
            <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
              {[
                { key: 'departments', label: 'Departments', icon: Building2 },
                { key: 'roles', label: 'Role Groups', icon: Shield },
                { key: 'members', label: 'Team Members', icon: Users },
              ].map(t => {
                const Icon = t.icon;
                return (
                  <button key={t.key} onClick={() => { setTeamTab(t.key); setSelectedRole(null); }}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all ${teamTab === t.key ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Icon size={13} />{t.label}
                  </button>
                );
              })}
            </div>

            {teamTab === 'departments' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departments.map(dept => (
                  <div key={dept.name} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center mb-3`}>
                      <Users className="text-white" size={22} />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{dept.name}</h4>
                    {dept.note && <p className="text-sm text-gray-500 mb-2">{dept.note}</p>}
                    <button className="text-teal-500 text-sm font-medium flex items-center gap-1 hover:text-teal-600">
                      <Plus size={14} /> Add Member
                    </button>
                  </div>
                ))}
              </div>
            )}

            {teamTab === 'roles' && !selectedRole && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-slate-500">Click a role to edit its permissions</p>
                  <button className="px-3 py-1.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1">
                    <Plus size={14} /> New Role
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roles.map(role => (
                    <div key={role.id} onClick={() => setSelectedRole(role)}
                      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-teal-200">
                      <div className={`w-12 h-12 rounded-xl bg-${role.color}-100 flex items-center justify-center mb-3`}>
                        <Shield size={22} className={`text-${role.color}-600`} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">{role.name}</h4>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(role.permissions).filter(([, p]) => Object.values(p).some(v => v)).slice(0, 3).map(([mod]) => (
                          <span key={mod} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{modules.find(m => m.id === mod)?.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {teamTab === 'roles' && selectedRole && (
              <div>
                <button onClick={() => setSelectedRole(null)} className="flex items-center gap-2 text-slate-500 hover:text-teal-500 mb-4 text-sm transition-all">
                  <ArrowLeft size={16} /> Back to Roles
                </button>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-${selectedRole.color}-100 flex items-center justify-center`}>
                      <Shield size={20} className={`text-${selectedRole.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{selectedRole.name}</h4>
                      <p className="text-xs text-slate-500">Permission Matrix</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[420px] border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b-2 border-slate-200">
                          <th className="text-left p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Module</th>
                          <th className="text-center p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">View</th>
                          <th className="text-center p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Edit</th>
                          <th className="text-center p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Approve</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modules.map(module => (
                          <tr key={module.id} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="p-3 text-sm font-medium text-slate-900">{module.name}</td>
                            {['view', 'edit', 'approve'].map(action => (
                              <td key={action} className="p-3 text-center">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input type="checkbox"
                                    checked={selectedRole.permissions[module.id]?.[action] || false}
                                    onChange={e => handlePermChange(selectedRole.id, module.id, action, e.target.checked)}
                                    className="sr-only peer" />
                                  <div className="relative w-10 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500" />
                                </label>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2">
                    <Check size={15} /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {teamTab === 'members' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-slate-500">{team.length} team members</p>
                  <button className="px-3 py-1.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1">
                    <Plus size={14} /> Invite Employee
                  </button>
                </div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px]">
                      <thead className="bg-slate-50 border-b-2 border-slate-200">
                        <tr>
                          <th className="text-left p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Name</th>
                          <th className="text-left p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Email</th>
                          <th className="text-left p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Role</th>
                          <th className="text-left p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                          <th className="text-center p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.map(m => {
                          const role = getRoleById(m.roleId);
                          return (
                            <tr key={m.id} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="p-4 text-sm font-medium text-slate-900">{m.name}</td>
                              <td className="p-4 text-sm text-slate-600">{m.email}</td>
                              <td className="p-4">
                                <span className={`px-3 py-1 bg-${role?.color}-100 text-${role?.color}-700 text-xs font-semibold rounded-full`}>{role?.name}</span>
                              </td>
                              <td className="p-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${m.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{m.status}</span>
                              </td>
                              <td className="p-4 text-center">
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-all"><Edit2 size={15} className="text-slate-400" /></button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            <button onClick={goNext} className="w-full mt-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
              Next Step
            </button>
          </div>
        )}

        {/* ── STEP 6: Company Profile Dashboard ───────────────────────────── */}
        {step === 6 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Company Profile Dashboard</h2>
            <p className="text-slate-500 text-sm mb-6">BuildTech Construction Ltd. — live overview of your business activity.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total Revenue', value: fmtSAR(totalRevenue) || 'SAR 14.2M', sub: '+18% YoY', icon: TrendingUp, color: 'from-emerald-400 to-emerald-600' },
                { label: 'Active Customers', value: customerList.length, sub: '3 new this month', icon: Users, color: 'from-blue-400 to-blue-600' },
                { label: 'Active Projects', value: projectList.length, sub: `${projectList.filter(p => p.status === 'On Track').length} on track`, icon: Briefcase, color: 'from-teal-400 to-teal-600' },
                { label: 'Invoices', value: invoiceList.length, sub: `${invoiceList.filter(i => i.status === 'Paid').length} paid`, icon: ClipboardList, color: 'from-purple-400 to-purple-600' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${s.color} flex items-center justify-center mb-3`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <p className="text-xl font-bold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="text-xs text-teal-600 font-medium mt-0.5">{s.sub}</p>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Top Customers</p>
                {customerList.slice(0, 4).map((c, idx) => (
                  <div key={c.id} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                    <span className="text-xs font-bold text-slate-400 w-5">#{idx + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Building2 size={14} className="text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                      {c.contact && <p className="text-xs text-slate-400">{c.contact}</p>}
                    </div>
                    <span className="text-sm font-bold text-slate-900 flex-shrink-0">{fmtSAR(c.value)}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Active Projects</p>
                {projectList.slice(0, 3).map(p => (
                  <div key={p.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="min-w-0 mr-2">
                        <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.client}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${p.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : p.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-teal-600 font-semibold">{p.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Monthly Revenue — 2024 (SAR)</p>
              <div className="flex items-end gap-1.5 h-24">
                {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-md bg-gradient-to-t from-teal-500 to-teal-300" style={{ height: `${h}%` }} />
                    <span className="text-[9px] text-slate-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={goNext} className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
              Generate Credit Report
            </button>
          </div>
        )}

        {/* ── STEP 7: Credit Summary Report ───────────────────────────────── */}
        {step === 7 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200">
                <CheckCircle size={42} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Profile Complete!</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Your company profile has been fully set up on Mezzanine. Below is a summary of everything collected — ready to share with Mezzanine Finance.</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center"><Shield size={18} className="text-teal-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Business Identity</h4>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><Check size={11} /> Verified via Wathiq</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-slate-500">Company</span><p className="font-semibold text-slate-800">BuildTech Construction Ltd.</p></div>
                  <div><span className="text-slate-500">CR Number</span><p className="font-semibold text-slate-800">1010123456</p></div>
                  <div><span className="text-slate-500">Status</span><p className="font-semibold text-emerald-700">Active & Compliant</p></div>
                  <div><span className="text-slate-500">Established</span><p className="font-semibold text-slate-800">2015</p></div>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center"><FileText size={18} className="text-blue-600" /></div>
                    <h4 className="font-bold text-slate-900 text-sm">Regulatory Documents</h4>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {regulatoryDocs.filter(d => d.status === 'uploaded').length}/{regulatoryDocs.length} uploaded
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {regulatoryDocs.map(doc => (
                    <div key={doc.label} className="flex items-center gap-1.5 text-xs">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center ${doc.status === 'uploaded' ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                        {doc.status === 'uploaded' && <Check size={8} className="text-white" />}
                      </div>
                      <span className={doc.status === 'uploaded' ? 'text-slate-700' : 'text-slate-400'}>{doc.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center"><Package size={18} className="text-purple-600" /></div>
                  <h4 className="font-bold text-slate-900 text-sm">Products Listed ({productList.length})</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {productList.map(p => (
                    <div key={p.id} className="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-xs">
                      <span className="font-semibold text-purple-800">{p.name}</span>
                      <span className="text-purple-600 ml-1">· SAR {p.price}/{p.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center"><Users size={18} className="text-orange-600" /></div>
                  <h4 className="font-bold text-slate-900 text-sm">Organizational Structure</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Departments', value: '6' },
                    { label: 'Team Members', value: `${team.length}` },
                    { label: 'Role Groups', value: `${roles.length}` },
                    { label: 'Active Users', value: `${team.filter(m => m.status === 'Active').length}` },
                  ].map(s => (
                    <div key={s.label} className="text-center bg-orange-50 rounded-lg p-3">
                      <p className="text-xl font-bold text-orange-700">{s.value}</p>
                      <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center"><BarChart2 size={18} className="text-emerald-600" /></div>
                  <h4 className="font-bold text-slate-900 text-sm">Business Activity Summary</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Revenue', value: fmtSAR(totalRevenue) || 'SAR 14.2M' },
                    { label: 'Active Customers', value: customerList.length },
                    { label: 'Active Projects', value: projectList.length },
                    { label: 'Invoices', value: invoiceList.length },
                    { label: 'Paid Invoices', value: invoiceList.filter(i => i.status === 'Paid').length },
                    { label: 'Cash Flow (90d)', value: `SAR ${cashFlows[1]?.value || '—'}` },
                  ].map(s => (
                    <div key={s.label} className="text-xs">
                      <span className="text-slate-500">{s.label}</span>
                      <p className="font-bold text-slate-900 text-sm">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-teal-500 to-teal-700 rounded-2xl p-6 text-white text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Landmark size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">You're Ready for Mezzanine Finance</h3>
              <p className="text-sm text-teal-100 mb-5 max-w-md mx-auto">
                Your complete company profile is now on Mezzanine. You can share it with Mezzanine Finance at any time to request credit, a financing facility, or a credit limit review.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 bg-white text-teal-700 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <CreditCard size={18} /> Request Credit from Mezzanine Finance
                </button>
                <button onClick={() => setCurrentView('b2b-platform')} className="px-6 py-3 bg-white/20 border border-white/30 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                  <ChevronRight size={18} /> Go to Marketplace
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      <ProgressBar step={step} onStepClick={setStep} />
    </div>
  );
};
