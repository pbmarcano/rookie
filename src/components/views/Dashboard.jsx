import { h } from 'preact';
import { useWallet } from '../../contexts/WalletContext';
import LibraryTest from '../utils/LibraryTest';

export function Dashboard({ onNavigate }) {
  const { exists, loading, error, createWallet } = useWallet();

  const handleCreateWallet = async () => {
    await createWallet();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <div className="w-full max-w-md mb-6 p-4 bg-gray-50 border rounded-lg text-center">
          <p className="text-gray-600">Loading wallet...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <div className="w-full max-w-md mb-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-bold text-red-700 mb-2">Wallet Error</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Wallet doesn't exist yet
  if (!exists) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">Welcome to Rookie Wallet!</h2>

        <div className="w-full max-w-md mb-6">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="mb-4">You don't have a wallet yet. Create one to get started!</p>
            <button 
              onClick={handleCreateWallet}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Wallet
            </button>
          </div>
        </div>

        {/* Library Test Component */}
        {/* <div className="w-full max-w-md"> */}
        {/*   <LibraryTest /> */}
        {/* </div> */}
      </div>
    );
  }

  // Wallet exists
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      <div className="w-full max-w-md mb-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
          <h3 className="text-lg font-bold text-green-700 mb-2">Wallet Ready</h3>
          <p className="text-green-600">Your Bitcoin Testnet wallet is active.</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button 
              onClick={() => onNavigate('receive')}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Receive
            </button>
            <button 
              onClick={() => onNavigate('send')}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              Send
            </button>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-bold mb-2">Transaction History</h3>
          <p className="text-gray-500 text-sm">No transactions yet.</p>
          <button 
            onClick={() => onNavigate('transactions')}
            className="mt-2 text-blue-500 text-sm hover:underline flex items-center"
          >
            View all transactions
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Library Test Component */}
      {/* <div className="w-full max-w-md"> */}
      {/*   <LibraryTest /> */}
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
