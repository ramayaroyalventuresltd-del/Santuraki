import React from 'react';
import { useScreen } from '../context/ScreenRecognitionContext';
import { X } from 'lucide-react';
import { getDeviceIcon } from '../utils/deviceIcons';

export const ScreenRecognitionToast: React.FC = () => {
  const { notification, dismissNotification } = useScreen();

  if (!notification) return null;

  return (
    <div 
      id="screen-recognition-toast"
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 border-2 border-emerald-500/60 rounded-2xl shadow-2xl p-4 text-slate-100 flex items-start gap-3 animate-slideUp"
      role="alert"
    >
      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
        {getDeviceIcon(notification.type, 'w-5 h-5')}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
            Auto Screen Recognition
          </span>
        </div>
        <h4 className="text-xs font-extrabold text-white truncate">
          {notification.message}
        </h4>
        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
          Resolution: {notification.dimensions}
        </p>
      </div>

      <button
        onClick={dismissNotification}
        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        title="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
