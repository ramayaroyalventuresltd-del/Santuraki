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
  RotateCcw,
  Layout,
  Settings,
  Sun,
  Moon,
  Check
} from 'lucide-react';

interface PageSettingsBarProps {
  pageFitMode?: 'standard' | 'full';
  onTogglePageFit?: () => void;
  onOpenSettings?: () => void;
  onQuickResetSettings?: () => void;
}

export const PageSettingsBar: React.FC<PageSettingsBarProps> = ({
  pageFitMode = 'standard',
  onTogglePageFit,
  onOpenSettings,
  onQuickResetSettings,
}) => {
  const { 
    forcedMode, 
    isForced, 
    setForcedMode, 
  } = useScreen();
  const { theme, toggleTheme, isNavyWhite } = useTheme();
  const [resetDone, setResetDone] = useState(false);

  const viewModes: { id: ScreenDeviceType | 'auto'; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'auto',
      label: 'Auto Detect',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-500" />,
      desc: 'Adaptive Hardware Sensing',
    },
    {
      id: 'desktop',
      label: 'Desktop',
      icon: <Monitor className="w-3.5 h-3.5 text-blue-500" />,
      desc: 'Widescreen Viewport',
    },
    {
      id: 'tablet',
      label: 'Tablet',
      icon: <Tablet className="w-3.5 h-3.5 text-indigo-500" />,
      desc: '768px Touch Display',
    },
    {
      id: 'mobile',
      label: 'Mobile',
      icon: <Smartphone className="w-3.5 h-3.5 text-rose-500" />,
      desc: '390px Smartphone View',
    },
  ];

  const handleQuickReset = () => {
    if (onQuickResetSettings) {
      onQuickResetSettings();
    } else {
      setForcedMode('auto');
    }
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2500);
  };

  return (
    <div 
      id="page-settings-view-bar"
      className={`border-b text-xs transition-colors select-none ${
        isNavyWhite 
          ? 'bg-blue-50/95 border-blue-200 text-slate-700' 
          : 'bg-[#050f20]/95 border-blue-900/60 text-slate-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: View Mode Quick Switcher */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 text-blue-500 mr-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden sm:inline">Page Settings:</span> Screen Mode
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
                  title={`${mode.label}: ${mode.desc}`}
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

          {/* Quick restore to hardware auto button if forced */}
          {isForced && (
            <button
              onClick={() => setForcedMode('auto')}
              className={`px-2 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isNavyWhite
                  ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  : 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/50'
              }`}
              title="Reset Screen to Hardware Auto-Detect"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Auto Detect</span>
            </button>
          )}
        </div>

        {/* Right: Layout Canvas Fit, Theme Quick Switch & Reset Application Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Page Fit Mode Toggle */}
          {onTogglePageFit && (
            <button
              onClick={onTogglePageFit}
              title={pageFitMode === 'standard' ? 'Switch to Full-Width Edge-to-Edge Canvas' : 'Switch to Standard Centered Content Box (1280px)'}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isNavyWhite
                  ? 'bg-white border-blue-200 text-blue-900 hover:bg-blue-50'
                  : 'bg-blue-950/60 border-blue-800 text-blue-200 hover:bg-blue-900'
              }`}
            >
              <Layout className="w-3 h-3 text-blue-500" />
              <span className="hidden sm:inline">{pageFitMode === 'standard' ? 'Fit Standard' : 'Fit Edge-to-Edge'}</span>
            </button>
          )}

          {/* Quick Theme Switch */}
          <button
            onClick={toggleTheme}
            title={`Toggle Theme (Current: ${isNavyWhite ? 'Navy Blue & White' : 'Midnight Navy'})`}
            className={`p-1.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              isNavyWhite
                ? 'bg-white border-blue-200 text-slate-700 hover:bg-blue-50'
                : 'bg-blue-950/60 border-blue-800 text-blue-200 hover:bg-blue-900'
            }`}
          >
            {isNavyWhite ? <Moon className="w-3.5 h-3.5 text-indigo-500" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Reset Settings Quick Action */}
          <button
            id="btn-quick-reset-settings"
            onClick={handleQuickReset}
            title="Reset Application Settings to Defaults (Navy & White theme, Auto screen detect, Standard layout)"
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              resetDone
                ? 'bg-emerald-600 text-white border-emerald-700'
                : isNavyWhite
                ? 'bg-white border-blue-200 text-slate-700 hover:bg-blue-50 hover:text-blue-900'
                : 'bg-blue-950/60 border-blue-800 text-slate-300 hover:text-white hover:bg-blue-900'
            }`}
          >
            {resetDone ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>Reset!</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3 h-3 text-blue-500" />
                <span className="hidden md:inline">Reset Settings</span>
              </>
            )}
          </button>

          {/* Full Settings Modal Trigger */}
          {onOpenSettings && (
            <button
              id="btn-open-settings-modal"
              onClick={onOpenSettings}
              title="Open Complete Application Settings"
              className={`px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs`}
            >
              <Settings className="w-3 h-3" />
              <span>Settings</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
