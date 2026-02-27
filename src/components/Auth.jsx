import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, User } from 'lucide-react';

export const Auth = () => {
  const { authTab, setAuthTab, completeRegistration, setCurrentView } = useApp();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    completeRegistration(formData);
  };

  const industries = ['Contracting', 'Logistics', 'Supplying', 'Manufacturing', 'Engineering', 'Real Estate'];

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 
            onClick={() => setCurrentView('b2b-platform')}
            className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Mezzanine
          </h1>
          <p className="text-darkslate">B2B Construction Platform</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-lightgray rounded-xl p-1">
            <button
              onClick={() => setAuthTab('company')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                authTab === 'company'
                  ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md'
                  : 'text-darkslate hover:bg-white'
              }`}
            >
              <Building2 className="inline mr-1" size={16} />
              Company Login
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
              Employee Login
            </button>
            <button
              onClick={() => setAuthTab('register')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                authTab === 'register'
                  ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md'
                  : 'text-darkslate hover:bg-white'
              }`}
            >
              Register Company
            </button>
          </div>

          {/* Login Forms */}
          {(authTab === 'company' || authTab === 'employee') && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-darkslate font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-darkslate font-medium mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Login
              </button>
            </form>
          )}

          {/* Register Form */}
          {authTab === 'register' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-darkslate font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-darkslate font-medium mb-2">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-darkslate font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-darkslate font-medium mb-2">Position *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-darkslate font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-darkslate font-medium mb-2">National ID *</label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-darkslate font-medium mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-darkslate font-medium mb-2">Industry Type *</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none bg-white"
                  required
                >
                  <option value="">Select Industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
