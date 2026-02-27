import { useState } from 'react';
import { LayoutDashboard, Package, FileText, BarChart3, TrendingUp, Search, Bell, Plus, Download, Star, AlertTriangle, DollarSign, Users, Clock, Edit, Trash2, X, Megaphone, Building2, CheckSquare, Briefcase, ArrowUp, Check, Twitter, Linkedin, Facebook, Upload, Award, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CRMDashboardFull = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mockProducts = [
    { id: 1, name: 'Heavy Duty Excavator', category: 'Heavy Machinery', stock: 8, minStock: 5, price: 450000, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=100' },
    { id: 2, name: 'Steel Reinforcement Bars', category: 'Building Materials', stock: 2, minStock: 10, price: 850, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100' },
    { id: 3, name: 'Industrial Concrete Mixer', category: 'Heavy Machinery', stock: 15, minStock: 5, price: 125000, image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=100' },
    { id: 4, name: 'Safety Helmets (Box of 50)', category: 'Safety Equipment', stock: 3, minStock: 20, price: 1200, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100' },
  ];

  const mockPOs = [
    { id: 'PO-2024-001', supplier: 'Global Materials Supply', product: 'Steel Reinforcement Bars', amount: 22500, due: 'Dec 15', status: 'Completed', rating: 4.5 },
    { id: 'PO-2024-002', supplier: 'BuildTech Construction', product: 'Concrete Mix', amount: 18000, due: 'Dec 20', status: 'Pending', rating: 4.7 },
    { id: 'PO-2024-003', supplier: 'Heavy Equipment Co.', product: 'Excavator Parts', amount: 45000, due: 'Dec 10', status: 'Completed', rating: 4.8 },
  ];

  const mockSuppliers = [
    { name: 'Global Materials Supply', deliveryTime: 2.8, rating: 4.7, orders: 67 },
    { name: 'BuildTech Construction', deliveryTime: 3.2, rating: 4.5, orders: 45 },
    { name: 'Heavy Equipment Co.', deliveryTime: 2.5, rating: 4.8, orders: 52 },
  ];

  const allTabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Overview' },
    { id: 'products', icon: Package, label: 'My Products' },
    { id: 'orders', icon: FileText, label: 'Purchase Orders' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics & Reports' },
    { id: 'suppliers', icon: Users, label: 'Supplier Performance' },
    { id: 'market', icon: TrendingUp, label: 'Market Analytics' },
    { id: 'advertising', icon: Megaphone, label: 'Advertising Packages' },
    { id: 'departments', icon: Building2, label: 'Department Management' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks & Goals' },
    { id: 'company', icon: Briefcase, label: 'Company Page' },
  ];

  const revenueData = [45, 52, 48, 61, 58, 67];

  return (
    <div className="flex min-h-screen bg-cream pb-16 md:pb-0">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white/90 backdrop-blur shadow-sm fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 
            onClick={() => setCurrentView('b2b-platform')}
            className="text-2xl font-bold text-teal-500 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Mezzanine
          </h1>
          <p className="text-xs text-slate-500 mt-1">Admin - BuildTech</p>
        </div>
        <nav className="p-4">
          {allTabs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer transition-all ${
                  activeTab === item.id ? 'bg-teal-500 text-white' : 'text-slate-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 absolute bottom-0 left-0 right-0 bg-white/90">
          <button
            onClick={() => setCurrentView('b2b-platform')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <span>←</span>
            Back to B2B Platform
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 flex-1 w-full">
        {/* Mobile Top Header */}
        <div className="md:hidden bg-white shadow-sm sticky top-0 z-40 px-4 py-3 border-b">
          <h1 
            onClick={() => setCurrentView('b2b-platform')}
            className="text-xl font-bold text-teal-500 cursor-pointer"
          >
            Mezzanine
          </h1>
          <p className="text-xs text-slate-500">Admin - BuildTech</p>
        </div>

        {/* Desktop Top Header */}
        <div className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-40">
          <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-2">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={18} className="text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="hidden md:flex px-4 py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600 items-center gap-2">
                <Plus size={16} />
                Quick Actions
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          {/* Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Dashboard Overview</h2>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {[
                  { label: 'Total Revenue', value: '$892K', trend: '+15%', icon: DollarSign, color: 'teal' },
                  { label: 'Active Purchase Orders', value: '12', trend: '+3', icon: FileText, color: 'blue' },
                  { label: 'Total Products', value: '45', trend: '+8', icon: Package, color: 'purple' },
                  { label: 'Low Stock Alerts', value: '2', trend: 'Critical', icon: AlertTriangle, color: 'red' },
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                      <div className={`w-12 h-12 rounded-xl bg-${kpi.color}-100 flex items-center justify-center mb-4`}>
                        <Icon className={`text-${kpi.color}-500`} size={24} />
                      </div>
                      <p className="text-sm text-slate-500 mb-1">{kpi.label}</p>
                      <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                      <p className={`text-sm mt-2 ${kpi.color === 'red' ? 'text-red-600' : 'text-green-600'}`}>{kpi.trend}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                {['Add New Product', 'Add Employee', 'Browse Marketplace'].map((action) => (
                  <button key={action} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 hover:shadow-md transition-all text-left">
                    <Plus className="text-teal-500 mb-3" size={24} />
                    <p className="font-medium text-slate-900">{action}</p>
                  </button>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { text: 'PO-2024-001 completed - Steel Reinforcement Bars', time: '2 hours ago' },
                    { text: 'Low stock alert: Safety Helmets', time: '5 hours ago', alert: true },
                    { text: 'New supplier added: Heavy Equipment Co.', time: '1 day ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`w-2 h-2 rounded-full mt-2 ${activity.alert ? 'bg-red-500' : 'bg-teal-500'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">{activity.text}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* My Products */}
          {activeTab === 'products' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">My Products</h2>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="w-full md:w-auto px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add New Product
                </button>
              </div>

              <div className="w-full overflow-x-auto bg-white/90 backdrop-blur rounded-2xl shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Product</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Category</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Stock</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Price</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2 md:gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover" />
                            <span className="font-medium text-slate-900 text-xs md:text-sm">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-slate-600 text-xs md:text-sm whitespace-nowrap">{product.category}</td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 text-xs md:text-sm">{product.stock}</span>
                            {product.stock < product.minStock && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full whitespace-nowrap">Low</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 font-medium text-slate-900 text-xs md:text-sm whitespace-nowrap">${product.price.toLocaleString()}</td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex gap-1 md:gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit size={14} className="text-slate-600" /></button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Purchase Orders */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Purchase Orders</h2>
              
              <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto hide-scrollbar">
                {['All', 'Pending', 'Completed'].map((filter) => (
                  <button key={filter} className={`px-3 md:px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap ${filter === 'All' ? 'bg-teal-500 text-white' : 'bg-white/90 text-slate-600'}`}>
                    {filter}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {mockPOs.map((po) => (
                  <div key={po.id} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{po.id}</h3>
                        <p className="text-sm text-slate-500">Supplier: {po.supplier}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${po.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {po.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500">Product</p>
                        <p className="font-medium text-slate-900 text-sm">{po.product}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Amount</p>
                        <p className="font-medium text-slate-900 text-sm">${po.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Due Date</p>
                        <p className="font-medium text-slate-900 text-sm">{po.due}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Rating</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < Math.floor(po.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                          ))}
                          <span className="text-sm text-slate-900 ml-1">{po.rating}</span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-teal-500 hover:text-teal-600 font-medium">
                      <Download size={16} />
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Supplier Performance */}
          {activeTab === 'suppliers' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Supplier Performance</h2>
              
              <div className="space-y-4">
                {mockSuppliers.map((supplier, idx) => (
                  <div key={idx} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">{supplier.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div>
                        <p className="text-sm text-slate-500 mb-2">Avg Delivery Time</p>
                        <p className="text-2xl font-bold text-slate-900 mb-2">{supplier.deliveryTime} Days</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${100 - supplier.deliveryTime * 10}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-2">Quality Rating</p>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-2xl font-bold text-slate-900">{supplier.rating}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} className={i < Math.floor(supplier.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-2">Orders Completed</p>
                        <p className="text-2xl font-bold text-slate-900">{supplier.orders}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Market Analytics */}
          {activeTab === 'market' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Market Analytics & Insights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Supply</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Available Products</p>
                        <p className="text-4xl font-bold text-slate-900">1,247</p>
                      </div>
                      <ArrowUp className="text-green-500" size={32} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Active Suppliers</p>
                        <p className="text-4xl font-bold text-slate-900">89</p>
                      </div>
                      <ArrowUp className="text-green-500" size={32} />
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Demand</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Purchase Orders</p>
                        <p className="text-4xl font-bold text-slate-900">342</p>
                      </div>
                      <TrendingUp className="text-teal-500" size={32} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Active Buyers</p>
                        <p className="text-4xl font-bold text-slate-900">156</p>
                      </div>
                      <TrendingUp className="text-teal-500" size={32} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                      <FileText className="text-teal-500" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Monthly Market Report</h3>
                      <p className="text-sm text-slate-500">Comprehensive market trends analysis</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Report
                  </button>
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Megaphone className="text-purple-500" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Promotional Ad</h3>
                      <p className="text-sm text-slate-500">Marketing campaign materials</p>
                    </div>
                  </div>
                  <button className="w-full py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50 flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Assets
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Analytics & Reports</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Sales Chart */}
                <div className="col-span-1 md:col-span-2 bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Monthly Revenue</h3>
                  <div className="flex items-end justify-between h-64 gap-4">
                    {revenueData.map((value, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t-lg" style={{ height: `${(value / 70) * 100}%` }}></div>
                        <p className="text-xs text-slate-500 mt-2">{['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx]}</p>
                        <p className="text-sm font-bold text-slate-900">${value}K</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Health */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Financial Health</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-500">Profit Margin</p>
                      <p className="text-3xl font-bold text-teal-500">23%</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Total Revenue</p>
                      <p className="text-2xl font-bold text-slate-900">$331K</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-2">Payment Status</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Paid</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inventory Alerts */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Inventory & Alerts</h3>
                  <div className="mb-6">
                    <p className="text-sm text-slate-500">Total Inventory Value</p>
                    <p className="text-3xl font-bold text-slate-900">$892K</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-3">Items Needing Reorder</p>
                    <div className="space-y-2">
                      {['Safety Helmets', 'Steel Bars'].map((item) => (
                        <div key={item} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                          <AlertTriangle size={16} className="text-red-500" />
                          <span className="text-sm text-slate-900">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tasks & Goals */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Tasks & Goals</h2>
                <button className="w-full md:w-auto px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 flex items-center justify-center gap-2">
                  <Plus size={20} />
                  Add New Task
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Pending</h3>
                  <div className="space-y-4">
                    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Increase Monthly Sales</h4>
                      <p className="text-sm text-slate-600 mb-4">Achieve sales target of 50,000 SAR</p>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Users className="text-purple-500" size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">فاطمة الأحمد</p>
                          <p className="text-xs text-slate-500">Assigned to</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-slate-500">Reward</p>
                          <p className="text-lg font-bold text-teal-500">2,000 SAR</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Due Date</p>
                          <p className="text-sm font-medium text-slate-900">2024-12-31</p>
                        </div>
                      </div>
                      <button className="w-full py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600">
                        Mark Complete
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Completed</h3>
                  <div className="space-y-4">
                    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 border-2 border-green-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-bold text-slate-900">Improve Customer Service</h4>
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="text-green-600" size={18} />
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">Respond within 24hrs</p>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="text-blue-500" size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">عمر الزهراني</p>
                          <p className="text-xs text-slate-500">Completed by</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Reward Paid</p>
                          <p className="text-lg font-bold text-green-600">1,500 SAR</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">✓ Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Department Management */}
          {activeTab === 'departments' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Department Management</h2>
                <button className="w-full md:w-auto px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 flex items-center justify-center gap-2">
                  <Plus size={20} />
                  Add New Department
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { name: 'Executive Management', employees: [{ name: 'محمد العمري', role: 'CEO' }], color: 'teal' },
                  { name: 'Finance & Accounting', employees: [{ name: 'عبدالله السعد', role: 'CFO' }], color: 'blue' },
                  { name: 'Human Resources', employees: [{ name: 'فاطمة الأحمد', role: 'HR Manager' }], color: 'purple' },
                  { name: 'Marketing', employees: [], color: 'pink' },
                  { name: 'Sales', employees: [{ name: 'سارة المحمد', role: 'Sales Lead' }], color: 'orange' },
                  { name: 'Operations', employees: [], color: 'green' },
                ].map((dept, idx) => (
                  <div key={idx} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900">{dept.name}</h3>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Plus size={18} className="text-teal-500" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {dept.employees.map((emp, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className={`w-10 h-10 rounded-full bg-${dept.color}-100 flex items-center justify-center`}>
                            <Users className={`text-${dept.color}-500`} size={18} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{emp.name}</p>
                            <p className="text-xs text-slate-500">{emp.role}</p>
                          </div>
                        </div>
                      ))}
                      {dept.employees.length === 0 && (
                        <p className="text-sm text-slate-400 text-center py-4">No employees yet</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advertising Packages */}
          {activeTab === 'advertising' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Advertising Packages</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Daily Priority</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">100</span>
                    <span className="text-xl text-slate-500 ml-2">SAR</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">First appearance for 1 day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">Advertising image in interface</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50">
                    Purchase Package
                  </button>
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 border-2 border-teal-500 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">Most Popular</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Weekly Priority</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">1,000</span>
                    <span className="text-xl text-slate-500 ml-2">SAR</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">First appearance for 1 week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">2 featured products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">Ad image in interface</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">
                    Purchase Package
                  </button>
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Premium</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Monthly Priority</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">10,000</span>
                    <span className="text-xl text-slate-500 ml-2">SAR</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">1 full month visibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">2 featured products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">Large ad image</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">Detailed analytics</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50">
                    Purchase Package
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Company Page Management */}
          {activeTab === 'company' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8 sticky top-16 md:top-20 bg-cream py-4 z-30">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Company Page Management</h2>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <button className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50">
                    Preview Public Page
                  </button>
                  <button className="px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Branding */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Branding</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Logo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500 transition-all cursor-pointer">
                        <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                        <p className="text-sm text-slate-600">Click to upload logo</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cover Photo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500 transition-all cursor-pointer">
                        <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                        <p className="text-sm text-slate-600">Click to upload cover</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">About</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                      <input type="text" placeholder="BuildTech Construction" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience</label>
                      <input type="number" placeholder="15" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Who We Are</label>
                      <textarea rows="4" placeholder="Tell your story..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"></textarea>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <input type="tel" placeholder="+966 50 123 4567" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input type="email" placeholder="info@buildtech.sa" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Physical Address</label>
                      <input type="text" placeholder="Riyadh, Saudi Arabia" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Social Media</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Twitter className="text-blue-500" size={20} />
                      </div>
                      <input type="text" placeholder="@buildtech" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Linkedin className="text-blue-700" size={20} />
                      </div>
                      <input type="text" placeholder="company/buildtech" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Facebook className="text-blue-600" size={20} />
                      </div>
                      <input type="text" placeholder="buildtech.sa" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Certifications & Awards</h3>
                    <button className="flex items-center gap-2 text-teal-500 hover:text-teal-600 font-medium">
                      <Plus size={18} />
                      Add Certificate
                    </button>
                  </div>
                  <div className="space-y-3">
                    {['ISO 9001:2015 Certified', 'Best Construction Company 2023'].map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Award className="text-teal-500" size={20} />
                        <span className="flex-1 text-sm text-slate-900">{cert}</span>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-16 md:bottom-0 bg-cream py-4 mt-8 flex flex-col md:flex-row justify-end gap-3">
                <button className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50">
                  Preview Public Page
                </button>
                <button className="px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'products', icon: Package, label: 'Products' },
            { id: 'orders', icon: FileText, label: 'Orders' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                  activeTab === item.id ? 'text-teal-500' : 'text-slate-600'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-600"
          >
            <MoreHorizontal size={20} />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>

      {/* Mobile More Menu */}
      {showMoreMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowMoreMenu(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">More Options</h3>
              <button onClick={() => setShowMoreMenu(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {allTabs.filter(t => !['dashboard', 'products', 'orders', 'analytics'].includes(t.id)).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setShowMoreMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id ? 'bg-teal-500 text-white' : 'text-slate-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => { setCurrentView('b2b-platform'); setShowMoreMenu(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium mt-4"
              >
                <span>←</span>
                Back to B2B Platform
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 md:p-6 border-b md:border-0 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">Add New Product</h3>
                <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <input type="text" placeholder="Product Title" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
              <textarea placeholder="Description" rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none"></textarea>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="number" placeholder="Quantity" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
                <input type="number" placeholder="Min Quantity" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
              </div>
              <input type="number" placeholder="Price" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
              <button className="w-full py-3 min-h-[48px] bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
