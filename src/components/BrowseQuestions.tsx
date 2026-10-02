import React, { useState, useMemo } from 'react';
import { questionBank } from '../data/questionBank';
import { FCTA_CADRES } from '../data/fctaData';
import { voiceReader } from '../utils/speech';
import { useTheme } from '../context/ThemeContext';
import { 
  HelpCircle, 
  Search, 
  Eye, 
  EyeOff, 
  Volume2, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';

export const BrowseQuestions: React.FC = () => {
  const { isNavyWhite } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('psr');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  // Category questions
  const categoryQuestions = useMemo(() => {
    return questionBank.getQuestionsByCategory(selectedCategory);
  }, [selectedCategory]);

  // Filtered by tier, chapter & search
  const filteredQuestions = useMemo(() => {
    return categoryQuestions.filter((q) => {
      const matchTier = selectedTier === 'all' || (q.difficultyLevel || 2) === selectedTier;
      const matchChapter = selectedChapter === 'all' || q.chapterNumber === selectedChapter;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery = 
        !query ||
        q.questionText.toLowerCase().includes(query) ||
        q.options.some((o) => o.toLowerCase().includes(query)) ||
        q.explanation.toLowerCase().includes(query) ||
        (q.referenceRule && q.referenceRule.toLowerCase().includes(query));
      return matchTier && matchChapter && matchQuery;
    });
  }, [categoryQuestions, selectedTier, selectedChapter, searchQuery]);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSpeak = (qText: string, options: string[]) => {
    voiceReader.speakQuestion(1, qText, options);
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-4 px-3 sm:py-8 sm:px-6 lg:px-8 transition-colors ${
      isNavyWhite ? 'bg-[#f4f7fb] text-slate-800' : 'bg-[#07152b] text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
          isNavyWhite ? 'border-blue-200' : 'border-slate-800'
        }`}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${
              isNavyWhite 
                ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}>
              <HelpCircle className="w-3.5 h-3.5" />
              Verified FCTA Question Repository
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold ${isNavyWhite ? 'text-[#07152b]' : 'text-white'}`}>
              Explore {questionBank.getTotalQuestionsCount().toLocaleString()} Examination Questions
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${isNavyWhite ? 'text-slate-600' : 'text-slate-300'}`}>
              Browse all {questionBank.getTotalQuestionsCount().toLocaleString()} curated questions across PSR (200), FR (200), PPA (200), FCT GK (200), and all {FCTA_CADRES.length} FCTA Cadres ({(FCTA_CADRES.length * 200).toLocaleString()}).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${
              isNavyWhite 
                ? 'bg-white text-blue-900 border-blue-200 shadow-xs' 
                : 'bg-slate-800 text-emerald-400 border-slate-700'
            }`}>
              Showing {filteredQuestions.length} Questions
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className={`p-5 rounded-2xl border space-y-4 shadow-lg transition-colors ${
          isNavyWhite 
            ? 'bg-white border-blue-100 shadow-blue-950/5' 
            : 'bg-slate-800/90 border-slate-700'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Category Domain */}
            <div>
              <label htmlFor="browse-category" className={`block text-xs font-semibold uppercase mb-1 ${
                isNavyWhite ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Domain / Cadre:
              </label>
              <select
                id="browse-category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedChapter('all');
                }}
                className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 ${
                  isNavyWhite 
                    ? 'bg-slate-50 border-blue-200 text-slate-800' 
                    : 'bg-slate-900 border-slate-700 text-white'
                }`}
              >
                <optgroup label="Regulatory Core (200 Qs Each)">
                  <option value="psr">Public Service Rules (PSR - 200 Qs)</option>
                  <option value="fr">Financial Regulations (FR - 200 Qs)</option>
                  <option value="ppa">Public Procurement Act (PPA - 200 Qs)</option>
                  <option value="fct_gk">FCT General Knowledge (200 Qs)</option>
                </optgroup>
                <optgroup label={`FCTA Professional Cadres (${FCTA_CADRES.length} Cadres - 200 Qs Each)`}>
                  {FCTA_CADRES.map((cadre) => (
                    <option key={cadre.id} value={cadre.id}>
                      {cadre.name} (200 Qs)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Four-Tier Exam Filter */}
            <div>
              <label htmlFor="browse-tier" className={`block text-xs font-semibold uppercase mb-1 ${
                isNavyWhite ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Exam Tier:
              </label>
              <select
                id="browse-tier"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 ${
                  isNavyWhite 
                    ? 'bg-slate-50 border-blue-200 text-slate-800' 
                    : 'bg-slate-900 border-slate-700 text-white'
                }`}
              >
                <option value="all">All 4 Tiers (GL 03 - 16)</option>
                <option value={1}>Tier 1: Junior (GL 03 - 06)</option>
                <option value={2}>Tier 2: Officer & Exec (GL 07 - 10)</option>
                <option value={3}>Tier 3: Senior / Mgt (GL 12 - 14)</option>
                <option value={4}>Tier 4: Directorate (GL 15 - 16)</option>
              </select>
            </div>

            {/* Chapter Filter */}
            <div>
              <label htmlFor="browse-chapter" className={`block text-xs font-semibold uppercase mb-1 ${
                isNavyWhite ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Chapter Filter (1-20):
              </label>
              <select
                id="browse-chapter"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 ${
                  isNavyWhite 
                    ? 'bg-slate-50 border-blue-200 text-slate-800' 
                    : 'bg-slate-900 border-slate-700 text-white'
                }`}
              >
                <option value="all">All 20 Chapters (200 Qs)</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((chNum) => (
                  <option key={chNum} value={chNum}>
                    Chapter {chNum} (10 Questions)
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search */}
            <div className="sm:col-span-2">
              <label htmlFor="browse-search" className={`block text-xs font-semibold uppercase mb-1 ${
                isNavyWhite ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Search Question Keywords / Rules:
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="browse-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. query, misconduct, procurement, civil service rule..."
                  className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isNavyWhite 
                      ? 'bg-slate-50 border-blue-200 text-slate-800 placeholder:text-slate-400' 
                      : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isRevealed = revealedIds.has(q.id);

            return (
              <div
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-all ${
                  isNavyWhite 
                    ? 'bg-white border-blue-100 shadow-sm text-slate-800' 
                    : 'bg-slate-800/80 border-slate-700/80 text-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${
                      isNavyWhite 
                        ? 'bg-blue-50 text-blue-900 border-blue-200' 
                        : 'bg-slate-900 text-emerald-400 border-slate-700'
                    }`}>
                      Q{idx + 1}
                    </span>
                    {q.tierCode ? (
                      <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {q.tierCode === 'TIER_1' ? 'Tier 1 (GL 03-06)' :
                         q.tierCode === 'TIER_2' ? 'Tier 2 (GL 07-10)' :
                         q.tierCode === 'TIER_3' ? 'Tier 3 (GL 12-14)' :
                         'Tier 4 (GL 15-16)'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                        {q.gradeLevelCategory || 'GL 07 - 16'}
                      </span>
                    )}
                    <span className={`text-xs font-semibold ${isNavyWhite ? 'text-slate-600' : 'text-slate-300'}`}>
                      {q.categoryLabel} • Chapter {q.chapterNumber}: {q.chapterTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Read Out Button */}
                    <button
                      onClick={() => handleSpeak(q.questionText, q.options)}
                      className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 border transition-colors cursor-pointer ${
                        isNavyWhite 
                          ? 'bg-slate-50 hover:bg-blue-50 text-blue-900 border-blue-200' 
                          : 'bg-slate-900 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                      title="Read question out loud"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-emerald-400" />
                      <span className="hidden sm:inline">Read</span>
                    </button>

                    {/* Reveal Answer Button */}
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isRevealed
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : isNavyWhite
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                      }`}
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide Answer</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show Answer</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className={`text-sm sm:text-base font-semibold ${isNavyWhite ? 'text-slate-900' : 'text-white'}`}>
                  {q.questionText}
                </p>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = q.correctOptionIndex === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                          isRevealed && isCorrect
                            ? isNavyWhite
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold'
                              : 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                            : isNavyWhite
                            ? 'bg-slate-50/80 border-slate-200 text-slate-700'
                            : 'bg-slate-900/60 border-slate-700/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            isRevealed && isCorrect ? 'bg-emerald-600 text-white border-emerald-600' : ''
                          }`}>
                            {letter}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isRevealed && isCorrect && (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/80 px-2 py-0.5 rounded">
                            Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation (if revealed) */}
                {isRevealed && (
                  <div className={`p-4 rounded-xl border text-xs space-y-1.5 transition-colors ${
                    isNavyWhite 
                      ? 'bg-blue-50/70 border-blue-200 text-slate-800' 
                      : 'bg-slate-900 border-slate-700/80 text-slate-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <strong className={`font-semibold flex items-center gap-1.5 ${
                        isNavyWhite ? 'text-blue-900' : 'text-emerald-400'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Civil Service Explanation:
                      </strong>
                      {q.referenceRule && (
                        <span className={`font-mono text-[11px] px-2 py-0.5 rounded border ${
                          isNavyWhite 
                            ? 'bg-white text-blue-900 border-blue-200' 
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {q.referenceRule}
                        </span>
                      )}
                    </div>
                    <p className={`leading-relaxed pt-1 ${isNavyWhite ? 'text-slate-700' : 'text-slate-300'}`}>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
