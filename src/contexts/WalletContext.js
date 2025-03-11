// src/contexts/WalletContext.jsx
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import walletService from '../services/walletService';

// Create the context
const WalletContext = createContext(null);

// Provider component
export function WalletProvider({ children }) {
  const [walletState, setWalletState] = useState({
    initialized: false,
    exists: false,
    isNew: false,
    loading: true,
    error: null
  });

  // Initialize wallet on component mount
  useEffect(() => {
    async function initialize() {
      try {
        // Check if wallet exists first
        const exists = await walletService.checkWalletExists();

        if (exists) {
          // Wallet exists, initialize it
          const { mnemonic, isNew } = await walletService.initializeWallet();
          setWalletState({
            initialized: true,
            exists: true,
            isNew,
            loading: false,
            error: null
          });
        } else {
          // No wallet exists yet, just update state
          setWalletState({
            initialized: true,
            exists: false,
            isNew: false,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
        setWalletState(prevState => ({
          ...prevState,
          loading: false,
          error: error.message
        }));
      }
    }

    initialize();
  }, []);

  // Function to create a new wallet
  const createWallet = async () => {
    try {
      setWalletState(prevState => ({ ...prevState, loading: true }));
      const { mnemonic, isNew } = await walletService.initializeWallet();
      setWalletState({
        initialized: true,
        exists: true,
        isNew,
        loading: false,
        error: null
      });
      return true;
    } catch (error) {
      console.error('Failed to create wallet:', error);
      setWalletState(prevState => ({
        ...prevState,
        loading: false,
        error: error.message
      }));
      return false;
    }
  };

  // Value to be provided by the context
  const contextValue = {
    ...walletState,
    createWallet
  };

  return (
    <WalletContext.Provider value={contextValue}>
    {children}
    </WalletContext.Provider>
  );
}

// Custom hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === null) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

export default WalletContext;
