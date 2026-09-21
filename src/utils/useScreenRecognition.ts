import { useState, useEffect, useCallback } from 'react';
import { ScreenDeviceType, ScreenRecognitionInfo } from '../types';

const STORAGE_KEY = 'thesanturakiyauri_screen_mode';

function computeRawDeviceType(width: number): ScreenDeviceType {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function computeBreakpoint(width: number): ScreenRecognitionInfo['breakpoint'] {
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}

function computeAspectRatio(width: number, height: number): string {
  if (!height || !width) return '16:9';
  const ratio = width / height;
  if (Math.abs(ratio - 16 / 9) < 0.1) return '16:9';
  if (Math.abs(ratio - 16 / 10) < 0.1) return '16:10';
  if (Math.abs(ratio - 4 / 3) < 0.1) return '4:3';
  if (Math.abs(ratio - 3 / 2) < 0.1) return '3:2';
  if (Math.abs(ratio - 9 / 16) < 0.1) return '9:16 (Portrait)';
  if (Math.abs(ratio - 3 / 4) < 0.1) return '3:4 (Portrait)';
  return `${ratio.toFixed(2)}:1`;
}

export function useScreenRecognition() {
  const [forcedMode, setForcedModeState] = useState<ScreenDeviceType | 'auto'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'desktop' || saved === 'tablet' || saved === 'mobile' || saved === 'auto') {
        return saved;
      }
    } catch {
      // Ignore
    }
    return 'auto';
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: ScreenDeviceType;
    dimensions: string;
  } | null>(null);

  const getSnapshot = useCallback((): ScreenRecognitionInfo => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    const rawDeviceType = computeRawDeviceType(width);
    const deviceType = forcedMode === 'auto' ? rawDeviceType : forcedMode;
    const orientation = width >= height ? 'landscape' : 'portrait';
    const breakpoint = computeBreakpoint(width);
    const pixelRatio = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    const touchCapable = typeof window !== 'undefined' && (
      'ontouchstart' in window || 
      (navigator && navigator.maxTouchPoints > 0)
    );
    const aspectRatio = computeAspectRatio(width, height);

    return {
      deviceType,
      rawDeviceType,
      width,
      height,
      orientation,
      breakpoint,
      pixelRatio,
      touchCapable,
      aspectRatio,
      isForced: forcedMode !== 'auto',
      forcedMode,
    };
  }, [forcedMode]);

  const [screenInfo, setScreenInfo] = useState<ScreenRecognitionInfo>(getSnapshot);

  // Set forced mode
  const setForcedMode = useCallback((mode: ScreenDeviceType | 'auto') => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore
    }
    setForcedModeState(mode);
  }, []);

  useEffect(() => {
    let prevRawType = screenInfo.rawDeviceType;

    const handleResize = () => {
      const next = getSnapshot();
      setScreenInfo(next);

      // Trigger switch toast if hardware device type transitioned
      if (next.rawDeviceType !== prevRawType) {
        prevRawType = next.rawDeviceType;
        const typeLabel = next.rawDeviceType.toUpperCase();
        setNotification({
          message: `Auto-Recognized: Switched to ${typeLabel} Screen`,
          type: next.rawDeviceType,
          dimensions: `${next.width} × ${next.height}px`,
        });

        // Auto dismiss after 3.5s
        setTimeout(() => {
          setNotification(null);
        }, 3500);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getSnapshot, screenInfo.rawDeviceType]);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    ...screenInfo,
    setForcedMode,
    notification,
    dismissNotification,
  };
}
