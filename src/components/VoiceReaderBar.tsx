import React, { useEffect, useState } from 'react';
import { voiceReader, VoiceReaderState } from '../utils/speech';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  Gauge
} from 'lucide-react';

interface VoiceReaderBarProps {
  onSpeakCurrent: () => void;
  compact?: boolean;
}

export const VoiceReaderBar: React.FC<VoiceReaderBarProps> = ({ onSpeakCurrent, compact = false }) => {
  const [state, setState] = useState<VoiceReaderState>(voiceReader.getState());

  useEffect(() => {
    const unsubscribe = voiceReader.subscribe((updated) => {
      setState(updated);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!state.hasSpeechSupport) {
    return (
      <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/40 p-2 rounded border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
        <VolumeX className="w-3.5 h-3.5" />
        <span>Speech reader not supported by this browser.</span>
      </div>
    );
  }

  const handleTogglePlay = () => {
    if (state.isSpeaking) {
      if (state.isPaused) {
        voiceReader.resume();
      } else {
        voiceReader.pause();
      }
    } else {
      onSpeakCurrent();
    }
  };

  const handleStop = () => {
    voiceReader.stop();
  };

  const cycleRate = () => {
    const rates = [0.8, 1.0, 1.2, 1.4];
    const currentIndex = rates.indexOf(state.rate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    voiceReader.setRate(nextRate);
  };

  return (
    <div 
      id="voice-reader-toolbar"
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
        state.isSpeaking && !state.isPaused
          ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-700/50 text-emerald-900 dark:text-emerald-200'
          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <Volume2 className={`w-4 h-4 ${state.isSpeaking && !state.isPaused ? 'text-emerald-600 dark:text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
        <span className="text-xs font-semibold hidden sm:inline">Voice Reader</span>
      </div>

      <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1" />

      {/* Play/Pause Button */}
      <button
        id="btn-voice-toggle"
        onClick={handleTogglePlay}
        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
          state.isSpeaking && !state.isPaused
            ? 'bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
        }`}
        title={state.isSpeaking ? (state.isPaused ? 'Resume' : 'Pause') : 'Read Question Out Loud'}
      >
        {state.isSpeaking ? (
          state.isPaused ? (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3 h-3 fill-current" />
              <span>Pause</span>
            </>
          )
        ) : (
          <>
            <Play className="w-3 h-3 fill-current" />
            <span>Read Out</span>
          </>
        )}
      </button>

      {/* Stop Button */}
      {state.isSpeaking && (
        <button
          id="btn-voice-stop"
          onClick={handleStop}
          className="p-1 rounded text-xs text-rose-600 hover:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
          title="Stop reading"
        >
          <Square className="w-3 h-3 fill-current" />
        </button>
      )}

      {/* Speed Multiplier */}
      <button
        id="btn-voice-speed"
        onClick={cycleRate}
        className="px-1.5 py-0.5 rounded text-xs font-mono font-medium bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center gap-1 transition-colors"
        title="Change reading speed"
      >
        <Gauge className="w-3 h-3" />
        <span>{state.rate}x</span>
      </button>

      {/* Auto-read next toggle */}
      {!compact && (
        <label 
          htmlFor="chk-autoread"
          className="hidden md:flex items-center gap-1.5 ml-2 cursor-pointer text-xs select-none"
        >
          <input
            id="chk-autoread"
            type="checkbox"
            checked={state.autoReadOnNext}
            onChange={(e) => voiceReader.setAutoReadOnNext(e.target.checked)}
            className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-600"
          />
          <span className="text-slate-600 dark:text-slate-400">Auto-read next</span>
        </label>
      )}
    </div>
  );
};
