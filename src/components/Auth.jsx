import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, User, Shield, Smartphone, CheckCircle, Calendar, FileCheck } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const Auth = () => {
  const { authTab, setAuthTab, completeRegistration, setCurrentView, login } = useApp();
  const { t } = useTranslation();
  const [showKYB, setShowKYB] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    position: '',
    phone: '',
    nationalId: '',
    dob: '',
    industry: '',
  });

  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [kybNationalId, setKybNationalId] = useState('');
  const [kybCrNumber, setKybCrNumber] = useState('');
  const [nafathNumber, setNafathNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowKYB(true);
    const randomNum = Math.floor(Math.random() * 90) + 10;
    setNafathNumber(randomNum.toString());
    setVerificationStatus('nafath-prompt');
  };

  const handleInitiateKYB = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * 90) + 10;
    setNafathNumber(randomNum.toString());
    setVerificationStatus('nafath-prompt');
  };

  const handleSimulateApproval = () => {
    setTimeout(() => {
      setVerificationStatus('success');
    }, 1500);
  };

  const handleContinueToDashboard = () => {
    login();
    if (authTab === 'register') {
      setCurrentView('setup');
    } else {
      setCurrentView('b2b-platform');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 md:mb-8">
          <h1
            onClick={() => setCurrentView('b2b-platform')}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            {t('brand')}
          </h1>
          <p className="text-darkslate text-sm md:text-base">{t('brandSub')}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6 bg-lightgray rounded-xl p-1">
            <button
              onClick={() => setAuthTab('company')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                authTab === 'company'
                  ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md'
                  : 'text-darkslate hover:bg-white'
              }`}
            >
              <Building2 className="inline mr-1" size={16} />
              {t('auth.companyLogin')}
            </button>
            <button
              onClick={() => setAuthTab('employee')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                authTab === 'employee'
                  ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md'
                  : 'text-darkslate hover:bg-white'
              }`}
            >
              <User className="inline mr-1" size={16} />
              {t('auth.employeeLogin')}
            </button>
            <button
              onClick={() => setAuthTab('register')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                authTab === 'register'
                  ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md'
                  : 'text-darkslate hover:bg-white'
              }`}
            >
              {t('auth.registerCompany')}
            </button>
          </div>

          {/* Login Forms */}
          {(authTab === 'company' || authTab === 'employee') && !showKYB && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-darkslate font-medium mb-2">{t('auth.email')}</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-darkslate font-medium mb-2">{t('auth.password')}</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 min-h-[48px] bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                {t('auth.login')}
              </button>
            </form>
          )}

          {/* KYB Verification Flow */}
          {((authTab === 'company' || authTab === 'employee') && showKYB) || authTab === 'register' ? (
            <div>
              {/* Step 1: Idle */}
              {verificationStatus === 'idle' && (
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#56afb6]/20 flex items-center justify-center">
                      <Shield size={24} className="text-[#56afb6]" />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
                    {t('auth.businessVerification')}
                  </h2>
                  <p className="text-xs text-slate-600 text-center mb-6">
                    {t('auth.securedBy')}
                  </p>

                  <form onSubmit={handleInitiateKYB} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t('auth.nationalId')}
                      </label>
                      <input
                        type="text"
                        value={kybNationalId}
                        onChange={(e) => setKybNationalId(e.target.value)}
                        placeholder={t('auth.nationalIdPlaceholder')}
                        maxLength={10}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t('auth.crNumber')}
                      </label>
                      <input
                        type="text"
                        value={kybCrNumber}
                        onChange={(e) => setKybCrNumber(e.target.value)}
                        placeholder={t('auth.crPlaceholder')}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Shield size={18} />
                        {t('auth.authenticateNafath')}
                      </button>
                    </div>
                  </form>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                      <Shield size={12} className="text-emerald-500" />
                      <span>{t('auth.securedBySaudi')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Nafath Prompt */}
              {verificationStatus === 'nafath-prompt' && (
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
                      <Smartphone size={32} className="text-emerald-600" />
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 text-center mb-2">
                    {t('auth.waitingNafath')}
                  </h2>
                  <p className="text-xs text-slate-600 text-center mb-6">
                    {t('auth.openNafath')}
                  </p>

                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
                      <span className="text-4xl font-bold text-white">{nafathNumber}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 mb-4">
                    <p className="text-xs text-slate-600 text-center">
                      {t('auth.expiresIn')} <span className="font-bold text-slate-900">2:00</span> {t('auth.minutes')}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handleSimulateApproval}
                      className="text-xs text-slate-400 hover:text-[#56afb6] underline transition-all"
                    >
                      {t('auth.demoSimulate')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {verificationStatus === 'success' && (
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle size={40} className="text-emerald-600" />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
                    {t('auth.identityVerified')}
                  </h2>
                  <p className="text-xs text-slate-600 text-center mb-6">
                    {t('auth.dataRetrieved')}
                  </p>

                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200 mb-4">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200">
                      <div className="w-10 h-10 rounded-xl bg-[#56afb6]/20 flex items-center justify-center">
                        <Building2 size={20} className="text-[#56afb6]" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{t('auth.companyName')}</p>
                        <p className="text-sm font-bold text-slate-900">BuildTech Construction Ltd.</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCheck size={14} className="text-slate-400" />
                          <span className="text-xs text-slate-600">{t('auth.crNumberLabel')}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-900">1010123456</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          <span className="text-xs text-slate-600">{t('auth.status')}</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600">{t('auth.activeCompliant')}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          <span className="text-xs text-slate-600">{t('auth.established')}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-900">2015</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 mb-4">
                    <div className="flex items-center gap-2 justify-center">
                      <Shield size={12} className="text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-700">
                        {t('auth.verifiedViaWathiq')}
                      </span>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={e => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-teal-500 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs text-slate-700">
                      <span className="font-semibold text-slate-900">{t('auth.jointOpTitle')}</span>
                      <br />
                      {t('auth.jointOpTerms')}
                    </span>
                  </label>

                  <button
                    onClick={handleContinueToDashboard}
                    disabled={!agreedToTerms}
                    className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${agreedToTerms ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    {authTab === 'register' ? t('auth.continueSetup') : t('auth.continueDashboard')}
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
