import { createContext, useContext, useState, ReactNode } from 'react';
import type { ATMState } from '@/types';

interface ATMContextType {
  currentState: ATMState;
  cardNumber: string;
  setCardNumber: (card: string) => void;
  setState: (state: ATMState) => void;
  resetATM: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ATMContext = createContext<ATMContextType | undefined>(undefined);

export const ATMProvider = ({ children }: { children: ReactNode }) => {
  const [currentState, setCurrentState] = useState<ATMState>('idle');
  const [cardNumber, setCardNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setState = (state: ATMState) => {
    setCurrentState(state);
  };

  const resetATM = () => {
    setCurrentState('idle');
    setCardNumber('');
    setIsLoading(false);
  };

  return (
    <ATMContext.Provider
      value={{
        currentState,
        cardNumber,
        setCardNumber,
        setState,
        resetATM,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ATMContext.Provider>
  );
};

export const useATM = () => {
  const context = useContext(ATMContext);
  if (context === undefined) {
    throw new Error('useATM must be used within an ATMProvider');
  }
  return context;
};
