import { useApp } from '../context/AppContext';
import { ArrowLeft, Building2, MapPin, Briefcase, Zap, Package, Star, CheckCircle } from 'lucide-react';

export const CompanyProfile = () => {
  const { setCurrentView, openCheckout } = useApp();

  const companyProducts = [
    { id: 1, name: 'Heavy Excavator', price: 450000, seller: 'BuildTech Construction', stock: 15, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=300' },
    { id: 4, name: 'Welding Equipment', price: 85000, seller: 'BuildTech Construction', stock: 12, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300' },
    { id: 8, name: 'Cement Bags', price: 450, seller: 'BuildTech Construction', stock: 200, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300' },
    { id: 9, name: 'Concrete Mixer', price: 125000, seller: 'BuildTech Construction', stock: 22, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4e8]">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <button
            onClick={() => setCurrentView('b2b-platform')}
            className="flex items-center gap-2 text-slate-600 hover:text-teal-500 transition-all font-medium min-h-[44px] -ml-2 pl-2 pr-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Marketplace</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {/* Hero/Cover Section */}
        <div className="relative mb-16 md:mb-20">
          <div className="h-32 md:h-64 w-full rounded-2xl bg-slate-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200"
              alt="Company Cover"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Company Logo Overlapping */}
          <div className="absolute -bottom-8 md:-bottom-12 left-4 md:left-6">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white shadow-lg border-4 border-[#f7f4e8] flex items-center justify-center">
              <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
                <Building2 size={24} className="text-white md:w-10 md:h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Header Info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">BuildTech Construction</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs md:text-sm font-semibold">
                <CheckCircle size={14} />
                Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs md:text-sm font-semibold">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                4.8/5.0
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <button className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-sm md:text-base">
              Contact Supplier
            </button>
            <button className="w-full sm:w-auto px-6 py-3 min-h-[44px] border-2 border-teal-500 text-teal-500 rounded-xl font-semibold hover:bg-teal-50 transition-all text-sm md:text-base">
              Request Custom Quote
            </button>
          </div>
        </div>

        {/* Profile Content - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pb-12">
          {/* Left Column - Company Information */}
          <div className="md:col-span-1">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm p-4 md:p-6 md:sticky md:top-24">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">About the Company</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                BuildTech is a leading provider of heavy machinery and construction materials in the region, operating since 2010. We pride ourselves on quality, reliability, and exceptional customer service.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-sm font-medium text-slate-900">Riyadh, Saudi Arabia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={16} className="text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Industry</p>
                    <p className="text-sm font-medium text-slate-900">Heavy Machinery & Materials</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Zap size={16} className="text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Avg. Response Time</p>
                    <p className="text-sm font-medium text-slate-900">2 Hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Package size={16} className="text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Completed POs</p>
                    <p className="text-sm font-medium text-slate-900">450+</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-2">Member Since</p>
                <p className="text-sm font-bold text-slate-900">January 2010</p>
              </div>
            </div>
          </div>

          {/* Right Column - Products Catalog */}
          <div className="md:col-span-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">Products from BuildTech</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {companyProducts.map((product) => (
                <div key={product.id} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all">
                  <div className="h-32 md:h-40 bg-slate-200 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1 truncate">{product.name}</h3>
                    <p className="text-xs text-slate-500 mb-2 truncate">Sold by: {product.seller}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-slate-600">Qty: {product.stock} Units</span>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-teal-500 mb-3">${product.price.toLocaleString()}</p>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openCheckout(product)}
                          className="w-full py-2.5 min-h-[44px] md:min-h-0 md:py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg text-xs md:text-sm font-medium hover:shadow-md transition-all"
                        >
                          Buy
                        </button>
                        <button className="w-full py-2.5 min-h-[44px] md:min-h-0 md:py-2 border border-teal-500 text-teal-500 rounded-lg text-xs md:text-sm font-medium hover:bg-teal-50 transition-all">
                          RFQ
                        </button>
                      </div>
                      <button className="w-full text-xs text-teal-500 hover:text-teal-600 font-medium py-1">
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
