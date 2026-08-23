import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';

export const DashboardLayout = ({ children, activeItem }) => {
  const { setCurrentView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="md:ml-64 flex-1 w-full min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-30 bg-white shadow-sm px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg text-slate-600"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-xl font-bold text-teal">Mezzanine</h1>
        </div>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
