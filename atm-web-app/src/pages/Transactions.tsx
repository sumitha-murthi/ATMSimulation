import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Filter, ArrowUpCircle, ArrowDownCircle, Wallet, Hash } from 'lucide-react';
import { atmApi } from '@/api/atmApi';
import type { Transaction } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/Toast';
import { formatINR, formatINRPlain } from '@/utils/currency';

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'withdraw' | 'deposit' | 'balance'>('all');
  const [searchCard, setSearchCard] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, filterType, searchCard]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await atmApi.getTransactions();
      if (response.success) {
        setTransactions(response.data);
      } else {
        showToast('Failed to load transactions', 'error');
      }
    } catch (error) {
      showToast('Error fetching transactions', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter((tx) => tx.txType === filterType);
    }

    // Filter by card number
    if (searchCard.trim()) {
      filtered = filtered.filter((tx) =>
        tx.cardNumber.toLowerCase().includes(searchCard.toLowerCase())
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const downloadCSV = () => {
    const headers = ['Date', 'Card Number', 'Type', 'Amount', 'Status', 'Transaction Hash'];
    const rows = filteredTransactions.map((tx) => [
      new Date(tx.timestamp).toLocaleString(),
      tx.cardNumber,
      tx.txType,
      formatINRPlain(tx.amount),
      tx.status,
      tx.txId,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    showToast('CSV downloaded successfully', 'success');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'withdraw':
        return <ArrowDownCircle className="w-5 h-5 text-red-500" />;
      case 'deposit':
        return <ArrowUpCircle className="w-5 h-5 text-green-500" />;
      case 'balance':
        return <Wallet className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const maskCardNumber = (card: string) => {
    return card.replace(/(.{4})/g, '$1 ').trim();
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading transactions..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <Toast toasts={toasts} onRemove={removeToast} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary dark:text-accent mb-2">
            Transaction History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all ATM transactions
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 flex-1">
              <Filter className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by card number..."
                value={searchCard}
                onChange={(e) => setSearchCard(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {(['all', 'withdraw', 'deposit', 'balance'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filterType === type
                      ? 'bg-primary dark:bg-accent text-white dark:text-textPrimary'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={downloadCSV}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-6"
        >
          <div className="card">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Total Transactions</p>
            <p className="text-3xl font-bold text-primary dark:text-accent">
              {filteredTransactions.length}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Total Withdrawn</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {formatINR(
                filteredTransactions
                  .filter((tx) => tx.txType === 'withdraw' && tx.status === 'success')
                  .reduce((sum, tx) => sum + tx.amount, 0)
              )}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Total Deposited</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {formatINR(
                filteredTransactions
                  .filter((tx) => tx.txType === 'deposit' && tx.status === 'success')
                  .reduce((sum, tx) => sum + tx.amount, 0)
              )}
            </p>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card overflow-hidden"
        >
          {currentTransactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No transactions found
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Date & Time</th>
                      <th className="px-6 py-4 text-left font-semibold">Card Number</th>
                      <th className="px-6 py-4 text-left font-semibold">Type</th>
                      <th className="px-6 py-4 text-right font-semibold">Amount</th>
                      <th className="px-6 py-4 text-center font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentTransactions.map((tx, index) => (
                      <motion.tr
                        key={tx.txId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(tx.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 font-mono">
                          {maskCardNumber(tx.cardNumber)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getTransactionIcon(tx.txType)}
                            <span className="capitalize">{tx.txType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold">
                          {formatINR(tx.amount)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              tx.status === 'success'
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm group relative">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {truncateHash(tx.txId)}
                            </span>
                          </div>
                          <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-2 rounded-lg -top-12 left-0 z-10 w-max max-w-md break-all shadow-lg">
                            {tx.txId}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};
