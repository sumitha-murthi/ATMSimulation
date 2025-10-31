import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Accounts database file path
const ACCOUNTS_FILE = path.join(__dirname, 'accounts.json');

// Initialize accounts from file or use defaults
let accounts = [];
let transactions = [];

// Helper: Load accounts from JSON file
const loadAccounts = () => {
  try {
    if (fs.existsSync(ACCOUNTS_FILE)) {
      const data = fs.readFileSync(ACCOUNTS_FILE, 'utf8');
      accounts = JSON.parse(data);
      console.log(`📂 Loaded ${accounts.length} accounts from accounts.json`);
    } else {
      // Default accounts if file doesn't exist
      accounts = [
        {
          cardNumber: '1111222233334444',
          holderName: 'Sumitha',
          pin: '1234',
          biometricCode: '123456789',
          balance: 5000,
        },
        {
          cardNumber: '2222333344445555',
          holderName: 'Divya',
          pin: '2345',
          biometricCode: '987654321',
          balance: 6000,
        },
        {
          cardNumber: '3333444455556666',
          holderName: 'Manish',
          pin: '3456',
          biometricCode: '112233445',
          balance: 7000,
        },
        {
          cardNumber: '4444555566667777',
          holderName: 'Nandhini',
          pin: '4567',
          biometricCode: '556677889',
          balance: 8000,
        },
      ];
      saveAccounts();
    }
  } catch (error) {
    console.error('Error loading accounts:', error);
    accounts = [];
  }
};

// Helper: Save accounts to JSON file
const saveAccounts = () => {
  try {
    fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), 'utf8');
    console.log(`💾 Saved ${accounts.length} accounts to accounts.json`);
  } catch (error) {
    console.error('Error saving accounts:', error);
  }
};

// Helper: Format number to INR
const formatINR = (amount) => {
  const formatted = amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `₹ ${formatted}`;
};

// Helper: Generate SHA-256 hash for transactions
const generateTxHash = (cardNumber, type, amount) => {
  const txInput = `${cardNumber}${type}${amount}${new Date().toISOString()}`;
  return crypto.createHash('sha256').update(txInput).digest('hex');
};

// Helper: Find account by card number
const findAccount = (cardNumber) => {
  return accounts.find((acc) => acc.cardNumber === cardNumber);
};

// API Endpoints

// Insert Card (Verify card exists)
app.post('/api/insertCard', (req, res) => {
  const { cardNumber } = req.body;

  const account = findAccount(cardNumber);
  if (!account) {
    return res.json({
      success: false,
      message: 'No such account exists.',
    });
  }

  res.json({
    success: true,
    message: 'Card inserted successfully.',
    data: { cardNumber },
  });
});

// Verify Biometric
app.post('/api/verifyBiometric', (req, res) => {
  const { cardNumber, biometricCode } = req.body;

  const account = findAccount(cardNumber);
  if (!account) {
    return res.json({
      success: false,
      message: 'No such account exists.',
    });
  }

  if (account.biometricCode !== biometricCode) {
    return res.json({
      success: false,
      message: 'Incorrect biometric code.',
    });
  }

  res.json({
    success: true,
    message: 'Biometric verified.',
  });
});

// Verify PIN
app.post('/api/verifyPin', (req, res) => {
  const { cardNumber, pin } = req.body;

  const account = findAccount(cardNumber);
  if (!account) {
    return res.json({
      success: false,
      message: 'No such account exists.',
    });
  }

  if (account.pin !== pin) {
    return res.json({
      success: false,
      message: 'Incorrect PIN code.',
    });
  }

  res.json({
    success: true,
    message: 'PIN verified.',
    data: {
      holderName: account.holderName,
      balance: account.balance,
    },
  });
});

// Perform Transaction
app.post('/api/transaction', (req, res) => {
  const { cardNumber, type, amount } = req.body;

  const account = findAccount(cardNumber);
  if (!account) {
    return res.json({
      success: false,
      message: 'No such account exists.',
    });
  }

  // Fraud Detection: Withdrawal limit (10,000 INR)
  if (type === 'withdraw' && amount > 10000) {
    return res.json({
      success: false,
      message: 'Fraud Alert: Withdrawal exceeds limit!',
    });
  }

  // Handle transaction types
  if (type === 'withdraw') {
    if (account.balance < amount) {
      return res.json({
        success: false,
        message: 'Insufficient balance!',
      });
    }
    account.balance -= amount;

    // Log transaction
    const txHash = generateTxHash(cardNumber, type, amount);
    transactions.push({
      txId: txHash,
      cardNumber,
      txType: type,
      amount,
      timestamp: new Date().toISOString(),
      status: 'success',
    });

    saveAccounts(); // Persist balance change

    return res.json({
      success: true,
      message: `Withdrawn: ${formatINR(amount)}`,
      data: { newBalance: account.balance },
    });
  } else if (type === 'deposit') {
    account.balance += amount;

    // Log transaction
    const txHash = generateTxHash(cardNumber, type, amount);
    transactions.push({
      txId: txHash,
      cardNumber,
      txType: type,
      amount,
      timestamp: new Date().toISOString(),
      status: 'success',
    });

    saveAccounts(); // Persist balance change

    return res.json({
      success: true,
      message: `Deposited: ${formatINR(amount)}`,
      data: { newBalance: account.balance },
    });
  } else if (type === 'balance') {
    return res.json({
      success: true,
      message: `Balance: ${formatINR(account.balance)}`,
      data: { balance: account.balance },
    });
  }

  res.json({
    success: false,
    message: 'Invalid transaction type.',
  });
});

// Get Balance
app.get('/api/balance/:cardNumber', (req, res) => {
  const { cardNumber } = req.params;

  const account = findAccount(cardNumber);
  if (!account) {
    return res.json({
      success: false,
      message: 'No such account exists.',
    });
  }

  res.json({
    success: true,
    data: {
      balance: account.balance,
      holderName: account.holderName,
    },
  });
});

// Get Transactions
app.get('/api/transactions', (req, res) => {
  const { cardNumber } = req.query;

  let filtered = transactions;
  if (cardNumber) {
    filtered = transactions.filter((tx) => tx.cardNumber === cardNumber);
  }

  res.json({
    success: true,
    data: filtered,
  });
});

// Eject Card (Reset session)
app.post('/api/ejectCard', (req, res) => {
  res.json({
    success: true,
    message: 'Card ejected successfully.',
  });
});

// Get API Status
app.get('/api/status', (req, res) => {
  res.json({
    database: 'connected',
    server: 'running',
    timestamp: new Date().toISOString(),
  });
});

// Get All Accounts (Admin) - Now includes full details
app.get('/api/accounts', (req, res) => {
  const accountsData = accounts.map((acc) => ({
    cardNumber: acc.cardNumber,
    holderName: acc.holderName,
    balance: acc.balance,
    biometricCode: acc.biometricCode,
    pin: acc.pin,
  }));

  res.json({
    success: true,
    data: accountsData,
  });
});

// Add New Account (Admin)
app.post('/api/accounts/add', (req, res) => {
  const { cardNumber, holderName, balance, biometricCode, pin } = req.body;

  // Validation
  if (!cardNumber || cardNumber.length !== 16) {
    return res.json({
      success: false,
      message: 'Card number must be exactly 16 digits.',
    });
  }

  if (!pin || pin.length !== 4) {
    return res.json({
      success: false,
      message: 'PIN must be exactly 4 digits.',
    });
  }

  if (balance < 0) {
    return res.json({
      success: false,
      message: 'Balance cannot be negative.',
    });
  }

  // Check if account already exists
  if (findAccount(cardNumber)) {
    return res.json({
      success: false,
      message: 'Account with this card number already exists.',
    });
  }

  // Add new account
  const newAccount = {
    cardNumber,
    holderName,
    pin,
    biometricCode,
    balance: parseFloat(balance) || 0,
  };

  accounts.push(newAccount);
  saveAccounts();

  res.json({
    success: true,
    message: 'Account added successfully.',
    data: {
      cardNumber: newAccount.cardNumber,
      holderName: newAccount.holderName,
      balance: newAccount.balance,
    },
  });
});

// Delete Account (Admin)
app.delete('/api/accounts/delete/:cardNumber', (req, res) => {
  const { cardNumber } = req.params;

  const accountIndex = accounts.findIndex((acc) => acc.cardNumber === cardNumber);

  if (accountIndex === -1) {
    return res.json({
      success: false,
      message: 'Account not found.',
    });
  }

  const deletedAccount = accounts[accountIndex];
  accounts.splice(accountIndex, 1);
  saveAccounts();

  // Also remove related transactions
  const removedTxCount = transactions.length;
  transactions = transactions.filter((tx) => tx.cardNumber !== cardNumber);
  const newTxCount = transactions.length;

  res.json({
    success: true,
    message: `Account deleted successfully. ${removedTxCount - newTxCount} related transactions removed.`,
    data: {
      cardNumber: deletedAccount.cardNumber,
      holderName: deletedAccount.holderName,
    },
  });
});

// Initialize accounts on startup
loadAccounts();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 ATM Backend Server running on http://localhost:${PORT}`);
  console.log(`✅ Mock database loaded with ${accounts.length} accounts`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`💰 Currency: Indian Rupee (INR)`);
});
