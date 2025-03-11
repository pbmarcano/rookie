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
    error: null,
    mnemonic: null // Store mnemonic in state (for educational purposes)
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
            error: null,
            mnemonic
          });
        } else {
          // No wallet exists yet, just update state
          setWalletState({
            initialized: true,
            exists: false,
            isNew: false,
            loading: false,
            error: null,
            mnemonic: null
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
        error: null,
        mnemonic
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

  // Function to derive HD node from mnemonic
  const getHDNode = () => {
    try {
      if (!walletState.mnemonic) {
        throw new Error('Wallet not initialized');
      }
      return walletService.deriveHDNode(walletState.mnemonic);
    } catch (error) {
      console.error('Failed to get HD node:', error);
      setWalletState(prevState => ({
        ...prevState,
        error: error.message
      }));
      throw error;
    }
  };

  // Function to derive address at index
  const deriveAddress = (index) => {
    try {
      const hdNode = getHDNode();
      const childNode = walletService.deriveAddressNode(hdNode, index);
      return {
        address: walletService.getAddressFromNode(childNode),
        privateKey: walletService.getPrivateKeyFromNode(childNode),
        path: `m/44'/1'/0'/0/${index}`,
        index
      };
    } catch (error) {
      console.error(`Failed to derive address at index ${index}:`, error);
      setWalletState(prevState => ({
        ...prevState,
        error: error.message
      }));
      throw error;
    }
  };

  // Value to be provided by the context
  const contextValue = {
    ...walletState,
    createWallet,
    getHDNode,
    deriveAddress,
    // Expose underlying HD wallet functions for advanced usage
    deriveHDNode: walletService.deriveHDNode,
    deriveAddressNode: walletService.deriveAddressNode,
    getAddressFromNode: walletService.getAddressFromNode,
    getPrivateKeyFromNode: walletService.getPrivateKeyFromNode
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
