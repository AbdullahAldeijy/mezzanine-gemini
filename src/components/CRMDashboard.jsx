import { useApp } from '../context/AppContext';
import { LayoutDashboard, Package, FileText, FileCheck, BarChart3, TrendingUp, ShoppingBag, Megaphone, Building2, CheckSquare, Briefcase, DollarSign, Users, Clock } from 'lucide-react';

export const CRMDashboard = () => {
  const { setCurrentView } = useApp();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Package, label: 'My Products' },
    { icon: FileText, label: 'Purchase Orders' },
    { icon: FileCheck, label: 'Contracts' },
    { icon: BarChart3, label: 'Supplier Performance' },
    { icon: TrendingUp, label: 'Analytics' },
    { icon: ShoppingBag, label: 'Marketplace', action: () => setCurrentView('b2b-platform') },
    { icon: TrendingUp, label: 'Market Analytics' },
    { icon: Megaphone, label: 'Advertising Packages' },
    { icon: Building2, label: 'Manage Departments' },
    { icon: CheckSquare, label: 'Tasks & Goals' },
    { icon: Briefcase, label: 'Company Page' },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Mezzanine
          </h1>
          <p className="text-xs text-gray-600 mt-1">CRM Dashboard</p>
        </div>
        <nav className="p-4">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer transition-all ${
                  item.active
                    ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-lightgray'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-darkslate mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
                <DollarSign className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-darkslate">$2.4M</p>
            <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <FileText className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">Active Orders</h3>
            <p className="text-3xl font-bold text-darkslate">24</p>
            <p className="text-sm text-gray-600 mt-2">8 pending approval</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">Active Suppliers</h3>
            <p className="text-3xl font-bold text-darkslate">156</p>
            <p className="text-sm text-gray-600 mt-2">12 new this month</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">Pending Tasks</h3>
            <p className="text-3xl font-bold text-darkslate">18</p>
            <p className="text-sm text-red-600 mt-2">5 overdue</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-darkslate mb-4">Revenue Chart</h3>
            <div className="h-64 bg-lightgray rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Revenue chart visualization</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-darkslate mb-4">Order Status</h3>
            <div className="h-64 bg-lightgray rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Order status chart</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-darkslate mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { title: 'New order received', desc: 'Heavy Excavator - $450,000', time: '2 hours ago' },
              { title: 'Contract signed', desc: 'Annual supply agreement with ABC Corp', time: '5 hours ago' },
              { title: 'Payment received', desc: '$125,000 from XYZ Construction', time: '1 day ago' },
              { title: 'New supplier added', desc: 'Industrial Equipment Ltd.', time: '2 days ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-lightgray rounded-xl">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 mt-2" />
                <div className="flex-1">
                  <p className="font-medium text-darkslate">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.desc}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
