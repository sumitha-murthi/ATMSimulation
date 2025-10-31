export type ATMState = 'idle' | 'cardInserted' | 'biometric' | 'pinVerified' | 'transaction';

export interface Account {
  cardNumber: string;
  holderName: string;
  balance: number;
}

export interface Transaction {
  txId: string;
  cardNumber: string;
  txType: 'withdraw' | 'deposit' | 'balance';
  amount: number;
  timestamp: string;
  status: 'success' | 'failed';
}

export interface ATMResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface BalanceResponse extends ATMResponse {
  data: {
    balance: number;
    holderName: string;
  };
}

export interface TransactionRequest {
  cardNumber: string;
  type: 'withdraw' | 'deposit' | 'balance';
  amount: number;
}

export interface ApiStatus {
  database: 'connected' | 'disconnected';
  server: 'running' | 'stopped';
  timestamp: string;
}
