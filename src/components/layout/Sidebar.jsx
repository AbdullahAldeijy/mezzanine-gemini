import { X, LayoutDashboard, Package, FileText, FileSignature, BarChart3, TrendingUp, ShoppingBag, Megaphone, Building2, CheckSquare, Briefcase, ShieldCheck, Database } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

export const Sidebar = ({ activeItem = 'marketplace', onNavigate, isOpen, onClose }) => {
  const { t, isRTL } = useTranslation();

  const menuItems = [
    { icon: LayoutDashboard, key: 'nav.dashboard', view: 'dashboard' },
    { icon: Package, key: 'nav.myProducts', view: 'products' },
    { icon: FileText, key: 'nav.purchaseOrders', view: 'orders' },
    { icon: FileSignature, key: 'nav.digitalContracts', view: 'contracts-portal' },
    { icon: BarChart3, key: 'nav.supplierPerformance', view: 'performance' },
    { icon: TrendingUp, key: 'nav.analytics', view: 'analytics' },
    { icon: ShoppingBag, key: 'nav.marketplace', view: 'marketplace' },
    { icon: TrendingUp, key: 'nav.marketAnalytics', view: 'market-analytics' },
    { icon: Megaphone, key: 'nav.advertisingPackages', view: 'advertising' },
    { icon: Building2, key: 'nav.manageDepartments', view: 'departments' },
    { icon: CheckSquare, key: 'nav.tasksGoals', view: 'tasks' },
    { icon: Briefcase, key: 'nav.companyPage', view: 'company-page' },
    { icon: ShieldCheck, key: 'nav.teamAccess', view: 'access-control' },
    { icon: Database, key: 'nav.dataIntegrations', view: 'data-integrations' },
  ];

  const handleNav = (view) => {
    onNavigate && onNavigate(view);
    onClose && onClose();
  };

  const slideClass = isRTL
    ? isOpen ? 'translate-x-0' : 'translate-x-full'
    : isOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      <div className={`w-64 bg-white h-screen shadow-lg fixed top-0 overflow-y-auto z-50 transition-transform duration-300
        ${isRTL ? 'right-0' : 'left-0'} ${slideClass} md:translate-x-0`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-teal">{t('brand')}</h1>
            <p className="text-xs text-slategray mt-1">{t('brandSub')}</p>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-gray-100 rounded-lg text-slate-500"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = item.view === activeItem;
            return (
              <div
                key={idx}
                onClick={() => handleNav(item.view)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer transition-all ${
                  isActive ? 'bg-teal text-white' : 'text-slategray hover:bg-lightgray'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{t(item.key)}</span>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};
