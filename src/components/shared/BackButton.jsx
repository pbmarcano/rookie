import { h } from 'preact';

export function BackButton({ onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
      Back
    </button>
  );
}

export default BackButton;
