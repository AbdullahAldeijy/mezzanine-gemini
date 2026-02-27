import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Users, Building2, Package, Plus, Upload } from 'lucide-react';

export const SetupWizard = () => {
  const { setupStep, nextSetupStep, setCompanyData, companyData, setCurrentView } = useApp();
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
  ];

  const handleNext = () => {
    if (setupStep === 2) {
      setCompanyData(formData);
    }
    nextSetupStep();
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-6xl mx-auto">
        <h2 
          onClick={() => setCurrentView('b2b-platform')}
          className="text-3xl font-bold text-darkslate mb-8 text-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Mezzanine</span> Setup Wizard
        </h2>
        
        {/* Stepper */}
        <div className="flex justify-center mb-12">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 ${
                  setupStep > step.number ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white' :
                  setupStep === step.number ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white' :
                  'bg-lightgray text-darkslate'
                }`}>
                  {setupStep > step.number ? <Check size={24} /> : step.number}
                </div>
                <p className="text-sm font-medium text-darkslate text-center max-w-[120px]">{step.title}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-24 h-1 mx-4 mb-8 ${
                  setupStep > step.number ? 'bg-gradient-to-r from-teal-400 to-teal-600' : 'bg-lightgray'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
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

          {setupStep === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-darkslate mb-6">Create Company Page</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-darkslate font-medium mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-darkslate font-medium mb-2">Industry *</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-darkslate font-medium mb-2">About Company</label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-darkslate font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-darkslate font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-darkslate font-medium mb-2">Riyadh Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  />
                </div>
                <div className="md:col-span-2 grid grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-all cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm text-gray-600">Company Logo</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-all cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm text-gray-600">Building Image</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-all cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm text-gray-600">Team Image</p>
                  </div>
                </div>
              </div>
            </div>
          )}

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

          <button
            onClick={handleNext}
            className="w-full mt-8 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            {setupStep === 3 ? 'Finish Setup' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};
