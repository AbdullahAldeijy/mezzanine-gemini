import { LayoutDashboard, Package, FileText, FileCheck, BarChart3, TrendingUp, ShoppingBag, Megaphone, Building2, CheckSquare, Briefcase, ShieldCheck, Database } from 'lucide-react';

export const Sidebar = ({ activeItem = 'Marketplace', onNavigate }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: Package, label: 'My Products', view: 'products' },
    { icon: FileText, label: 'Purchase Orders', view: 'orders' },
    { icon: FileCheck, label: 'Contracts', view: 'contracts' },
    { icon: BarChart3, label: 'Supplier Performance', view: 'performance' },
    { icon: TrendingUp, label: 'Analytics', view: 'analytics' },
    { icon: ShoppingBag, label: 'Marketplace', view: 'marketplace' },
    { icon: TrendingUp, label: 'Market Analytics', view: 'market-analytics' },
    { icon: Megaphone, label: 'Advertising Packages', view: 'advertising' },
    { icon: Building2, label: 'Manage Departments', view: 'departments' },
    { icon: CheckSquare, label: 'Tasks & Goals', view: 'tasks' },
    { icon: Briefcase, label: 'Company Page', view: 'company-page' },
    { icon: ShieldCheck, label: 'Team & Access', view: 'access-control' },
    { icon: Database, label: 'Data & Integrations', view: 'data-integrations' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-teal">Mezzanine</h1>
        <p className="text-xs text-slategray mt-1">B2B Construction Platform</p>
      </div>
      <nav className="p-4">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.label === activeItem;
          return (
            <div
              key={idx}
              onClick={() => onNavigate && onNavigate(item.view)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer transition-all ${
                isActive ? 'bg-teal text-white' : 'text-slategray hover:bg-lightgray'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
