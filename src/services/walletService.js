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

/**
 * Derive the master HD node from a mnemonic
 * @param {string} mnemonic - BIP39 mnemonic
 * @returns {Object} Master HD node
 */
export const deriveHDNode = (mnemonic) => {
  try {
    // Convert mnemonic to seed
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // Ensure bitcoinjs-lib is available globally
    if (!window.bitcoin || !window.bitcoin.bip32) {
      throw new Error('bitcoinjs-lib or BIP32 not available');
    }

    // Derive master HD node with testnet network parameters
    return window.bitcoin.bip32.fromSeed(seed, window.bitcoin.networks.testnet);
  } catch (error) {
    console.error('Error deriving HD node:', error);
    throw new Error('Failed to derive master HD node: ' + error.message);
  }
};

/**
 * Derive a child node at a specific index for address generation
 * @param {Object} hdNode - Master HD node
 * @param {number} index - Index to derive
 * @returns {Object} Child node
 */
export const deriveAddressNode = (hdNode, index) => {
  try {
    // BIP44 path for testnet: m/44'/1'/0'/0/index
    // 44' - BIP44 purpose
    // 1' - testnet coin type (Bitcoin testnet)
    // 0' - account 0
    // 0 - external chain (receiving addresses)
    // index - address index
    const path = `m/44'/1'/0'/0/${index}`;
    return hdNode.derivePath(path);
  } catch (error) {
    console.error('Error deriving address node:', error);
    throw new Error(`Failed to derive address at index ${index}: ${error.message}`);
  }
};

/**
 * Get a testnet address from a node
 * @param {Object} node - HD node
 * @returns {string} Bitcoin testnet address
 */
export const getAddressFromNode = (node) => {
  try {
    // Create a P2PKH payment from the public key using testnet network
    const { address } = window.bitcoin.payments.p2pkh({
      pubkey: node.publicKey,
      network: window.bitcoin.networks.testnet
    });
    return address;
  } catch (error) {
    console.error('Error getting address from node:', error);
    throw new Error('Failed to generate address from node: ' + error.message);
  }
};

/**
 * Get a private key from a node
 * @param {Object} node - HD node
 * @returns {string} Private key in hexadecimal format
 */
export const getPrivateKeyFromNode = (node) => {
  try {
    // Extract and return the private key as a hex string
    return node.privateKey.toString('hex');
  } catch (error) {
    console.error('Error getting private key from node:', error);
    throw new Error('Failed to get private key from node: ' + error.message);
  }
};

export default {
  generateWallet,
  checkWalletExists,
  initializeWallet,
  deriveHDNode,
  deriveAddressNode,
  getAddressFromNode,
  getPrivateKeyFromNode
};
