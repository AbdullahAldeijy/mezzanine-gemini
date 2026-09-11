import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Package, FileText, FileCheck, BarChart3, TrendingUp, ShoppingBag, Megaphone, Building2, CheckSquare, Briefcase, DollarSign, Users, Clock, Menu, X } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { LanguageSwitcher } from './LanguageSwitcher';

export const CRMDashboard = () => {
  const { setCurrentView } = useApp();
  const { t, isRTL } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, key: 'nav.dashboard', active: true },
    { icon: Package, key: 'nav.myProducts' },
    { icon: FileText, key: 'nav.purchaseOrders' },
    { icon: FileCheck, key: 'nav.digitalContracts' },
    { icon: BarChart3, key: 'nav.supplierPerformance' },
    { icon: TrendingUp, key: 'nav.analytics' },
    { icon: ShoppingBag, key: 'nav.marketplace', action: () => setCurrentView('b2b-platform') },
    { icon: TrendingUp, key: 'nav.marketAnalytics' },
    { icon: Megaphone, key: 'nav.advertisingPackages' },
    { icon: Building2, key: 'nav.manageDepartments' },
    { icon: CheckSquare, key: 'nav.tasksGoals' },
    { icon: Briefcase, key: 'nav.companyPage' },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-lg fixed top-0 h-screen overflow-y-auto z-50 transition-transform duration-300
        ${isRTL ? 'right-0' : 'left-0'}
        ${isRTL
          ? sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          : sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
              {t('brand')}
            </h1>
            <p className="text-xs text-gray-600 mt-1">{t('nav.crmDashboard')}</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 hover:bg-gray-100 rounded-lg text-slate-500">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => { item.action && item.action(); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer transition-all ${
                  item.active
                    ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-lightgray'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{t(item.key)}</span>
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <LanguageSwitcher className="w-full justify-center" />
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 w-full min-w-0 ${isRTL ? 'md:mr-64' : 'md:ml-64'}`}>
        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-30 bg-white shadow-sm px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg text-slate-600">
            <Menu size={22} />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent flex-1">
            {t('brand')}
          </h1>
          <LanguageSwitcher />
        </div>
        <div className="p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-darkslate mb-2">{t('crm.dashboardOverview')}</h1>
            <p className="text-gray-600">{t('crm.welcome')}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
                  <DollarSign className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{t('crm.totalRevenue')}</h3>
              <p className="text-3xl font-bold text-darkslate">$2.4M</p>
              <p className="text-sm text-green-600 mt-2">{t('crm.fromLastMonth')}</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{t('crm.activeOrders')}</h3>
              <p className="text-3xl font-bold text-darkslate">24</p>
              <p className="text-sm text-gray-600 mt-2">{t('crm.pendingApproval')}</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{t('crm.activeSuppliers')}</h3>
              <p className="text-3xl font-bold text-darkslate">156</p>
              <p className="text-sm text-gray-600 mt-2">{t('crm.newThisMonth')}</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{t('crm.pendingTasks')}</h3>
              <p className="text-3xl font-bold text-darkslate">18</p>
              <p className="text-sm text-red-600 mt-2">{t('crm.overdue')}</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-darkslate mb-4">{t('crm.revenueChart')}</h3>
              <div className="h-64 bg-lightgray rounded-xl flex items-center justify-center">
                <p className="text-gray-500">{t('crm.revenueViz')}</p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-darkslate mb-4">{t('crm.orderStatus')}</h3>
              <div className="h-64 bg-lightgray rounded-xl flex items-center justify-center">
                <p className="text-gray-500">{t('crm.orderStatusChart')}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-darkslate mb-4">{t('crm.recentActivity')}</h3>
            <div className="space-y-4">
              {[
                { title: t('crm.activities.newOrder'), desc: t('crm.activities.newOrderDesc'), time: t('crm.activities.hoursAgo2') },
                { title: t('crm.activities.contractSigned'), desc: t('crm.activities.contractSignedDesc'), time: t('crm.activities.hoursAgo5') },
                { title: t('crm.activities.paymentReceived'), desc: t('crm.activities.paymentReceivedDesc'), time: t('crm.activities.dayAgo1') },
                { title: t('crm.activities.newSupplier'), desc: t('crm.activities.newSupplierDesc'), time: t('crm.activities.daysAgo2') },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-lightgray rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 mt-2" />
                  <div className="flex-1">
                    <p className="font-medium text-darkslate">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.desc}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
