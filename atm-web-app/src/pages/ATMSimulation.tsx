import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Fingerprint,
  Lock,
  DollarSign,
  LogOut,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react';
import { useATM } from '@/context/ATMContext';
import { useToast } from '@/hooks/useToast';
import { atmApi } from '@/api/atmApi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Toast } from '@/components/Toast';
import { formatINR } from '@/utils/currency';

export const ATMSimulation = () => {
  const { currentState, cardNumber, setCardNumber, setState, resetATM, isLoading, setIsLoading } = useATM();
  const { toasts, showToast, removeToast } = useToast();

  const [inputValue, setInputValue] = useState('');
  const [transactionType, setTransactionType] = useState<'withdraw' | 'deposit' | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [holderName, setHolderName] = useState('');
  const [logs, setLogs] = useState<string[]>(['ATM Ready - Please insert your card']);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleInsertCard = async () => {
    if (!inputValue.trim()) {
      showToast('Please enter a card number', 'error');
      return;
    }

    setIsLoading(true);
    addLog(`Inserting card: ${inputValue}`);

    try {
      const response = await atmApi.insertCard(inputValue);
      if (response.success) {
        setCardNumber(inputValue);
        setState('cardInserted');
        showToast('Card inserted successfully', 'success');
        addLog('Card verified - Please enter biometric code');
        setInputValue('');
      } else {
        showToast(response.message, 'error');
        addLog(`Error: ${response.message}`);
      }
    } catch (error) {
      showToast('Failed to verify card', 'error');
      addLog('System error during card verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometric = async () => {
    if (!inputValue.trim()) {
      showToast('Please enter biometric code', 'error');
      return;
    }

    setIsLoading(true);
    addLog('Verifying biometric data...');

    try {
      const response = await atmApi.verifyBiometric(cardNumber, inputValue);
      if (response.success) {
        setState('biometric');
        showToast('Biometric verified', 'success');
        addLog('Biometric verified - Please enter PIN');
        setInputValue('');
      } else {
        showToast(response.message, 'error');
        addLog(`Biometric verification failed: ${response.message}`);
        handleEjectCard();
      }
    } catch (error) {
      showToast('Biometric verification failed', 'error');
      addLog('System error during biometric verification');
      handleEjectCard();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePin = async () => {
    if (!inputValue.trim()) {
      showToast('Please enter PIN', 'error');
      return;
    }

    setIsLoading(true);
    addLog('Verifying PIN...');

    try {
      const response = await atmApi.verifyPin(cardNumber, inputValue);
      if (response.success) {
        setState('transaction');
        setHolderName(response.data?.holderName || 'User');
        showToast('PIN verified - Welcome!', 'success');
        addLog(`Access granted - Welcome ${response.data?.holderName}`);
        setInputValue('');

        // Fetch balance
        const balanceResponse = await atmApi.getBalance(cardNumber);
        if (balanceResponse.success) {
          setBalance(balanceResponse.data.balance);
        }
      } else {
        showToast(response.message, 'error');
        addLog(`PIN verification failed: ${response.message}`);
        handleEjectCard();
      }
    } catch (error) {
      showToast('PIN verification failed', 'error');
      addLog('System error during PIN verification');
      handleEjectCard();
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransaction = async (type: 'withdraw' | 'deposit' | 'balance') => {
    if (type !== 'balance') {
      setTransactionType(type);
      addLog(`Selected: ${type}`);
      return;
    }

    setIsLoading(true);
    addLog('Fetching balance...');

    try {
      const response = await atmApi.getBalance(cardNumber);
      if (response.success) {
        setBalance(response.data.balance);
        showToast(`Balance: ${formatINR(response.data.balance)}`, 'info');
        addLog(`Current balance: ${formatINR(response.data.balance)}`);
      } else {
        showToast('Failed to fetch balance', 'error');
        addLog('Balance inquiry failed');
      }
    } catch (error) {
      showToast('System error', 'error');
      addLog('System error during balance inquiry');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmTransaction = async () => {
    if (!transactionType || !inputValue.trim()) {
      showToast('Please enter amount', 'error');
      return;
    }

    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      showToast('Invalid amount', 'error');
      return;
    }

    setIsLoading(true);
    addLog(`Processing ${transactionType}: ${formatINR(amount)}`);

    try {
      const response = await atmApi.performTransaction({
        cardNumber,
        type: transactionType,
        amount,
      });

      if (response.success) {
        showToast(response.message, 'success');
        addLog(`${transactionType} successful: ${formatINR(amount)}`);

        // Update balance
        const balanceResponse = await atmApi.getBalance(cardNumber);
        if (balanceResponse.success) {
          setBalance(balanceResponse.data.balance);
        }

        setTransactionType(null);
        setInputValue('');
      } else {
        showToast(response.message, 'error');
        addLog(`Transaction failed: ${response.message}`);
      }
    } catch (error) {
      showToast('Transaction failed', 'error');
      addLog('System error during transaction');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEjectCard = async () => {
    addLog('Ejecting card...');

    try {
      await atmApi.ejectCard(cardNumber);
      showToast('Card ejected - Thank you!', 'info');
      addLog('Card ejected - Session ended');
    } catch (error) {
      addLog('Session ended');
    }

    resetATM();
    setInputValue('');
    setTransactionType(null);
    setBalance(null);
    setHolderName('');
    setTimeout(() => {
      setLogs(['ATM Ready - Please insert your card']);
    }, 500);
  };

  const renderKeypad = () => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', 'Enter'];

    return (
      <div className="grid grid-cols-3 gap-3">
        {keys.map((key) => (
          <motion.button
            key={key}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (key === 'Clear') {
                setInputValue('');
              } else if (key === 'Enter') {
                if (currentState === 'idle') handleInsertCard();
                else if (currentState === 'cardInserted') handleBiometric();
                else if (currentState === 'biometric') handlePin();
                else if (transactionType) handleConfirmTransaction();
              } else {
                setInputValue((prev) => prev + key);
              }
            }}
            className="keypad-button"
            disabled={isLoading}
          >
            {key}
          </motion.button>
        ))}
      </div>
    );
  };

  const getScreenContent = () => {
    switch (currentState) {
      case 'idle':
        return (
          <div className="text-center space-y-6">
            <CreditCard className="w-16 h-16 mx-auto animate-pulse-slow" />
            <h2 className="text-2xl font-bold">Welcome to Smart ATM</h2>
            <p>Please insert your card</p>
            <div className="mt-8">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter card number"
                className="bg-gray-800 text-green-400 px-4 py-3 rounded-lg w-full font-mono text-center text-lg border-2 border-green-400/30 focus:border-green-400 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>
        );

      case 'cardInserted':
        return (
          <div className="text-center space-y-6">
            <Fingerprint className="w-16 h-16 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold">Biometric Verification</h2>
            <p>Card: {cardNumber.replace(/(.{4})/g, '$1 ')}</p>
            <div className="mt-8">
              <input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter biometric code"
                className="bg-gray-800 text-green-400 px-4 py-3 rounded-lg w-full font-mono text-center text-lg border-2 border-green-400/30 focus:border-green-400 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>
        );

      case 'biometric':
        return (
          <div className="text-center space-y-6">
            <Lock className="w-16 h-16 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold">PIN Verification</h2>
            <p>Please enter your 4-digit PIN</p>
            <div className="mt-8">
              <input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="****"
                maxLength={4}
                className="bg-gray-800 text-green-400 px-4 py-3 rounded-lg w-full font-mono text-center text-2xl tracking-widest border-2 border-green-400/30 focus:border-green-400 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>
        );

      case 'transaction':
        if (transactionType) {
          return (
            <div className="text-center space-y-6">
              <DollarSign className="w-16 h-16 mx-auto" />
              <h2 className="text-2xl font-bold capitalize">{transactionType}</h2>
              <p>Enter amount</p>
              <div className="mt-8">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="0.00"
                  className="bg-gray-800 text-green-400 px-4 py-3 rounded-lg w-full font-mono text-center text-2xl border-2 border-green-400/30 focus:border-green-400 focus:outline-none"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={() => setTransactionType(null)}
                className="text-sm text-red-400 hover:text-red-300 underline"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          );
        }

        return (
          <div className="text-center space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Welcome, {holderName}!</h2>
              {balance !== null && (
                <p className="text-xl">Balance: <span className="font-bold">{formatINR(balance)}</span></p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 mt-8">
              <button
                onClick={() => handleTransaction('withdraw')}
                className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 px-6 py-4 rounded-xl transition-colors"
                disabled={isLoading}
              >
                <ArrowDownCircle className="w-6 h-6" />
                <span className="font-semibold">Withdraw</span>
              </button>

              <button
                onClick={() => handleTransaction('deposit')}
                className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 px-6 py-4 rounded-xl transition-colors"
                disabled={isLoading}
              >
                <ArrowUpCircle className="w-6 h-6" />
                <span className="font-semibold">Deposit</span>
              </button>

              <button
                onClick={() => handleTransaction('balance')}
                className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 px-6 py-4 rounded-xl transition-colors"
                disabled={isLoading}
              >
                <Wallet className="w-6 h-6" />
                <span className="font-semibold">Check Balance</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-darkBg dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <Toast toasts={toasts} onRemove={removeToast} />

      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 text-primary dark:text-accent"
        >
          ATM Simulation Terminal
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ATM Machine */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border-8 border-gray-700"
          >
            {/* Screen */}
            <div className="atm-screen mb-6 relative">
              {isLoading ? (
                <LoadingSpinner size="lg" text="Processing..." />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentState}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {getScreenContent()}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {currentState !== 'transaction' || transactionType ? (
                renderKeypad()
              ) : null}

              {/* Eject Button */}
              {currentState !== 'idle' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEjectCard}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                  disabled={isLoading}
                >
                  <LogOut className="w-5 h-5" />
                  Eject Card
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Logs Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="card h-fit max-h-[600px] overflow-hidden flex flex-col"
          >
            <h3 className="text-xl font-bold mb-4 text-primary dark:text-accent">Transaction Log</h3>
            <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-xl">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {log}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Test Accounts Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-6"
        >
          <h3 className="text-xl font-bold mb-4 text-primary dark:text-accent">Test Accounts</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
              <p className="font-semibold">Card: 1111222233334444</p>
              <p>Biometric: 123456789 | PIN: 1234</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
              <p className="font-semibold">Card: 2222333344445555</p>
              <p>Biometric: 987654321 | PIN: 2345</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
