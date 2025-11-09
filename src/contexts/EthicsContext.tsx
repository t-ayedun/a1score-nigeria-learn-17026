import React, { createContext, useContext, useState, useEffect } from 'react';

interface EthicsState {
  isExamMode: boolean;
  aiUsageCount: number;
  ethicsScore: number;
  violations: string[];
  lastAIInteraction: Date | null;
  learningMode: 'independent' | 'assisted' | 'guided';
}

interface EthicsContextType {
  ethicsState: EthicsState;
  setExamMode: (enabled: boolean) => void;
  recordAIUsage: (type: 'helpful' | 'concerning') => void;
  addViolation: (violation: string) => void;
  setLearningMode: (mode: 'independent' | 'assisted' | 'guided') => void;
  getAITransparencyLevel: () => 'low' | 'medium' | 'high';
}

const EthicsContext = createContext<EthicsContextType | undefined>(undefined);

export const EthicsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ethicsState, setEthicsState] = useState<EthicsState>({
    isExamMode: false,
    aiUsageCount: 0,
    ethicsScore: 100,
    violations: [],
    lastAIInteraction: null,
    learningMode: 'guided'
  });

  const setExamMode = (enabled: boolean) => {
    setEthicsState(prev => ({ ...prev, isExamMode: enabled }));
  };

  const recordAIUsage = (type: 'helpful' | 'concerning') => {
    setEthicsState(prev => ({
      ...prev,
      aiUsageCount: prev.aiUsageCount + 1,
      lastAIInteraction: new Date(),
      ethicsScore: type === 'helpful' ? 
        Math.min(prev.ethicsScore + 1, 100) : 
        Math.max(prev.ethicsScore - 5, 0)
    }));
  };

  const addViolation = (violation: string) => {
    setEthicsState(prev => ({
      ...prev,
      violations: [...prev.violations, violation],
      ethicsScore: Math.max(prev.ethicsScore - 10, 0)
    }));
  };

  const setLearningMode = (mode: 'independent' | 'assisted' | 'guided') => {
    setEthicsState(prev => ({ ...prev, learningMode: mode }));
  };

  const getAITransparencyLevel = (): 'low' | 'medium' | 'high' => {
    if (ethicsState.aiUsageCount > 50) return 'high';
    if (ethicsState.aiUsageCount > 20) return 'medium';
    return 'low';
  };

  return (
    <EthicsContext.Provider value={{
      ethicsState,
      setExamMode,
      recordAIUsage,
      addViolation,
      setLearningMode,
      getAITransparencyLevel
    }}>
      {children}
    </EthicsContext.Provider>
  );
};

export const useEthics = () => {
  const context = useContext(EthicsContext);
  if (context === undefined) {
    throw new Error('useEthics must be used within an EthicsProvider');
  }
  return context;
};