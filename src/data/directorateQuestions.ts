import { Question } from '../types';

// Curated high-yield Level 3 (GL 14 - GL 16 Directorate Standard) Examination Questions
// Emphasizes scenario-based judgment, cross-statutory harmonization, and executive civil service governance.

export const LEVEL_3_DIRECTORATE_QUESTIONS: Question[] = [
  // PSR Level 3 Questions (GL 14 - GL 16)
  {
    id: 'l3_psr_01',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 3,
    chapterTitle: 'Discipline, Inquiries & Directorate Sanctions',
    questionText: '[Scenario GL 14 - 16 Directorate] An Assistant Director on GL 14 is accused of gross financial insubordination and leaking confidential departmental memoranda. The Permanent Secretary immediately issues a query requiring a written response within 72 hours. While the investigation is ongoing, the Accounting Officer recommends immediate interdiction. Under PSR provisions, what is the statutory remuneration entitlement of an interdicted directorate officer pending the determination of disciplinary proceedings?',
    options: [
      'The officer is placed on fifty percent (50%) of substantive salary pending final decision',
      'The officer is placed on zero salary with immediate forfeiture of all benefits',
      'The officer continues to draw one hundred percent (100%) of full salary without allowances',
      'The officer receives eighty percent (80%) of basic salary plus executive utility allowances'
    ],
    correctOptionIndex: 0,
    explanation: 'Pursuant to Public Service Rules (PSR) disciplinary guidelines, when an officer is formally interdicted pending the determination of charges of serious misconduct, they are entitled to receive half of their basic salary (50%) until the Federal Civil Service Commission or competent authority disposes of the case.',
    referenceRule: 'PSR 030404 / Directorate Disciplinary Guidelines',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_psr_02',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 2,
    chapterTitle: 'Appointments, Directorate Tenures & Exit Protocols',
    questionText: '[Statutory Interpretation GL 14 - 16] Under the revised Federal Civil Service tenure policy guidelines re-introduced for Directorate ranks, what is the maximum cumulative tenure permissible for a substantive Director (GL 16/17) in a Federal Ministry, Extra-Ministerial Department, or FCTA Mandate Secretariat, subject to the statutory retirement age of 60 years or 35 years of pensionable service?',
    options: [
      'A cumulative maximum tenure of eight (8) years, comprising two terms of four (4) years each',
      'An indefinite tenure until the officer attains 65 years of age',
      'A single non-renewable term of five (5) years',
      'A cumulative tenure of twelve (12) years across various departments'
    ],
    correctOptionIndex: 0,
    explanation: 'The Directorate Tenure Policy stipulating a maximum of two terms of four (4) years (totaling 8 years) for Directors and a single term of 4 or 8 years applies to senior executives, subject to the ultimate ceiling of 60 years of age or 35 years of pensionable service, whichever occurs first.',
    referenceRule: 'PSR 020810 / OHCSF Tenure Policy Circular',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_psr_03',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 4,
    chapterTitle: 'Official Petitions, Redress & Administrative Tribunals',
    questionText: '[Scenario GL 14 - 16 Directorate] A Deputy Director (GL 15) who was superseded in a promotion exercise to the post of Director (GL 16) wishes to petition against the outcome. Through which statutory channel must the officer lodge the petition, and what is the strict limitation timeline prescribed by the PSR?',
    options: [
      'Through the officer\'s immediate Head of Department / Permanent Secretary to the Civil Service Commission within three (3) months of the promotion announcement',
      'Directly to the National Assembly Petitions Committee within fourteen (14) days, bypassing departmental channels',
      'Directly to the Industrial Court without exhausting administrative domestic remedies',
      'Through the departmental trade union to the Minister within six (6) months'
    ],
    correctOptionIndex: 0,
    explanation: 'PSR requires that an aggrieved officer submit petitions through the official hierarchical channel (Head of Department to Accounting Officer) addressed to the Civil Service Commission within three months. Bypassing official channels or disclosing classified papers constitutes serious misconduct.',
    referenceRule: 'PSR 040101 - 040105',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_psr_04',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 1,
    chapterTitle: 'Statutory Primacy & Freedom of Information Conflicts',
    questionText: '[Executive Case GL 14 - 16] A Civil Society Organization issues an FOI request under the Freedom of Information Act 2011 to an FCTA Directorate demanding unredacted internal minutes of an executive board evaluating urban renewal land allocations. As Director of Administration, how should this statutory conflict between the Official Secrets Act / PSR and the FOI Act 2011 be harmonized?',
    options: [
      'Review the requested records against FOI Act exemptions (personal privacy, ongoing investigations, commercial confidence) and redact exempt materials while disclosing non-exempt public interest records within 7 days',
      'Refuse all disclosures outright citing the permanent supremacy of the Official Secrets Act over all subsequent federal statutes',
      'Surrender all unredacted files within 24 hours without legal or accounting officer clearance',
      'Instruct the security unit to detain the applicants for trespassing on government grounds'
    ],
    correctOptionIndex: 0,
    explanation: 'The FOI Act 2011 overrides the Official Secrets Act regarding public information, but explicitly preserves statutory exemptions for personal privacy, active criminal/administrative investigations, and commercial secrets. A Director must consult legal units, apply statutory redactions, and respond within the mandatory 7-day window.',
    referenceRule: 'FOI Act 2011 Section 14-19 & PSR 010107',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },

  // Financial Regulations Level 3 Questions (GL 14 - GL 16)
  {
    id: 'l3_fr_01',
    category: 'fr',
    categoryLabel: 'Financial Regulations (FR)',
    chapterNumber: 1,
    chapterTitle: 'Accounting Officer Liabilities & Public Accounts Oversight',
    questionText: '[Scenario GL 14 - 16 Directorate] An audit query from the Office of the Auditor-General for the Federation flags an irregular expenditure of ₦85 million committed by a Directorate without prior warrant or legislative appropriation. Under Financial Regulations (FR 104 and FR 3129), what personal statutory liability attaches to the Accounting Officer and the initiating Director?',
    options: [
      'Personal surcharge for the total unapproved amount, disciplinary referral to the Civil Service Commission, and liability to criminal prosecution under ICPC / EFCC statutes',
      'A formal verbal caution recorded in the departmental register with no financial recovery',
      'Automatic transfer of the financial liability to the next fiscal year\'s overhead budget',
      'Deduction of ten percent (10%) from the subsequent capital allocation of the Secretariat'
    ],
    correctOptionIndex: 0,
    explanation: 'FR 104 and FR 3129 establish strict personal financial liability. Any Accounting Officer or delegated Director who authorizes or commits expenditure without statutory appropriation is liable to personal surcharge for the full amount and disciplinary or criminal sanctions.',
    referenceRule: 'FR 104, 3129 & Fiscal Responsibility Act 2007',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_fr_02',
    category: 'fr',
    categoryLabel: 'Financial Regulations (FR)',
    chapterNumber: 4,
    chapterTitle: 'Virement Powers & Fiscal Responsibility Harmonization',
    questionText: '[Statutory Authority GL 14 - 16] A Director of Finance & Accounts discovers that a key capital road development sub-head is depleted by October, while an ICT infrastructure sub-head has uncommitted surplus funds. Can the Minister of FCT or Permanent Secretary approve a virement between these distinct capital expenditure heads without National Assembly concurrence?',
    options: [
      'No, virement across distinct budget heads or sub-programmes requires formal legislative approval from the National Assembly; executive virement is strictly restricted to line items within the same sub-head',
      'Yes, the Minister possesses absolute plenary power to vire any funds between any heads without restriction',
      'Yes, provided the Director of Treasury certifies that the total budget ceiling remains unchanged',
      'Yes, if approved by a simple majority vote of the Departmental Tenders Board'
    ],
    correctOptionIndex: 0,
    explanation: 'Under the 1999 Constitution and the Fiscal Responsibility Act 2007, virement across separate budget heads represents legislative appropriation alteration and strictly requires National Assembly approval. Internal executive reallocation is only permissible within closely defined subordinate line items of the same head.',
    referenceRule: 'FR 410 - 418 & Fiscal Responsibility Act Section 27',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_fr_03',
    category: 'fr',
    categoryLabel: 'Financial Regulations (FR)',
    chapterNumber: 7,
    chapterTitle: 'Boards of Survey & Unserviceable Government Assets',
    questionText: '[Scenario GL 14 - 16 Directorate] Following the decommissioning of obsolete heavy operational earth-moving equipment valued historically at ₦250 million, the Director of Maintenance recommends immediate private sale to departmental staff. Under FR 2601 - 2620, what is the mandatory statutory procedure before any public asset can be disposed of?',
    options: [
      'The Accounting Officer must convene a formal Board of Survey, obtain an independent valuation report, seek disposal approval from the Federal Ministry of Finance / BPP, and conduct an open competitive public auction',
      'The Director of Maintenance can directly execute a private treaty sale to registered cooperative members',
      'The assets must be abandoned in the yard until written off by the departmental storekeeper',
      'The equipment can be transferred as gifts to local Area Council traditional rulers without valuation'
    ],
    correctOptionIndex: 0,
    explanation: 'FR 2601 - 2620 mandates that public assets can only be disposed of after inspection and recommendation by a formally constituted Board of Survey, independent valuation, competent executive approval, and an open, transparent public auction.',
    referenceRule: 'FR 2601 - 2620 / BPP Asset Disposal Regulations',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },

  // Public Procurement Act (PPA 2007) Level 3 Questions (GL 14 - GL 16)
  {
    id: 'l3_ppa_01',
    category: 'ppa',
    categoryLabel: 'Public Procurement Act (PPA 2007)',
    chapterNumber: 3,
    chapterTitle: 'Procurement Splitting & Section 58 Criminal Offenses',
    questionText: '[Legal Scenario GL 14 - 16 Directorate] To avoid exceeding the ₦50 million Ministerial Tenders Board approval threshold and the mandatory requirement for a BPP Certificate of "No Objection", a Directorate divides a unified ₦180 million perimeter security automation project into four separate contracts of ₦45 million each awarded to affiliated companies. Under Section 58 of the Public Procurement Act 2007, what is the statutory penalty for this offense?',
    options: [
      'A term of not less than 5 calendar years imprisonment without the option of a fine, summary dismissal from the public service, and permanent debarment from public office',
      'A minor administrative reprimand by the Minister and a fine of ₦50,000',
      'Compulsory retirement with full pension and gratuity entitlements intact',
      'A 6-month suspension without pay, after which the officer resumes regular duties'
    ],
    correctOptionIndex: 0,
    explanation: 'Section 58 of the PPA 2007 makes "splitting of tenders" to circumvent procurement thresholds a severe criminal offense punishable by a mandatory sentence of not less than 5 years imprisonment without option of fine, alongside administrative dismissal.',
    referenceRule: 'PPA 2007 Section 58(4) & (5)',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_ppa_02',
    category: 'ppa',
    categoryLabel: 'Public Procurement Act (PPA 2007)',
    chapterNumber: 4,
    chapterTitle: 'Federal Executive Council (FEC) vs. Ministerial Thresholds',
    questionText: '[Procurement Thresholds GL 14 - 16] When evaluating major capital works for the Federal Capital Territory Administration, which statutory body possesses the exclusive legal threshold to grant final contract approval for civil engineering works exceeding the ₦1.5 Billion threshold?',
    options: [
      'Federal Executive Council (FEC) presided over by the President of Nigeria, upon issuance of a Certificate of "No Objection" to Contract Award by the Bureau of Public Procurement (BPP)',
      'The FCTA Departmental Tenders Board (DTB)',
      'The Senate Committee on FCT solely',
      'The Mandate Secretariat Procurement Planning Committee (PPC)'
    ],
    correctOptionIndex: 0,
    explanation: 'Under federal public procurement threshold guidelines, works contracts exceeding the Ministerial Tenders Board ceiling (historically ₦1.5 Billion or as revised by circular) require a prior BPP Certificate of "No Objection" and substantive approval by the Federal Executive Council (FEC).',
    referenceRule: 'PPA 2007 Section 16 & SGF Procurement Threshold Circulars',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_ppa_03',
    category: 'ppa',
    categoryLabel: 'Public Procurement Act (PPA 2007)',
    chapterNumber: 6,
    chapterTitle: 'Emergency Procurement & Post-Award BPP Certification',
    questionText: '[Crisis Governance GL 14 - 16] A catastrophic flood washes away a vital bridge connecting Bwari Area Council to municipal water pipelines. The Director of Civil Engineering must invoke emergency procurement under Section 43 of the PPA 2007. What is the mandatory statutory reporting timeline for notifying the Bureau of Public Procurement (BPP) after executing emergency procurement contracts?',
    options: [
      'A comprehensive procurement report must be submitted to the BPP within thirty (30) days of contract award for issuance of a Certificate of "No Objection"',
      'No notification to the BPP is required if declared an emergency by the Mandate Secretary',
      'The notification can be submitted at the end of the triennial audit cycle',
      'Within twelve (12) months after the physical reconstruction works are completed'
    ],
    correctOptionIndex: 0,
    explanation: 'Under Section 43 of the PPA 2007, emergency procurement may proceed without prior competitive bidding, but the procuring entity must submit a full report to the BPP within 30 days to obtain post-award verification and Certificate of "No Objection".',
    referenceRule: 'PPA 2007 Section 43(1) - (4)',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },

  // FCT General Knowledge Level 3 Questions (GL 14 - GL 16)
  {
    id: 'l3_fct_01',
    category: 'fct_gk',
    categoryLabel: 'FCT General Knowledge & Governance',
    chapterNumber: 1,
    chapterTitle: 'Constitutional Architecture & Presidential Delegation',
    questionText: '[Constitutional Jurisprudence GL 14 - 16] By virtue of Section 299 of the Constitution of the Federal Republic of Nigeria 1999 (as amended), the Federal Capital Territory Abuja is administered as if it were one of the States of the Federation. In this context, how are the executive powers of the President constitutionally exercised in the governance of the FCTA?',
    options: [
      'Under Section 302 of the 1999 Constitution, the President may delegate executive powers to the Minister of the Federal Capital Territory, who functions with the executive authority analogous to a State Governor',
      'The National Assembly directly appoints an administrative Administrator every two years',
      'The Chief Judge of the FCT High Court serves as the chief executive officer of the FCTA',
      'Executive powers are vested exclusively in the Chairman of the Abuja Municipal Area Council (AMAC)'
    ],
    correctOptionIndex: 0,
    explanation: 'Under Section 302 of the 1999 CFRN, the President delegates executive administration of the Territory to the Minister of the FCT. The Supreme Court in multiple rulings (e.g. Fawehinmi v. Babangida, Bakari v. Ogundipe) affirmed that FCT is treated as a State for executive and legislative purposes.',
    referenceRule: '1999 CFRN Sections 299, 301, 302',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_fct_02',
    category: 'fct_gk',
    categoryLabel: 'FCT General Knowledge & Governance',
    chapterNumber: 2,
    chapterTitle: 'FCTA Civil Service Commission Act & Statutory Reforms',
    questionText: '[Statutory Reform GL 14 - 16] What is the fundamental operational impact of the historic enactment of the Federal Capital Territory Civil Service Commission Act on staff appointments, career progression to Permanent Secretary rank, and disciplinary oversight across the FCTA?',
    options: [
      'It creates an autonomous FCTA Civil Service Commission empowered to appoint substantive Permanent Secretaries within FCTA and directly administer appointments, promotions, and discipline for all FCTA personnel independent of the federal OHCSF/FCSC pool',
      'It abolishes all Mandate Secretariats and returns municipal administration to the Ministry of Interior',
      'It transfers all FCTA civil servants to the 36 State civil services on rotation',
      'It privatizes human resources management across the six Area Councils'
    ],
    correctOptionIndex: 0,
    explanation: 'The FCTA Civil Service Commission Act established an independent Commission for the Territory, allowing career FCTA officers to rise to the substantive rank of Permanent Secretary within the FCTA hierarchy, ending decades of reliance on federal secondment for leadership positions.',
    referenceRule: 'FCTA Civil Service Commission Act 2018 / 2024 Implementation Framework',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  },
  {
    id: 'l3_fct_03',
    category: 'fct_gk',
    categoryLabel: 'FCT General Knowledge & Governance',
    chapterNumber: 5,
    chapterTitle: 'Abuja Master Plan & Statutory Demolition Safeguards',
    questionText: '[Directorate Land Administration GL 14 - 16] Under the Land Use Act 1978 and the FCT Act (Cap F6 LFN 2004), when the Department of Development Control identifies an unauthorized commercial high-rise building erected directly on a designated sewage trunk line in the Central Business District, what statutory notices and legal safeguards must precede enforcement demolition?',
    options: [
      'Issuance of formal Stop-Work Notice, followed by Quit Notice and Demolition Notice allowing statutory notice periods (typically 21 to 28 days) with verification of Title Deeds before execution',
      'Immediate summary demolition within 2 hours without prior written documentation or site inventory',
      'Issuance of a retroactive Certificate of Occupancy upon payment of a minor penalty fee',
      'Submitting the case exclusively to the International Court of Arbitration before touching the structure'
    ],
    correctOptionIndex: 0,
    explanation: 'The Urban and Regional Planning Act and FCTA Development Control regulations require progressive administrative notices (Stop-Work Notice, Contravention Notice, and Demolition Notice) with statutory cure/defense periods before physical demolition of contravening structures to satisfy administrative law requirements.',
    referenceRule: 'Urban & Regional Planning Act Cap N138 LFN 2004 & Land Use Act 1978',
    difficultyLevel: 3,
    gradeLevelCategory: 'GL 14 - GL 16'
  }
];
