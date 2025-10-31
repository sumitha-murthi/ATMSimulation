import { motion } from 'framer-motion';
import { GitBranch, Shield, Repeat, Users } from 'lucide-react';

export const About = () => {
  const patterns = [
    {
      icon: GitBranch,
      title: 'State Pattern',
      description: 'ATM Flow Management',
      details:
        'The ATM uses the State Design Pattern to manage different operational states (Idle, Card Inserted, Biometric, PIN Verified, Transaction). Each state encapsulates specific behaviors and valid transitions, ensuring the ATM follows a secure, predictable flow.',
      states: ['Idle', 'Card Inserted', 'Biometric Verified', 'PIN Verified', 'Transaction Ready'],
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: Shield,
      title: 'Proxy Pattern',
      description: 'Secure Bank Access',
      details:
        'The Proxy Pattern provides a protective layer between the ATM and the real bank server. The BankProxy validates all requests before forwarding them to the RealBankServer, adding security checks, logging, and access control without modifying the core banking logic.',
      states: ['ATM', 'Bank Proxy (Validator)', 'Real Bank Server', 'Oracle Database'],
      color: 'from-green-500 to-green-700',
    },
    {
      icon: Repeat,
      title: 'Chain of Responsibility',
      description: 'Transaction Pipeline',
      details:
        'Transactions flow through a chain of handlers: Fraud Detection → Withdraw Handler → Deposit Handler → Balance Handler. Each handler processes specific transaction types or validates conditions, passing the request along the chain until handled or rejected.',
      states: ['Fraud Check', 'Withdraw', 'Deposit', 'Balance Inquiry'],
      color: 'from-purple-500 to-purple-700',
    },
  ];

  const teamMembers = [
    { name: 'Your Name', role: 'Full Stack Developer', contribution: 'Architecture & Implementation' },
    { name: 'Team Member 2', role: 'Backend Developer', contribution: 'Database Design & APIs' },
    { name: 'Team Member 3', role: 'Frontend Developer', contribution: 'UI/UX Design' },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-primary dark:text-accent mb-4">
            About Smart ATM
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive ATM simulation demonstrating enterprise software design patterns,
            secure banking operations, and modern web technologies.
          </p>
        </motion.div>

        {/* Design Patterns */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-textPrimary dark:text-white"
          >
            Software Design Patterns
          </motion.h2>

          <div className="space-y-8">
            {patterns.map((pattern, index) => (
              <motion.div
                key={pattern.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${pattern.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <pattern.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-textPrimary dark:text-white mb-2">
                      {pattern.title}
                    </h3>
                    <p className="text-primary dark:text-accent font-semibold mb-3">
                      {pattern.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{pattern.details}</p>

                    {/* Flow Diagram */}
                    <div className="flex flex-wrap items-center gap-2">
                      {pattern.states.map((state, idx) => (
                        <div key={state} className="flex items-center">
                          <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
                            {state}
                          </div>
                          {idx < pattern.states.length - 1 && (
                            <svg
                              className="w-6 h-6 mx-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Architecture Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-textPrimary dark:text-white">
            System Architecture
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Backend */}
            <div>
              <h3 className="text-xl font-bold text-primary dark:text-accent mb-4">
                Backend (Java)
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>ATM Package:</strong> State pattern implementation for flow control
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Bank Package:</strong> Proxy pattern for secure operations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Transactions Package:</strong> Chain of Responsibility for processing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Oracle Database:</strong> Persistent storage with JDBC integration
                  </span>
                </li>
              </ul>
            </div>

            {/* Frontend */}
            <div>
              <h3 className="text-xl font-bold text-primary dark:text-accent mb-4">
                Frontend (React)
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>React + TypeScript:</strong> Type-safe component architecture
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Tailwind CSS:</strong> Modern, responsive styling system
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Framer Motion:</strong> Smooth animations and transitions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Context API:</strong> State management for ATM and theme
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-textPrimary dark:text-white">
            Security Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Multi-Factor Auth',
                desc: 'Card + Biometric + PIN verification',
              },
              {
                title: 'Fraud Detection',
                desc: 'Transaction limit validation',
              },
              {
                title: 'SHA-256 Hashing',
                desc: 'Cryptographic transaction logging',
              },
              {
                title: 'SQL Injection Prevention',
                desc: 'Prepared statements in all queries',
              },
              {
                title: 'Session Management',
                desc: 'Secure state tracking per card',
              },
              {
                title: 'Input Validation',
                desc: 'Client and server-side checks',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl"
              >
                <h4 className="font-bold text-primary dark:text-accent mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card"
        >
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-primary dark:text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-textPrimary dark:text-white">
              Meet the Team
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-lg text-textPrimary dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary dark:text-accent font-semibold text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.contribution}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
