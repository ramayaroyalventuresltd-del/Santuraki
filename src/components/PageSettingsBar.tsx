import React, { useState } from 'react';
import { useScreen } from '../context/ScreenRecognitionContext';
import { useTheme } from '../context/ThemeContext';
import { ScreenDeviceType } from '../types';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sparkles, 
  SlidersHorizontal, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Layout
} from 'lucide-react';

interface PageSettingsBarProps {
  pageFitMode?: 'standard' | 'full';
  onTogglePageFit?: () => void;
}

export const PageSettingsBar: React.FC<PageSettingsBarProps> = ({
  pageFitMode = 'standard',
  onTogglePageFit,
}) => {
  const { 
    deviceType, 
    rawDeviceType, 
    width, 
    height, 
    forcedMode, 
    isForced, 
    setForcedMode, 
    aspectRatio, 
    orientation 
  } = useScreen();
  const { isNavyWhite } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const viewModes: { id: ScreenDeviceType | 'auto'; label: string; icon: React.ReactNode; desc: string; widthLabel: string }[] = [
    {
      id: 'auto',
      label: 'Auto Detect',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      desc: 'Adaptive Hardware Sensing',
      widthLabel: `${width}px`,
    },
    {
      id: 'desktop',
      label: 'Desktop',
      icon: <Monitor className="w-3.5 h-3.5" />,
      desc: 'Widescreen Workstation',
      widthLabel: '≥1024px',
    },
    {
      id: 'tablet',
      label: 'Tablet',
      icon: <Tablet className="w-3.5 h-3.5" />,
      desc: '768px Touch Display',
      widthLabel: '768px',
    },
    {
      id: 'mobile',
      label: 'Mobile',
      icon: <Smartphone className="w-3.5 h-3.5" />,
      desc: '390px Smartphone View',
      widthLabel: '390px',
    },
  ];

  return (
    <div 
      id="page-settings-view-bar"
      className={`border-b text-xs transition-colors select-none ${
        isNavyWhite 
          ? 'bg-blue-50/90 border-blue-200 text-slate-700' 
          : 'bg-[#050f20]/95 border-blue-900/60 text-slate-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: View Mode Quick Switcher */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-blue-500 mr-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden sm:inline">Page Settings:</span> View Mode
          </span>

          <div className={`flex items-center p-0.5 rounded-xl border ${
            isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#091b36] border-blue-950'
          }`}>
            {viewModes.map((mode) => {
              const isActive = forcedMode === mode.id;

              return (
                <button
                  key={mode.id}
                  id={`btn-view-mode-${mode.id}`}
                  onClick={() => setForcedMode(mode.id)}
                  title={`${mode.label}: ${mode.desc} (${mode.widthLabel})`}
                  className={`px-2 py-1 rounded-lg font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : isNavyWhite
                      ? 'text-slate-600 hover:text-blue-900 hover:bg-blue-100/50'
                      : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* If forced mode is active, quick restore hardware button */}
          {isForced && (
            <button
              onClick={() => setForcedMode('auto')}
              className={`px-2 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isNavyWhite
                  ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  : 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/50'
              }`}
              title="Reset to Hardware Screen Detection"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Reset to Hardware</span>
            </button>
          )}
        </div>

        {/* Right: Telemetry & Layout Fit Controls */}
        <div className="flex items-center gap-2">
          {/* Page Fit Mode Toggle if provided */}
          {onTogglePageFit && (
            <button
              onClick={onTogglePageFit}
              title={pageFitMode === 'standard' ? 'Switch to Full-Width Edge-to-Edge Canvas' : 'Switch to Standard Centered Content Box'}
              className={`px-2 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isNavyWhite
                  ? 'bg-white border-blue-200 text-blue-900 hover:bg-blue-50'
                  : 'bg-blue-950/60 border-blue-800 text-blue-200 hover:bg-blue-900'
              }`}
            >
              <Layout className="w-3 h-3 text-blue-400" />
              <span className="hidden sm:inline">{pageFitMode === 'standard' ? 'Fit Standard' : 'Fit Full-Width'}</span>
            </button>
          )}

          {/* Live Resolution Pill */}
          <div className={`px-2 py-0.5 rounded-md font-mono text-[10px] hidden sm:flex items-center gap-1 border ${
            isNavyWhite ? 'bg-white border-blue-200 text-slate-600' : 'bg-[#091b36] border-blue-900 text-blue-300'
          }`}>
            <span>{width}×{height}px</span>
            <span className="text-slate-400">•</span>
            <span className="capitalize">{orientation}</span>
          </div>

          {/* Expand Details Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1 rounded-md transition-colors cursor-pointer ${
              isNavyWhite ? 'hover:bg-blue-100 text-slate-600' : 'hover:bg-blue-900 text-slate-300'
            }`}
            title={isOpen ? 'Collapse Details' : 'Expand View Details'}
          >
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Details Drawer */}
      {isOpen && (
        <div className={`border-t px-4 py-3 text-xs transition-all ${
          isNavyWhite ? 'bg-white/90 border-blue-100 text-slate-700' : 'bg-[#07152b] border-blue-900/60 text-slate-300'
        }`}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Sensed Hardware</span>
              <span className="font-semibold text-blue-500 capitalize">{rawDeviceType} Viewport</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Layout Mode</span>
              <span className="font-semibold capitalize text-emerald-500">
                {isForced ? `Simulated ${forcedMode} View` : 'Hardware Auto-Detected'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Aspect Ratio</span>
              <span className="font-mono">{aspectRatio}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Responsive Target</span>
              <span className="font-semibold">GL 07 - GL 16 Public Service Portal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
