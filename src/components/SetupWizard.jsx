import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Users, Building2, Package, Plus, Upload, TrendingUp, FileCheck, AlertCircle, FileText, DollarSign, Activity, GitBranch, ShieldCheck } from 'lucide-react';

const UploadRow = ({ label, status, onUpload }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <FileText size={16} className="text-teal-500 flex-shrink-0" />
      <span className="text-sm text-slate-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {status === 'uploaded' ? (
        <span className="text-xs text-green-600 font-medium flex items-center gap-1"><Check size={12} /> Uploaded</span>
      ) : (
        <button onClick={onUpload} className="flex items-center gap-1 px-3 py-1 border border-teal-400 text-teal-600 rounded-lg text-xs hover:bg-teal-50 transition-all">
          <Upload size={12} /> Upload
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
  const [activeTab, setActiveTab] = useState(0);
  const [regulatoryDocs, setRegulatoryDocs] = useState([
    { label: 'Commercial Registration (CR)', status: 'uploaded' },
    { label: 'Business Licenses', status: 'pending' },
    { label: 'Zakat & Tax Certificate', status: 'uploaded' },
    { label: 'National Address', status: 'uploaded' },
    { label: 'Core Contracts', status: 'pending' },
    { label: 'Other Regulatory Documents', status: 'pending' },
  ]);
  const [financialDocs, setFinancialDocs] = useState([
    { label: 'Certified Financial Statements', status: 'pending' },
    { label: 'Income Statement', status: 'pending' },
    { label: 'Balance Sheet (Financial Position)', status: 'pending' },
    { label: 'Cash Flow Statement', status: 'pending' },
    { label: 'Liabilities & Credit Facilities', status: 'pending' },
  ]);

  const markUploaded = (setter, label) => {
    setter(docs => docs.map(d => d.label === label ? { ...d, status: 'uploaded' } : d));
  };

  const [userAssignments, setUserAssignments] = useState([
    { role: 'Company Owner', name: 'Ahmed Al-Rashid', access: 'Full Access', color: 'from-teal-400 to-teal-600' },
    { role: 'CFO', name: 'Fatima Hassan', access: 'Financial + Reports', color: 'from-blue-400 to-blue-600' },
    { role: 'Accountant', name: 'Mohammed Ali', access: 'Invoices + Payments', color: 'from-purple-400 to-purple-600' },
    { role: 'Project Manager', name: '— Not assigned —', access: 'Projects + Contracts', color: 'from-orange-400 to-orange-600' },
    { role: 'Sales Manager', name: '— Not assigned —', access: 'Customers + Orders', color: 'from-pink-400 to-pink-600' },
    { role: 'External Auditor', name: '— Not assigned —', access: 'Read Only', color: 'from-slate-400 to-slate-600' },
  ]);

  const handleUserAction = (role) => {
    const entry = userAssignments.find(u => u.role === role);
    if (entry.name.startsWith('—')) {
      const name = window.prompt(`Invite someone as ${role}:`);
      if (!name) return;
      setUserAssignments(userAssignments.map(u => u.role === role ? { ...u, name } : u));
    } else {
      alert(`Editing access for ${entry.name} (${role}).`);
    }
  };

  const tabs = [
    { label: 'Regulatory Docs', icon: FileText },
    { label: 'Financial Data', icon: DollarSign },
    { label: 'Operational Data', icon: Activity },
    { label: 'Chart of Accounts', icon: GitBranch },
    { label: 'Users & Permissions', icon: ShieldCheck },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-darkslate mb-1">Company Profile</h3>
      <p className="text-slate-500 text-sm mb-5">Fill in your company profile sections to increase your Mezzanine score.</p>

      {/* Tab Bar */}
      <div className="flex gap-1 flex-wrap mb-6 bg-gray-100 p-1 rounded-xl">
        {tabs.map((t, i) => {
          const Icon = t.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all flex-1 justify-center ${activeTab === i ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Icon size={14} />{t.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Regulatory */}
      {activeTab === 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">Regulatory Data & Attachments</p>
          {regulatoryDocs.map(doc => (
            <UploadRow key={doc.label} label={doc.label} status={doc.status} onUpload={() => markUploaded(setRegulatoryDocs, doc.label)} />
          ))}
        </div>
      )}

      {/* Tab 2: Financial */}
      {activeTab === 1 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">Financial Data</p>
          {financialDocs.map(doc => (
            <UploadRow key={doc.label} label={doc.label} status={doc.status} onUpload={() => markUploaded(setFinancialDocs, doc.label)} />
          ))}
        </div>
      )}

      {/* Tab 3: Operational */}
      {activeTab === 2 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">Operational Data</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 mt-1">Customers</p>
              <DataRow label="Active Customers" value="24" />
              <DataRow label="Customer History Records" value="156 transactions" />
              <DataRow label="Active Contracts" value="8" />
              <DataRow label="Purchase Orders" value="34" />
              <DataRow label="Invoices" value="120" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 mt-1">Collections & Issues</p>
              <DataRow label="Collections" value="SAR 4.2M" />
              <DataRow label="Overdue Cases" value="3" />
              <DataRow label="Disputes & Returns" value="2" />
              <DataRow label="Active Suppliers" value="11" />
              <DataRow label="Ongoing Projects" value="5" />
            </div>
          </div>
          <div className="mt-4 p-3 bg-teal-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1 font-semibold">Expected Future Cash Flows</p>
            <div className="flex gap-4">
              <DataRow label="Next 30 days" value="SAR 850K" />
              <DataRow label="Next 90 days" value="SAR 2.1M" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Chart of Accounts */}
      {activeTab === 3 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-wider font-semibold">Chart of Accounts — Template</p>
          <div className="space-y-2 text-sm">
            {[
              { code: '1000', label: 'Assets', children: [
                { code: '1100', label: 'Current Assets' },
                { code: '1200', label: 'Fixed Assets' },
              ]},
              { code: '2000', label: 'Liabilities', children: [
                { code: '2100', label: 'Short-term Liabilities' },
                { code: '2200', label: 'Long-term Liabilities' },
              ]},
              { code: '3000', label: 'Equity', children: [
                { code: '3100', label: 'Paid-up Capital' },
                { code: '3200', label: 'Retained Earnings' },
              ]},
              { code: '4000', label: 'Revenue', children: [
                { code: '4100', label: 'Sales Revenue' },
                { code: '4200', label: 'Other Income' },
              ]},
              { code: '5000', label: 'Expenses', children: [
                { code: '5100', label: 'Cost of Goods Sold' },
                { code: '5200', label: 'Operating Expenses' },
                { code: '5300', label: 'Administrative Expenses' },
              ]},
            ].map(group => (
              <div key={group.code}>
                <div className="flex items-center gap-2 font-semibold text-slate-800 bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-xs text-slate-400 w-12">{group.code}</span>
                  <span>{group.label}</span>
                </div>
                {group.children.map(child => (
                  <div key={child.code} className="flex items-center gap-2 px-3 py-1.5 ml-4 text-slate-600">
                    <span className="text-xs text-slate-400 w-12">{child.code}</span>
                    <span className="text-xs">{child.label}</span>
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
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-wider font-semibold">Users & Permissions</p>
          <div className="space-y-3">
            {userAssignments.map(u => (
              <div key={u.role} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${u.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {u.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{u.role}</p>
                    <p className="text-xs text-slate-400">{u.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 hidden sm:block">{u.access}</span>
                  <button onClick={() => handleUserAction(u.role)} className="px-3 py-1 border border-teal-400 text-teal-600 rounded-lg text-xs hover:bg-teal-50 transition-all">
                    {u.name.startsWith('—') ? 'Invite' : 'Edit'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const CompanyScoreSummary = () => (
  <div>
    <h3 className="text-2xl font-bold text-darkslate mb-2">Company Profile Score</h3>
    <p className="text-slate-500 text-sm mb-8">Based on the data you've completed in the setup wizard.</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Profile Completion */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
            <FileCheck className="text-white" size={20} />
          </div>
          <div>
            <p className="font-bold text-darkslate">Profile Completion</p>
            <p className="text-xs text-slate-500">Data & documents filled</p>
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
          {[
            { label: 'Organizational Structure', done: true },
            { label: 'Company Page', done: true },
            { label: 'Products Added', done: true },
            { label: 'Financial Documents', done: false },
            { label: 'Bank Statements', done: false },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                {item.done && <Check size={10} className="text-white" />}
              </div>
              <span className={`text-xs ${item.done ? 'text-slate-700' : 'text-slate-400'}`}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Worthiness */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
            <TrendingUp className="text-white" size={20} />
          </div>
          <div>
            <p className="font-bold text-darkslate">Mezzanine Credit Score</p>
            <p className="text-xs text-slate-500">Initial financing eligibility</p>
          </div>
        </div>
        <div className="flex items-end gap-2 mb-1">
          <span className="text-5xl font-bold text-teal-500">68</span>
          <span className="text-xl font-bold text-slate-400 mb-1">/ 100</span>
        </div>
        <p className="text-xs text-amber-600 font-medium mb-3">Good — Eligible for mezzanine financing</p>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
          <div className="h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: '68%' }} />
        </div>
        <div className="space-y-2">
          {[
            { label: 'Business Verification', score: '20/20', color: 'text-green-600' },
            { label: 'Organizational Structure', score: '18/20', color: 'text-green-600' },
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

    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
      <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-800">Complete your financial documents and bank statements to increase your score and unlock higher financing limits.</p>
    </div>
  </div>
);

export const SetupWizard = () => {
  const { setupStep, setSetupStep, nextSetupStep, setCompanyData, companyData, setCurrentView } = useApp();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    about: '',
    phone: '',
    email: '',
    address: '',
  });

  const departments = [
    { name: 'Executive Management', icon: Users, color: 'from-teal-400 to-teal-600' },
    { name: 'Finance', icon: Building2, color: 'from-blue-400 to-blue-600' },
    { name: 'HR', icon: Users, color: 'from-purple-400 to-purple-600' },
    { name: 'Operations', icon: Package, color: 'from-orange-400 to-orange-600' },
    { name: 'IT', icon: Building2, color: 'from-green-400 to-green-600' },
    { name: 'Sales', icon: Users, color: 'from-pink-400 to-pink-600' },
  ];

  const mockProducts = [
    { name: 'Polyethylene', price: '$2,500/ton', stock: '500 tons' },
    { name: 'Specialized Chemicals', price: '$5,000/unit', stock: '200 units' },
    { name: 'Industrial Equipment', price: '$15,000', stock: '50 units' },
  ];

  const steps = [
    { number: 1, title: 'Create Organizational Structure' },
    { number: 2, title: 'Create Company Page' },
    { number: 3, title: 'Add Products' },
    { number: 4, title: 'Company Profile Score' },
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
          <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Mezzanine</span> Setup Wizard
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
                <p className="hidden sm:block text-xs md:text-sm font-medium text-darkslate text-center max-w-[90px] md:max-w-[120px]">{step.title}</p>
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
              <h3 className="text-2xl font-bold text-darkslate mb-6">Create Organizational Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <div key={dept.name} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center mb-4`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h4 className="font-bold text-darkslate mb-2">{dept.name}</h4>
                      {dept.name === 'Executive Management' && (
                        <div className="text-sm text-gray-600 mb-3">
                          <p className="font-medium">CEO: John Smith</p>
                        </div>
                      )}
                      <button className="text-teal-500 text-sm font-medium hover:text-teal-600 flex items-center gap-1">
                        <Plus size={16} /> Add Employee
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
              <h3 className="text-2xl font-bold text-darkslate mb-6">Add Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {mockProducts.map((product) => (
                  <div key={product.name} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="w-full h-32 bg-lightgray rounded-lg mb-4" />
                    <h4 className="font-bold text-darkslate mb-2">{product.name}</h4>
                    <p className="text-teal-500 font-bold mb-1">{product.price}</p>
                    <p className="text-sm text-gray-600 mb-3">Stock: {product.stock}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 border-2 border-dashed border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                <Plus size={20} /> Add Product
              </button>
            </div>
          )}

          {setupStep === 4 && <CompanyScoreSummary />}

          <button
            onClick={handleNext}
            className="w-full mt-8 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            {setupStep === 4 ? 'Go to Dashboard' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};
