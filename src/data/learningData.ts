import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  // PSR Learning Modules
  {
    id: 'learn_psr_general',
    subject: 'psr',
    subjectTitle: 'Public Service Rules (PSR)',
    chapterNumber: 1,
    title: 'General Principles, Application & Definitions',
    summary: 'The bedrock of Nigerian civil service administration establishing legal authority, scope across federal MDAs, classification of correspondence, and official oaths.',
    keyProvisions: [
      {
        rule: 'PSR 010101',
        heading: 'Applicability of the Rules',
        content: 'The Public Service Rules apply to all officers holding pensionable and contract appointments in the Federal Public Service of Nigeria, except where statutory enactments provide otherwise for specific extra-ministerial agencies.'
      },
      {
        rule: 'PSR 010103',
        heading: 'Interpretation Authority',
        content: 'The Federal Civil Service Commission (FCSC) and the Office of the Head of the Civil Service of the Federation (OHCSF) hold sole constitutional authority to interpret the provisions of the PSR.'
      },
      {
        rule: 'PSR 010107',
        heading: 'Classification of Classified Documents',
        content: 'Security classifications are strictly hierarchical: Restricted, Confidential, Secret, and Top Secret. Unauthorized disclosure constitutes serious misconduct and a penal offence under the Official Secrets Act.'
      }
    ],
    practicalTips: [
      'Always check the date and gazette status of any administrative circular modifying a PSR rule.',
      'Marking any file as "Secret" or "Top Secret" requires authorization from an officer not below Grade Level 14.'
    ]
  },
  {
    id: 'learn_psr_appointments',
    subject: 'psr',
    subjectTitle: 'Public Service Rules (PSR)',
    chapterNumber: 2,
    title: 'Appointments, Recruitments & Confirmations',
    summary: 'Rules governing first appointments, eligibility, age thresholds, certificate verification, probationary periods, and formal gazetting of appointments.',
    keyProvisions: [
      {
        rule: 'PSR 020104',
        heading: 'Entry Age Conditions',
        content: 'Candidates must not be less than 18 years and not more than 50 years of age for initial appointment into pensionable establishment.'
      },
      {
        rule: 'PSR 020201',
        heading: 'Two-Year Probation Period',
        content: 'Newly recruited officers must serve two consecutive years on probation, during which their conduct and efficiency are closely monitored through six-monthly progress reports.'
      },
      {
        rule: 'PSR 020202',
        heading: 'Compulsory Confirmation Examination',
        content: 'Substantive confirmation requires passing the compulsory civil service confirmation examination (Combined Confirmation/Promotion Exam) and securing a recommendation from the Head of Department.'
      }
    ],
    practicalTips: [
      'Probationary period cannot be extended beyond one cumulative year without an explicit decision to terminate appointment.',
      'Gazetting your confirmation notice is essential for retirement processing and pension computation.'
    ]
  },
  {
    id: 'learn_psr_promotions',
    subject: 'psr',
    subjectTitle: 'Public Service Rules (PSR)',
    chapterNumber: 3,
    title: 'Promotions, Seniority & Transfer of Service',
    summary: 'Statutory maturity periods in rank, promotion criteria, notional promotions, secondment guidelines, and transfer of pension liabilities.',
    keyProvisions: [
      {
        rule: 'PSR 020701',
        heading: 'Statutory Maturity Periods',
        content: 'Officers on Grade Levels 07 to 14 must spend a minimum of three (3) calendar years on their current grade before promotion. Officers on GL 15 to 17 require a minimum of four (4) years.'
      },
      {
        rule: 'PSR 020704',
        heading: 'Pendency of Disciplinary Queries',
        content: 'No officer with an outstanding disciplinary query, active interdiction, or pending committee recommendation may be shortlisted or considered for promotion.'
      },
      {
        rule: 'PSR 020803',
        heading: 'Secondment Limits',
        content: 'Secondment to statutory bodies or international organizations is permissible for 2 years in the first instance, extendable to a maximum of 4 years.'
      }
    ],
    practicalTips: [
      'Directorate cadre promotions (GL 14 to GL 15, GL 15 to GL 16) require both written examination and formal oral defense before the Civil Service Commission.',
      'Ensure all APER/PMS annual forms are endorsed and filed on your confidential record before promotion calls.'
    ]
  },
  {
    id: 'learn_psr_discipline',
    subject: 'psr',
    subjectTitle: 'Public Service Rules (PSR)',
    chapterNumber: 4,
    title: 'Discipline, Queries & Sanctions',
    summary: 'Categorization of General Misconduct versus Serious Misconduct, natural justice procedures, query timelines, interdiction, and dismissal.',
    keyProvisions: [
      {
        rule: 'PSR 030307',
        heading: 'Query Representation Deadline',
        content: 'When queried for misconduct, an officer must submit a written representation within forty-eight (48) hours (or 72 hours if explicitly designated).'
      },
      {
        rule: 'PSR 030401',
        heading: 'Serious Misconduct Grounds',
        content: 'Includes falsification of records, financial embezzlement, suppression of files, bribery, insubordination, and unauthorized disclosure of classified records.'
      },
      {
        rule: 'PSR 030411',
        heading: 'Forfeiture upon Dismissal',
        content: 'Dismissal results in the ultimate cessation of service, complete forfeiture of all gratuity and pension rights, and permanent debarment from government employment.'
      }
    ],
    practicalTips: [
      'Never ignore a written query; failure to reply within the stipulated time is itself an independent act of insubordination.',
      'An officer placed on interdiction is entitled to receive 50% of their consolidated salary pending conclusion of investigations.'
    ]
  },
  {
    id: 'learn_psr_leave',
    subject: 'psr',
    subjectTitle: 'Public Service Rules (PSR)',
    chapterNumber: 8,
    title: 'Leave Provisions & Entitlements',
    summary: 'Annual leave calendar entitlements, 16 weeks maternity leave, 14 days paternity leave, study leave with/without pay, and sick leave bounds.',
    keyProvisions: [
      {
        rule: 'PSR 100101',
        heading: 'Annual Leave Duration',
        content: 'Officers on GL 08 and above enjoy thirty (30) calendar days annual leave per year; GL 04-07 enjoy twenty-eight (28) days; GL 01-03 receive twenty-one (21) days.'
      },
      {
        rule: 'PSR 100218',
        heading: 'Maternity Leave',
        content: 'Sixteen (16) weeks maternity leave with full pay is granted to pregnant female officers, which may commence four weeks prior to expected date of delivery.'
      },
      {
        rule: 'PSR 100222',
        heading: 'Paternity Leave',
        content: 'Fourteen (14) working days paternity leave is granted to male officers upon childbirth by their registered spouses, exercisable within the first two months.'
      }
    ],
    practicalTips: [
      'Casual leave cannot exceed an aggregate of 7 working days in a year and is deductible from annual leave.',
      'Study leave with pay requires minimum of two years post-confirmation service and execution of a legal service bond.'
    ]
  },
  {
    id: 'learn_psr_retirement',
    subject: 'psr',
    subjectTitle: 'Public Service Rules (PSR)',
    chapterNumber: 19,
    title: 'Statutory Retirement & Length of Service',
    summary: 'The 60/35 rule, compulsory retirement notice, terminal leave, and pension transitioning under the Contributory Pension Scheme.',
    keyProvisions: [
      {
        rule: 'PSR 020908',
        heading: 'Statutory Retirement Threshold',
        content: 'Mandatory retirement occurs upon reaching sixty (60) years of age or thirty-five (35) years of pensionable service, whichever arrives earlier.'
      },
      {
        rule: 'PSR 020909',
        heading: 'Six Months Retirement Notice',
        content: 'Every officer is obligated to serve formal notice of retirement to the Commission at least six months prior to the effective date.'
      }
    ],
    practicalTips: [
      'Dates of birth and first appointment recorded on your first entry file cannot be altered or reconciled backwards.',
      'Ensure pension contributions (10% employer, 8% employee) with your PFA are fully audited 12 months before retirement.'
    ]
  },

  // FR Learning Modules
  {
    id: 'learn_fr_accounting_officers',
    subject: 'fr',
    subjectTitle: 'Financial Regulations (FR)',
    chapterNumber: 2,
    title: 'Duties & Powers of Accounting Officers',
    summary: 'Pecuniary responsibility of Permanent Secretaries, chief executives, vote controllers, and internal auditors across all government financial dealings.',
    keyProvisions: [
      {
        rule: 'FR 105',
        heading: 'Substantive Accounting Officer Designation',
        content: 'The Permanent Secretary or Chief Executive Officer is the designated Accounting Officer personally answerable to the Public Accounts Committee for all financial transactions in the MDA.'
      },
      {
        rule: 'FR 108',
        heading: 'Pecuniary Surcharges',
        content: 'Accounting Officers who permit irregular payments, extra-budgetary expenditure, or disregard procurement thresholds incur personal pecuniary surcharges.'
      },
      {
        rule: 'FR 1701',
        heading: 'Internal Audit Independence',
        content: 'Internal Audit is directly responsible to the Accounting Officer and conducts 100% pre-payment audit verification on all payment vouchers.'
      }
    ],
    practicalTips: [
      'No officer can be forced to sign a payment voucher they reasonably believe violates Financial Regulations; they must submit a formal written dissent.',
      'All internal audit queries must be replied to within 21 calendar days.'
    ]
  },
  {
    id: 'learn_fr_tsa_receipts',
    subject: 'fr',
    subjectTitle: 'Financial Regulations (FR)',
    chapterNumber: 5,
    title: 'Treasury Single Account (TSA) & Revenue Management',
    summary: 'Consolidation of government accounts into the CRF at CBN, electronic collections, Remita gateway, e-payment guidelines, and bank lodgments.',
    keyProvisions: [
      {
        rule: 'FR TSA Mandate',
        heading: 'Single Treasury Consolidation',
        content: 'All government revenues, receipts, and internally generated revenues (IGR) must be collected electronically via approved gateways into the CRF at CBN.'
      },
      {
        rule: 'FR 201',
        heading: 'Issuance of Treasury Book 6 (Receipts)',
        content: 'Official paper or electronic receipts (Treasury Book 6) must be issued immediately for all public funds received without delay.'
      },
      {
        rule: 'FR 636',
        heading: 'Mandatory E-Payment Regime',
        content: 'Payment by physical paper cheques to contractors and staff is abolished; all disbursements must be conducted via direct electronic credit to beneficiaries.'
      }
    ],
    practicalTips: [
      'Cash handling by public officers is strictly restricted to authorized petty cash imprests.',
      'Revenue collections must be swept into the Consolidated Revenue Fund daily or within 24 hours of receipt.'
    ]
  },
  {
    id: 'learn_fr_virement_imprest',
    subject: 'fr',
    subjectTitle: 'Financial Regulations (FR)',
    chapterNumber: 7,
    title: 'Virement, Vote Books & Imprests',
    summary: 'Expenditure commitment control, maintaining Treasury Form 46 (Vote Book), virement criteria, standing vs special imprests, and retirement procedures.',
    keyProvisions: [
      {
        rule: 'FR 417',
        heading: 'Virement Authorization',
        content: 'Virement is the authorized reallocation of savings from one budget sub-head to augment an under-provisioned sub-head within the same economic head.'
      },
      {
        rule: 'FR 419',
        heading: 'Virement Restrictions',
        content: 'Virement from capital votes to recurrent expenditure or personnel costs is strictly prohibited by law.'
      },
      {
        rule: 'FR 1001',
        heading: 'Annual Retirement of Imprests',
        content: 'All standing and special imprests must be retired completely on or before the 31st of December of the financial year in which they were granted.'
      }
    ],
    practicalTips: [
      'Always confirm that the Vote Book contains uncommitted balance before issuing an Local Purchase Order (LPO).',
      'Non-retirement of an imprest on time leads to direct payroll deductions against the imprest holder.'
    ]
  },

  // PPA Learning Modules
  {
    id: 'learn_ppa_principles',
    subject: 'ppa',
    subjectTitle: 'Public Procurement Act (PPA 2007)',
    chapterNumber: 3,
    title: 'Fundamental Principles & Scope of Application',
    summary: 'The core tenets of public procurement in Nigeria: economy, competitiveness, transparency, value for money, fitness for purpose, and non-discrimination.',
    keyProvisions: [
      {
        rule: 'PPA 2007 Sec 15',
        heading: 'Scope of Application',
        content: 'Applies to the Federal Government of Nigeria and all procuring entities where at least 35% of funds are derived from public purse.'
      },
      {
        rule: 'PPA 2007 Sec 16(1)',
        heading: 'Open Competitive Bidding as Default',
        content: 'Public procurement shall be conducted by open competitive bidding to ensure that all qualified bidders enjoy equal opportunity.'
      },
      {
        rule: 'PPA 2007 Sec 16(6)',
        heading: 'Statutory Qualifications of Bidders',
        content: 'Mandatory certificates: Corporate Affairs Commission (CAC), Tax Clearance Certificate (TCC for 3 years), PENCOM compliance, ITF certificate, and NSITF.'
      }
    ],
    practicalTips: [
      'Any contract awarded without adherence to open competition (except in certified emergency/direct situations) is null and void.',
      'Procurement planning must be aligned with approved annual budgets; extra-budgetary procurement is an illegal act.'
    ]
  },
  {
    id: 'learn_ppa_tenders_boards',
    subject: 'ppa',
    subjectTitle: 'Public Procurement Act (PPA 2007)',
    chapterNumber: 7,
    title: 'Tenders Boards, Approvals & Thresholds',
    summary: 'Composition and functions of the Ministerial Tenders Board (MTB), Parastatal Tenders Board (PTB), Technical Evaluation Sub-Committees, and BPP No Objection.',
    keyProvisions: [
      {
        rule: 'PPA 2007 Sec 22',
        heading: 'Ministerial Tenders Board (MTB)',
        content: 'The Permanent Secretary / Mandate Secretary serves as Chairman, with Directors of departments as members, and the Director of Procurement as Secretary.'
      },
      {
        rule: 'PPA 2007 Sec 23',
        heading: 'Technical Evaluation Sub-Committee',
        content: 'Examines all bids on pre-determined, disclosed criteria. No new criteria or marks may be introduced after tender opening.'
      },
      {
        rule: 'PPA 2007 Sec 24 & Circulars',
        heading: 'Federal Executive Council (FEC) Thresholds',
        content: 'Projects exceeding statutory ministerial thresholds require Bureau of Public Procurement (BPP) "Due Process Certificate of No Objection" before FEC ratification.'
      }
    ],
    practicalTips: [
      'The Director of Procurement does NOT possess voting rights on the Tenders Board to prevent conflict of interest.',
      'Evaluation reports must clearly rank the Lowest Evaluated Responsive Bidder.'
    ]
  },
  {
    id: 'learn_ppa_offences',
    subject: 'ppa',
    subjectTitle: 'Public Procurement Act (PPA 2007)',
    chapterNumber: 20,
    title: 'Procurement Offences, Penalties & Sanctions',
    summary: 'Criminal liability under Section 58 of the PPA 2007: bid-rigging, splitting of contracts, conflict of interest, debarment, and terms of imprisonment.',
    keyProvisions: [
      {
        rule: 'PPA 2007 Sec 58(1)',
        heading: 'Splitting Contracts Offence',
        content: 'Intentionally dividing procurement packages into smaller portions to evade approval thresholds constitutes a federal offence punishable by imprisonment.'
      },
      {
        rule: 'PPA 2007 Sec 58(5)',
        heading: 'Imprisonment Sanctions',
        content: 'Any natural person who contravenes the Act faces 5 to 10 years imprisonment without an option of fine and immediate dismissal from public service.'
      },
      {
        rule: 'PPA 2007 Sec 58(6)',
        heading: 'Corporate Fines & Debarment',
        content: 'Corporate entities found culpable face debarment from federal contracts and payment of a fine equal to 25% of the total contract value.'
      }
    ],
    practicalTips: [
      'Public officers must formally declare any personal or family interest in any bidding company and recuse themselves immediately.',
      'BPP maintains a national public database of debarred and blacklisted contractors.'
    ]
  }
];
