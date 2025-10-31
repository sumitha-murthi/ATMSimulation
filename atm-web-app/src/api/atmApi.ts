import axios from 'axios';
import type { ATMResponse, BalanceResponse, Transaction, TransactionRequest, ApiStatus, Account } from '@/types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const atmApi = {
  // Card operations
  insertCard: async (cardNumber: string): Promise<ATMResponse> => {
    const response = await api.post('/insertCard', { cardNumber });
    return response.data;
  },

  // Biometric verification
  verifyBiometric: async (cardNumber: string, biometricCode: string): Promise<ATMResponse> => {
    const response = await api.post('/verifyBiometric', { cardNumber, biometricCode });
    return response.data;
  },

  // PIN verification
  verifyPin: async (cardNumber: string, pin: string): Promise<ATMResponse> => {
    const response = await api.post('/verifyPin', { cardNumber, pin });
    return response.data;
  },

  // Transaction operations
  performTransaction: async (request: TransactionRequest): Promise<ATMResponse> => {
    const response = await api.post('/transaction', request);
    return response.data;
  },

  // Get balance
  getBalance: async (cardNumber: string): Promise<BalanceResponse> => {
    const response = await api.get(`/balance/${cardNumber}`);
    return response.data;
  },

  // Get transaction history
  getTransactions: async (cardNumber?: string): Promise<{ success: boolean; data: Transaction[] }> => {
    const url = cardNumber ? `/transactions?cardNumber=${cardNumber}` : '/transactions';
    const response = await api.get(url);
    return response.data;
  },

  // Admin operations
  getApiStatus: async (): Promise<ApiStatus> => {
    const response = await api.get('/status');
    return response.data;
  },

  getAllAccounts: async (): Promise<{ success: boolean; data: Account[] }> => {
    const response = await api.get('/accounts');
    return response.data;
  },

  addAccount: async (accountData: {
    cardNumber: string;
    holderName: string;
    pin: string;
    biometricCode: string;
    balance: number;
  }): Promise<ATMResponse> => {
    const response = await api.post('/accounts/add', accountData);
    return response.data;
  },

  deleteAccount: async (cardNumber: string): Promise<ATMResponse> => {
    const response = await api.delete(`/accounts/delete/${cardNumber}`);
    return response.data;
  },

  // Eject card (reset session)
  ejectCard: async (cardNumber: string): Promise<ATMResponse> => {
    const response = await api.post('/ejectCard', { cardNumber });
    return response.data;
  },
};

export default atmApi;
