import React from 'react';
import { useScreen } from '../context/ScreenRecognitionContext';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Check, 
  Sparkles, 
  X, 
  Compass, 
  Cpu, 
  SlidersHorizontal,
  HelpCircle,
  Eye,
  RotateCcw
} from 'lucide-react';

interface ScreenRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScreenRecognitionModal: React.FC<ScreenRecognitionModalProps> = ({ isOpen, onClose }) => {
  const {
    deviceType,
    rawDeviceType,
    width,
    height,
    orientation,
    breakpoint,
    pixelRatio,
    touchCapable,
    aspectRatio,
    isForced,
    forcedMode,
    setForcedMode,
  } = useScreen();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
              {deviceType === 'desktop' && <Monitor className="w-5 h-5" />}
              {deviceType === 'tablet' && <Tablet className="w-5 h-5" />}
              {deviceType === 'mobile' && <Smartphone className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Auto Screen Recognition
                </h2>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automatic viewport sensing and layout adaptation for FCTA CBT Examination candidates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* Active Screen Recognition Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-700/80 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-3 mb-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Hardware Screen Status
                </span>
                <div className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                  <span className="capitalize">{deviceType}</span> Screen
                  {isForced && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Simulated View
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
                  {width} × {height} px
                </span>
                <span className="text-xs font-mono px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  {orientation}
                </span>
              </div>
            </div>

            {/* Technical Telemetry Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Breakpoint</span>
                <span className="font-mono font-bold text-white text-sm">
                  {breakpoint.toUpperCase()} ({width >= 1024 ? '≥1024px' : width >= 768 ? '≥768px' : '<768px'})
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Aspect Ratio</span>
                <span className="font-mono font-bold text-white text-sm">{aspectRatio}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Pixel Density</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{pixelRatio.toFixed(1)}x DPR</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Touch Input</span>
                <span className="font-semibold text-white text-sm">
                  {touchCapable ? 'Touchscreen' : 'Mouse & Keys'}
                </span>
              </div>
            </div>
          </div>

          {/* Three Supported Device Formats */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Tailored Layout Adaptations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Desktop Tier */}
              <div className={`p-4 rounded-2xl border transition-all ${
                deviceType === 'desktop' 
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30' 
                  : 'bg-slate-850/60 border-slate-800 opacity-80'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm text-white">Desktop</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">≥ 1024px</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Dual-column CBT examination workstation, side-by-side question palette, keyboard accelerators (A, B, C, D, N, P, F), and wide 3,600 question search tables.
                </p>
                {deviceType === 'desktop' && (
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Currently Active
                  </div>
                )}
              </div>

              {/* Tablet Tier */}
              <div className={`p-4 rounded-2xl border transition-all ${
                deviceType === 'tablet' 
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30' 
                  : 'bg-slate-850/60 border-slate-800 opacity-80'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tablet className="w-4 h-4 text-teal-400" />
                    <span className="font-bold text-sm text-white">Tablet</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">768px – 1023px</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Touch-enhanced option cards with 48px+ tap targets, fluid grid layouts, slide-out question drawer, and balanced font sizes for reading PSR and FR texts.
                </p>
                {deviceType === 'tablet' && (
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Currently Active
                  </div>
                )}
              </div>

              {/* Mobile Tier */}
              <div className={`p-4 rounded-2xl border transition-all ${
                deviceType === 'mobile' 
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30' 
                  : 'bg-slate-850/60 border-slate-800 opacity-80'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-sm text-white">Mobile</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">&lt; 768px</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Single-column vertical flow, thumb-friendly sticky bottom navigation (Prev, Next, Flag), compact voice reader, and full-screen mobile exam view.
                </p>
                {deviceType === 'mobile' && (
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Currently Active
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Viewport Recognition Override & Testing Mode */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                Screen Mode Selector & Simulation Testing:
              </span>
              {isForced && (
                <button
                  onClick={() => setForcedMode('auto')}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restore Auto Recognition
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setForcedMode('auto')}
                className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                  forcedMode === 'auto'
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 text-xs'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" /> Auto Detect
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">Live Hardware</div>
              </button>

              <button
                type="button"
                onClick={() => setForcedMode('desktop')}
                className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                  forcedMode === 'desktop'
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 text-xs'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-center gap-1">
                  <Monitor className="w-3 h-3" /> Desktop
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">Dual-Column UI</div>
              </button>

              <button
                type="button"
                onClick={() => setForcedMode('tablet')}
                className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                  forcedMode === 'tablet'
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 text-xs'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-center gap-1">
                  <Tablet className="w-3 h-3" /> Tablet
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">Touch & Slide</div>
              </button>

              <button
                type="button"
                onClick={() => setForcedMode('mobile')}
                className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                  forcedMode === 'mobile'
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 text-xs'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-center gap-1">
                  <Smartphone className="w-3 h-3" /> Mobile
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">Compact Stream</div>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Detected: <strong className="text-white capitalize">{rawDeviceType}</strong> ({width}px)
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
