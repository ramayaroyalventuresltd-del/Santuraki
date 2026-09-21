// Text-to-speech engine using Web Speech API (SpeechSynthesis)

export interface VoiceReaderState {
  isSpeaking: boolean;
  isPaused: boolean;
  rate: number;
  autoReadOnNext: boolean;
  hasSpeechSupport: boolean;
}

export type StateListener = (state: VoiceReaderState) => void;

class VoiceReaderEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<StateListener> = new Set();
  
  private state: VoiceReaderState = {
    isSpeaking: false,
    isPaused: false,
    rate: 1.0,
    autoReadOnNext: false,
    hasSpeechSupport: typeof window !== 'undefined' && 'speechSynthesis' in window,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  public setRate(rate: number) {
    this.state.rate = rate;
    this.notify();
    // If currently speaking, restart with new rate
    if (this.state.isSpeaking && !this.state.isPaused && this.currentUtterance) {
      const text = this.currentUtterance.text;
      this.stop();
      this.speakText(text);
    }
  }

  public setAutoReadOnNext(enabled: boolean) {
    this.state.autoReadOnNext = enabled;
    this.notify();
  }

  public stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.currentUtterance = null;
    this.state.isSpeaking = false;
    this.state.isPaused = false;
    this.notify();
  }

  public pause() {
    if (!this.synth || !this.state.isSpeaking) return;
    this.synth.pause();
    this.state.isPaused = true;
    this.notify();
  }

  public resume() {
    if (!this.synth || !this.state.isPaused) return;
    this.synth.resume();
    this.state.isPaused = false;
    this.notify();
  }

  public speakQuestion(
    questionNumber: number,
    questionText: string,
    options: string[] | [string, string, string, string]
  ) {
    const letters = ['Option A', 'Option B', 'Option C', 'Option D'];
    const optionsText = options.map((opt, i) => `${letters[i] || `Option ${i + 1}`}: ${opt}.`).join(' ');
    const fullText = `Question ${questionNumber}. ${questionText}. Here are the options: ${optionsText}`;
    this.speakText(fullText);
  }

  public speakText(text: string) {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.state.rate;
    utterance.pitch = 1.0;

    // Pick natural English voice if available
    const voices = this.synth.getVoices();
    const enVoice = voices.find(
      (v) => (v.lang.startsWith('en-NG') || v.lang.startsWith('en-GB') || v.lang.startsWith('en-US')) && !v.name.includes('Google')
    ) || voices.find((v) => v.lang.startsWith('en'));
    
    if (enVoice) {
      utterance.voice = enVoice;
    }

    utterance.onstart = () => {
      this.state.isSpeaking = true;
      this.state.isPaused = false;
      this.notify();
    };

    utterance.onend = () => {
      this.state.isSpeaking = false;
      this.state.isPaused = false;
      this.currentUtterance = null;
      this.notify();
    };

    utterance.onerror = (e) => {
      // Ignore if canceled intentionally
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      console.warn('SpeechSynthesis error:', e);
      this.state.isSpeaking = false;
      this.state.isPaused = false;
      this.currentUtterance = null;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public getState(): VoiceReaderState {
    return { ...this.state };
  }
}

export const voiceReader = new VoiceReaderEngine();
