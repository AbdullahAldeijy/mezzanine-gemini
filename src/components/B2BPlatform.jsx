import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, User, LayoutDashboard, LogIn, FileText, Building2, Star, ArrowRight, X } from 'lucide-react';

export const B2BPlatform = () => {
  const { setCurrentView, openCheckout } = useApp();
  const [showRFQModal, setShowRFQModal] = useState(false);

  const categories = ['Heavy Machinery', 'Building Materials', 'Safety Equipment', 'Electrical & Plumbing', 'Logistics Services'];

  const companies = [
    { name: 'BuildTech', rating: 4.8, icon: Building2 },
    { name: 'Global Materials', rating: 4.7, icon: Building2 },
    { name: 'Heavy Equipment Co.', rating: 4.9, icon: Building2 },
    { name: 'Safety First Ltd.', rating: 4.6, icon: Building2 },
  ];

  const products = [
    { id: 1, name: 'Heavy Excavator', price: 450000, seller: 'BuildTech Construction', stock: 15, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=300' },
    { id: 2, name: 'Tower Crane', price: 680000, seller: 'Global Materials', stock: 8, image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=300' },
    { id: 3, name: 'Concrete Mixer', price: 125000, seller: 'Heavy Equipment Co.', stock: 22, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300' },
    { id: 4, name: 'Welding Equipment', price: 85000, seller: 'BuildTech Construction', stock: 12, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300' },
    { id: 5, name: 'Steel Bars', price: 850, seller: 'Global Materials', stock: 150, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300' },
    { id: 6, name: 'Safety Helmets', price: 1200, seller: 'Safety First Ltd.', stock: 45, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300' },
    { id: 7, name: 'Power Tools', price: 5500, seller: 'Heavy Equipment Co.', stock: 30, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300' },
    { id: 8, name: 'Cement Bags', price: 450, seller: 'BuildTech Construction', stock: 200, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <h1 
              onClick={() => setCurrentView('b2b-platform')}
              className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Mezzanine
            </h1>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products, suppliers, materials..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRFQModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <FileText size={18} />
                Submit RFQ
              </button>
              <button
                onClick={() => setCurrentView('auth')}
                className="px-4 py-2 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center gap-2"
              >
                <LogIn size={18} />
              </button>
              <button
                onClick={() => setCurrentView('crm-dashboard')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <LayoutDashboard size={20} className="text-slate-600" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Categories */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map((cat) => (
              <button key={cat} className="px-4 py-2 bg-white/50 hover:bg-teal-100 rounded-full text-sm font-medium text-slate-700 whitespace-nowrap transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Featured Companies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Suppliers & Contractors</h2>
          <div className="grid grid-cols-4 gap-4">
            {companies.map((company) => {
              const Icon = company.icon;
              return (
                <div key={company.name} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm p-4 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mb-3">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{company.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">{company.rating}</span>
                  </div>
                  <button className="text-sm text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1">
                    View Profile <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Trending Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all">
                <div className="h-40 bg-lightgray overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 truncate">{product.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">Sold by: {product.seller}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-600">Qty Available: {product.stock} Units</span>
                  </div>
                  <p className="text-lg font-bold text-teal-500 mb-3">${product.price.toLocaleString()}</p>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openCheckout(product)}
                        className="flex-1 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg text-xs font-medium hover:shadow-md transition-all"
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => setShowRFQModal(true)}
                        className="flex-1 py-2 border border-teal-500 text-teal-500 rounded-lg text-xs font-medium hover:bg-teal-50 transition-all"
                      >
                        RFQ
                      </button>
                    </div>
                    <button className="w-full text-xs text-teal-500 hover:text-teal-600 font-medium">
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-teal-400 mb-3">Mezzanine</h3>
              <p className="text-gray-400 text-sm">Elevating Business Financial Intelligence.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-teal-400 transition-all">Marketplace</button></li>
                <li><button className="hover:text-teal-400 transition-all">Suppliers</button></li>
                <li><button onClick={() => setShowRFQModal(true)} className="hover:text-teal-400 transition-all">Post RFQ</button></li>
                <li><button onClick={() => setCurrentView('crm-dashboard')} className="hover:text-teal-400 transition-all">CRM Login</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Riyadh, Saudi Arabia</li>
                <li>info@mezzanine.sa</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            © 2026 Mezzanine B2B Platform. All rights reserved.
          </div>
        </div>
      </footer>

      {/* RFQ Modal */}
      {showRFQModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Request a Custom Quote</h3>
              <button onClick={() => setShowRFQModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Product/Material Needed</label>
                <input type="text" placeholder="e.g., Heavy Excavator" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                  <input type="number" placeholder="1" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Required Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Location</label>
                <input type="text" placeholder="Riyadh, Saudi Arabia" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
