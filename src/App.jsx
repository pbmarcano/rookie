import { h } from 'preact';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Rookie Wallet</h1>
        <button className="p-2 rounded-full hover:bg-gray-100">
          {/* Settings icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500 text-center">
            Content area - will show balance and transactions
          </p>
        </div>
      </main>

      {/* Footer with Receive/Send Buttons */}
      <footer className="bg-white p-4 shadow-lg">
        <div className="flex justify-around">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600">
            Receive
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
