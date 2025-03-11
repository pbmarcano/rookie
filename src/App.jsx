import { h } from 'preact';
import { useState } from 'preact/hooks';

// Import view components
import Dashboard from './components/views/Dashboard';
import Receive from './components/views/Receive';
import Send from './components/views/Send';
import Transactions from './components/views/Transactions';
import Settings from './components/views/Settings';
import Backup from './components/views/Backup';

export function App() {
  // State to track current view
  const [currentView, setCurrentView] = useState('dashboard');

  // Function to handle navigation
  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  // Function to go back to dashboard
  const handleBack = () => {
    // For the Backup view, go back to Settings
    if (currentView === 'backup') {
      setCurrentView('settings');
    } else {
      // For all other views, go back to Dashboard
      setCurrentView('dashboard');
    }
  };

  // Render appropriate view based on state
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'receive':
        return <Receive onBack={handleBack} />;
      case 'send':
        return <Send onBack={handleBack} />;
      case 'transactions':
        return <Transactions onBack={handleBack} />;
      case 'settings':
        return <Settings onBack={handleBack} onNavigate={handleNavigate} />;
      case 'backup':
        return <Backup onBack={handleBack} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Rookie Wallet</h1>
        <button 
          onClick={() => handleNavigate('settings')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {/* Settings icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderView()}
        </div>
      </main>

      {/* Footer with navigation */}
      <footer className="bg-white p-4 shadow-lg">
        <div className="flex justify-around">
          <button 
            onClick={() => handleNavigate('dashboard')}
            className={`flex flex-col items-center p-2 ${currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Home
          </button>
          <button 
            onClick={() => handleNavigate('receive')}
            className={`flex flex-col items-center p-2 ${currentView === 'receive' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Receive
          </button>
          <button 
            onClick={() => handleNavigate('send')}
            className={`flex flex-col items-center p-2 ${currentView === 'send' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Send
          </button>
          <button 
            onClick={() => handleNavigate('transactions')}
            className={`flex flex-col items-center p-2 ${currentView === 'transactions' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            History
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
