import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

export const CheckoutPanel = () => {
  const { selectedProduct, closeCheckout, openTorbiona } = useApp();
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('paynow');

  if (!selectedProduct) return null;

  const deliveryOptions = [
    { id: 'fast', name: 'Fast Delivery', duration: 'Same Day', price: 50 },
    { id: 'standard', name: 'Standard Delivery', duration: '2-3 Days', price: 25 },
    { id: 'pickup', name: 'Self Pickup', duration: 'Free', price: 0 },
  ];

  const selectedDelivery = deliveryOptions.find(d => d.id === delivery);
  const productTotal = selectedProduct.price;
  const deliveryFee = selectedDelivery.price;
  const finalTotal = productTotal + deliveryFee;

  const handleCompletePurchase = () => {
    if (payment === 'torbiona') {
      openTorbiona();
    } else {
      alert('Purchase completed with Pay Now!');
      closeCheckout();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-darkslate">Checkout</h2>
          <button onClick={closeCheckout} className="text-gray-500 hover:text-darkslate transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Order Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-darkslate mb-4">Order Summary</h3>
            <div className="bg-lightgray rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold text-darkslate">{selectedProduct.name}</p>
                  <p className="text-sm text-gray-600">Qty: 1 × ${productTotal.toLocaleString()}</p>
                </div>
                <span className="text-xl font-bold text-darkslate">${productTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-darkslate mb-4">Delivery Options</h3>
            <div className="space-y-3">
              {deliveryOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    delivery === option.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-300 hover:border-teal-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={delivery === option.id}
                    onChange={(e) => setDelivery(e.target.value)}
                    className="w-5 h-5 text-teal-500 focus:ring-teal-500"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-darkslate">{option.name}</span>
                      <span className="font-bold text-darkslate">
                        {option.price > 0 ? `${option.price} SAR` : 'Free'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{option.duration}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-darkslate mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <label
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  payment === 'paynow'
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-300 hover:border-teal-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="paynow"
                  checked={payment === 'paynow'}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-5 h-5 text-teal-500 focus:ring-teal-500"
                />
                <div className="ml-3">
                  <span className="font-medium text-darkslate">Pay Now</span>
                  <p className="text-sm text-gray-600">Instant payment</p>
                </div>
              </label>

              <label
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  payment === 'torbiona'
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-300 hover:border-teal-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="torbiona"
                  checked={payment === 'torbiona'}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-5 h-5 text-teal-500 focus:ring-teal-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-darkslate">Torbiona</span>
                    <span className="px-2 py-1 text-xs bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-full">
                      Secure financing
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">AI-powered credit approval</p>
                </div>
              </label>
            </div>
          </div>

          {/* Summary Footer */}
          <div className="bg-lightgray rounded-xl p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Product Total</span>
              <span className="font-bold text-darkslate">${productTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-bold text-darkslate">
                {deliveryFee > 0 ? `${deliveryFee} SAR` : 'Free'}
              </span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-darkslate">Final Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  ${finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCompletePurchase}
            className="w-full py-4 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
};
