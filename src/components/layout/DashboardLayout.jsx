import { Sidebar } from './Sidebar';

export const DashboardLayout = ({ children, activeItem }) => {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar activeItem={activeItem} />
      <div className="ml-64 flex-1 p-8">
        {children}
      </div>
    </div>
  );
};
