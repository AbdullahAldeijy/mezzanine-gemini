import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Users, Building2, Package, Plus, Upload, TrendingUp, FileCheck, AlertCircle, FileText, DollarSign, Activity, GitBranch, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

const UploadRow = ({ label, status, onUpload, t }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <FileText size={16} className="text-teal-500 flex-shrink-0" />
      <span className="text-sm text-slate-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {status === 'uploaded' ? (
        <span className="text-xs text-green-600 font-medium flex items-center gap-1"><Check size={12} /> {t('setup.uploaded')}</span>
      ) : (
        <button onClick={onUpload} className="flex items-center gap-1 px-3 py-1 border border-teal-400 text-teal-600 rounded-lg text-xs hover:bg-teal-50 transition-all">
          <Upload size={12} /> {t('setup.upload')}
        </button>
      )}
    </div>
  </div>
);

const DataRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-sm font-medium text-slate-900">{value}</span>
  </div>
);

export const CompanyProfileTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [regulatoryDocs, setRegulatoryDocs] = useState([
    { labelKey: 'setup.cr', status: 'uploaded' },
    { labelKey: 'setup.businessLicenses', status: 'pending' },
    { labelKey: 'setup.zakatTax', status: 'uploaded' },
    { labelKey: 'setup.nationalAddress', status: 'uploaded' },
    { labelKey: 'setup.coreContracts', status: 'pending' },
    { labelKey: 'setup.otherRegDocs', status: 'pending' },
  ]);
  const [financialDocs, setFinancialDocs] = useState([
    { labelKey: 'setup.certFinancial', status: 'pending' },
    { labelKey: 'setup.incomeStatement', status: 'pending' },
    { labelKey: 'setup.balanceSheet', status: 'pending' },
    { labelKey: 'setup.cashFlow', status: 'pending' },
    { labelKey: 'setup.liabilities', status: 'pending' },
  ]);

  const markUploaded = (setter, labelKey) => {
    setter(docs => docs.map(d => d.labelKey === labelKey ? { ...d, status: 'uploaded' } : d));
  };

  const [userAssignments, setUserAssignments] = useState([
    { roleKey: 'setup.companyOwner', name: 'Ahmed Al-Rashid', accessKey: 'setup.fullAccess', color: 'from-teal-400 to-teal-600' },
    { roleKey: 'setup.cfo', name: 'Fatima Hassan', access: 'Financial + Reports', color: 'from-blue-400 to-blue-600' },
    { roleKey: 'setup.accountant', name: 'Mohammed Ali', access: 'Invoices + Payments', color: 'from-purple-400 to-purple-600' },
    { roleKey: 'setup.projectManager', name: null, access: 'Projects + Contracts', color: 'from-orange-400 to-orange-600' },
    { roleKey: 'setup.salesManager', name: null, access: 'Customers + Orders', color: 'from-pink-400 to-pink-600' },
    { roleKey: 'setup.externalAuditor', name: null, access: 'Read Only', color: 'from-slate-400 to-slate-600' },
  ]);

  const handleUserAction = (roleKey) => {
    const entry = userAssignments.find(u => u.roleKey === roleKey);
    if (!entry.name) {
      const name = window.prompt(`Invite someone as ${t(roleKey)}:`);
      if (!name) return;
      setUserAssignments(userAssignments.map(u => u.roleKey === roleKey ? { ...u, name } : u));
    } else {
      alert(`Editing access for ${entry.name} (${t(roleKey)}).`);
    }
  };

  const tabs = [
    { labelKey: 'setup.regulatoryDocs', icon: FileText },
    { labelKey: 'setup.financialData', icon: DollarSign },
    { labelKey: 'setup.operationalData', icon: Activity },
    { labelKey: 'setup.chartOfAccounts', icon: GitBranch },
    { labelKey: 'setup.usersPermissions', icon: ShieldCheck },
  ];

  const accountGroups = [
    { code: '1000', labelKey: 'setup.assets', children: [
      { code: '1100', labelKey: 'setup.currentAssets' },
      { code: '1200', labelKey: 'setup.fixedAssets' },
    ]},
    { code: '2000', labelKey: 'setup.liabilitiesGroup', children: [
      { code: '2100', labelKey: 'setup.shortTermLiab' },
      { code: '2200', labelKey: 'setup.longTermLiab' },
    ]},
    { code: '3000', labelKey: 'setup.equity', children: [
      { code: '3100', labelKey: 'setup.paidCapital' },
      { code: '3200', labelKey: 'setup.retainedEarnings' },
    ]},
    { code: '4000', labelKey: 'setup.revenue', children: [
      { code: '4100', labelKey: 'setup.salesRevenue' },
      { code: '4200', labelKey: 'setup.otherIncome' },
    ]},
    { code: '5000', labelKey: 'setup.expenses', children: [
      { code: '5100', labelKey: 'setup.cogs' },
      { code: '5200', labelKey: 'setup.operatingExpenses' },
      { code: '5300', labelKey: 'setup.adminExpenses' },
    ]},
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-darkslate mb-1">{t('setup.companyProfile')}</h3>
      <p className="text-slate-500 text-sm mb-5">{t('setup.companyProfileSub')}</p>

      <div className="flex gap-1 flex-wrap mb-6 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all flex-1 justify-center ${activeTab === i ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Icon size={14} />{t(tab.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Regulatory */}
      {activeTab === 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">{t('setup.regulatoryDataTitle')}</p>
          {regulatoryDocs.map(doc => (
            <UploadRow key={doc.labelKey} label={t(doc.labelKey)} status={doc.status} onUpload={() => markUploaded(setRegulatoryDocs, doc.labelKey)} t={t} />
          ))}
        </div>
      )}

      {/* Tab 2: Financial */}
      {activeTab === 1 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">{t('setup.financialDataTitle')}</p>
          {financialDocs.map(doc => (
            <UploadRow key={doc.labelKey} label={t(doc.labelKey)} status={doc.status} onUpload={() => markUploaded(setFinancialDocs, doc.labelKey)} t={t} />
          ))}
        </div>
      )}

      {/* Tab 3: Operational */}
      {activeTab === 2 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">{t('setup.operationalDataTitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 mt-1">{t('setup.customers')}</p>
              <DataRow label={t('setup.activeCustomers')} value="24" />
              <DataRow label={t('setup.customerHistory')} value="156 transactions" />
              <DataRow label={t('setup.activeContracts')} value="8" />
              <DataRow label={t('nav.purchaseOrders')} value="34" />
              <DataRow label={t('setup.invoices')} value="120" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 mt-1">{t('setup.collectionsIssues')}</p>
              <DataRow label={t('setup.collections')} value="SAR 4.2M" />
              <DataRow label={t('setup.overdueCases')} value="3" />
              <DataRow label={t('setup.disputesReturns')} value="2" />
              <DataRow label={t('setup.activeSuppliers')} value="11" />
              <DataRow label={t('setup.ongoingProjects')} value="5" />
            </div>
          </div>
          <div className="mt-4 p-3 bg-teal-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1 font-semibold">{t('setup.futureCashFlows')}</p>
            <div className="flex gap-4">
              <DataRow label={t('setup.next30days')} value="SAR 850K" />
              <DataRow label={t('setup.next90days')} value="SAR 2.1M" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Chart of Accounts */}
      {activeTab === 3 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-wider font-semibold">{t('setup.chartTitle')}</p>
          <div className="space-y-2 text-sm">
            {accountGroups.map(group => (
              <div key={group.code}>
                <div className="flex items-center gap-2 font-semibold text-slate-800 bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-xs text-slate-400 w-12">{group.code}</span>
                  <span>{t(group.labelKey)}</span>
                </div>
                {group.children.map(child => (
                  <div key={child.code} className="flex items-center gap-2 px-3 py-1.5 ml-4 text-slate-600">
                    <span className="text-xs text-slate-400 w-12">{child.code}</span>
                    <span className="text-xs">{t(child.labelKey)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Users & Permissions */}
      {activeTab === 4 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-wider font-semibold">{t('setup.usersPermissions')}</p>
          <div className="space-y-3">
            {userAssignments.map(u => {
              const displayName = u.name || t('setup.notAssigned');
              return (
                <div key={u.roleKey} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${u.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {displayName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{t(u.roleKey)}</p>
                      <p className="text-xs text-slate-400">{displayName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 hidden sm:block">{u.accessKey ? t(u.accessKey) : u.access}</span>
                    <button onClick={() => handleUserAction(u.roleKey)} className="px-3 py-1 border border-teal-400 text-teal-600 rounded-lg text-xs hover:bg-teal-50 transition-all">
                      {!u.name ? t('setup.invite') : t('setup.edit')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const CompanyScoreSummary = () => {
  const { t } = useTranslation();

  const profileItems = [
    { labelKey: 'setup.orgStructure', done: true },
    { labelKey: 'setup.companyPageItem', done: true },
    { labelKey: 'setup.productsAdded', done: true },
    { labelKey: 'setup.financialDocuments', done: false },
    { labelKey: 'setup.bankStatements', done: false },
  ];

  const scoreItems = [
    { labelKey: 'setup.businessVerification', score: '20/20', color: 'text-green-600' },
    { labelKey: 'setup.orgStructure', score: '18/20', color: 'text-green-600' },
    { labelKey: 'setup.productPortfolio', score: '15/20', color: 'text-amber-600' },
    { labelKey: 'setup.financialDocuments', score: '10/20', color: 'text-red-400' },
    { labelKey: 'setup.marketPresence', score: '5/20', color: 'text-red-400' },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-darkslate mb-2">{t('setup.profileScore')}</h3>
      <p className="text-slate-500 text-sm mb-8">{t('setup.profileScoreSub')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <FileCheck className="text-white" size={20} />
            </div>
            <div>
              <p className="font-bold text-darkslate">{t('setup.profileCompletion')}</p>
              <p className="text-xs text-slate-500">{t('setup.profileCompletionSub')}</p>
            </div>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-5xl font-bold text-blue-500">75</span>
            <span className="text-2xl font-bold text-blue-400 mb-1">%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
            <div className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: '75%' }} />
          </div>
          <div className="space-y-2">
            {profileItems.map(item => (
              <div key={item.labelKey} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                  {item.done && <Check size={10} className="text-white" />}
                </div>
                <span className={`text-xs ${item.done ? 'text-slate-700' : 'text-slate-400'}`}>{t(item.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <p className="font-bold text-darkslate">{t('setup.creditScore')}</p>
              <p className="text-xs text-slate-500">{t('setup.creditScoreSub')}</p>
            </div>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-5xl font-bold text-teal-500">68</span>
            <span className="text-xl font-bold text-slate-400 mb-1">/ 100</span>
          </div>
          <p className="text-xs text-amber-600 font-medium mb-3">{t('setup.creditGood')}</p>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
            <div className="h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: '68%' }} />
          </div>
          <div className="space-y-2">
            {scoreItems.map(item => (
              <div key={item.labelKey} className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{t(item.labelKey)}</span>
                <span className={`text-xs font-semibold ${item.color}`}>{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800">{t('setup.completeFinancial')}</p>
      </div>
    </div>
  );
};

export const SetupWizard = () => {
  const { setupStep, setSetupStep, nextSetupStep, setCompanyData, setCurrentView } = useApp();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    about: '',
    phone: '',
    email: '',
    address: '',
  });

  const departments = [
    { nameKey: 'setup.executiveManagement', icon: Users, color: 'from-teal-400 to-teal-600' },
    { nameKey: 'setup.finance', icon: Building2, color: 'from-blue-400 to-blue-600' },
    { nameKey: 'setup.hr', icon: Users, color: 'from-purple-400 to-purple-600' },
    { nameKey: 'setup.operations', icon: Package, color: 'from-orange-400 to-orange-600' },
    { nameKey: 'setup.it', icon: Building2, color: 'from-green-400 to-green-600' },
    { nameKey: 'setup.sales', icon: Users, color: 'from-pink-400 to-pink-600' },
  ];

  const mockProducts = [
    { name: 'Polyethylene', price: '$2,500/ton', stockVal: '500 tons' },
    { name: 'Specialized Chemicals', price: '$5,000/unit', stockVal: '200 units' },
    { name: 'Industrial Equipment', price: '$15,000', stockVal: '50 units' },
  ];

  const steps = [
    { number: 1, titleKey: 'setup.step1' },
    { number: 2, titleKey: 'setup.step2' },
    { number: 3, titleKey: 'setup.step3' },
    { number: 4, titleKey: 'setup.step4' },
  ];

  const handleNext = () => {
    if (setupStep === 2) {
      setCompanyData(formData);
    }
    nextSetupStep();
  };

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2
          onClick={() => setCurrentView('b2b-platform')}
          className="text-2xl md:text-3xl font-bold text-darkslate mb-6 md:mb-8 text-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">{t('brand')}</span> {t('setup.title')}
        </h2>

        {/* Stepper */}
        <div className="flex justify-center mb-8 md:mb-12 overflow-x-auto px-2">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-shrink-0">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setSetupStep(step.number)}
              >
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold mb-2 text-sm md:text-base flex-shrink-0 ${
                  setupStep > step.number ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white' :
                  setupStep === step.number ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white' :
                  'bg-lightgray text-darkslate'
                }`}>
                  {setupStep > step.number ? <Check size={18} /> : step.number}
                </div>
                <p className="hidden sm:block text-xs md:text-sm font-medium text-darkslate text-center max-w-[90px] md:max-w-[120px]">{t(step.titleKey)}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-8 md:w-24 h-1 mx-2 md:mx-4 mb-8 md:mb-8 flex-shrink-0 ${
                  setupStep > step.number ? 'bg-gradient-to-r from-teal-400 to-teal-600' : 'bg-lightgray'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-8">
          {setupStep === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-darkslate mb-6">{t('setup.step1')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <div key={dept.nameKey} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center mb-4`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h4 className="font-bold text-darkslate mb-2">{t(dept.nameKey)}</h4>
                      {dept.nameKey === 'setup.executiveManagement' && (
                        <div className="text-sm text-gray-600 mb-3">
                          <p className="font-medium">CEO: John Smith</p>
                        </div>
                      )}
                      <button className="text-teal-500 text-sm font-medium hover:text-teal-600 flex items-center gap-1">
                        <Plus size={16} /> {t('setup.addEmployee')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {setupStep === 2 && <CompanyProfileTabs />}

          {setupStep === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-darkslate mb-6">{t('setup.step3')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {mockProducts.map((product) => (
                  <div key={product.name} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="w-full h-32 bg-lightgray rounded-lg mb-4" />
                    <h4 className="font-bold text-darkslate mb-2">{product.name}</h4>
                    <p className="text-teal-500 font-bold mb-1">{product.price}</p>
                    <p className="text-sm text-gray-600 mb-3">{t('setup.stock')}: {product.stockVal}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 border-2 border-dashed border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                <Plus size={20} /> {t('setup.addProduct')}
              </button>
            </div>
          )}

          {setupStep === 4 && <CompanyScoreSummary />}

          <button
            onClick={handleNext}
            className="w-full mt-8 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            {setupStep === 4 ? t('setup.goToDashboard') : t('setup.nextStep')}
          </button>
        </div>
      </div>
    </div>
  );
};
