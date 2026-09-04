import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('b2b-platform');
  const [authTab, setAuthTab] = useState('register');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showTorbiona, setShowTorbiona] = useState(false);
  const [showFinancingRequest, setShowFinancingRequest] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userData, setUserData] = useState({});
  const [companyData, setCompanyData] = useState({});

  // ── Credit Control journey state ──────────────────────────────────────────
  const [creditControlMode, setCreditControlMode] = useState(false);
  const [creditControlStep, setCreditControlStep] = useState(1);

  const startCreditControl = () => {
    setCreditControlMode(true);
    setCreditControlStep(1);
    setCurrentView('b2b-platform');
  };

  const exitCreditControl = () => {
    setCreditControlMode(false);
    setCreditControlStep(1);
    setShowCheckout(false);
    setShowFinancingRequest(false);
    setShowTorbiona(false);
    setSelectedProduct(null);
    setCurrentView('b2b-platform');
  };

  // Called from CreditAssessment to open the calculator (step 5)
  const proceedToCalculator = () => {
    setCreditControlStep(5);
    setShowTorbiona(true);
  };

  // Called from TorbionaModal "Proceed" button
  const proceedFromCalculator = () => {
    setShowTorbiona(false);
    setShowCheckout(false);
    setSelectedProduct(null);
    if (creditControlMode) {
      setCurrentView('credit-disbursement');
      setCreditControlStep(6);
    } else {
      setCurrentView('investor-report');
    }
  };

  // Called from CreditDisbursement "View Contract" button
  const goToContract = () => {
    setCurrentView('credit-contract');
    setCreditControlStep(7);
  };

  // ── Existing functions (modified to track CC steps) ───────────────────────
  const completeRegistration = (data) => {
    setUserData(data);
    setCurrentView('setup');
  };

  const nextSetupStep = () => {
    if (setupStep < 4) setSetupStep(setupStep + 1);
    else {
      setCurrentView('b2b-platform');
      setSetupStep(1);
    }
  };

  const openCheckout = (product) => {
    if (!isLoggedIn) {
      setAuthTab('register');
      setCurrentView('auth');
      return;
    }
    setSelectedProduct(product);
    setShowCheckout(true);
    if (creditControlMode) setCreditControlStep(2);
  };

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView('b2b-platform');
    if (creditControlMode) exitCreditControl();
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setSelectedProduct(null);
  };

  const openFinancingRequest = () => {
    setShowFinancingRequest(true);
    if (creditControlMode) setCreditControlStep(3);
  };

  const closeFinancingRequest = () => setShowFinancingRequest(false);

  const submitFinancingRequest = () => {
    setShowFinancingRequest(false);
    setShowCheckout(false);
    if (creditControlMode) {
      setCreditControlStep(4);
      setCurrentView('credit-assessment');
    } else {
      setShowTorbiona(true);
    }
  };

  const openTorbiona = () => setShowTorbiona(true);
  const closeTorbiona = () => setShowTorbiona(false);

  const completePurchase = () => {
    setShowTorbiona(false);
    setShowCheckout(false);
    setSelectedProduct(null);
    alert('Purchase completed successfully!');
  };

  return (
    <AppContext.Provider value={{
      currentView, setCurrentView,
      authTab, setAuthTab,
      isLoggedIn, login, logout,
      setupStep, setSetupStep, nextSetupStep,
      showCheckout, showTorbiona, showFinancingRequest,
      selectedProduct,
      openCheckout, closeCheckout,
      openTorbiona, closeTorbiona,
      openFinancingRequest, closeFinancingRequest,
      submitFinancingRequest,
      completePurchase,
      proceedFromCalculator,
      proceedToCalculator,
      goToContract,
      userData, completeRegistration,
      companyData, setCompanyData,
      creditControlMode, creditControlStep, setCreditControlStep,
      startCreditControl, exitCreditControl,
    }}>
      {children}
    </AppContext.Provider>
  );
};
