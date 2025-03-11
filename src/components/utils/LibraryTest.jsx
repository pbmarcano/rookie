import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import * as bip39 from 'bip39';
import localforage from 'localforage';
import QRCode from 'qrcode';

export function LibraryTest() {
  const [qrCodeData, setQrCodeData] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    async function testLibraries() {
      try {
        // Check if bitcoin global is available
        if (!window.bitcoin) {
          throw new Error('Bitcoin library not loaded. Make sure to run the build-libs script.');
        }

        // Test QRCode
        const qrCanvas = document.createElement('canvas');
        await QRCode.toCanvas(qrCanvas, 'Test QR Code', { width: 100 });
        setQrCodeData(qrCanvas.toDataURL());

        // Test BIP39
        const testMnemonic = bip39.generateMnemonic();
        setMnemonic(testMnemonic);

        // Test localforage
        await localforage.setItem('test-key', 'Libraries loaded successfully');
        const testValue = await localforage.getItem('test-key');
        console.log('LocalForage test:', testValue);

        // Test bitcoinjs-lib using global bitcoin object
        const network = window.bitcoin.networks.testnet;
        console.log('Bitcoin testnet network:', network.messagePrefix);

        setStatus({ loading: false, error: null });
      } catch (error) {
        console.error('Library test failed:', error);
        setStatus({ loading: false, error: error.message });
      }
    }

    testLibraries();
  }, []);

  if (status.loading) {
    return <div className="text-center py-4">Testing crypto libraries...</div>;
  }

  if (status.error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-bold text-red-700 mb-2">Library Test Failed</h3>
        <p className="text-red-600">{status.error}</p>
        <p className="mt-2 text-sm">Check console for more details.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-3">Crypto Libraries Test</h3>

      <div className="space-y-4">
        <div>
          <p className="font-semibold">BitcoinJS-Lib:</p>
          <p className="text-sm text-gray-600">
            {window.bitcoin ? '✅ Loaded successfully' : '❌ Failed to load'}
          </p>
        </div>

        <div>
          <p className="font-semibold">BIP39:</p>
          <p className="text-sm text-gray-600">
            {bip39 ? '✅ Loaded successfully' : '❌ Failed to load'}
          </p>
          {mnemonic && (
            <div className="mt-1 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs font-mono">
              Sample mnemonic: {mnemonic}
            </div>
          )}
        </div>

        <div>
          <p className="font-semibold">LocalForage:</p>
          <p className="text-sm text-gray-600">
            {localforage ? '✅ Loaded successfully' : '❌ Failed to load'}
          </p>
        </div>

        <div>
          <p className="font-semibold">QRCode:</p>
          <p className="text-sm text-gray-600">
            {QRCode ? '✅ Loaded successfully' : '❌ Failed to load'}
          </p>
          {qrCodeData && (
            <div className="mt-1">
              <img src={qrCodeData} alt="Test QR Code" className="w-24 h-24" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LibraryTest;
