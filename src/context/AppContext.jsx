import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('b2b-platform');
  const [authTab, setAuthTab] = useState('register');
  const [setupStep, setSetupStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showTorbiona, setShowTorbiona] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userData, setUserData] = useState({});
  const [companyData, setCompanyData] = useState({});

  const completeRegistration = (data) => {
    setUserData(data);
    setCurrentView('setup');
  };

  const nextSetupStep = () => {
    if (setupStep < 3) setSetupStep(setupStep + 1);
    else {
      setCurrentView('b2b-platform');
      setSetupStep(1);
    }
  };

  const openCheckout = (product) => {
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setSelectedProduct(null);
  };

  const openTorbiona = () => {
    setShowTorbiona(true);
  };

  const closeTorbiona = () => {
    setShowTorbiona(false);
  };

  const completePurchase = () => {
    setShowTorbiona(false);
    setShowCheckout(false);
    setSelectedProduct(null);
    alert('Purchase completed successfully!');
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      authTab,
      setAuthTab,
      setupStep,
      setSetupStep,
      nextSetupStep,
      showCheckout,
      showTorbiona,
      selectedProduct,
      openCheckout,
      closeCheckout,
      openTorbiona,
      closeTorbiona,
      completePurchase,
      userData,
      completeRegistration,
      companyData,
      setCompanyData,
    }}>
      {children}
    </AppContext.Provider>
  );
};
