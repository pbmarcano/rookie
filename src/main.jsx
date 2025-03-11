import { render, h } from 'preact';
import './style.css';

// Simple App component
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Rookie Wallet</h1>
        <p className="text-gray-500 text-center mt-2">A Bitcoin Testnet wallet for learning</p>
      </div>
    </div>
  );
}

// Render the app to the DOM
render(<App />, document.getElementById('app'));
