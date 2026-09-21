// Grade Level Categorised Difficulty System for FCTA Civil Service CBT Examinations

export interface DifficultyTierInfo {
  level: number; // 1, 2, or 3
  code: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3';
  title: string;
  badgeLabel: string;
  gradeLevels: string; // e.g. "GL 07 - GL 09"
  targetRanks: string; // e.g. "Officer II, Officer I, Senior Officer"
  cognitiveFocus: string;
  statutoryScope: string;
  questionArchetypes: string[];
  passingRequirement: string;
  description: string;
}

export const DIFFICULTY_TIERS: DifficultyTierInfo[] = [
  {
    level: 1,
    code: 'LEVEL_1',
    title: 'Foundational & Statutory Recall',
    badgeLabel: 'Level 1: Foundational (GL 07 - 09)',
    gradeLevels: 'GL 07 - GL 09',
    targetRanks: 'Officer II, Officer I, Senior Officer / Junior Professional',
    cognitiveFocus: 'Factual recall of codified rules, procedural timelines, leave days, confirmation period, basic terminology',
    statutoryScope: 'PSR Chapters 1-8, Financial Regulations basic vouchers, Public Procurement Act fundamental definitions, FCT geographic and administrative history',
    questionArchetypes: [
      'Direct rule citation (e.g. maximum casual leave days, probationary tenure)',
      'Identification of competent statutory authorities (e.g. FCSC, OHCSF, Accounting Officer)',
      'Basic definition of public funds, imprest, storekeeping classification',
      'Fundamental Area Councils and historical creation dates of Abuja FCT'
    ],
    passingRequirement: '60% statutory threshold for confirmation & junior promotion',
    description: 'Calibrated for junior officers mastering operational procedures, civil service ethics, and core foundational regulations.'
  },
  {
    level: 2,
    code: 'LEVEL_2',
    title: 'Supervisory & Tactical Compliance',
    badgeLabel: 'Level 2: Supervisory (GL 10 - 13)',
    gradeLevels: 'GL 10 - GL 13',
    targetRanks: 'Principal Officer, Assistant Chief, Chief Officer / Sectional Heads',
    cognitiveFocus: 'Procedural application, vetting vouchers, disciplinary query procedures, intermediate tenders board thresholds, supervision',
    statutoryScope: 'PSR Disciplinary procedures (Chapter 3/4), Financial Regulations expenditure approvals, PPA Ministerial/Departmental Tenders Boards, FCTA Secretariats & SDAs',
    questionArchetypes: [
      'Application of disciplinary procedures (72-hour query rule, serious misconduct classifications)',
      'Audit query handling, payment voucher verification, loss of public funds boards',
      'Departmental Tenders Board composition, bid evaluation margins, procurement planning',
      'Departmental coordination and Area Council joint governance protocols'
    ],
    passingRequirement: '60% minimum (65%+ recommended for competitive promotion quotas)',
    description: 'Calibrated for middle-management and sectional heads responsible for operational oversight and regulatory enforcement.'
  },
  {
    level: 3,
    code: 'LEVEL_3',
    title: 'Strategic Directorate & Executive Leadership',
    badgeLabel: 'Level 3: Directorate (GL 14 - 16)',
    gradeLevels: 'GL 14 - GL 16',
    targetRanks: 'Assistant Director, Deputy Director, Director / Senior Directorate & Executive Cadre',
    cognitiveFocus: 'Multi-statutory harmonization, complex administrative scenarios, Federal Executive Council (FEC) procurement thresholds, fiscal responsibility, senior disciplinary tribunals, executive memoranda drafting',
    statutoryScope: 'Directorate-level PSR (interdiction, public interest retirement, tenure policy), Fiscal Responsibility Act vs. FR, PPA Section 58 penal sanctions & FEC approvals, FCTA Civil Service Commission Act, Land Use Act, Master Plan governance',
    questionArchetypes: [
      'Cross-statutory conflict resolution (e.g. conflicting directives between Circulars, PSR, and Procurement Act)',
      'High-stakes procurement scenarios (tender splitting offenses, BPP Certificate of No Objection thresholds, emergency procurement)',
      'Directorate administrative law (principles of natural justice in disciplinary committees, interdiction vs. suspension with full/half pay)',
      'Strategic executive memoranda drafting standards and Cabinet secretariat compliance',
      'FCTA Ministerial executive power delegation under Sections 299 & 302 of the 1999 Constitution'
    ],
    passingRequirement: '60% statutory pass mark (70%+ required for substantive Director / Assistant Director elevation)',
    description: 'Calibrated specifically for Directorate-rank candidates facing rigorous promotional examinations, complex scenario analysis, and executive interview panels.'
  }
];

export function getDifficultyTier(level: number = 3): DifficultyTierInfo {
  return DIFFICULTY_TIERS.find((t) => t.level === level) || DIFFICULTY_TIERS[2];
}

export function getDifficultyForGradeLevel(gradeLevel: string): DifficultyTierInfo {
  const glClean = gradeLevel.toUpperCase().replace(/\s+/g, '');
  const num = parseInt(glClean.replace('GL', ''), 10);

  if (isNaN(num)) return DIFFICULTY_TIERS[2]; // Default to Level 3

  if (num <= 9) return DIFFICULTY_TIERS[0]; // Level 1
  if (num <= 13) return DIFFICULTY_TIERS[1]; // Level 2
  return DIFFICULTY_TIERS[2]; // Level 3 (GL 14, 15, 16)
}

export const LEVEL_3_DIRECTORATE_TIER = DIFFICULTY_TIERS[2];
