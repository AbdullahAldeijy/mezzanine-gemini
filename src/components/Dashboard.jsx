import { DashboardLayout } from './layout/DashboardLayout';

export const Dashboard = () => {
  return (
    <DashboardLayout activeItem="Dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-darkslate mb-2">Dashboard</h1>
        <p className="text-slategray">Welcome to your Mezzanine dashboard</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-darkslate mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-teal">24</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-darkslate mb-2">Active Contracts</h3>
          <p className="text-3xl font-bold text-teal">8</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-darkslate mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-teal">$2.4M</p>
        </div>
      </div>
    </DashboardLayout>
  );
};
