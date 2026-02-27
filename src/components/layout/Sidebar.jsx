import { LayoutDashboard, Package, FileText, FileCheck, BarChart3, TrendingUp, ShoppingBag, Megaphone, Building2, CheckSquare, Briefcase } from 'lucide-react';

export const Sidebar = ({ activeItem = 'Marketplace' }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Package, label: 'My Products' },
    { icon: FileText, label: 'Purchase Orders' },
    { icon: FileCheck, label: 'Contracts' },
    { icon: BarChart3, label: 'Supplier Performance' },
    { icon: TrendingUp, label: 'Analytics' },
    { icon: ShoppingBag, label: 'Marketplace' },
    { icon: TrendingUp, label: 'Market Analytics' },
    { icon: Megaphone, label: 'Advertising Packages' },
    { icon: Building2, label: 'Manage Departments' },
    { icon: CheckSquare, label: 'Tasks & Goals' },
    { icon: Briefcase, label: 'Company Page' },
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
