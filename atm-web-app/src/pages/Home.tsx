import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Shield,
  Fingerprint,
  Lock,
  Workflow,
  Database,
  ArrowRight,
  Github,
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Multi-Factor Authentication',
      description: 'Secure three-layer authentication: Card + Biometric + PIN verification',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Fingerprint,
      title: 'Biometric Security',
      description: 'Advanced biometric verification for enhanced account protection',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Lock,
      title: 'Fraud Detection',
      description: 'Real-time fraud detection with intelligent transaction limits',
      color: 'text-red-600 dark:text-red-400',
    },
    {
      icon: Workflow,
      title: 'State-Driven Flow',
      description: 'Implements State Design Pattern for seamless transaction management',
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: Database,
      title: 'Real Bank Integration',
      description: 'Connected to Oracle Database via secure Proxy Pattern architecture',
      color: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      icon: CreditCard,
      title: 'Complete Transactions',
      description: 'Withdraw, Deposit, and Balance inquiry with cryptographic logging',
      color: 'text-indigo-600 dark:text-indigo-400',
    },
  ];

  const techStack = [
    { name: 'Java', color: '#f89820' },
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Oracle DB', color: '#F80000' },
    { name: 'Node.js', color: '#68a063' },
    { name: 'Tailwind', color: '#38bdf8' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-primary dark:from-gray-900 dark:via-gray-800 dark:to-darkBg">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-3xl mb-8 shadow-2xl"
            >
              <CreditCard className="w-10 h-10 text-primary" />
            </motion.div>

            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">
              Smart ATM
              <br />
              <span className="text-accent">Simulation System</span>
            </h1>

            <p className="text-xl sm:text-2xl text-blue-100 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Experience secure, multi-authentication ATM transactions with real-world banking logic
              and enterprise-level design patterns.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/atm')}
                className="bg-accent hover:bg-yellow-500 text-primary font-bold py-4 px-8 rounded-2xl shadow-2xl flex items-center gap-2 text-lg"
              >
                Launch ATM
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
                className="bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl border-2 border-white/30 flex items-center gap-2 text-lg"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background dark:bg-darkBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-textPrimary dark:text-white mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built with modern software design patterns and secure banking principles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                <div className={`${feature.color} mb-4 inline-block p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-textPrimary dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary dark:text-white mb-12">
              Built With Modern Technologies
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-8">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-xl font-semibold shadow-md"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-800 dark:from-gray-900 dark:to-darkBg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Experience Smart Banking?
            </h2>
            <p className="text-xl text-blue-100 dark:text-gray-300 mb-8">
              Try our ATM simulation with pre-loaded test accounts
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/atm')}
              className="bg-accent hover:bg-yellow-500 text-primary font-bold py-4 px-10 rounded-2xl shadow-2xl text-lg"
            >
              Start Simulation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-accent" />
              <span className="font-bold text-xl">Smart ATM Simulation</span>
            </div>

            <div className="flex gap-6 text-gray-400">
              <button onClick={() => navigate('/about')} className="hover:text-accent transition-colors">
                About
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <button onClick={() => navigate('/admin')} className="hover:text-accent transition-colors">
                Admin
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Smart ATM Simulation. Educational project demonstrating enterprise software patterns.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
