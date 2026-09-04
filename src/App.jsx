import { AppProvider, useApp } from './context/AppContext';
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
import { CreditControl, CreditAssessment, CreditDisbursement, CreditContract } from './components/CreditControl';
import { FuzzyLogic } from './components/FuzzyLogic';
import { SukukPortal } from './components/SukukPortal';
import { OperationsDashboard } from './components/OperationsDashboard';
import { Check } from 'lucide-react';

const CC_STEPS = [
  'Marketplace', 'Checkout', 'Financing', 'Assessment', 'Calculator', 'Disbursement', 'Contract',
];

const CreditControlBar = () => {
  const { creditControlStep, setCreditControlStep, exitCreditControl } = useApp();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-teal-500 px-3 py-3 z-40 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center gap-2">
        <div className="flex items-center flex-1">
          {CC_STEPS.map((label, i) => {
            const num = i + 1;
            const done = creditControlStep > num;
            const active = creditControlStep === num;
            return (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setCreditControlStep(num)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all hover:scale-110 ${
                      done ? 'bg-teal-500 text-white' :
                      active ? 'bg-teal-500 text-white ring-4 ring-teal-100' :
                      'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {done ? <Check size={11} /> : num}
                  </button>
                  <span className={`text-[8px] mt-0.5 text-center hidden sm:block max-w-[55px] leading-tight ${active ? 'text-teal-600 font-semibold' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {i < CC_STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 rounded-full ${done ? 'bg-teal-500' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
        <button
          onClick={exitCreditControl}
          className="ml-3 text-[10px] font-semibold text-slate-400 hover:text-red-400 transition-all flex-shrink-0 whitespace-nowrap"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

const HIDE_PANEL_VIEWS = ['auth', 'setup', 'joint-operation'];

const AppContent = () => {
  const { currentView, showCheckout, showFinancingRequest, showTorbiona, creditControlMode } = useApp();
  const showPanel = !HIDE_PANEL_VIEWS.includes(currentView) && !creditControlMode;

  return (
    <>
      {showPanel && <CompetitivePanel />}
      {creditControlMode && <CreditControlBar />}

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
      {currentView === 'credit-assessment' && <CreditAssessment />}
      {currentView === 'credit-disbursement' && <CreditDisbursement />}
      {currentView === 'credit-contract' && <CreditContract />}
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
