import { useState } from 'react';
import { MessageCircle, Bot, MessageSquare, Mail, X, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingChatWidget = () => {
  const { currentView } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleAIAssistant = () => {
    setIsOpen(false);
    setShowAIChat(true);
  };

  const aiMessages = [
    {
      type: 'ai',
      text: 'Welcome to Mezzanine! I am your AI Advisor. I analyze your supply chain, inventory, and market activity to help you optimize costs and boost sales. How can I assist you today?',
    },
    {
      type: 'ai',
      text: '💡 **Market Alert:** I noticed you frequently purchase \'Steel Bars\'. Based on platform analytics, steel prices are projected to rise by 5% next month. I recommend submitting a bulk RFQ today to lock in current rates.',
    },
    {
      type: 'ai',
      text: '📈 **Growth Opportunity:** Your \'Heavy Excavators\' are getting 20% more views this week, but conversions are slow. Consider activating a \'Weekly Priority Ad Package\' in your CRM to capture this active demand.',
    },
  ];

  const chatOptions = [
    {
      icon: Bot,
      title: 'AI Assistant',
      subtitle: 'Get instant help about the platform',
      color: 'teal',
      onClick: handleAIAssistant,
    },
    {
      icon: MessageSquare,
      title: 'Companies Chat',
      subtitle: 'Chat with companies',
      color: 'teal',
    },
    {
      icon: Mail,
      title: 'Contact Support',
      subtitle: 'Send us a message',
      color: 'teal',
    },
  ];

  return (
    <div className={`fixed z-50 ${
      currentView === 'crm-dashboard' ? 'bottom-20 md:bottom-6 right-4 md:right-6' : 'bottom-6 right-4 md:right-6'
    }`}>
      {/* Popover */}
      {isOpen && (
        <div className="absolute bottom-16 md:bottom-20 right-0 w-80 max-w-[calc(100vw-2rem)] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 mb-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-800 font-semibold text-lg">Chat with us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-100 rounded-lg transition-all"
            >
              <X size={18} className="text-slate-600" />
            </button>
          </div>
          <div className="space-y-2">
            {chatOptions.map((option, idx) => {
              const Icon = option.icon;
              return (
                <div
                  key={idx}
                  onClick={option.onClick}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{option.title}</p>
                    <p className="text-xs text-slate-500">{option.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Chat Interface */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-2xl h-[90vh] md:h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Mezzanine AI Advisor</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAIChat(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50">
              {aiMessages.map((message, idx) => (
                <div key={idx} className="flex gap-2 md:gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white" size={16} />
                  </div>
                  <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-3 md:p-4 shadow-sm">
                    <p className="text-xs md:text-sm text-slate-800 whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question here... (MVP Demo)"
                  disabled
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-slate-400 cursor-not-allowed text-sm"
                />
                <button
                  disabled
                  className="px-4 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center animate-pulse hover:animate-none"
      >
        <MessageCircle size={20} className="md:w-6 md:h-6" />
      </button>
    </div>
  );
};
