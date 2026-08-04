import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';

export const DashboardLayout = ({ children, activeItem }) => {
  const { setCurrentView } = useApp();

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar activeItem={activeItem} onNavigate={setCurrentView} />
      <div className="ml-64 flex-1 p-8">
        {children}
      </div>
    </div>
  );
};
