// src/services/walletService.js
import * as bip39 from 'bip39';
import localforage from 'localforage';

// Storage key for the mnemonic
const WALLET_KEY = 'wallet-mnemonic';

/**
 * Generate a new BIP39 mnemonic seed
 * @returns {string} The generated mnemonic
 */
export const generateWallet = () => {
  return bip39.generateMnemonic();
};

/**
 * Check if a wallet already exists in localForage
 * @returns {Promise<boolean>} True if wallet exists, false otherwise
 */
export const checkWalletExists = async () => {
  try {
    const mnemonic = await localforage.getItem(WALLET_KEY);
    return !!mnemonic;
  } catch (error) {
    console.error('Error checking wallet existence:', error);
    return false;
  }
};

/**
 * Initialize the wallet - either create a new one or load existing
 * @returns {Promise<{mnemonic: string, isNew: boolean}>} Wallet info
 */
export const initializeWallet = async () => {
  try {
    // Check if wallet exists
    const exists = await checkWalletExists();

    if (exists) {
      // Load existing wallet
      const mnemonic = await localforage.getItem(WALLET_KEY);
      return { mnemonic, isNew: false };
    } else {
      // Generate new wallet
      const mnemonic = generateWallet();
      // Store the mnemonic
      await localforage.setItem(WALLET_KEY, mnemonic);
      return { mnemonic, isNew: true };
    }
  } catch (error) {
    console.error('Error initializing wallet:', error);
    throw error;
  }
};

export default {
  generateWallet,
  checkWalletExists,
  initializeWallet
};
