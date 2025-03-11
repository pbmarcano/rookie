import { h } from 'preact';
import BackButton from '../shared/BackButton';

export function Backup({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Backup Wallet</h2>
      <p className="text-gray-500 mb-2">Coming Soon</p>
      <p className="text-sm text-gray-400 mb-4 text-center">
        Seed phrase backup will appear here
      </p>
      <BackButton onClick={onBack} />
    </div>
  );
}

export default Backup;
