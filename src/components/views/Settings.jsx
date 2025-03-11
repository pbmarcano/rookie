import { h } from 'preact';
import BackButton from '../shared/BackButton';

export function Settings({ onBack, onNavigate }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <p className="text-gray-500 mb-4">Coming Soon</p>

      <button 
        onClick={() => onNavigate('backup')} 
        className="mb-2 w-full max-w-xs px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex justify-center items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
        </svg>
        Backup Wallet
      </button>

      <BackButton onClick={onBack} />
    </div>
  );
}

export default Settings;
