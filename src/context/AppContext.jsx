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
  };

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView('b2b-platform');
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setSelectedProduct(null);
  };

  const openFinancingRequest = () => setShowFinancingRequest(true);
  const closeFinancingRequest = () => setShowFinancingRequest(false);

  const submitFinancingRequest = () => {
    setShowFinancingRequest(false);
    setShowTorbiona(true);
  };

  const openTorbiona = () => setShowTorbiona(true);
  const closeTorbiona = () => setShowTorbiona(false);

  const completePurchase = () => {
    setShowTorbiona(false);
    setShowCheckout(false);
    setSelectedProduct(null);
    alert('Purchase completed successfully!');
  };

  const proceedFromCalculator = () => {
    setShowTorbiona(false);
    setShowCheckout(false);
    setSelectedProduct(null);
    setCurrentView('investor-report');
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
      completePurchase, proceedFromCalculator,
      userData, completeRegistration,
      companyData, setCompanyData,
    }}>
      {children}
    </AppContext.Provider>
  );
};
