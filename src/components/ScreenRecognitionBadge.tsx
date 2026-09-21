import React, { useState } from 'react';
import { useScreen } from '../context/ScreenRecognitionContext';
import { ScreenRecognitionModal } from './ScreenRecognitionModal';
import { Monitor, Tablet, Smartphone, Sparkles } from 'lucide-react';

interface ScreenRecognitionBadgeProps {
  compact?: boolean;
}

export const ScreenRecognitionBadge: React.FC<ScreenRecognitionBadgeProps> = ({ compact = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { deviceType, width, height, isForced } = useScreen();

  const getIcon = () => {
    switch (deviceType) {
      case 'desktop':
        return <Monitor className="w-3.5 h-3.5 text-emerald-400" />;
      case 'tablet':
        return <Tablet className="w-3.5 h-3.5 text-teal-400" />;
      case 'mobile':
        return <Smartphone className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const getLabel = () => {
    switch (deviceType) {
      case 'desktop':
        return 'Desktop';
      case 'tablet':
        return 'Tablet';
      case 'mobile':
        return 'Mobile';
    }
  };

  return (
    <>
      <button
        id="btn-auto-screen-recognition"
        type="button"
        onClick={() => setModalOpen(true)}
        className="group px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-emerald-500/50 shadow-sm transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
        title={`Auto Screen Recognition: ${getLabel()} (${width} × ${height}px) - Click for Details`}
      >
        {/* Pulsing indicator dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        <span className="flex items-center gap-1.5">
          {getIcon()}
          <span className="font-bold text-white tracking-wide">
            {getLabel()}
          </span>
        </span>

        {!compact && (
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800 hidden sm:inline">
            {width}×{height}
          </span>
        )}

        {isForced && (
          <span className="text-[9px] uppercase px-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
            SIM
          </span>
        )}
      </button>

      <ScreenRecognitionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
