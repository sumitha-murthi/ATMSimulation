import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { Toast as ToastType } from '@/hooks/useToast';

interface ToastProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'bg-success text-white',
  error: 'bg-error text-white',
  info: 'bg-primary text-white',
  warning: 'bg-accent text-textPrimary',
};

export const Toast = ({ toasts, onRemove }: ToastProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className={`${colors[toast.type]} px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 min-w-[320px] max-w-md`}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <p className="flex-1 font-medium">{toast.message}</p>
              <button
                onClick={() => onRemove(toast.id)}
                className="hover:opacity-80 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
