import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield, Smartphone, CheckCircle, Building2, Calendar, FileCheck,
  Check, Users, Plus, ArrowLeft,
} from 'lucide-react';
import { CompanyProfileTabs, CompanyScoreSummary } from './SetupWizard';
import { OperationsDashboard } from './OperationsDashboard';

// ─── Journey step definitions ─────────────────────────────────────────────
const STEPS = [
  { label: 'ID Verification' },
  { label: 'Nafath Auth' },
  { label: 'Verified' },
  { label: 'Org Structure' },
  { label: 'Company Page' },
  { label: 'Add Products' },
  { label: 'Profile Score' },
  { label: 'Operations' },
];

// ─── Shared header pieces ─────────────────────────────────────────────────
const AuthHeader = () => (
  <div className="text-center mb-7">
    <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
      Mezzanine
    </h1>
    <p className="text-xs text-slate-500 mb-4">B2B Construction Platform</p>
    <div className="flex justify-center gap-1 bg-gray-100 p-1 rounded-xl">
      {['Company Login', 'Employee Login', 'Register Company'].map((tab, i) => (
        <button
          key={tab}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            i === 2 ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

const SetupHeader = ({ wizardStep }) => {
  const labels = ['Create Organizational Structure', 'Create Company Page', 'Add Products', 'Company Profile Score'];
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-6">
        <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Mezzanine</span>{' '}
        Setup Wizard
      </h2>
      <div className="flex justify-center overflow-x-auto px-2">
        {labels.map((title, idx) => {
          const num = idx + 1;
          const done = wizardStep > num;
          const active = wizardStep === num;
          return (
            <div key={num} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-1.5 ${
                  done || active ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white' : 'bg-gray-200 text-slate-400'
                }`}>
                  {done ? <Check size={16} /> : num}
                </div>
                <p className="hidden sm:block text-[11px] font-medium text-slate-600 text-center max-w-[90px] leading-tight">{title}</p>
              </div>
              {idx < labels.length - 1 && (
                <div className={`w-10 md:w-20 h-1 mx-2 mb-6 rounded-full flex-shrink-0 ${
                  wizardStep > num ? 'bg-gradient-to-r from-teal-400 to-teal-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Progress bar ─────────────────────────────────────────────────────────
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
                title={s.label}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 hover:scale-110 ${
                  done    ? 'bg-teal-500 text-white' :
                  active  ? 'bg-teal-500 text-white ring-4 ring-teal-100' :
                            'bg-gray-200 text-gray-400 hover:bg-gray-300'
                }`}
              >
                {done ? <Check size={11} /> : num}
              </button>
              <span
                onClick={() => onStepClick(num)}
                className={`text-[8px] mt-0.5 text-center leading-tight hidden sm:block cursor-pointer max-w-[50px] ${
                  active ? 'text-teal-600 font-semibold' : 'text-gray-400 hover:text-slate-500'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-1 mx-1 rounded-full transition-all duration-300 ${
                step > num ? 'bg-teal-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────
export const JointOperation = () => {
  const { setCurrentView } = useApp();
  const [step, setStep] = useState(1);
  const [nationalId, setNationalId] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const goNext = () => {
    if (step < STEPS.length) setStep(s => s + 1);
    else setCurrentView('b2b-platform');
  };

  const wizardStep = step - 3;

  const mockProducts = [
    { name: 'Polyethylene', price: '$2,500/ton', stock: '500 tons' },
    { name: 'Specialized Chemicals', price: '$5,000/unit', stock: '200 units' },
    { name: 'Industrial Equipment', price: '$15,000', stock: '50 units' },
  ];

  const departments = [
    { name: 'Executive Management', color: 'from-teal-400 to-teal-600', note: 'CEO: John Smith' },
    { name: 'Finance', color: 'from-blue-400 to-blue-600' },
    { name: 'HR', color: 'from-purple-400 to-purple-600' },
    { name: 'Operations', color: 'from-orange-400 to-orange-600' },
    { name: 'IT', color: 'from-green-400 to-green-600' },
    { name: 'Sales', color: 'from-pink-400 to-pink-600' },
  ];

  // Step 8 — render the real OperationsDashboard with the progress bar on top
  if (step === 8) {
    return (
      <>
        <OperationsDashboard />
        <ProgressBar step={step} onStepClick={setStep} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4e8] pb-28">
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
        <button
          onClick={() => setCurrentView('b2b-platform')}
          className="flex items-center gap-2 text-teal-500 font-medium text-sm hover:gap-3 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Marketplace
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4">

        {/* ══ STEP 1: KYB Form ══════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <AuthHeader />
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                <Shield size={32} className="text-teal-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-1">Business Identity Verification</h2>
            <p className="text-sm text-slate-500 text-center mb-6">Secure KYB verification powered by Nafath & Wathiq</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">National ID / Iqama Number</label>
                <input type="text" value={nationalId} onChange={e => setNationalId(e.target.value)}
                  placeholder="10-digit ID" maxLength={10}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Commercial Registration (CR) Number</label>
                <input type="text" value={crNumber} onChange={e => setCrNumber(e.target.value)}
                  placeholder="e.g., 1010123456"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all" />
              </div>
              <button onClick={goNext}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2">
                <Shield size={20} /> Authenticate via Nafath
              </button>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
              <Shield size={13} className="text-emerald-500" />
              Secured by Saudi National Single Sign-On (Nafath)
            </div>
          </div>
        )}

        {/* ══ STEP 2: Nafath Waiting ════════════════════════════════════════ */}
        {step === 2 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <AuthHeader />
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
                <Smartphone size={40} className="text-emerald-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 text-center mb-2">Waiting for Nafath Approval</h2>
            <p className="text-sm text-slate-600 text-center mb-7">Please open the Nafath app and select:</p>
            <div className="flex justify-center mb-7">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                <span className="text-5xl font-bold text-white">93</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 mb-6 text-center">
              <p className="text-xs text-slate-600">Expires in <span className="font-bold text-slate-900">2:00</span> minutes</p>
            </div>
            <div className="flex justify-center">
              <button onClick={goNext} className="text-xs text-slate-400 hover:text-teal-500 underline transition-all">
                [Demo: Simulate Approval]
              </button>
            </div>
          </div>
        )}

        {/* ══ STEP 3: Identity Verified + JO Terms ═════════════════════════ */}
        {step === 3 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
            <AuthHeader />
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
              Continue to Setup Wizard
            </button>
          </div>
        )}

        {/* ══ STEPS 4-7: Setup Wizard ══════════════════════════════════════ */}
        {step >= 4 && step <= 7 && (
          <div>
            <SetupHeader wizardStep={wizardStep} />
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-8">

              {step === 4 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Create Organizational Structure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {departments.map(dept => (
                      <div key={dept.name} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center mb-3`}>
                          <Users className="text-white" size={22} />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">{dept.name}</h4>
                        {dept.note && <p className="text-sm text-gray-500 mb-2">{dept.note}</p>}
                        <button className="text-teal-500 text-sm font-medium flex items-center gap-1 hover:text-teal-600">
                          <Plus size={14} /> Add Employee
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && <CompanyProfileTabs />}

              {step === 6 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Add Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {mockProducts.map(p => (
                      <div key={p.name} className="bg-white rounded-xl p-5 shadow-md">
                        <div className="w-full h-28 bg-gray-100 rounded-lg mb-4" />
                        <h4 className="font-bold text-slate-900 mb-1">{p.name}</h4>
                        <p className="text-teal-500 font-bold mb-1">{p.price}</p>
                        <p className="text-sm text-gray-500">Stock: {p.stock}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                    <Plus size={18} /> Add Product
                  </button>
                </div>
              )}

              {step === 7 && <CompanyScoreSummary />}

              <button onClick={goNext} className="w-full mt-8 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                {step === 7 ? 'Next Step' : 'Next Step'}
              </button>
            </div>
          </div>
        )}

      </div>

      <ProgressBar step={step} onStepClick={setStep} />
    </div>
  );
};
