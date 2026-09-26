import React, { useState } from 'react';
import { FCTA_SDAS, GRADE_LEVELS, FCTA_CADRES } from '../data/fctaData';
import { useTheme } from '../context/ThemeContext';
import { 
  Building2, 
  Layers, 
  Briefcase, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Info,
  MapPin,
  Users
} from 'lucide-react';

export const DirectoryView: React.FC = () => {
  const { isNavyWhite } = useTheme();
  const [activeTab, setActiveTab] = useState<'sdas' | 'grades' | 'cadres'>('sdas');
  const [sdaSearch, setSdaSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredSdas = FCTA_SDAS.filter((sda) => {
    const matchCat = categoryFilter === 'all' || sda.category === categoryFilter;
    const q = sdaSearch.toLowerCase().trim();
    const matchQuery = 
      !q || 
      sda.name.toLowerCase().includes(q) || 
      sda.abbreviation.toLowerCase().includes(q) || 
      sda.mandate.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-4 px-3 sm:py-8 sm:px-6 lg:px-8 transition-colors ${
      isNavyWhite ? 'bg-[#f4f7fb] text-slate-800' : 'bg-[#07152b] text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className={`border-b pb-6 ${isNavyWhite ? 'border-blue-200' : 'border-slate-800'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Administrative Structures
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold ${isNavyWhite ? 'text-[#07152b]' : 'text-white'}`}>
            FCTA Secretariat, Department & Agency (SDA) Directory
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isNavyWhite ? 'text-slate-600' : 'text-slate-300'}`}>
            Complete institutional reference of all Mandate Secretariats, Common Services Departments, Agencies, Area Councils, and Public Service Grade Levels (GL 07 - GL 16).
          </p>
        </div>

        {/* View Selection Tabs */}
        <div className={`flex flex-wrap items-center gap-2 border-b pb-3 ${isNavyWhite ? 'border-blue-200' : 'border-slate-800'}`}>
          <button
            onClick={() => setActiveTab('sdas')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'sdas'
                ? 'bg-blue-700 text-white shadow-md'
                : isNavyWhite
                ? 'bg-white text-slate-700 hover:bg-blue-50 border border-blue-200'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>FCTA SDAs & Agencies ({FCTA_SDAS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('grades')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'grades'
                ? 'bg-blue-700 text-white shadow-md'
                : isNavyWhite
                ? 'bg-white text-slate-700 hover:bg-blue-50 border border-blue-200'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Grade Levels (GL 07 to GL 16)</span>
          </button>

          <button
            onClick={() => setActiveTab('cadres')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'cadres'
                ? 'bg-blue-700 text-white shadow-md'
                : isNavyWhite
                ? 'bg-white text-slate-700 hover:bg-blue-50 border border-blue-200'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>FCTA Cadres ({FCTA_CADRES.length})</span>
          </button>
        </div>

        {/* Tab 1: SDAs */}
        {activeTab === 'sdas' && (
          <div className="space-y-4">
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={sdaSearch}
                  onChange={(e) => setSdaSearch(e.target.value)}
                  placeholder="Search SDAs by name, abbreviation, or mandate..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Categories ({FCTA_SDAS.length})</option>
                  <option value="secretariat">Mandate Secretariats</option>
                  <option value="department">Common Service Departments</option>
                  <option value="agency">Agencies & Parastatals</option>
                  <option value="board">Boards</option>
                  <option value="area_council">Area Councils (6)</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSdas.map((sda) => (
                <div
                  key={sda.id}
                  className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        sda.category === 'secretariat' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        sda.category === 'department' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        sda.category === 'area_council' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                        'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {sda.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {sda.abbreviation}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-sm leading-snug mb-2">
                      {sda.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {sda.mandate}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Office: {sda.leadOffice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Grade Levels (GL 07 - GL 16) */}
        {activeTab === 'grades' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                Comprehensive Grade Levels Directory (GL 07 - GL 16)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Progression criteria, promotion intervals, cadre designations, and statutory maturity guidelines per Public Service Rules.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4">Level</th>
                    <th className="py-3.5 px-4">Administrative Designation</th>
                    <th className="py-3.5 px-4">Cadre Rank Category</th>
                    <th className="py-3.5 px-4">Promotion Interval</th>
                    <th className="py-3.5 px-4">Operational Mandate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {GRADE_LEVELS.map((gl) => (
                    <tr key={gl.level} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-sm whitespace-nowrap">
                        {gl.level}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                        {gl.designation}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {gl.cadreRank}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                        {gl.yearsToNextPromotion} Years
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-lg">
                        {gl.responsibilities}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Cadres */}
        {activeTab === 'cadres' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FCTA_CADRES.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                      200 Exam Questions
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      20 Technical Modules
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {c.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Target Grade Levels:</span> GL 07 to GL 16
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
