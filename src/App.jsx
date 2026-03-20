import { AppProvider, useApp } from './context/AppContext';
import { Auth } from './components/Auth';
import { SetupWizard } from './components/SetupWizard';
import { B2BPlatform } from './components/B2BPlatform';
import { CRMDashboardFull } from './components/CRMDashboardFull';
import { CheckoutPanel } from './components/CheckoutPanel';
import { TorbionaModal } from './components/TorbionaModal';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { InvestorReport } from './components/InvestorReport';
import { AdminRiskPortal } from './components/AdminRiskPortal';
import { CompanyProfile } from './components/CompanyProfile';
import { KYBVerification } from './components/KYBVerification';
import { AccessControlManager } from './components/AccessControlManager';

const AppContent = () => {
  const { currentView, showCheckout, showTorbiona } = useApp();

  return (
    <>
      {currentView === 'auth' && <Auth />}
      {currentView === 'setup' && <SetupWizard />}
      {currentView === 'b2b-platform' && <B2BPlatform />}
      {currentView === 'crm-dashboard' && <CRMDashboardFull />}
      {currentView === 'investor-report' && <InvestorReport />}
      {currentView === 'admin-risk-portal' && <AdminRiskPortal />}
      {currentView === 'company-profile' && <CompanyProfile />}
      {currentView === 'kyb-verification' && <KYBVerification />}
      {currentView === 'access-control' && <AccessControlManager />}
      {showCheckout && <CheckoutPanel />}
      {showTorbiona && <TorbionaModal />}
      <FloatingChatWidget />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
