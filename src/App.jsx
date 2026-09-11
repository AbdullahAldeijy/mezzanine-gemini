import { AppProvider, useApp } from './context/AppContext';
import { useTranslation } from './i18n/useTranslation';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Auth } from './components/Auth';
import { SetupWizard } from './components/SetupWizard';
import { B2BPlatform } from './components/B2BPlatform';
import { CRMDashboardFull } from './components/CRMDashboardFull';
import { CheckoutPanel } from './components/CheckoutPanel';
import { FinancingRequestModal } from './components/FinancingRequestModal';
import { TorbionaModal } from './components/TorbionaModal';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { InvestorReport } from './components/InvestorReport';
import { AdminRiskPortal } from './components/AdminRiskPortal';
import { CompanyProfile } from './components/CompanyProfile';
import { KYBVerification } from './components/KYBVerification';
import { AccessControlManager } from './components/AccessControlManager';
import { DataIntegrations } from './components/DataIntegrations';
import { ContractsPortal } from './components/ContractsPortal';
import { CompetitivePanel } from './components/CompetitivePanel';
import { JointOperation } from './components/JointOperation';
import { CreditControl } from './components/CreditControl';
import { FinancingPayments } from './components/FinancingPayments';
import { FuzzyLogic } from './components/FuzzyLogic';
import { SukukPortal } from './components/SukukPortal';
import { OperationsDashboard } from './components/OperationsDashboard';

const HIDE_PANEL_VIEWS = ['auth', 'setup', 'joint-operation', 'credit-control'];

const AppContent = () => {
  const { currentView, showCheckout, showFinancingRequest, showTorbiona } = useApp();
  const { isRTL } = useTranslation();
  const showPanel = !HIDE_PANEL_VIEWS.includes(currentView);

  return (
    <>
      <div className={`fixed top-4 ${isRTL ? 'left-4' : 'right-4'} z-[60]`}>
        <LanguageSwitcher />
      </div>
      {showPanel && <CompetitivePanel />}

      {currentView === 'auth' && <Auth />}
      {currentView === 'setup' && <SetupWizard />}
      {currentView === 'b2b-platform' && <B2BPlatform />}
      {currentView === 'crm-dashboard' && <CRMDashboardFull />}
      {currentView === 'investor-report' && <InvestorReport />}
      {currentView === 'admin-risk-portal' && <AdminRiskPortal />}
      {currentView === 'company-profile' && <CompanyProfile />}
      {currentView === 'kyb-verification' && <KYBVerification />}
      {currentView === 'access-control' && <AccessControlManager />}
      {currentView === 'data-integrations' && <DataIntegrations />}
      {currentView === 'contracts-portal' && <ContractsPortal />}
      {currentView === 'joint-operation' && <JointOperation />}
      {currentView === 'credit-control' && <CreditControl />}
      {currentView === 'financing-payments' && <FinancingPayments />}
      {currentView === 'fuzzy-logic' && <FuzzyLogic />}
      {currentView === 'sukuk-portal' && <SukukPortal />}
      {currentView === 'operations-dashboard' && <OperationsDashboard />}

      {showCheckout && <CheckoutPanel />}
      {showFinancingRequest && <FinancingRequestModal />}
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
