import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Server,
  Users,
  Activity,
  RefreshCw,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { atmApi } from '@/api/atmApi';
import type { Account, ApiStatus } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/Toast';
import { formatINR } from '@/utils/currency';

export const Admin = () => {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'accounts'>('dashboard');

  // Form state for adding accounts
  const [newAccount, setNewAccount] = useState({
    cardNumber: '',
    holderName: '',
    pin: '',
    biometricCode: '',
    balance: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statusResponse, accountsResponse] = await Promise.all([
        atmApi.getApiStatus(),
        atmApi.getAllAccounts(),
      ]);

      setApiStatus(statusResponse);
      if (accountsResponse.success) {
        setAccounts(accountsResponse.data);
      }
    } catch (error) {
      showToast('Failed to load admin data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    showToast('Data refreshed successfully', 'success');
    setIsRefreshing(false);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!newAccount.cardNumber || newAccount.cardNumber.length !== 16) {
      errors.cardNumber = 'Card number must be exactly 16 digits';
    }

    if (!newAccount.holderName || newAccount.holderName.trim().length === 0) {
      errors.holderName = 'Account holder name is required';
    }

    if (!newAccount.pin || newAccount.pin.length !== 4) {
      errors.pin = 'PIN must be exactly 4 digits';
    }

    if (!newAccount.biometricCode || newAccount.biometricCode.length < 6) {
      errors.biometricCode = 'Biometric code must be at least 6 digits';
    }

    const balance = parseFloat(newAccount.balance);
    if (isNaN(balance) || balance < 0) {
      errors.balance = 'Balance must be a non-negative number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAccount = async () => {
    if (!validateForm()) {
      showToast('Please fix validation errors', 'error');
      return;
    }

    try {
      const response = await atmApi.addAccount({
        cardNumber: newAccount.cardNumber,
        holderName: newAccount.holderName,
        pin: newAccount.pin,
        biometricCode: newAccount.biometricCode,
        balance: parseFloat(newAccount.balance),
      });

      if (response.success) {
        showToast('Account added successfully', 'success');
        setShowAddModal(false);
        setNewAccount({
          cardNumber: '',
          holderName: '',
          pin: '',
          biometricCode: '',
          balance: '',
        });
        setFormErrors({});
        await fetchData();
      } else {
        showToast(response.message || 'Failed to add account', 'error');
      }
    } catch (error) {
      showToast('Error adding account', 'error');
    }
  };

  const handleDeleteAccount = async () => {
    if (!selectedAccount) return;

    try {
      const response = await atmApi.deleteAccount(selectedAccount.cardNumber);

      if (response.success) {
        showToast('Account deleted successfully', 'success');
        setShowDeleteModal(false);
        setSelectedAccount(null);
        await fetchData();
      } else {
        showToast(response.message || 'Failed to delete account', 'error');
      }
    } catch (error) {
      showToast('Error deleting account', 'error');
    }
  };

  const maskCardNumber = (card: string) => {
    return card.replace(/(.{4})/g, '$1 ').trim();
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading admin console..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <Toast toasts={toasts} onRemove={removeToast} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-primary dark:text-accent mb-2">
              Admin Console
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              System monitoring and account management
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-primary dark:bg-accent text-white dark:text-textPrimary shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            System Dashboard
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'accounts'
                ? 'bg-primary dark:bg-accent text-white dark:text-textPrimary shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Account Management
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Status Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                    <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Database</p>
                    <div className="flex items-center gap-2 mt-1">
                      {apiStatus?.database === 'connected' ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-bold text-green-600 dark:text-green-400">
                            Connected
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="font-bold text-red-600 dark:text-red-400">
                            Disconnected
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                    <Server className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Server</p>
                    <div className="flex items-center gap-2 mt-1">
                      {apiStatus?.server === 'running' ? (
                        <>
                          <Activity className="w-5 h-5 text-green-500 animate-pulse" />
                          <span className="font-bold text-green-600 dark:text-green-400">Running</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="font-bold text-red-600 dark:text-red-400">Stopped</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                    <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Accounts</p>
                    <p className="text-2xl font-bold text-textPrimary dark:text-white">
                      {accounts.length}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                    <Database className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
                    <p className="text-2xl font-bold text-textPrimary dark:text-white">
                      {formatINR(totalBalance)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* System Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary dark:text-accent">System Info</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Last Updated</p>
                  <p className="font-mono text-textPrimary dark:text-white">
                    {apiStatus?.timestamp
                      ? new Date(apiStatus.timestamp).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Backend</p>
                  <p className="font-semibold text-textPrimary dark:text-white">
                    Node.js + Express
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Database</p>
                  <p className="font-semibold text-textPrimary dark:text-white">
                    JSON File Storage
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Accounts Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">
                Account Overview
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Card Number</th>
                      <th className="px-6 py-4 text-left font-semibold">Account Holder</th>
                      <th className="px-6 py-4 text-right font-semibold">Balance</th>
                      <th className="px-6 py-4 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {accounts.map((account, index) => (
                      <motion.tr
                        key={account.cardNumber}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono">
                          {maskCardNumber(account.cardNumber)}
                        </td>
                        <td className="px-6 py-4 font-semibold">{account.holderName}</td>
                        <td className="px-6 py-4 text-right font-bold text-green-600 dark:text-green-400">
                          {formatINR(account.balance)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                            Active
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* API Endpoints Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="card mt-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary dark:text-accent">
                API Endpoints
              </h2>
              <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
                {[
                  'POST /api/insertCard',
                  'POST /api/verifyBiometric',
                  'POST /api/verifyPin',
                  'POST /api/transaction',
                  'GET /api/balance/:cardNumber',
                  'GET /api/transactions',
                  'GET /api/status',
                  'GET /api/accounts',
                  'POST /api/accounts/add',
                  'DELETE /api/accounts/delete/:cardNumber',
                ].map((endpoint, index) => (
                  <div
                    key={endpoint}
                    className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-textPrimary dark:text-white">{endpoint}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Account Management Tab */}
        {activeTab === 'accounts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary dark:text-accent">
                Account Management
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Account
              </motion.button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Card Number</th>
                    <th className="px-6 py-4 text-left font-semibold">Holder Name</th>
                    <th className="px-6 py-4 text-right font-semibold">Balance</th>
                    <th className="px-6 py-4 text-center font-semibold">Biometric</th>
                    <th className="px-6 py-4 text-center font-semibold">PIN</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {accounts.map((account, index) => (
                    <motion.tr
                      key={account.cardNumber}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono">
                        {maskCardNumber(account.cardNumber)}
                      </td>
                      <td className="px-6 py-4 font-semibold">{account.holderName}</td>
                      <td className="px-6 py-4 text-right font-bold text-green-600 dark:text-green-400">
                        {formatINR(account.balance)}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-sm">
                        {account.biometricCode}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-sm">
                        {account.pin}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedAccount(account);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Account Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primary dark:text-accent">
                  Add New Account
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setFormErrors({});
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Card Number (16 digits)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={newAccount.cardNumber}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, cardNumber: e.target.value })
                    }
                    className="input-field"
                    placeholder="1234567890123456"
                  />
                  {formErrors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Account Holder Name</label>
                  <input
                    type="text"
                    value={newAccount.holderName}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, holderName: e.target.value })
                    }
                    className="input-field"
                    placeholder="John Doe"
                  />
                  {formErrors.holderName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.holderName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">PIN (4 digits)</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={newAccount.pin}
                    onChange={(e) => setNewAccount({ ...newAccount, pin: e.target.value })}
                    className="input-field"
                    placeholder="1234"
                  />
                  {formErrors.pin && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.pin}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Biometric Code (min 6 digits)
                  </label>
                  <input
                    type="text"
                    value={newAccount.biometricCode}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, biometricCode: e.target.value })
                    }
                    className="input-field"
                    placeholder="123456789"
                  />
                  {formErrors.biometricCode && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.biometricCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Initial Balance (INR)</label>
                  <input
                    type="number"
                    value={newAccount.balance}
                    onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                    className="input-field"
                    placeholder="5000.00"
                    step="0.01"
                    min="0"
                  />
                  {formErrors.balance && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.balance}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setFormErrors({});
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button onClick={handleAddAccount} className="btn-primary flex-1">
                  Add Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedAccount && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Delete Account
                </h3>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedAccount(null);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Are you sure you want to delete this account? This action cannot be undone.
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-2">
                  <p className="font-semibold">
                    Card: {maskCardNumber(selectedAccount.cardNumber)}
                  </p>
                  <p>Holder: {selectedAccount.holderName}</p>
                  <p>Balance: {formatINR(selectedAccount.balance)}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedAccount(null);
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex-1"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
