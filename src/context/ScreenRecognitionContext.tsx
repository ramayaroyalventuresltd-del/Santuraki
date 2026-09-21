import React, { createContext, useContext, ReactNode } from 'react';
import { useScreenRecognition } from '../utils/useScreenRecognition';
import { ScreenDeviceType, ScreenRecognitionInfo } from '../types';

interface ScreenRecognitionContextType extends ScreenRecognitionInfo {
  setForcedMode: (mode: ScreenDeviceType | 'auto') => void;
  notification: {
    message: string;
    type: ScreenDeviceType;
    dimensions: string;
  } | null;
  dismissNotification: () => void;
}

const ScreenRecognitionContext = createContext<ScreenRecognitionContextType | null>(null);

export const ScreenRecognitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const recognition = useScreenRecognition();

  return (
    <ScreenRecognitionContext.Provider value={recognition}>
      {children}
    </ScreenRecognitionContext.Provider>
  );
};

export function useScreen(): ScreenRecognitionContextType {
  const ctx = useContext(ScreenRecognitionContext);
  if (!ctx) {
    throw new Error('useScreen must be used within a ScreenRecognitionProvider');
  }
  return ctx;
}
