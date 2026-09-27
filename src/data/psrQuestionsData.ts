export interface RawQuestionSeed {
  q: string;
  opts: [string, string, string, string];
  ans: number;
  exp: string;
  ref: string;
}

export const PSR_QUESTIONS_DATA: Record<number, RawQuestionSeed[]> = {
  1: [
    {
      q: 'According to the Public Service Rules, to whom do the provisions of the PSR primarily apply?',
      opts: [
        'All pensionable and contract officers serving in the Federal Civil Service and executive agencies',
        'Only political office holders and special advisers',
        'Only military and paramilitary personnel',
        'Private sector contractors engaged by the Federal Government'
      ],
      ans: 0,
      exp: 'PSR 010101 stipulates that the Public Service Rules apply to all officers holding pensionable and contract appointments in the Federal Public Service unless specifically exempted.',
      ref: 'PSR 010101'
    },
    {
      q: 'Who is the ultimate custodian and authority for interpreting the Public Service Rules?',
      opts: [
        'The Federal Civil Service Commission and the Office of the Head of the Civil Service of the Federation',
        'The National Assembly Joint Committee on Public Service',
        'The Attorney-General of the Federation solely',
        'The Auditor-General for the Federation'
      ],
      ans: 0,
      exp: 'The Head of the Civil Service of the Federation (OHCSF) in conjunction with the Federal Civil Service Commission (FCSC) exercises constitutional custody over interpretation and circulars.',
      ref: 'PSR 010103'
    },
    {
      q: 'In the Public Service Rules, what does the term "Officer" mean unless otherwise qualified?',
      opts: [
        'Any citizen residing in Nigeria',
        'A person employed on a permanent, temporary, or contract basis in the Public Service',
        'Exclusively members of the Senior Executive Course',
        'Any employee in commercial banks handling government funds'
      ],
      ans: 1,
      exp: 'PSR defines an "Officer" as any staff substantively or temporarily holding a recognized post in the service of the Federal Government.',
      ref: 'PSR 010102'
    },
    {
      q: 'When an apparent conflict arises between an administrative circular and a codified PSR provision, which takes precedence?',
      opts: [
        'The circular automatically overrides the PSR without gazetting',
        'The PSR remains paramount unless the circular is formally issued by the OHCSF/FCSC amending the rule',
        'The verbal directive of the Minister overrides both',
        'The decision of the departmental trade union chairman'
      ],
      ans: 1,
      exp: 'Codified Public Service Rules maintain statutory superiority unless a formal policy circular amending the rule is issued by the competent statutory authority (OHCSF/FCSC).',
      ref: 'PSR 010105'
    },
    {
      q: 'What is the classification of classified government documents under official secrecy provisions?',
      opts: [
        'Restricted, Confidential, Secret, and Top Secret',
        'Public, Semi-public, and Private',
        'General, Administrative, and Directorate',
        'Internal, External, and Archival'
      ],
      ans: 0,
      exp: 'The four recognized security grading classifications for government correspondence are Restricted, Confidential, Secret, and Top Secret.',
      ref: 'PSR 010107 / Official Secrets Act'
    },
    {
      q: 'Which body is constitutionally vested with the power of appointment, promotion, and discipline in the Federal Civil Service?',
      opts: [
        'Federal Civil Service Commission (FCSC)',
        'Federal Character Commission (FCC)',
        'Code of Conduct Bureau (CCB)',
        'Salaries, Incomes and Wages Commission (NSIWC)'
      ],
      ans: 0,
      exp: 'Under Section 153 and Part 1 of the Third Schedule of the 1999 Constitution, the FCSC is empowered to appoint, promote, and discipline officers.',
      ref: 'PSR 020101 & 1999 CFRN'
    },
    {
      q: 'What is the maximum period within which a newly enacted circular amending service conditions must be disseminated to all MDAs?',
      opts: [
        'Promptly upon issuance and gazetting by the Office of the Head of the Civil Service of the Federation',
        'Within five fiscal years',
        'Only after litigation approval',
        'At the end of every presidential tenure'
      ],
      ans: 0,
      exp: 'Service circulars take immediate administrative effect upon official signing and distribution by the OHCSF to ensure uniform service compliance.',
      ref: 'PSR 010106'
    },
    {
      q: 'Can an officer claim ignorance of the provisions of the Public Service Rules as an excuse for an infraction?',
      opts: [
        'No, ignorance of the rules is never an admissible defense in administrative inquiries',
        'Yes, if the officer has served for less than 10 years',
        'Yes, if the officer was on approved leave when the rule was amended',
        'Only with written attestation from their community leader'
      ],
      ans: 0,
      exp: 'It is the personal responsibility of every civil servant to familiarize themselves with the Public Service Rules, Financial Regulations, and applicable circulars.',
      ref: 'PSR 010104'
    },
    {
      q: 'What is the role of Parastatals and Government Agencies regarding the adoption of the Public Service Rules?',
      opts: [
        'They are bound by the PSR as standard baseline conditions, adapting them into agency conditions of service with board and ministerial approval',
        'They are completely exempted and may formulate private sector commercial contracts at will',
        'They report exclusively to the Corporate Affairs Commission on disciplinary actions',
        'They cannot discipline any staff without National Assembly concurrence'
      ],
      ans: 0,
      exp: 'Parastatals must harmonize their specific conditions of service with the PSR, which serves as the overarching statutory baseline.',
      ref: 'PSR 160101'
    },
    {
      q: 'Under PSR guidelines, who serves as the Accounting Officer and administrative head of a Federal Ministry?',
      opts: [
        'The Permanent Secretary',
        'The Honourable Minister',
        'The Director of Finance and Accounts',
        'The Chief Internal Auditor'
      ],
      ans: 0,
      exp: 'The Permanent Secretary is the administrative head and accounting officer through whom all policy directives of the Minister are channeled.',
      ref: 'PSR 010108'
    }
  ],
  2: [
    {
      q: 'What is the standard statutory probationary period for a newly appointed officer in the Federal Public Service before confirmation?',
      opts: [
        'Two (2) years',
        'Six (6) months',
        'Five (5) years',
        'One (1) year'
      ],
      ans: 0,
      exp: 'PSR 020201 specifies that a newly appointed officer must serve a probationary period of two years before consideration for confirmation.',
      ref: 'PSR 020201'
    },
    {
      q: 'What mandatory requirement must an officer on probation satisfy before substantive confirmation of appointment?',
      opts: [
        'Passing the prescribed Compulsory Confirmation Examination and obtaining satisfactory appraisal reports',
        'Donating educational materials to the Secretariat',
        'Traveling on an international training tour',
        'Obtaining written clearance from their local government chairman'
      ],
      ans: 0,
      exp: 'Confirmation requires passing the prescribed confirmation examination (e.g. Combined Confirmation/Promotion Exam) and securing a favorable certificate of efficiency.',
      ref: 'PSR 020202'
    },
    {
      q: 'What is the minimum age required for entry into the pensionable Federal Public Service in Nigeria?',
      opts: [
        '18 years (and not exceeding 50 years for initial pensionable entry)',
        '15 years',
        '25 years',
        '21 years'
      ],
      ans: 0,
      exp: 'Under PSR 020104, candidate must not be less than 18 years of age at the time of first appointment.',
      ref: 'PSR 020104'
    },
    {
      q: 'What is the maximum allowable extension of a probationary period if an officer fails the confirmation examination or has deficient reports?',
      opts: [
        'Six months in the first instance, up to a maximum total extension of one year, failing which the appointment may be terminated',
        'Ten years indefinite extension',
        'Three years automatic extension',
        'No extension is permitted under any circumstance'
      ],
      ans: 0,
      exp: 'Probationary service may be extended by 6 months up to a maximum total of 1 year. If still unqualified, the appointment is terminated.',
      ref: 'PSR 020205'
    },
    {
      q: 'Which document must be gazetted to render a public officer\'s confirmation formal and public in Nigeria?',
      opts: [
        'The Federal Republic of Nigeria Official Gazette',
        'A local newspaper advertisement',
        'The departmental circular board only',
        'An international trade journal'
      ],
      ans: 0,
      exp: 'All first appointments, confirmations, and terminations in the public service must be formally published in the Federal Official Gazette.',
      ref: 'PSR 020211'
    },
    {
      q: 'What is the entry grade level for a graduate with a recognized Bachelor of Science / Arts degree entering the Administrative Officer cadre?',
      opts: [
        'Grade Level 08',
        'Grade Level 06',
        'Grade Level 09',
        'Grade Level 10'
      ],
      ans: 0,
      exp: 'A candidate with a standard university degree enters the Administrative Officer cadre at Grade Level 08 Step 1.',
      ref: 'PSR Scheme of Service'
    },
    {
      q: 'Under what circumstances can a contract appointment be offered to an officer who has attained mandatory retirement age?',
      opts: [
        'Where specialized scarce technical expertise is indispensably required and certified by the Head of Civil Service',
        'Automatically for all retiring directors',
        'When requested verbally by the officer without vacancy clearance',
        'Whenever an election is scheduled'
      ],
      ans: 0,
      exp: 'Contract employment post-retirement is strictly limited to verified scarce skills and requires formal justification and approval by the Commission.',
      ref: 'PSR 020212'
    },
    {
      q: 'Which statutory commission regulates the equitable geographic representation of recruitment across Nigeria\'s 36 states and FCT?',
      opts: [
        'Federal Character Commission (FCC)',
        'National Human Rights Commission (NHRC)',
        'National Salaries, Incomes and Wages Commission',
        'Code of Conduct Bureau'
      ],
      ans: 0,
      exp: 'The Federal Character Commission enforces the constitutional mandate of ensuring balanced zonal and state representation in all public service recruitments.',
      ref: '1999 CFRN 3rd Schedule & FCC Act'
    },
    {
      q: 'Can an officer on probation be considered for promotion to a higher substantive post before confirmation?',
      opts: [
        'No, confirmation of appointment is a mandatory prerequisite for promotion eligibility',
        'Yes, after six months on the job',
        'Yes, if recommended by a trade union leader',
        'Only during election years'
      ],
      ans: 0,
      exp: 'An officer must be substantively confirmed in their appointment before being eligible for promotion to the next grade level.',
      ref: 'PSR 020701'
    },
    {
      q: 'What is the legal consequence of submitting forged educational certificates during recruitment into the Federal Public Service?',
      opts: [
        'Summary termination/dismissal, loss of all entitlements, and referral to the police / ICPC for criminal prosecution',
        'A reduction of one salary step',
        'A transfer to a rural outpost for six months',
        'A verbal warning from the registry clerk'
      ],
      ans: 0,
      exp: 'Falsification of credentials constitutes serious misconduct and a felony carrying summary dismissal and criminal prosecution.',
      ref: 'PSR 030402'
    }
  ],
  3: [
    {
      q: 'What is the statutory minimum maturity period for promotion eligibility for officers on Grade Levels 07 to 14?',
      opts: [
        'Three (3) full calendar years on substantive grade level',
        'One (1) year',
        'Four (4) years',
        'Five (5) years'
      ],
      ans: 0,
      exp: 'Officers on GL 07 to GL 14 must spend a minimum maturity period of 3 full years on their substantive grade before becoming eligible for promotion.',
      ref: 'PSR 020701'
    },
    {
      q: 'What is the statutory minimum maturity period for promotion eligibility for senior officers on Grade Levels 15 to 17?',
      opts: [
        'Four (4) full calendar years on substantive grade level',
        'Two (2) years',
        'Three (3) years',
        'Six (6) years'
      ],
      ans: 0,
      exp: 'Officers on Directorate cadres (GL 15, GL 16, GL 17) must serve a minimum of 4 full years on their substantive post before eligible for advancement.',
      ref: 'PSR 020701'
    },
    {
      q: 'What constitutes the key criteria evaluated by the Senior Staff Committee (SSC) during a promotion exercise?',
      opts: [
        'Performance Evaluation (PMS/APER), written examination score, seniority/maturity, and oral interview',
        'Number of personal vehicles owned',
        'Political campaign contributions',
        'Length of time spent studying abroad privately'
      ],
      ans: 0,
      exp: 'Promotion evaluation balances annual performance appraisals, CBT promotion examination score, length of service/maturity, and SSC interview.',
      ref: 'PSR 020703'
    },
    {
      q: 'What is the effective date of promotion for an officer who passes a promotion exercise where vacancy exists in the current budget year?',
      opts: [
        '1st January of the promotion evaluation year',
        'The date the candidate completed university education',
        '1st October of the following year',
        'The date the interview results are published on social media'
      ],
      ans: 0,
      exp: 'Under established civil service guidelines, promotions take administrative and financial effect from 1st January of the year in which the vacancy occurred.',
      ref: 'PSR 020706'
    },
    {
      q: 'What is a "Secondment" of a public officer under Public Service Rules?',
      opts: [
        'The temporary release of an officer to another government agency, statutory body, or international organization with preserved pension rights',
        'Permanent resignation from government service',
        'Demotion to a junior clerical grade',
        'An unauthorized absence from the office'
      ],
      ans: 0,
      exp: 'Secondment is the temporary transfer of an officer to another public or approved institution for a specified period without losing pensionable status.',
      ref: 'PSR 020801'
    },
    {
      q: 'What is the maximum standard duration for a secondment before the officer must either return or transfer substantively?',
      opts: [
        'Two (2) years in the first instance, extendable to a maximum cumulative total of four (4) years',
        'Ten (10) years automatically',
        'Twenty (20) years',
        'Six (6) months only'
      ],
      ans: 0,
      exp: 'Secondment cannot normally exceed 2 years initially, with a maximum allowable extension of another 2 years (total 4 years), after which transfer or reversion occurs.',
      ref: 'PSR 020803'
    },
    {
      q: 'When an officer transfers from a State Civil Service to the Federal Civil Service, what happens to their accumulated pensionable service?',
      opts: [
        'It is integrated and transferred upon mutual agreement and confirmation of clean service record from the transferring authority',
        'It is completely cancelled and the officer starts afresh at zero years',
        'It is converted into a cash voucher paid directly to the staff union',
        'It requires presidential clemency'
      ],
      ans: 0,
      exp: 'Transfer of service between approved public institutions allows continuity and consolidation of pensionable service under PSR and PenCom rules.',
      ref: 'PSR 020805'
    },
    {
      q: 'Can an officer who has pending disciplinary proceedings against them be considered for promotion?',
      opts: [
        'No, promotion consideration is suspended until all disciplinary queries and charges are fully resolved',
        'Yes, pending queries have no bearing on promotion',
        'Yes, provided they pay a nominal fine',
        'Only if the query is older than one week'
      ],
      ans: 0,
      exp: 'Under PSR 020708, an officer against whom disciplinary proceedings are pending cannot be promoted until exonerated by the competent authority.',
      ref: 'PSR 020708'
    },
    {
      q: 'Who serves as the Chairman of the Senior Staff Committee (GL 07 - GL 14) in a Federal Ministry or Mandate Secretariat?',
      opts: [
        'The Permanent Secretary (or designated Director of Human Resources)',
        'The youngest administrative officer',
        'The local union branch secretary',
        'An external contractor'
      ],
      ans: 0,
      exp: 'The Permanent Secretary chairs the Senior Staff Committee, assisted by departmental directors, in handling recruitment, promotion, and junior discipline.',
      ref: 'PSR Guidelines for SSC'
    },
    {
      q: 'What is "Notional Promotion" in the Nigerian Civil Service?',
      opts: [
        'A promotion granted retrospectively for seniority purposes without back-payment of financial arrears',
        'A temporary promotion that expires after 24 hours',
        'A promotion given as a gift to retiring staff',
        'An honorary academic title'
      ],
      ans: 0,
      exp: 'Notional promotion adjusts an officer\'s seniority date on the nominal roll to correct past administrative injustice, but without entitlement to retrospective financial arrears.',
      ref: 'PSR 020709'
    }
  ],
  4: [
    {
      q: 'What is the distinction between "Misconduct" and "Serious Misconduct" under Chapter 3 of the Public Service Rules?',
      opts: [
        'Misconduct is a specific act of wrongdoing prejudicial to discipline; Serious Misconduct is a grave infraction that can warrant dismissal and loss of pension',
        'Misconduct is punishable by death, while serious misconduct attracts a verbal warning',
        'There is no legal difference between them',
        'Misconduct applies only to junior staff, serious misconduct applies only to directors'
      ],
      ans: 0,
      exp: 'Misconduct involves lesser infractions (e.g. unpunctuality), whereas Serious Misconduct involves grave offenses (e.g. fraud, bribery) that may lead to dismissal.',
      ref: 'PSR 030301 & 030401'
    },
    {
      q: 'Which of the following constitutes an act of "Serious Misconduct" under PSR 030402?',
      opts: [
        'Falsification of records, financial embezzlement, bribery, and unauthorized disclosure of classified official information',
        'Wearing formal traditional attire on a Friday',
        'Taking a 15-minute lunch break in the staff cafeteria',
        'Submitting a promotion appeal through official channels'
      ],
      ans: 0,
      exp: 'PSR 030402 itemizes grave acts of serious misconduct: embezzlement, corruption, falsification, insubordination, and unauthorized leakage of secrets.',
      ref: 'PSR 030402'
    },
    {
      q: 'Within what statutory timeframe must an officer respond to a formal disciplinary query issued by superior authority?',
      opts: [
        'Within forty-eight (48) to seventy-two (72) hours as specified in the query letter',
        'Within thirty (30) business days',
        'Within twelve (12) calendar months',
        'Only when the officer feels like answering'
      ],
      ans: 0,
      exp: 'PSR 030307 prescribes that queried officers must submit their written representation within 48 to 72 hours of receipt.',
      ref: 'PSR 030307'
    },
    {
      q: 'What legal principle of natural justice must be strictly observed throughout civil service disciplinary proceedings?',
      opts: [
        'Audi alteram partem (hear the other side / right to fair hearing)',
        'Guilt by association without evidence',
        'Summary conviction without notification',
        'Ex-parte dismissal without query'
      ],
      ans: 0,
      exp: 'Section 36 of the 1999 Constitution and PSR require adherence to natural justice: fair hearing, notice of allegations, and right to written defense representation.',
      ref: '1999 CFRN S.36 & PSR 030304'
    },
    {
      q: 'Which of the following is a recognized statutory disciplinary punishment under the PSR?',
      opts: [
        'Withholding or deferment of increment, reduction in rank, compulsory retirement, and dismissal',
        'Physical corporal punishment',
        'Seizure of family ancestral lands',
        'Forced public parade in handcuffs'
      ],
      ans: 0,
      exp: 'Statutory punishments are written warning, withholding of increment, deferment, reduction in rank, termination, compulsory retirement, and dismissal.',
      ref: 'PSR 030407'
    },
    {
      q: 'What consequence does "Dismissal" carry regarding an officer\'s pension and gratuity entitlements?',
      opts: [
        'Dismissal results in complete forfeiture of all terminal benefits, pension rights, and eligibility for future government employment',
        'The officer receives double pension benefits',
        'The officer is given an immediate cash gratuity bonus',
        'No impact on retirement benefits'
      ],
      ans: 0,
      exp: 'Under PSR 030411, a dismissed officer forfeits all claims to pension, gratuity, and cannot be re-engaged in the public service.',
      ref: 'PSR 030411'
    },
    {
      q: 'What is the procedure before a disciplinary penalty can be imposed on an officer?',
      opts: [
        'Issuance of formal query, receipt of written representation, consideration by Staff Committee, and recommendation to Commission',
        'Summary execution by departmental supervisor without hearing',
        'Announcement on radio before notifying the officer',
        'Immediate payroll stoppage by commercial bank'
      ],
      ans: 0,
      exp: 'Observance of natural justice (audi alteram partem) requires written query, fair hearing, and evaluation by the competent Senior/Junior Staff Committee.',
      ref: 'PSR 030304'
    },
    {
      q: 'Under PSR, what is the consequence of borrowing money from a subordinate officer?',
      opts: [
        'It constitutes serious misconduct and a corrupt practice liable to severe disciplinary action',
        'It is encouraged as cooperative camaraderie',
        'It requires no reporting if below 10,000 Naira',
        'It results in automatic transfer'
      ],
      ans: 0,
      exp: 'PSR strictly prohibits public officers from borrowing money from subordinates or contractors who have official business dealings with their office.',
      ref: 'PSR 030424'
    },
    {
      q: 'How long does a formal letter of warning or reprimand remain active in an officer\'s confidential personal file?',
      opts: [
        'It remains on record and affects evaluation for a period of two years if no further infraction occurs',
        'For exactly 50 years',
        'It is shredded after 48 hours',
        'It has no administrative bearing on promotion'
      ],
      ans: 0,
      exp: 'Disciplinary warnings are recorded on personal files and adversely influence annual performance evaluations and promotion fitness for up to two years.',
      ref: 'PSR 030308'
    },
    {
      q: 'Can an officer under disciplinary query proceed on annual leave or study leave?',
      opts: [
        'No, all leave privileges are suspended until the conclusion of the disciplinary case',
        'Yes, leave is guaranteed regardless of disciplinary status',
        'Only with permission from the local trade union',
        'Yes, if the leave is spent abroad'
      ],
      ans: 0,
      exp: 'Officers facing disciplinary queries cannot be granted leave until the inquiry is formally determined and clearance issued.',
      ref: 'PSR 030310'
    }
  ],
  5: [
    {
      q: 'What is the statutory remuneration entitlement of an officer placed on formal "Interdiction" under PSR 030404?',
      opts: [
        'The officer is placed on fifty percent (50%) of substantive salary pending determination of disciplinary charges',
        'The officer continues to draw full salary and executive allowances',
        'The officer is placed on zero salary with immediate pension cancellation',
        'The officer receives double pay to assist legal defense'
      ],
      ans: 0,
      exp: 'Under PSR 030404, an interdicted officer receives half of their basic salary (50%) until formal determination of the inquiry.',
      ref: 'PSR 030404'
    },
    {
      q: 'When an officer is placed on formal "Suspension" due to prima facie establishment of grave criminal prosecution, what salary is payable?',
      opts: [
        'Zero salary (emoluments are completely withheld pending outcome of trial)',
        'Full basic salary with no allowances',
        'Seventy-five percent (75%) salary',
        'An advance loan of five years salary'
      ],
      ans: 0,
      exp: 'Under PSR 030405, when an officer is suspended following criminal charges in court, their emoluments are entirely withheld until judgment.',
      ref: 'PSR 030405'
    },
    {
      q: 'If an interdicted officer is completely exonerated of all disciplinary charges, what happens to their withheld emoluments?',
      opts: [
        'All withheld 50% salary arrears are fully restored and paid back to the officer',
        'The withheld money is forfeited to the Treasury Single Account permanently',
        'The money is donated to the staff welfare committee',
        'The officer receives only a letter of apology with no financial payment'
      ],
      ans: 0,
      exp: 'Upon complete exoneration, the officer is reinstated immediately and the full amount of salary withheld during interdiction is refunded.',
      ref: 'PSR 030406'
    },
    {
      q: 'Can an interdicted or suspended public officer travel outside Nigeria without formal government approval?',
      opts: [
        'No, an officer on interdiction must not leave their duty station or travel overseas without written permission from the Permanent Secretary / Commission',
        'Yes, interdicted officers have no duty obligations and may travel anywhere',
        'Only if traveling on vacation for less than six months',
        'Yes, if they hold a valid personal international passport'
      ],
      ans: 0,
      exp: 'Interdicted officers remain subject to civil service discipline and must remain accessible at their station unless granted written permission.',
      ref: 'PSR 030404(b)'
    },
    {
      q: 'Who holds the statutory authority to issue an order of interdiction on a senior public officer?',
      opts: [
        'The Federal Civil Service Commission (or Accounting Officer pending confirmation by the Commission)',
        'The commercial bank branch manager',
        'The junior clerical staff association',
        'An external management consultant'
      ],
      ans: 0,
      exp: 'The power to interdict is vested in the Civil Service Commission, though an Accounting Officer may issue a preliminary interdiction subject to Commission confirmation.',
      ref: 'PSR 030404(c)'
    },
    {
      q: 'What happens to official government identity cards and departmental property upon interdiction?',
      opts: [
        'The officer must immediately surrender all official identity cards, files, keys, and government assets to the Head of Administration',
        'The officer keeps all government property until retirement',
        'The officer gives government files to family members',
        'No property surrender is required'
      ],
      ans: 0,
      exp: 'An interdicted officer is barred from official premises and must surrender all official ID cards, records, and government equipment.',
      ref: 'PSR 030404(d)'
    },
    {
      q: 'What is the maximum duration a preliminary interdiction inquiry should take before a formal report is submitted to the Commission?',
      opts: [
        'Within three (3) months, to avoid prolonged administrative stagnation',
        'Ten (10) years',
        'Five (5) fiscal years',
        'Twenty-four (24) hours only'
      ],
      ans: 0,
      exp: 'Civil service guidelines urge expeditious completion of interdiction inquiries within 3 months to safeguard justice.',
      ref: 'PSR Disciplinary Circulars'
    },
    {
      q: 'If an interdicted officer is acquitted of criminal charges on a technicality by a court of law, can administrative disciplinary action still proceed?',
      opts: [
        'Yes, the civil service may take administrative disciplinary action under the PSR based on professional misconduct regardless of criminal acquittal',
        'No, court acquittal completely wipes out all administrative queries automatically',
        'Only with the consent of the defence attorney',
        'Never under any circumstance'
      ],
      ans: 0,
      exp: 'Administrative standards of discipline are separate from criminal trials; an officer acquitted in court on technicalities may still face PSR sanctions.',
      ref: 'PSR 030411'
    },
    {
      q: 'Can an officer on interdiction take up temporary private employment during the period of inquiry?',
      opts: [
        'No, taking up private employment while on interdiction breaches the Code of Conduct and PSR 030422',
        'Yes, since they are receiving half salary',
        'Yes, provided they do not inform the ministry',
        'Only in commercial foreign banks'
      ],
      ans: 0,
      exp: 'Public officers remain bound by public service rules during interdiction and cannot engage in private business or employment.',
      ref: 'PSR 030422 & Code of Conduct'
    },
    {
      q: 'When an officer on suspension is convicted of a felony by a competent court, what is the next administrative step?',
      opts: [
        'Immediate dismissal from the Federal Public Service by the Commission upon receipt of the certified true copy of judgment',
        'Promotion to executive directorate rank',
        'Transfer to another ministry with full pay',
        'Grant of two years sabbatical leave'
      ],
      ans: 0,
      exp: 'Conviction on criminal charges warrants summary dismissal under PSR 030413 upon receipt of the court conviction record.',
      ref: 'PSR 030413'
    }
  ],
  6: [
    {
      q: 'What is "Termination of Appointment" under PSR and to whom does it typically apply?',
      opts: [
        'The separation of an unconfirmed officer on probation, or contract staff, in accordance with the terms of their appointment letter',
        'The execution of an officer on death row',
        'The transfer of an officer to a foreign embassy',
        'The promotion of an officer to permanent secretary'
      ],
      ans: 0,
      exp: 'Termination is used for officers on probation or contract who fail confirmation standards, given with one month notice or salary in lieu.',
      ref: 'PSR 020801'
    },
    {
      q: 'What is the required notice period for termination of appointment of an officer on probation?',
      opts: [
        'One (1) calendar month notice in writing, or payment of one month basic salary in lieu of notice',
        'Twenty-four (24) hours verbal notice',
        'Two (2) years notice',
        'Six (6) months notice'
      ],
      ans: 0,
      exp: 'Under PSR 020803, termination of appointment requires one calendar month formal notice or payment of one month salary in lieu.',
      ref: 'PSR 020803'
    },
    {
      q: 'Under what statutory grounds can the Federal Civil Service Commission order "Compulsory Retirement in the Public Interest"?',
      opts: [
        'Where an officer\'s continuation in service is deemed detrimental to public interest, efficiency, or integrity',
        'Whenever an officer buys a new private house',
        'When an officer reaches forty (40) years of age',
        'At the unilateral demand of a commercial bank'
      ],
      ans: 0,
      exp: 'The Commission may retire an officer compulsorily in the public interest based on persistent inefficiency, indiscipline, or restructuring.',
      ref: 'PSR 030408'
    },
    {
      q: 'Does an officer retired compulsorily in the public interest retain their earned pension entitlements?',
      opts: [
        'Yes, provided they have attained the qualifying statutory length of pensionable service under the Pension Reform Act',
        'No, compulsory retirement results in absolute forfeiture of all pensions',
        'Only 10% of their pension is preserved',
        'Pensions are paid directly to the staff union'
      ],
      ans: 0,
      exp: 'Unlike dismissal, compulsory retirement in the public interest preserves accrued pension rights if qualifying service maturity was met.',
      ref: 'PSR 030408 & PRA 2014'
    },
    {
      q: 'What is the legal consequence of "Dismissal" regarding future employment in any arm of the Nigerian Government?',
      opts: [
        'Absolute and permanent disqualification from future appointment in the Federal, State, or Local Government service',
        'Eligible for re-appointment after three months',
        'Eligible for appointment in parastatals only',
        'Automatic entry into political office'
      ],
      ans: 0,
      exp: 'PSR 030411 mandates that a dismissed officer is permanently barred from holding any future appointment in the public service.',
      ref: 'PSR 030411'
    },
    {
      q: 'What document is issued to an officer who separates from the service honorably upon retirement or resignation?',
      opts: [
        'Certificate of Service (Record of Service Form)',
        'A bank draft of five million Naira',
        'A diplomatic passport',
        'A legislative clearance certificate'
      ],
      ans: 0,
      exp: 'An officer leaving service honorably receives a formal Certificate of Service recording their exemplary career and character.',
      ref: 'PSR 020815'
    },
    {
      q: 'Is a Certificate of Service issued to an officer who is dismissed for serious misconduct?',
      opts: [
        'No, dismissed officers are strictly disqualified from receiving a Certificate of Service',
        'Yes, with an endorsement of "Satisfactory"',
        'Yes, upon paying a clearance processing fee',
        'It is issued only to their lawyer'
      ],
      ans: 0,
      exp: 'Under PSR 020816, an officer who is dismissed shall not be granted a Certificate of Service.',
      ref: 'PSR 020816'
    },
    {
      q: 'What is the minimum period of written notice required when an officer voluntarily resigns from the Federal Public Service?',
      opts: [
        'One (1) month notice in writing, or payment of one month salary in lieu of notice',
        'Twelve (12) months notice',
        'No notice is required',
        'Five (5) working days notice'
      ],
      ans: 0,
      exp: 'Voluntary resignation requires one month formal notice or payment of one month salary in lieu, plus clearance of all government liabilities.',
      ref: 'PSR 020802'
    },
    {
      q: 'Can an officer resign from service while facing pending disciplinary queries or audit surcharges?',
      opts: [
        'No, resignation will not be accepted until all pending queries, investigations, and financial liabilities are concluded and cleared',
        'Yes, resignation automatically cancels all disciplinary inquiries',
        'Yes, if approved by a trade union official',
        'Only if the officer travels out of the country'
      ],
      ans: 0,
      exp: 'An officer cannot use resignation to escape disciplinary consequences; resignation tendered during active inquiries is withheld pending determination.',
      ref: 'PSR 020804'
    },
    {
      q: 'Who possesses the exclusive constitutional power to dismiss a pensionable senior civil servant?',
      opts: [
        'The Federal Civil Service Commission (or FCTA Civil Service Commission for FCTA staff)',
        'The departmental head of division unilaterally',
        'The ministerial internal auditor',
        'The staff cooperative president'
      ],
      ans: 0,
      exp: 'Dismissal of pensionable senior staff is the exclusive constitutional prerogative of the Civil Service Commission.',
      ref: '1999 CFRN & PSR 030302'
    }
  ],
  7: [
    {
      q: 'What is the recognized unified salary structure governing core Federal Civil Servants in Nigeria?',
      opts: [
        'Consolidated Public Service Salary Structure (CONPSS)',
        'Consolidated Medical Salary Structure (CONMESS)',
        'Consolidated Tertiary Institutions Salary Structure (CONTISS)',
        'Consolidated Judicial Salary Structure (CONJUSS)'
      ],
      ans: 0,
      exp: 'Core Federal and FCTA civil servants are remunerated under the Consolidated Public Service Salary Structure (CONPSS).',
      ref: 'NSIWC Guidelines'
    },
    {
      q: 'On what standard calendar date do annual salary increments take effect in the Federal Civil Service?',
      opts: [
        '1st January of every year, subject to satisfactory appraisal reports',
        '1st October of every year',
        'On the officer\'s private birthday',
        'On the anniversary of national independence'
      ],
      ans: 0,
      exp: 'Annual salary increments take effect on 1st January, provided the officer\'s service has been certified satisfactory.',
      ref: 'PSR 040102'
    },
    {
      q: 'Under what conditions may an officer\'s annual salary increment be "Withheld" under the PSR?',
      opts: [
        'When the officer\'s work performance or conduct has been certified unsatisfactory during the preceding appraisal period',
        'Whenever the ministry runs out of printed cash notes',
        'When the officer takes approved maternity leave',
        'Whenever an election is scheduled'
      ],
      ans: 0,
      exp: 'Withholding of increment is a disciplinary sanction applied when an officer receives an adverse performance report.',
      ref: 'PSR 040201'
    },
    {
      q: 'What is the distinction between "Withholding" an increment and "Deferring" an increment?',
      opts: [
        'Withholding stops the increment indefinitely until re-earned; Deferring postpones consideration for a fixed period (e.g. 3-6 months)',
        'There is no administrative difference',
        'Deferring applies only to judges',
        'Withholding gives double pay later'
      ],
      ans: 0,
      exp: 'Withheld increments are lost until earned again; deferred increments are postponed for a specified probationary period.',
      ref: 'PSR 040202 - 040204'
    },
    {
      q: 'What is an "Acting Allowance" under Public Service Rules?',
      opts: [
        'An allowance paid to an officer formally appointed to act in a higher substantive post for a continuous period exceeding 30 days',
        'A payment for performing in theatrical drama',
        'A bonus for attending departmental seminars',
        'A stipend paid to intern students'
      ],
      ans: 0,
      exp: 'An acting allowance compensates an officer appointed to perform duties of a vacant higher post for at least 30 consecutive days.',
      ref: 'PSR 040110'
    },
    {
      q: 'What happens to the salary of an officer who is absent from duty without approved leave or reasonable cause?',
      opts: [
        'Salary is stopped immediately for the days of absence, without prejudice to formal disciplinary query for abandonment of duty',
        'The officer receives a 10% bonus upon returning',
        'The commercial bank covers the missing salary',
        'No administrative consequence ensues'
      ],
      ans: 0,
      exp: 'Under the "no work, no pay" rule and PSR 040108, unauthorized absence results in immediate stoppage of salary for the period.',
      ref: 'PSR 040108'
    },
    {
      q: 'When an overpayment of salary or allowances occurs due to clerical error, what is the government\'s recovery procedure?',
      opts: [
        'The amount is recovered through monthly deductions from the officer\'s salary, not exceeding one-third of net monthly emoluments',
        'The officer is immediately dismissed from service',
        'The commercial bank writes off the debt',
        'Recovery is prohibited once paid'
      ],
      ans: 0,
      exp: 'Overpayments must be recovered in manageable monthly installments, generally capped at one-third of net pay to avoid undue hardship.',
      ref: 'PSR 040114 & FR 1420'
    },
    {
      q: 'What is the mandatory electronic platform through which all federal civil servants\' salaries and payroll are disbursed?',
      opts: [
        'Integrated Personnel and Payroll Information System (IPPIS)',
        'Manual cash envelopes from the treasury cashier',
        'Cheques posted through the postal service',
        'Cryptocurrency tokens'
      ],
      ans: 0,
      exp: 'IPPIS is the centralized electronic payroll system mandated across MDAs to eliminate ghost workers and ensure accurate deductions.',
      ref: 'IPPIS Guidelines'
    },
    {
      q: 'Can a public officer\'s salary be attached or garnished by private commercial debt collectors without a valid court order?',
      opts: [
        'No, public salaries cannot be attached except pursuant to a formal garnishee order absolute issued by a competent court of law',
        'Yes, any creditor can freeze a public servant\'s salary directly',
        'Yes, with written permission from the departmental accountant',
        'Only on public holidays'
      ],
      ans: 0,
      exp: 'Protection of public salaries prevents third-party attachment unless authorized by a formal judicial garnishee order.',
      ref: 'Sheriffs and Civil Process Act & PSR'
    },
    {
      q: 'What is the maximum step reachable within any standard Grade Level under the CONPSS salary scale?',
      opts: [
        'Step 15',
        'Step 5',
        'Step 25',
        'Step 50'
      ],
      ans: 0,
      exp: 'CONPSS scales typically provide incremental steps from Step 1 up to Step 15 for each grade level.',
      ref: 'CONPSS Salary Circular'
    }
  ],
  8: [
    {
      q: 'What is the annual leave entitlement for public officers on Grade Level 08 and above in the Federal Public Service?',
      opts: [
        'Thirty (30) calendar days per annum',
        'Fourteen (14) working days',
        'Sixty (60) days',
        'Twenty-one (21) days'
      ],
      ans: 0,
      exp: 'PSR 100101 stipulates that officers on GL 08 and above are entitled to 30 calendar days of annual leave per leave year.',
      ref: 'PSR 100101'
    },
    {
      q: 'What is the annual leave entitlement for officers on Grade Levels 04 to 07?',
      opts: [
        'Twenty-eight (28) calendar days per annum',
        'Thirty (30) days',
        'Fourteen (14) days',
        'Forty (40) days'
      ],
      ans: 0,
      exp: 'Officers on intermediate grades (GL 04 to GL 07) are entitled to 28 calendar days of annual leave per annum.',
      ref: 'PSR 100101'
    },
    {
      q: 'What is the annual leave entitlement for junior employees on Grade Levels 01 to 03?',
      opts: [
        'Twenty-one (21) calendar days per annum',
        'Thirty (30) days',
        'Ten (10) days',
        'Seven (7) days'
      ],
      ans: 0,
      exp: 'Junior staff on GL 01 to GL 03 are entitled to 21 calendar days of annual leave annually.',
      ref: 'PSR 100101'
    },
    {
      q: 'What is the maximum number of days an officer can be granted as "Casual Leave" within one calendar year?',
      opts: [
        'Seven (7) working days, deductible from annual leave entitlement',
        'Thirty (30) working days',
        'Two months',
        'Casual leave is unlimited'
      ],
      ans: 0,
      exp: 'PSR 100201 limits casual leave to an aggregate maximum of 7 days in a year to attend to sudden urgent personal emergencies.',
      ref: 'PSR 100201'
    },
    {
      q: 'Can an officer accumulate unspent annual leave from previous years without prior formal approval from the Head of Service?',
      opts: [
        'No, leave cannot be accumulated from year to year; any unspent leave lapses unless explicitly deferred in writing for exigencies of service',
        'Yes, officers may accumulate up to five years of leave',
        'Leave is automatically converted to cash without working',
        'Leave accumulation is compulsory for all directors'
      ],
      ans: 0,
      exp: 'Under PSR 100104, annual leave cannot be accumulated. Leave not taken during the calendar year lapses unless formally deferred.',
      ref: 'PSR 100104'
    },
    {
      q: 'What is the statutory "Annual Leave Grant" (Leave Transport Grant) paid to civil servants?',
      opts: [
        'An annual financial allowance equivalent to ten percent (10%) of the officer\'s annual basic salary',
        'A free airline ticket to any country in Europe',
        'A voucher for five free hotel stays in Abuja',
        'A monthly fuel coupon'
      ],
      ans: 0,
      exp: 'Leave transport grant is paid annually, calculated as 10% of annual basic salary, to assist staff in traveling during vacation.',
      ref: 'PSR 100108'
    },
    {
      q: 'Under what condition may an officer be formally "Recalled from Leave" before the expiration of their vacation?',
      opts: [
        'Due to overwhelming exigencies of public service certified by the Permanent Secretary, with unspent leave days preserved for later utilization',
        'To attend an informal office social party',
        'Whenever an election campaign is organized',
        'Recall from leave is forbidden under all circumstances'
      ],
      ans: 0,
      exp: 'An officer may be recalled due to urgent service needs; the remaining unspent portion of leave must be credited back to the officer.',
      ref: 'PSR 100106'
    },
    {
      q: 'What clearance is mandatory if an officer intends to spend their annual leave outside Nigeria?',
      opts: [
        'Formal written permission (clearance to travel overseas) from the Permanent Secretary / Secretary to the Commission',
        'Only clearance from their local airline agent',
        'No permission is needed if traveling on weekend',
        'Clearance from the departmental trade union secretary'
      ],
      ans: 0,
      exp: 'Civil servants traveling abroad for leave or personal reasons must obtain formal travel clearance from the Accounting Officer.',
      ref: 'PSR 100107'
    },
    {
      q: 'Can an officer encash their annual leave (exchange vacation days for extra cash salary)?',
      opts: [
        'No, leave encashment is strictly prohibited under Public Service Rules; officers must physically proceed on rest',
        'Yes, officers can sell all 30 days of leave for cash',
        'Only directors on GL 16 are allowed to sell leave',
        'Yes, upon paying a tax surcharge'
      ],
      ans: 0,
      exp: 'The PSR expressly forbids paying cash in lieu of leave, emphasizing the physical and mental necessity of annual rest for staff wellness.',
      ref: 'PSR 100105'
    },
    {
      q: 'What is the consequence of failing to resume duty on the designated expiration date of approved leave?',
      opts: [
        'It constitutes unauthorized absence from duty liable to salary stoppage and disciplinary query',
        'Automatic extension of leave with full pay',
        'Promotion to the next higher grade level',
        'A written commendation from the registry'
      ],
      ans: 0,
      exp: 'Overstaying approved leave without verified medical certification constitutes absence without leave, a punishable disciplinary infraction.',
      ref: 'PSR 100109'
    }
  ],
  9: [
    {
      q: 'Under the revised Public Service Rules, what is the duration of Maternity Leave granted to female public officers?',
      opts: [
        'Sixteen (16) weeks with full pay',
        'Six (6) weeks with half pay',
        'Twelve (12) weeks without pay',
        'Six (6) calendar months'
      ],
      ans: 0,
      exp: 'The revised PSR approved 16 weeks maternity leave with full pay for pregnant female public officers.',
      ref: 'PSR 100218'
    },
    {
      q: 'What is the duration of Paternity Leave approved for male civil servants whose spouses deliver a baby?',
      opts: [
        'Fourteen (14) working days within the first two months of birth',
        'Three (3) months',
        'Twenty-four (24) hours only',
        'No paternity leave exists'
      ],
      ans: 0,
      exp: 'The revised PSR grants male officers 14 working days paternity leave to support their nursing wives.',
      ref: 'PSR 100222'
    },
    {
      q: 'What is the maximum period of "Sick Leave" an officer can be granted on full pay upon medical recommendation?',
      opts: [
        'Up to three (3) months in the first instance, extendable by another three (3) months on half pay upon Medical Board review',
        'Five (5) years on full pay',
        'Twenty-four (24) hours only',
        'Unlimited duration'
      ],
      ans: 0,
      exp: 'PSR 100225 provides for up to 3 months sick leave on full pay, and an additional 3 months on half pay subject to Medical Board assessment.',
      ref: 'PSR 100225'
    },
    {
      q: 'What step must be taken if an officer remains incapacitated by illness after exhausting six months of sick leave?',
      opts: [
        'The officer is examined by a formally constituted Medical Board to determine fitness for continuation in service or medical invalidation/retirement',
        'The officer is summarily dismissed without benefits',
        'The officer is demoted to GL 01',
        'The officer is made to work from home with zero salary'
      ],
      ans: 0,
      exp: 'After 6 months of continuous illness, a Federal Medical Board convenes to evaluate the officer for medical boarding/retirement.',
      ref: 'PSR 100227'
    },
    {
      q: 'What is "Compassionate Leave" under the Public Service Rules?',
      opts: [
        'Special leave of up to five (5) working days granted to an officer on the death of an immediate family member (spouse, child, parent)',
        'An extra holiday for officers who do not like working in the rain',
        'A leave granted for religious fasting',
        'An overseas shopping holiday'
      ],
      ans: 0,
      exp: 'Compassionate leave provides brief leave (up to 5 working days) on compassionate grounds upon the bereavement of immediate relatives.',
      ref: 'PSR 100230'
    },
    {
      q: 'What is the duration of Adoption Leave granted to a public officer who legally adopts a child under four months old?',
      opts: [
        'Fourteen (14) calendar days',
        'Twelve (12) weeks',
        'Six (6) months',
        'Three (3) days'
      ],
      ans: 0,
      exp: 'Female officers legally adopting an infant under 4 months are entitled to 14 calendar days adoption leave.',
      ref: 'PSR 100223'
    },
    {
      q: 'Can a female officer proceeding on maternity leave also claim her regular annual leave in the same calendar year?',
      opts: [
        'Yes, maternity leave does not forfeit or diminish an officer\'s substantive annual leave entitlement for that year',
        'No, maternity leave completely cancels annual leave',
        'Only if the baby is born on a public holiday',
        'She must wait three years before taking annual leave'
      ],
      ans: 0,
      exp: 'Under revised circulars, maternity leave is a special statutory leave that does not extinguish annual leave entitlement.',
      ref: 'PSR 100220'
    },
    {
      q: 'What medical certification is required before sick leave exceeding three consecutive days can be formally validated?',
      opts: [
        'A valid medical certificate issued by a registered medical practitioner in a recognized government hospital or NHIA provider',
        'A handwritten note from a pharmacy cashier',
        'A verbal phone call from a traditional herbalist',
        'A post on the departmental noticeboard'
      ],
      ans: 0,
      exp: 'Sick leave extending beyond 3 days requires a formal medical certificate issued by a recognized government hospital doctor.',
      ref: 'PSR 100224'
    },
    {
      q: 'What is the daily nursing break entitlement for female officers returning to work from maternity leave?',
      opts: [
        'Two (2) hours of nursing time per working day (usually taken an hour earlier at close of work) for up to six months',
        'Five (5) hours per day',
        'No time off is permitted',
        'The entire afternoon off every day'
      ],
      ans: 0,
      exp: 'Nursing mothers are entitled to 2 hours off daily for up to six months to nurse their infants.',
      ref: 'PSR 100221'
    },
    {
      q: 'Under what conditions is Quarantine Leave granted under Public Service Rules?',
      opts: [
        'When an officer is exposed to a recognized infectious disease and officially quarantined by public health authorities',
        'Whenever an officer has seasonal catarrh',
        'During routine annual leave',
        'Only when traveling by sea'
      ],
      ans: 0,
      exp: 'Quarantine leave is granted on full pay when public health officers order quarantine to prevent epidemic outbreaks.',
      ref: 'PSR 100233'
    }
  ],
  10: [
    {
      q: 'What is the minimum confirmed length of pensionable service required before an officer is eligible for Study Leave with Pay?',
      opts: [
        'Two (2) years of confirmed satisfactory service',
        'Six (6) months on probation',
        'Ten (10) years',
        'Twenty (20) years'
      ],
      ans: 0,
      exp: 'PSR 100236 requires an officer to have at least 2 years of confirmed service before applying for study leave with pay.',
      ref: 'PSR 100236'
    },
    {
      q: 'What is the maximum duration for which Study Leave with Pay can be granted for a postgraduate degree course?',
      opts: [
        'Two (2) years in the first instance, extendable to a maximum of three (3) years upon evidence of satisfactory academic progress',
        'Ten (10) years automatically',
        'Six (6) months only',
        'Fifteen (15) years'
      ],
      ans: 0,
      exp: 'Study leave with pay is granted for up to 2 years initially, with possible extension to 3 years for doctorate or clinical programs.',
      ref: 'PSR 100238'
    },
    {
      q: 'What legal instrument must an officer execute before proceeding on Study Leave with Pay?',
      opts: [
        'A formal legally binding Service Bond with two reputable guarantors committing to serve the government upon course completion',
        'A mortgage on their private residential property',
        'A transfer of their voter registration card',
        'An affidavit renouncing all pensions'
      ],
      ans: 0,
      exp: 'Execution of a formal Study Leave Bond ensures the officer returns to serve the government for a prescribed period or refunds all expenses.',
      ref: 'PSR 100240'
    },
    {
      q: 'What is the service commitment ratio required under a Study Leave Bond?',
      opts: [
        'The officer must serve the government for a period equal to the duration of the study leave, up to double the study period for sponsored courses',
        'Zero days (no service commitment exists)',
        'Thirty-five years regardless of course duration',
        'One week only'
      ],
      ans: 0,
      exp: 'Bond obligations mandate serving the government for a duration equivalent to, or double, the period of study leave enjoyed.',
      ref: 'PSR 100241'
    },
    {
      q: 'What consequence ensues if an officer breaches their Study Leave Bond by resigning or failing to return to service?',
      opts: [
        'The officer and their guarantors are legally liable to refund the full amount of salaries, allowances, and tuition fees paid during the study leave',
        'A minor administrative caution',
        'Automatic grant of pension benefits',
        'No legal consequence'
      ],
      ans: 0,
      exp: 'Breach of bond triggers legal recovery of all salaries, estacode, and sponsorship costs from the officer and their named guarantors.',
      ref: 'PSR 100242'
    },
    {
      q: 'Can an officer change their approved course of study or university without prior written permission from the Ministry / OHCSF?',
      opts: [
        'No, unauthorized modification of course or institution constitutes serious misconduct and leads to immediate revocation of study leave',
        'Yes, officers may switch courses at their convenience',
        'Only if changing to a foreign language course',
        'Yes, upon verbal notification to the university registrar'
      ],
      ans: 0,
      exp: 'Course content and institution are strictly bound by the approval letter; changes without prior clearance result in withdrawal of sponsorship.',
      ref: 'PSR 100244'
    },
    {
      q: 'What frequency of academic progress reports must a sponsored officer submit to their parent ministry during study leave?',
      opts: [
        'At the end of every semester / academic term, signed and certified by the university authorities',
        'Only after graduation',
        'Once every five years',
        'Progress reports are optional'
      ],
      ans: 0,
      exp: 'Sponsored officers must submit certified terminal progress reports at the close of every semester to verify satisfactory attendance.',
      ref: 'PSR 100245'
    },
    {
      q: 'Under what circumstances is Study Leave Without Pay granted to a civil servant?',
      opts: [
        'Where the course is deemed of personal interest rather than immediate priority need to the government, but useful for overall career enhancement',
        'Whenever an officer wants to avoid a disciplinary query',
        'During probationary service',
        'As an automatic bonus'
      ],
      ans: 0,
      exp: 'Study leave without pay accommodates non-priority courses, preserving service continuity without salary commitment.',
      ref: 'PSR 100246'
    },
    {
      q: 'Within how many days of completing their course must an officer formally report back to duty at their ministry?',
      opts: [
        'Immediately, and strictly within thirty (30) days of conclusion of the academic program',
        'Within two years',
        'Whenever convenient',
        'Within twelve months'
      ],
      ans: 0,
      exp: 'Officers must report back for active duty immediately upon concluding examinations or course requirements, not exceeding 30 days.',
      ref: 'PSR 100247'
    },
    {
      q: 'Does an officer on approved Study Leave with Pay earn annual increments during the study period?',
      opts: [
        'Yes, normal incremental credit is earned subject to satisfactory academic progress reports certified by the institution',
        'No, incremental progression is frozen for all students',
        'Only if the course is taken in an African country',
        'Increments are reduced by 50%'
      ],
      ans: 0,
      exp: 'Officers on approved study leave with pay earn annual increments provided their academic progress is verified satisfactory.',
      ref: 'PSR 100248'
    }
  ],
  11: [
    {
      q: 'What is Duty Tour Allowance (DTA) under the Public Service Rules?',
      opts: [
        'A daily operational allowance paid to an officer traveling on official assignment outside their normal duty station within Nigeria',
        'A permanent monthly salary increase',
        'A refund for buying personal clothing',
        'A loan to purchase a commercial motor vehicle'
      ],
      ans: 0,
      exp: 'DTA provides per diem financial support to cover hotel accommodation and meals during official travel outside station.',
      ref: 'PSR 130101'
    },
    {
      q: 'What is "Estacode Allowance" in the Federal Civil Service?',
      opts: [
        'A daily overseas travel subsistence allowance paid in approved foreign currency to public officers on foreign official delegations',
        'A fee paid for obtaining a national passport',
        'An allowance for learning foreign diplomacy',
        'A customs duty exemption voucher'
      ],
      ans: 0,
      exp: 'Estacode is the statutory daily foreign travel allowance designated in US Dollars / foreign currency for approved international duty.',
      ref: 'PSR 130105'
    },
    {
      q: 'What is "Disturbance Allowance" (Local Transfer Allowance) paid to an officer transferred from one duty station to another?',
      opts: [
        'An allowance to compensate for packing, transportation, and dislocation of family household goods during permanent transfer',
        'A penalty fine for refusing transfer',
        'A payment for working in noisy offices',
        'A bonus for buying real estate'
      ],
      ans: 0,
      exp: 'Local transfer allowance offsets the financial inconvenience and cost of relocating family and household goods.',
      ref: 'PSR 130108'
    },
    {
      q: 'What flight class entitlement is approved for Directorate officers (Grade Levels 15 to 17) traveling on official domestic flights?',
      opts: [
        'Business Class (or Economy Class as dictated by prevailing fiscal rationalization circulars)',
        'First Class suite with private jet charter',
        'Cargo hold seating only',
        'No air travel is permitted'
      ],
      ans: 0,
      exp: 'Official travel rules specify flight classes by grade level, with Directors on Business class (or Economy per austerity circulars).',
      ref: 'PSR 130112'
    },
    {
      q: 'Under what conditions is "Warm Clothing Allowance" granted to a public officer?',
      opts: [
        'When an officer is traveling on official duty or study to a temperate or cold climate foreign country for the first time in a specified period',
        'Whenever harmattan begins in northern Nigeria',
        'During routine annual leave in Jos',
        'For purchasing ceremonial graduation gowns'
      ],
      ans: 0,
      exp: 'Warm clothing allowance is paid once every few years for officers proceeding to designated cold/temperate regions abroad.',
      ref: 'PSR 130115'
    },
    {
      q: 'Within what period after returning from an official tour must an officer submit their travel claims and receipts for retirement?',
      opts: [
        'Within seven (7) calendar days of return to the duty station',
        'Within five (5) fiscal years',
        'At the date of retirement',
        'Within twelve (12) months'
      ],
      ans: 0,
      exp: 'Touring advances and DTA reconciliation must be retired with used boarding passes and receipts within 7 days of return.',
      ref: 'PSR 130104 & FR 1415'
    },
    {
      q: 'What is "Kilometric Allowance" in civil service transport regulations?',
      opts: [
        'An approved per-kilometer reimbursement rate paid to an officer authorized to use their personal vehicle on official journey',
        'A fine for exceeding expressway speed limits',
        'A fee for buying vehicle tires',
        'An annual highway maintenance tax'
      ],
      ans: 0,
      exp: 'Kilometric allowance reimburses authorized official mileage driven in private vehicles where official pool vehicles are unavailable.',
      ref: 'PSR 130118'
    },
    {
      q: 'Can an officer receive full Duty Tour Allowance if hotel accommodation and meals are fully sponsored by an external host or development partner?',
      opts: [
        'No, the allowance is reduced to a supplement (e.g. 10% - 25% incidental rate) to prevent double remuneration',
        'Yes, full DTA must always be paid regardless of donor sponsorship',
        'The officer receives double DTA as a bonus',
        'The external donor must surrender all funds to the staff union'
      ],
      ans: 0,
      exp: 'Where full lodging and boarding are provided by an external organizer, officers are entitled only to a fractional incidental allowance.',
      ref: 'PSR 130106'
    },
    {
      q: 'Who must approve foreign travel and estacode payment for a Permanent Secretary or Chief Executive of a federal parastatal?',
      opts: [
        'The Secretary to the Government of the Federation (SGF) / Presidency',
        'The airline booking agent',
        'The commercial bank branch manager',
        'The junior clerical staff committee'
      ],
      ans: 0,
      exp: 'Overseas travel by Chief Executives and Permanent Secretaries requires presidential clearance through the Office of the SGF.',
      ref: 'Presidency Travel Guidelines'
    },
    {
      q: 'What is the consequence of submitting fraudulent hotel receipts or inflated mileage claims for DTA reimbursement?',
      opts: [
        'It constitutes serious financial misconduct punishable by query, recovery, surcharge, and potential dismissal under PSR and FR',
        'A reduction of three vacation days',
        'A verbal warning from the registry clerk',
        'No disciplinary consequence'
      ],
      ans: 0,
      exp: 'Falsifying travel claims or forging hotel vouchers constitutes criminal deception and serious misconduct under civil service regulations.',
      ref: 'PSR 030402 & FR 3129'
    }
  ],
  12: [
    {
      q: 'What is the primary health insurance scheme providing medical coverage for Federal and FCTA public servants?',
      opts: [
        'National Health Insurance Authority (NHIA) / formal public sector social health insurance program',
        'Private commercial overseas medical club',
        'Local community thrift society',
        'Out-of-pocket cash payments exclusively'
      ],
      ans: 0,
      exp: 'Public officers are covered under the NHIA (formerly NHIS) for outpatient and inpatient medical care through accredited healthcare providers.',
      ref: 'NHIA Act 2022 & PSR 070101'
    },
    {
      q: 'Under what statutory circumstances can a public officer be sponsored for medical treatment overseas?',
      opts: [
        'Where a Federal Medical Board certifies that the requisite medical expertise or technology is unavailable in Nigeria, with approval of the Minister / Presidency',
        'Whenever an officer desires routine dental checkup abroad',
        'Whenever an officer is on annual vacation in Europe',
        'Upon recommendation of a traditional herbalist'
      ],
      ans: 0,
      exp: 'Overseas medical sponsorship requires certification by a Federal Medical Board confirming the treatment cannot be performed locally.',
      ref: 'PSR 070201'
    },
    {
      q: 'What provision exists for refund of medical expenses incurred by an officer in an emergency at an unaccredited private facility?',
      opts: [
        'Refund may be considered upon verification by the Ministry of Health and submission of authentic hospital receipts within statutory ceilings',
        'Full refund of 100% unconditional cash without receipts',
        'Refund is legally prohibited in all circumstances',
        'Refund is paid in foreign gold coins'
      ],
      ans: 0,
      exp: 'Emergency medical expenses incurred outside NHIA facilities may be reimbursed if certified valid and necessary by competent health authorities.',
      ref: 'PSR 070105'
    },
    {
      q: 'What is the medical obligation of a public officer who contracts a communicable or infectious disease?',
      opts: [
        'Immediately report to the competent health officer and refrain from attending duty until certified free of infection',
        'Continue working secretly without notifying colleagues',
        'Travel to a rural village without medical treatment',
        'Disregard medical isolation protocols'
      ],
      ans: 0,
      exp: 'Public health safety requires immediate notification and isolation of officers contracting communicable diseases to protect workplaces.',
      ref: 'PSR 070108'
    },
    {
      q: 'What is the composition of a Federal Medical Board convened under Public Service Rules?',
      opts: [
        'A panel of registered specialist medical doctors appointed by the Federal / FCT Ministry of Health',
        'A committee of administrative clerks and trade union leaders',
        'A team of commercial bank insurance assessors',
        'A group of traditional medicine vendors'
      ],
      ans: 0,
      exp: 'A Medical Board is constituted by certified medical specialists appointed by the Ministry of Health to evaluate fitness or invalidation.',
      ref: 'PSR 070205'
    },
    {
      q: 'What compensation or medical coverage is provided for an officer who sustains an injury arising out of and in the course of official duty?',
      opts: [
        'Full government medical care, and statutory compensation under the Employee\'s Compensation Act (ECA) administered by NSITF',
        'Immediate termination of appointment',
        'Deduction of hospital bills from future pension',
        'No assistance is provided'
      ],
      ans: 0,
      exp: 'The Employee\'s Compensation Act (ECA) mandates medical care and disability compensation for workplace accidents and occupational injuries.',
      ref: 'ECA 2010 & PSR 070110'
    },
    {
      q: 'What medical examination is mandatory for all successful candidates prior to assumption of duty in the civil service?',
      opts: [
        'Comprehensive Pre-Employment Medical Fitness Examination conducted by a government medical officer',
        'An eye test only at a commercial optician',
        'No medical test is required',
        'A fitness check done five years after appointment'
      ],
      ans: 0,
      exp: 'Candidates must be certified medically sound and physically fit by a government medical officer before employment letters become effective.',
      ref: 'PSR 020105'
    },
    {
      q: 'What medical board action occurs when an officer is certified permanently medically unfit for further public service?',
      opts: [
        'Recommendation for Medical Invalidation (Retirement on Medical Grounds) with preserved pension entitlements under the Pension Act',
        'Summary dismissal with loss of all retirement benefits',
        'Demotion to clerical messenger grade',
        'Suspension without salary indefinitely'
      ],
      ans: 0,
      exp: 'Medical invalidation allows honorable exit with pension rights when health conditions permanently prevent official duty execution.',
      ref: 'PSR 070208 & PRA 2014'
    },
    {
      q: 'Can a ministry provide basic first aid and emergency occupational health kits within departmental office complexes?',
      opts: [
        'Yes, MDAs are statutorily required to maintain functional first aid facilities and trained safety wardens for workplace health and safety',
        'No, first aid kits are prohibited in government offices',
        'Only in police stations',
        'First aid is allowed only on weekends'
      ],
      ans: 0,
      exp: 'Occupational safety standards require every public office building to maintain equipped first aid stations for emergency care.',
      ref: 'Factories Act & PSR Safety Circulars'
    },
    {
      q: 'How are medical records and health diagnoses of public servants protected under administrative confidentiality?',
      opts: [
        'Medical files are strictly confidential records accessible only to medical officers and authorized human resources personnel',
        'Medical diagnoses are published on departmental noticeboards',
        'Medical records are broadcast during staff meetings',
        'Anyone in the registry may inspect medical files freely'
      ],
      ans: 0,
      exp: 'Medical confidentiality safeguards an officer\'s health data; unauthorized disclosure constitutes serious disciplinary misconduct.',
      ref: 'PSR 070104 & Official Secrets Act'
    }
  ],
  13: [
    {
      q: 'Under the Official Secrets Act and Public Service Rules, what are the four recognized security grading classifications for government papers?',
      opts: [
        'Restricted, Confidential, Secret, and Top Secret',
        'Public, Semi-public, Private, and Commercial',
        'Ordinary, Urgent, Very Urgent, and Immediate',
        'Standard, Intermediate, Advanced, and Executive'
      ],
      ans: 0,
      exp: 'Security classifications are Restricted, Confidential, Secret, and Top Secret, denoting escalating levels of damage to national interest if compromised.',
      ref: 'Official Secrets Act Cap O3 LFN & PSR'
    },
    {
      q: 'What is the statutory consequence of an officer leaking or disclosing classified government correspondence without lawful authorization?',
      opts: [
        'It constitutes serious misconduct punishable by immediate interdiction, formal query, summary dismissal, and criminal prosecution under the Official Secrets Act',
        'A verbal warning from a colleague',
        'A commendation for transparency',
        'A minor fine of ₦1,000'
      ],
      ans: 0,
      exp: 'Unauthorized disclosure of classified matters is both grave serious misconduct under PSR 030403 and a criminal offense under the Official Secrets Act.',
      ref: 'Official Secrets Act & PSR 030403'
    },
    {
      q: 'What statutory oath must every public officer subscribe to upon appointment and prior to handling official documents?',
      opts: [
        'Oath of Allegiance and Oath of Secrecy',
        'Oath of Commercial Enterprise',
        'Oath of Party Loyalty',
        'Oath of Financial Speculation'
      ],
      ans: 0,
      exp: 'Public officers must execute the Oath of Allegiance and Oath of Secrecy under the Oaths Act before assuming sensitive duties.',
      ref: 'Oaths Act Cap O1 LFN & PSR'
    },
    {
      q: 'How must "Top Secret" and "Secret" files be physically stored and secured within government registries?',
      opts: [
        'In locked steel security safes or reinforced fireproof cabinets in a designated Secret Registry under dual-custody key management',
        'On open wooden tables in the public corridor',
        'In unlocked cardboard cartons in the cafeteria',
        'On personal laptops left in commercial taxicabs'
      ],
      ans: 0,
      exp: 'Classified records must be stored in secure steel cabinets or safes within access-controlled Secret Registries.',
      ref: 'Registry Manual & Security Guidelines'
    },
    {
      q: 'What is the "Clean Desk Policy" enforced in federal ministries to safeguard classified records?',
      opts: [
        'All official files and classified documents must be locked away in drawers or safes at the close of work or when offices are unattended',
        'Washing desks with disinfectant every two hours',
        'Removing all computer monitors from offices',
        'Leaving confidential files open for night security guards to read'
      ],
      ans: 0,
      exp: 'The clean desk policy prevents unauthorized viewing or photography of confidential papers outside official working hours.',
      ref: 'FCTA Administrative Security Rules'
    },
    {
      q: 'What procedure is mandatory for transmitting "Secret" or "Top Secret" correspondence between MDAs?',
      opts: [
        'Transmission via double sealed tamper-evident envelopes delivered by vetted official confidential dispatch riders or diplomatic bag',
        'Sending photographs of the document via public social media groups',
        'Posting via unsecured commercial postcard',
        'Reading the contents aloud on local FM radio'
      ],
      ans: 0,
      exp: 'High-security correspondence requires double-envelope packing with unmarked outer layer and delivery by vetted confidential couriers.',
      ref: 'Cabinet Office Security Manual'
    },
    {
      q: 'Can a retired civil servant retain classified official files, diaries, or state secrets after leaving the service?',
      opts: [
        'No, all official papers and classified materials remain state property and must be surrendered upon retirement or separation',
        'Yes, officers may take all secret files home as personal souvenirs',
        'Retirees may sell official papers to foreign publishing houses',
        'Only permanent secretaries may keep secret files'
      ],
      ans: 0,
      exp: 'The Official Secrets Act permanently forbids former officers from retaining or publishing classified state information without authorization.',
      ref: 'Official Secrets Act S.1'
    },
    {
      q: 'What is the protocol when an officer discovers that a classified document has been lost, stolen, or compromised?',
      opts: [
        'Immediately report in writing to the Head of Department and the Chief Security Officer for investigation and containment',
        'Conceal the incident and forge a replacement document',
        'Blame a casual cleaner without reporting',
        'Wait until retirement before disclosing'
      ],
      ans: 0,
      exp: 'Loss or compromise of classified files requires urgent notification to security authorities to initiate damage assessment and counter-measures.',
      ref: 'Security Regulations Circular'
    },
    {
      q: 'Under what conditions may a public officer communicate directly with foreign embassies or international diplomatic missions?',
      opts: [
        'Only through or with the formal written authorization of the Ministry of Foreign Affairs and the Permanent Secretary',
        'At personal discretion on personal social media',
        'Whenever an embassy organizes a private cocktail party',
        'Officers may share all internal government memoranda freely'
      ],
      ans: 0,
      exp: 'Direct diplomatic interaction without clearance from Foreign Affairs and security channels is strictly prohibited.',
      ref: 'PSR 030420 & Diplomatic Protocols'
    },
    {
      q: 'What method must be used to destroy obsolete classified working drafts, carbon papers, or waste notes in a government office?',
      opts: [
        'Destruction by cross-cut mechanical shredder or controlled incineration witnessed by the registry security officer',
        'Dumping intact files in public roadside garbage bins',
        'Selling confidential draft papers to street market vendors',
        'Discarding papers in office parking lots'
      ],
      ans: 0,
      exp: 'Classified scrap and drafts must be completely obliterated by shredding or burning to prevent data leaks and dumpster diving.',
      ref: 'National Archives & Security Manual'
    }
  ],
  14: [
    {
      q: 'Under the Code of Conduct (Fifth Schedule, 1999 CFRN) and Public Service Rules, what commercial activity is a full-time public officer constitutionally permitted to engage in?',
      opts: [
        'Farming and agricultural enterprises, provided it does not interfere with the diligent performance of official duties',
        'Operating a private commercial bank branch',
        'Running a private commercial transport fleet during working hours',
        'Managing a private petroleum filling station'
      ],
      ans: 0,
      exp: 'The Constitution and PSR strictly forbid public officers from engaging in trade or commercial business, with the sole exception of farming.',
      ref: '5th Schedule 1999 CFRN & PSR 030422'
    },
    {
      q: 'Can a public officer serve as a paid Managing Director or Director of a private commercial enterprise while in service?',
      opts: [
        'No, holding executive directorships or active management in private companies is strictly prohibited',
        'Yes, provided the company operates outside Abuja',
        'Yes, if the salary is below one million Naira',
        'Only on weekends and public holidays'
      ],
      ans: 0,
      exp: 'Serving as an executive director or manager of private business entities is a direct breach of the Code of Conduct for public officers.',
      ref: 'Code of Conduct Bureau Act S.6'
    },
    {
      q: 'Is a public servant permitted to invest passively in publicly traded shares and bonds on the Nigerian Exchange (NGX)?',
      opts: [
        'Yes, passive shareholding and personal financial investment without active management or conflict of interest is lawful',
        'No, public officers cannot hold any company shares',
        'Only if the shares are held in a foreign country',
        'Shares must be transferred to the ministry'
      ],
      ans: 0,
      exp: 'Public officers are permitted passive investment in publicly traded stocks, mutual funds, and treasury bills provided no conflict of interest arises.',
      ref: 'CCB Guidelines'
    },
    {
      q: 'What is the consequence of a public officer awarding government contracts to private companies in which they or their immediate family have personal financial interest?',
      opts: [
        'It constitutes serious corrupt misconduct, conflict of interest, and a criminal violation punishable by dismissal and CCB/ICPC prosecution',
        'A minor administrative reprimand',
        'An executive commendation for business acumen',
        'No action if the work was completed'
      ],
      ans: 0,
      exp: 'Self-dealing and conflict of interest in procurement violate both the Public Procurement Act and Code of Conduct, attracting severe penalties.',
      ref: 'PPA 2007 S.58 & PSR 030402'
    },
    {
      q: 'Can a public officer engage in "Moonlighting" (holding a second full-time employment in the private sector)?',
      opts: [
        'No, dual employment is strictly prohibited and constitutes gross misconduct warranting summary dismissal',
        'Yes, if the second job is done remotely at night',
        'Only if the private employer pays double taxes',
        'Yes, if approved by a trade union official'
      ],
      ans: 0,
      exp: 'Full-time public officers owe total service commitment to the government; holding concurrent employment is grounds for dismissal.',
      ref: 'PSR 030422'
    },
    {
      q: 'Under what conditions may a public medical doctor, university lecturer, or engineer in public service participate in professional consulting?',
      opts: [
        'Only within approved institutional practice frameworks and academic guidelines that do not compromise official duties',
        'Completely unrestricted commercial private practice during working hours',
        'By opening private commercial shops inside government offices',
        'Without any administrative clearance'
      ],
      ans: 0,
      exp: 'Professional private practice is governed by strict statutory limits and institutional rules to prevent abandonment of public service roles.',
      ref: 'Medical/Academic Scheme Circulars'
    },
    {
      q: 'What is the requirement regarding public officers accepting paid commercial endorsements or advertising appearances?',
      opts: [
        'Public officers are strictly forbidden from monetizing their official position, name, or image for commercial corporate advertising',
        'Endorsements are permitted for international cosmetic brands',
        'Officers may advertise commercial lottery platforms',
        'Permitted with 50% commission to the department'
      ],
      ans: 0,
      exp: 'Public servants must maintain impartiality and integrity; commercial endorsements degrade public confidence and breach ethical rules.',
      ref: 'Code of Conduct Bureau Rules'
    },
    {
      q: 'Can a public servant accept an honorary chieftaincy title or private community award during their tenure in office?',
      opts: [
        'Only with prior formal written clearance and approval from the President / Head of the Civil Service of the Federation',
        'Yes, chieftaincy titles may be accepted without notification',
        'Only if the chieftaincy title comes with a luxury motor vehicle',
        'Chieftaincy titles are compulsory for all directors'
      ],
      ans: 0,
      exp: 'Acceptance of traditional or foreign titles requires presidential clearance to avoid political, regional, or tribal entanglement.',
      ref: 'PSR 030423 & Cabinet Circulars'
    },
    {
      q: 'What tribunal has exclusive constitutional jurisdiction to try public officers who breach the Code of Conduct rules on private practice?',
      opts: [
        'The Code of Conduct Tribunal (CCT)',
        'The Local Government Area Court',
        'The Customary Court of Appeal',
        'The Trade Union Disciplinary Panel'
      ],
      ans: 0,
      exp: 'The Code of Conduct Tribunal is established under the 1999 Constitution to try infractions of the Code of Conduct by public officers.',
      ref: '1999 CFRN 5th Schedule Part I'
    },
    {
      q: 'What penalties can the Code of Conduct Tribunal impose on a public servant found guilty of illicit private business or undeclared assets?',
      opts: [
        'Vacation of office, disqualification from public office for up to 10 years, and forfeiture of illicit assets to the Federal Government',
        'A written essay on moral philosophy',
        'A mandatory two-week holiday in a resort hotel',
        'A transfer to another department with double salary'
      ],
      ans: 0,
      exp: 'CCT powers include removal from office, multi-year debarment from public office, and forfeiture of corruptly acquired assets.',
      ref: '1999 CFRN 5th Schedule S.18'
    }
  ],
  15: [
    {
      q: 'Through which statutory channel must an aggrieved civil servant submit a formal petition or appeal regarding promotion, discipline, or seniority?',
      opts: [
        'Through the officer\'s immediate Head of Department and Permanent Secretary to the Civil Service Commission',
        'Directly to external social media platforms and bloggers',
        'Directly to foreign human rights bodies, bypassing the ministry',
        'To the local political party chairman'
      ],
      ans: 0,
      exp: 'PSR Chapter 9 mandates that all petitions must follow official hierarchical channels through the HOD to the Accounting Officer and Commission.',
      ref: 'PSR 090101'
    },
    {
      q: 'What is the statutory limitation period within which an officer must lodge an appeal or petition against an administrative decision?',
      opts: [
        'Within three (3) months of the date of the decision or occurrence of the grievance',
        'Within twenty-four (24) hours',
        'Within ten (10) years',
        'At any time during the officer\'s lifetime'
      ],
      ans: 0,
      exp: 'Under PSR 090201, petitions must be lodged within 3 months of the event; stale petitions are liable to summary rejection.',
      ref: 'PSR 090201'
    },
    {
      q: 'What constitutes an "Improper Channel" of petitioning in the Public Service Rules?',
      opts: [
        'Bypassing departmental authority to petition the President, Minister, National Assembly, or media directly without exhaustion of domestic channels',
        'Writing on formal official letterhead',
        'Typing the petition in clear standard English',
        'Submitting three copies to the registry'
      ],
      ans: 0,
      exp: 'Petitioning external authorities or bypassing the Permanent Secretary violates service hierarchy and constitutes disciplinary misconduct.',
      ref: 'PSR 090103'
    },
    {
      q: 'Can a group of officers submit a "Joint Petition" regarding service conditions under the PSR?',
      opts: [
        'No, individual grievances must be submitted by individual officers; collective petitions must be channeled through recognized trade unions',
        'Yes, any group of officers can submit joint signed declarations',
        'Joint petitions are compulsory for promotion appeals',
        'Only if signed by at least 500 officers'
      ],
      ans: 0,
      exp: 'PSR forbids collective or joint petitions by individuals; collective bargaining is the exclusive purview of recognized trade unions.',
      ref: 'PSR 090105'
    },
    {
      q: 'What is the duty of a Head of Department upon receiving a formal petition from a subordinate addressed to the Civil Service Commission?',
      opts: [
        'Forward the petition expeditiously to the Permanent Secretary with detailed objective comments and factual service records within statutory timelines',
        'Shred the petition immediately without reading it',
        'Hide the petition in a locked personal cabinet for five years',
        'Issue an automatic dismissal letter to the petitioner'
      ],
      ans: 0,
      exp: 'Supervisors must not withhold petitions; they must forward them with factual departmental comments within prescribed time limits.',
      ref: 'PSR 090104'
    },
    {
      q: 'What is the consequence of submitting an anonymous, frivolous, or deliberately malicious petition against a fellow public officer?',
      opts: [
        'It constitutes serious misconduct rendering the petitioner liable to severe disciplinary sanctions if identified, and anonymous petitions are disregarded',
        'Automatic promotion to directorate level',
        'A cash reward from the internal auditor',
        'Anonymous petitions are treated as state decrees'
      ],
      ans: 0,
      exp: 'Anonymous or malicious petitions are discarded and considered abuse of process; false accusers face disciplinary prosecution.',
      ref: 'PSR 090107'
    },
    {
      q: 'Must an aggrieved officer exhaust all internal civil service administrative remedies before instituting legal action in a court of law?',
      opts: [
        'Yes, exhausting internal grievance and appeal mechanisms before seeking judicial review is a standard administrative and legal prerequisite',
        'No, officers must immediately sue the government without writing to the ministry',
        'Officers are prohibited from ever using the courts',
        'Only with permission from commercial banks'
      ],
      ans: 0,
      exp: 'The doctrine of exhaustion of administrative remedies requires utilizing internal channels (HOD, Permanent Secretary, FCSC) before court litigation.',
      ref: 'Administrative Law & PSR 090205'
    },
    {
      q: 'Within what period should the Civil Service Commission or competent authority communicate its formal decision on a petition to the officer?',
      opts: [
        'Without undue delay, normally within thirty (30) to sixty (60) days of concluding the review',
        'After twenty-five (25) years',
        'Decisions are never communicated',
        'Within forty-eight hours of retirement'
      ],
      ans: 0,
      exp: 'Administrative justice requires prompt resolution and formal written communication of the petition determination to the applicant.',
      ref: 'PSR Grievance Handling Guidelines'
    },
    {
      q: 'What redress is available to an officer who was wrongfully dismissed and subsequently exonerated on appeal by the Commission?',
      opts: [
        'Full reinstatement to substantive rank, restoration of seniority, and payment of all accrued salary arrears and emoluments',
        'Only an oral verbal apology with no financial reimbursement',
        'Compulsory transfer to a remote border post',
        'Demotion of one grade level'
      ],
      ans: 0,
      exp: 'Exoneration on appeal results in full restitutio in integrum: reinstatement, restored seniority, and payment of all back salaries.',
      ref: 'PSR 090207'
    },
    {
      q: 'Can an officer who has retired from service still submit an appeal regarding pension computation or wrongful termination?',
      opts: [
        'Yes, retired officers may petition the Commission or the National Pension Commission regarding pension verification or terminal entitlements',
        'No, separation from service permanently extinguishes all right of petition',
        'Only if the retired officer is under 30 years old',
        'Appeals are permitted only through foreign embassies'
      ],
      ans: 0,
      exp: 'Retirees retain the right to petition relevant statutory bodies (FCSC, PenCom, PTAD) on terminal benefits and computation errors.',
      ref: 'PRA 2014 & PSR Petitions'
    }
  ],
  16: [
    {
      q: 'What modern system has replaced the traditional subjective Annual Performance Evaluation Report (APER) across the Federal Civil Service?',
      opts: [
        'Performance Management System (PMS) driven by objective Key Performance Indicators (KPIs) and performance contracts',
        'Alphabetical staff ranking based on age',
        'Random lottery draws conducted by the registry',
        'Social media popularity voting'
      ],
      ans: 0,
      exp: 'The OHCSF transitioned the service from subjective APER forms to the modern KPI-driven Performance Management System (PMS).',
      ref: 'OHCSF PMS Implementation Manual & PSR'
    },
    {
      q: 'What is the primary document agreed between a supervisor and a subordinate at the beginning of each appraisal cycle in PMS?',
      opts: [
        'A formal Performance Agreement / Job Contract detailing specific measurable Key Performance Indicators (KPIs) and quarterly milestones',
        'A commercial bank loan contract',
        'A personal travel itinerary',
        'An attendance signature sheet only'
      ],
      ans: 0,
      exp: 'PMS is anchored on annual Performance Contracts mutually agreed at the start of the year with measurable targets linked to MDA strategic plans.',
      ref: 'PMS Manual Section 3'
    },
    {
      q: 'What frequency of formal performance reviews is mandated under the revised Performance Management System?',
      opts: [
        'Quarterly milestone performance reviews, culminating in an Annual Comprehensive Performance Evaluation',
        'Once every ten years',
        'Only when an officer is being disciplined',
        'Every five years during national elections'
      ],
      ans: 0,
      exp: 'PMS mandates continuous quarterly reviews to track milestone achievements, identify training gaps, and provide timely course correction.',
      ref: 'PMS Operational Guide'
    },
    {
      q: 'What is the role of the Senior Staff Committee (SSC) in the PMS appraisal moderation process?',
      opts: [
        'Serving as the Moderation Committee to eliminate supervisory bias, harmonize ratings, and validate overall departmental performance distributions',
        'Assigning cash bonuses to personal friends',
        'Shredding adverse performance appraisal reports',
        'Selecting winners of office sports competitions'
      ],
      ans: 0,
      exp: 'Moderation by the SSC ensures objective, bell-curved, and fair evaluation, preventing rating inflation or personal victimization.',
      ref: 'PSR 050105'
    },
    {
      q: 'What right is accorded to an officer who receives an adverse or substandard rating on their performance appraisal?',
      opts: [
        'The officer must be formally counseled in writing, given specific areas of improvement, and afforded opportunity to state their perspective before validation',
        'Immediate summary dismissal without notification',
        'Transfer to a different state within 24 hours',
        'Stoppage of all pension rights permanently'
      ],
      ans: 0,
      exp: 'Natural justice requires that adverse ratings be communicated formally with remedial counseling and right to written response.',
      ref: 'PSR 050201'
    },
    {
      q: 'How does PMS appraisal scoring directly interface with candidate eligibility for CBT promotion examinations?',
      opts: [
        'A candidate must achieve a minimum composite threshold (e.g. 70% benchmark in PMS appraisals over the qualifying years) to be eligible for promotion',
        'PMS ratings have zero bearing on promotion',
        'Officers with the lowest appraisal score are promoted first',
        'PMS is used only for allocating office furniture'
      ],
      ans: 0,
      exp: 'PMS composite scores constitute a major weighted percentage of the overall promotion evaluation matrix alongside CBT exam scores.',
      ref: 'FCSC Promotion Guidelines & PMS'
    },
    {
      q: 'What is a "Performance Improvement Plan" (PIP) under civil service HR management?',
      opts: [
        'A structured 3 to 6-month remedial intervention program designed to support an underperforming officer through mentorship, training, and target tracking',
        'A plan to purchase new desktop computers',
        'A scheme to privatize government offices',
        'An overseas vacation package'
      ],
      ans: 0,
      exp: 'A PIP provides structured developmental support to rectify documented performance deficiencies before disciplinary action is considered.',
      ref: 'HR Policy Guidelines'
    },
    {
      q: 'Who serves as the "Countersigning Officer" in a standard civil service performance evaluation?',
      opts: [
        'The superior officer immediately senior to the reporting officer (typically the Director or Head of Department)',
        'The junior office messenger',
        'An external commercial auditor',
        'The candidate\'s spouse'
      ],
      ans: 0,
      exp: 'The Countersigning Officer reviews and endorses the assessment made by the immediate supervisor to ensure objectivity and balance.',
      ref: 'PSR 050103'
    },
    {
      q: 'Under PMS, how are departmental strategic goals cascaded down to individual civil servants?',
      opts: [
        'From the National Development Plan to Ministerial Strategic Goals, down to Departmental Workplans, Division Milestones, and Individual Job Contracts',
        'Through informal hallway conversations',
        'By copying job descriptions from commercial private websites',
        'By random allocation of tasks without reference to goals'
      ],
      ans: 0,
      exp: 'PMS aligns individual accountability with national and ministerial priorities through systematic top-down cascading of strategic targets.',
      ref: 'PMS Implementation Guide'
    },
    {
      q: 'What is the consequence if an officer refuses to sign or accept their completed Performance Agreement or evaluation form?',
      opts: [
        'The refusal is formally documented, witnessed by the countersigning director, and constitutes insubordination liable to disciplinary query',
        'The evaluation is automatically cancelled and the officer receives 100% score',
        'The supervisor is demoted',
        'The ministry gives the officer a cash incentive'
      ],
      ans: 0,
      exp: 'Signing acknowledges discussion, not necessarily agreement; deliberate refusal to engage in statutory appraisal constitutes insubordination.',
      ref: 'PSR 050108'
    }
  ],
  17: [
    {
      q: 'What is the statutory minimum number of training days per year mandated for federal civil servants under public service human capacity development guidelines?',
      opts: [
        'A minimum of ten (10) to fourteen (14) days of structured training per officer per annum',
        'One (1) hour once in five years',
        'Three hundred (300) days per year',
        'Zero training is permitted'
      ],
      ans: 0,
      exp: 'Civil service manpower policies establish an annual minimum benchmark of structured continuous learning to maintain competency.',
      ref: 'OHCSF Training Policy'
    },
    {
      q: 'Which premier public sector institution is established by law to provide management development and administrative leadership training for Nigerian civil servants?',
      opts: [
        'Administrative Staff College of Nigeria (ASCON) and Public Service Institute of Nigeria (PSIN)',
        'The Nigerian Stock Exchange',
        'The Federal Airports Authority',
        'The Commercial Banks Training Institute'
      ],
      ans: 0,
      exp: 'ASCON and PSIN are the statutory institutes mandated to build administrative, executive, and policy capacities across MDAs.',
      ref: 'ASCON Act & PSIN Mandate'
    },
    {
      q: 'Within what period after first appointment must a newly recruited public servant undergo the mandatory "Induction Course"?',
      opts: [
        'Within the first three (3) to six (6) months of assumption of duty',
        'At the point of retirement after 35 years',
        'Only after being queried for an infraction',
        'Induction is optional and discouraged'
      ],
      ans: 0,
      exp: 'Induction training is mandatory within the first 6 months to socialize new entrants into civil service ethics, PSR, FR, and official communication.',
      ref: 'PSR 060102'
    },
    {
      q: 'What course at ASCON is typically mandatory for officers advancing to Directorate cadre (GL 14 to GL 15)?',
      opts: [
        'Senior Management Course (SMC) / Executive Leadership Development Programme',
        'Basic Clerical Operations Certificate',
        'Primary Bookkeeping Course',
        'General Elementary Driving Seminar'
      ],
      ans: 0,
      exp: 'The Senior Management Course (SMC) equips advancing Assistant Directors with strategic policy, leadership, and administrative competencies.',
      ref: 'ASCON Training Curriculum'
    },
    {
      q: 'What proportion of an MDA\'s personnel budget is recommended to be allocated specifically to staff training and manpower development?',
      opts: [
        'At least ten percent (10%) of the recurrent personnel/overhead budget',
        'Zero percent',
        'Eighty percent (80%)',
        'One percent (1%)'
      ],
      ans: 0,
      exp: 'Federal training circulars advise allocating a minimum of 10% of personnel/training votes to continuous capacity building.',
      ref: 'National Training Policy Guidelines'
    },
    {
      q: 'What is a "Training Needs Assessment" (TNA) conducted by the Human Resources Management Department?',
      opts: [
        'A systematic evaluation identifying competency gaps, departmental skill requirements, and suitable training interventions for staff',
        'A physical medical examination',
        'A financial audit of commercial travel agencies',
        'An inventory of office stationery'
      ],
      ans: 0,
      exp: 'TNA identifies operational performance shortfalls to ensure training programs address genuine organizational and career development needs.',
      ref: 'HR Manual Chapter 6'
    },
    {
      q: 'What is required of an officer who attends a government-sponsored overseas training program upon their return to the ministry?',
      opts: [
        'Submit a comprehensive training report within two weeks and conduct a knowledge-sharing / step-down seminar for departmental colleagues',
        'Keep all training materials secret from colleagues',
        'Resign immediately to join private sector firms',
        'Discard all lecture handouts'
      ],
      ans: 0,
      exp: 'Officers returning from sponsored training must submit formal reports and cascade knowledge to colleagues through step-down sessions.',
      ref: 'PSR 060201'
    },
    {
      q: 'Can an officer be selected for specialized international training if they have less than two years remaining before statutory retirement?',
      opts: [
        'No, long-term or major overseas training is generally restricted for officers with less than 2 years of service to ensure ROI for the service',
        'Yes, retiring officers have absolute priority for all foreign training',
        'Training is permitted only for staff in their final month of service',
        'Only if the officer travels with family members'
      ],
      ans: 0,
      exp: 'Manpower guidelines prioritize officers with sufficient remaining service life to apply acquired knowledge for public service enhancement.',
      ref: 'OHCSF Guidelines on Training'
    },
    {
      q: 'What obligation rests on an officer who benefits from a specialized postgraduate training program exceeding twelve months sponsored by the government?',
      opts: [
        'Execution of a Training Bond and commitment to serve the government for a mandatory post-training moratorium period',
        'No obligation exists; the officer may resign immediately',
        'Payment of 50% of future salary to the training coordinator',
        'Immediate assignment to an overseas diplomatic mission'
      ],
      ans: 0,
      exp: 'Sponsored training programs exceeding 1 year require bond execution to protect public investments in human capital.',
      ref: 'PSR 060204'
    },
    {
      q: 'Which body regulates the professional standards and mandatory continuing education for administrative officers across the federation?',
      opts: [
        'Chartered Institute of Administration (CIA) / Nigerian Institute of Management (NIM) in liaison with OHCSF',
        'The National Union of Road Transport Workers',
        'The Manufacturers Association of Nigeria',
        'The Commercial Bankers Association'
      ],
      ans: 0,
      exp: 'Professional administration bodies (e.g. NIM, CIPM, CIA) collaborate with the civil service to certify administrative and managerial excellence.',
      ref: 'Professional Training Directives'
    }
  ],
  18: [
    {
      q: 'What is the statutory tenure policy governing substantive Directors (Grade Level 16 / 17) under the revised Public Service Rules?',
      opts: [
        'A maximum tenure of two terms of four (4) years each (cumulative total of 8 years), subject to the statutory retirement age of 60 or 35 years of service',
        'An indefinite life tenure until voluntary resignation',
        'A single non-renewable term of one (1) year',
        'A tenure of twenty (20) years across all ministries'
      ],
      ans: 0,
      exp: 'The revised Directorate Tenure Policy stipulates a maximum of two 4-year terms (total 8 years) for substantive Directors, bounded by the 60/35 retirement rule.',
      ref: 'PSR 020908 / Revised Edition & Circulars'
    },
    {
      q: 'What is the tenure policy applicable to Permanent Secretaries in the Federal and FCTA Civil Service?',
      opts: [
        'A single term of four (4) years, renewable once for another four (4) years subject to satisfactory performance and the statutory retirement age',
        'A lifetime appointment with immunity from retirement',
        'A 2-year non-renewable contract',
        'Tenure determined exclusively by commercial banks'
      ],
      ans: 0,
      exp: 'Permanent Secretaries serve a 4-year term renewable once (maximum 8 years), subject to 60 years of age or 35 years of service, whichever comes first.',
      ref: 'OHCSF Tenure Policy Guidelines'
    },
    {
      q: 'If a Director completes their cumulative 8-year tenure but has not yet attained 60 years of age or 35 years of pensionable service, what is the administrative outcome?',
      opts: [
        'The Director must disengage from service and proceed on retirement pursuant to the statutory tenure policy',
        'The Director is demoted to Assistant Director to continue working',
        'The Director is transferred to work as a junior clerk',
        'The Director receives double salary to stay in office'
      ],
      ans: 0,
      exp: 'Tenure expiration requires mandatory disengagement and retirement, opening advancement pathways for subordinate officers.',
      ref: 'Tenure Circular OHCSF/CSO/B63791'
    },
    {
      q: 'Does the Directorate Tenure Policy override the constitutional statutory retirement benchmark of 60 years of age or 35 years of service?',
      opts: [
        'No, the 60 years of age or 35 years of service rule remains the absolute constitutional ceiling; whichever occurs first triggers retirement',
        'Yes, tenure allows an officer to remain in service until 80 years of age',
        'Tenure grants automatic 10-year extension beyond 60 years of age',
        'The rules are completely disconnected'
      ],
      ans: 0,
      exp: 'The 60/35 rule is the overarching constitutional and statutory ceiling; if an officer hits 60 or 35 before completing 8 years, they retire immediately.',
      ref: 'PSR 020908 & 1999 CFRN'
    },
    {
      q: 'What is the primary policy rationale behind the introduction of the Directorate Tenure Policy in the Federal Public Service?',
      opts: [
        'To prevent career stagnation, promote institutional renewal, eliminate bottleneck choke-points, and create upward mobility for talented middle managers',
        'To abolish all administrative departments',
        'To reduce civil service salaries across the board',
        'To privatize public ministries to external vendors'
      ],
      ans: 0,
      exp: 'The tenure policy prevents prolonged directorate bottlenecks, ensuring dynamic succession planning and motivation for lower cadres.',
      ref: 'OHCSF White Paper on Service Reforms'
    },
    {
      q: 'How many months in advance of tenure expiration must an affected Director or Permanent Secretary initiate transition handover procedures?',
      opts: [
        'At least three (3) to six (6) months prior to the expiration date',
        'One (1) hour before vacating the office',
        'No transition period is required',
        'Two (2) years after departing'
      ],
      ans: 0,
      exp: 'Orderly transition requires preparing comprehensive handover notes and initiating disengagement documentation 3 to 6 months prior to exit.',
      ref: 'PSR Handover Protocols'
    },
    {
      q: 'Are career officers serving in academic positions in federal universities and judges in the judiciary subject to the 8-year Directorate Tenure Policy?',
      opts: [
        'No, specialized professional benchmarks apply to university professors and judicial officers under distinct constitutional enactments',
        'Yes, university professors must retire after 4 years',
        'Yes, judges are retired after 2 years',
        'All public bodies follow identical directorate tenure'
      ],
      ans: 0,
      exp: 'The Constitution and Universities Miscellaneous Provisions Act establish separate retirement ages (70 years) for judges and academic professors.',
      ref: 'Universities (Misc. Prov.) Act & CFRN'
    },
    {
      q: 'Can a Director whose tenure has expired be re-appointed on contract to the same substantive directorate post?',
      opts: [
        'No, re-engagement on contract to substantive career directorate posts is prohibited to prevent thwarting the succession purpose of the tenure policy',
        'Yes, automatic contract renewal is mandatory',
        'Only if approved by the local government union',
        'Yes, with double pension and salary'
      ],
      ans: 0,
      exp: 'The OHCSF strictly bars contract re-appointment to career directorate slots, preserving vacancy integrity for advancing officers.',
      ref: 'OHCSF Circular on Contract Appointments'
    },
    {
      q: 'What happens to the accrued pension entitlements of a Director who retires under the Directorate Tenure Policy?',
      opts: [
        'Full pension and terminal gratuity benefits are preserved and processed under the Contributory Pension Scheme (PRA 2014)',
        'All pension entitlements are forfeited to the government',
        'Pensions are reduced by 75%',
        'The officer receives only a certificate of attendance'
      ],
      ans: 0,
      exp: 'Tenure retirement is an honorable exit preserving 100% of accrued retirement benefits under the Pension Reform Act.',
      ref: 'PRA 2014 & PSR'
    },
    {
      q: 'Who issues the formal disengagement and retirement letter to a substantive Director reaching the end of their statutory tenure?',
      opts: [
        'The Federal Civil Service Commission (or FCTA Civil Service Commission for FCTA staff)',
        'The office security gatekeeper',
        'The junior staff trade union branch',
        'An external commercial consultancy'
      ],
      ans: 0,
      exp: 'The Civil Service Commission issues the formal retirement notification conveying approval of disengagement.',
      ref: 'FCSC Disengagement Directives'
    }
  ],
  19: [
    {
      q: 'What is the mandatory statutory retirement age or length of pensionable service in the Federal Public Service (whichever comes first)?',
      opts: [
        'Sixty (60) years of age or thirty-five (35) years of pensionable service',
        'Seventy (70) years of age or forty (40) years of service',
        'Fifty (50) years of age or twenty (20) years of service',
        'There is no statutory limit'
      ],
      ans: 0,
      exp: 'PSR 020908 mandates that every public officer shall retire on attaining 60 years of age or 35 years of service, whichever comes earlier.',
      ref: 'PSR 020908'
    },
    {
      q: 'How many months in advance must an officer give formal written notice of statutory retirement to the Commission and their MDA?',
      opts: [
        'Six (6) months prior to the due date',
        'One (1) day before leaving',
        'Two (2) years after departing',
        'Three (3) weeks'
      ],
      ans: 0,
      exp: 'Officers must serve a mandatory 6 months notice of retirement to allow terminal processing and pension verification.',
      ref: 'PSR 020909'
    },
    {
      q: 'What is the status of "Terminal Leave" (pre-retirement leave) under the revised Public Service Rules?',
      opts: [
        'The mandatory 3-month pre-retirement leave was abolished; officers must remain on duty processing documentation until the statutory retirement date',
        'Officers must proceed on two years mandatory terminal leave',
        'Terminal leave is six months on double salary',
        'Terminal leave is spent entirely in foreign embassies'
      ],
      ans: 0,
      exp: 'The revised PSR abolished the practice of proceeding on 3-month terminal leave, requiring officers to remain on post while completing documentation.',
      ref: 'OHCSF Circular on Pre-Retirement Leave'
    },
    {
      q: 'What primary statutory enactment governs pension rights, administration, and retirement funds for civil servants in Nigeria?',
      opts: [
        'Pension Reform Act 2014 (PRA 2014) establishing the Contributory Pension Scheme',
        'The Companies and Allied Matters Act',
        'The Trade Union Act',
        'The Customs and Excise Management Act'
      ],
      ans: 0,
      exp: 'The PRA 2014 establishes the contributory pension architecture regulated by the National Pension Commission (PenCom).',
      ref: 'Pension Reform Act 2014'
    },
    {
      q: 'What are the mandatory minimum monthly pension contribution rates under the Pension Reform Act 2014?',
      opts: [
        'Ten percent (10%) contributed by the employer (Government) and eight percent (8%) contributed by the employee',
        'Two percent (2%) employer and two percent (2%) employee',
        'Fifty percent (50%) deducted entirely from the employee',
        'Zero contribution from employer'
      ],
      ans: 0,
      exp: 'Section 4(1) of PRA 2014 stipulates a minimum of 10% employer contribution and 8% employee monthly contribution into the RSA.',
      ref: 'PRA 2014 S.4(1)'
    },
    {
      q: 'What is a Retirement Savings Account (RSA) under the Nigerian pension system?',
      opts: [
        'An individual dedicated pension account opened with a licensed Pension Fund Administrator (PFA) into which monthly contributions are remitted',
        'A commercial bank savings account with an ATM card',
        'A microfinance joint loan account',
        'A cash envelope stored in the ministry strongroom'
      ],
      ans: 0,
      exp: 'Every public officer opens an RSA with an approved PFA to hold pension savings managed and invested under PenCom regulations.',
      ref: 'PRA 2014 S.11'
    },
    {
      q: 'What is the consequence of an officer altering or falsifying their birth certificate or date of first appointment to delay retirement?',
      opts: [
        'It constitutes serious criminal misconduct; the officer is summarily dismissed, salary paid after actual retirement date recovered, and referred to ICPC/EFCC',
        'A minor administrative caution',
        'An extension of retirement age by five years',
        'No action if the officer is hardworking'
      ],
      ans: 0,
      exp: 'Age falsification to cheat the 60/35 retirement rule is serious misconduct carrying dismissal, pension forfeiture risk, and criminal charges.',
      ref: 'PSR 030402 & 020908'
    },
    {
      q: 'Which agency administers pension payments for public servants who retired under the legacy Defined Benefit Scheme (prior to 2004 reforms)?',
      opts: [
        'Pension Transitional Arrangement Directorate (PTAD)',
        'The Central Bank of Nigeria directly',
        'The Federal Inland Revenue Service',
        'A commercial insurance consortium'
      ],
      ans: 0,
      exp: 'PTAD administers and disburses pensions to federal pensioners exempted from or retired under the old defined benefit scheme.',
      ref: 'PRA 2014 Part VII'
    },
    {
      q: 'What document is signed by an officer confirming they have formally handed over all government property upon retirement?',
      opts: [
        'Comprehensive Handover Notes and Official Clearance Certificate endorsed by relevant departments (Stores, Library, Audit, Admin)',
        'A private receipt from a colleague',
        'A newspaper advertisement clipping',
        'A vehicle logbook only'
      ],
      ans: 0,
      exp: 'An officer must secure departmental clearance certifying the return of all government vehicles, files, equipment, and keys before terminal benefits are paid.',
      ref: 'PSR 020910'
    },
    {
      q: 'Can a public officer be retained in substantive service after attaining 60 years of age or 35 years of pensionable service?',
      opts: [
        'No, retention in substantive pensionable public service beyond the statutory limit is unconstitutional and strictly prohibited',
        'Yes, any permanent secretary may extend their own tenure at will',
        'Yes, if approved by a staff cooperative society',
        'Only on public holidays'
      ],
      ans: 0,
      exp: 'The 60/35 retirement rule is absolute; any salary disbursed after the statutory date constitutes illegal expenditure recoverable by law.',
      ref: 'PSR 020908'
    }
  ],
  20: [
    {
      q: 'Under the Code of Conduct for Public Officers (5th Schedule, 1999 CFRN), how frequently must an officer submit their written Declaration of Assets?',
      opts: [
        'Immediately upon assumption of office, at the end of every four (4) years, and at the expiration of their term of office / retirement',
        'Once every twenty (20) years',
        'Only when accused of financial embezzlement',
        'Asset declaration is voluntary'
      ],
      ans: 0,
      exp: 'Public officers must declare all properties, assets, and liabilities to the Code of Conduct Bureau upon assumption, every 4 years, and at exit.',
      ref: '1999 CFRN 5th Schedule Part I S.11'
    },
    {
      q: 'Can a public officer accept gifts, donations, or hospitality from commercial contractors or suppliers who have official dealings with their MDA?',
      opts: [
        'No, accepting gifts, gratuities, or hospitality from commercial contractors is strictly prohibited and constitutes an act of bribery and corruption',
        'Yes, gifts below five million Naira are permitted',
        'Gifts are permitted if delivered to the officer\'s home address',
        'Only during festive seasons'
      ],
      ans: 0,
      exp: 'PSR 030402 and the Code of Conduct prohibit soliciting or accepting gifts from contractors, treating it as serious corrupt practice.',
      ref: 'PSR 030402 & CFRN 5th Schedule S.6'
    },
    {
      q: 'What unit is established in every Federal Ministry and FCTA Mandate Secretariat in collaboration with ICPC to fight institutional corruption?',
      opts: [
        'Anti-Corruption and Transparency Unit (ACTU)',
        'The Departmental Welfare Committee',
        'The Office Entertainment Squad',
        'The Commercial Loan Association'
      ],
      ans: 0,
      exp: 'ACTU operates in MDAs as the internal anti-corruption watch-dog monitoring vulnerability, conducting ethics training, and reporting to ICPC.',
      ref: 'ICPC Act & ACTU Guidelines'
    },
    {
      q: 'Under what circumstances may a public officer accept a token customary ceremonial gift during an official public engagement?',
      opts: [
        'The gift must be of modest customary value, declared formally to the Permanent Secretary, and retained as property of the Ministry/Government',
        'The officer may convert it to personal cash without reporting',
        'The gift must be sold on social media',
        'No customary gifts may be touched under threat of execution'
      ],
      ans: 0,
      exp: 'Protocol gifts presented to officers in official capacities are state property and must be logged and surrendered to the ministry.',
      ref: 'PSR 030424 & Code of Conduct'
    },
    {
      q: 'What is the statutory duty of a public officer who becomes aware of corrupt practices, bid rigging, or embezzlement within their department?',
      opts: [
        'Duty to report the infraction promptly through official channels to the Accounting Officer, ACTU, or statutory anti-graft agencies (ICPC / EFCC)',
        'Remain silent to protect departmental reputation',
        'Request a percentage share of the stolen funds',
        'Destroy all accounting evidence'
      ],
      ans: 0,
      exp: 'Civil service ethos and the Whistleblower Policy mandate reporting financial irregularities and corruption to competent authorities.',
      ref: 'Federal Whistleblower Policy & PSR'
    },
    {
      q: 'What protection is afforded to a public servant who reports verified corruption under the Federal Government Whistleblower Policy?',
      opts: [
        'Protection against administrative victimization, adverse postings, malicious queries, or dismissal, with entitlement to statutory whistleblower compensation',
        'Immediate transfer to a dangerous war zone',
        'Zero salary for five years',
        'Public disclosure of their private medical files'
      ],
      ans: 0,
      exp: 'The Whistleblower Policy guarantees confidentiality and statutory protection against retaliatory adverse administrative actions.',
      ref: 'Federal Whistleblower Directives'
    },
    {
      q: 'Can a public officer operate a foreign bank account outside Nigeria while serving as a full-time public servant?',
      opts: [
        'No, the 5th Schedule of the 1999 Constitution strictly prohibits public officers from maintaining or operating foreign bank accounts abroad',
        'Yes, any officer on GL 08 and above may open foreign accounts',
        'Foreign accounts are mandatory for officers on estacode',
        'Permitted if the balance is in Swiss Francs'
      ],
      ans: 0,
      exp: 'Section 3 of the 5th Schedule of the 1999 Constitution explicitly bans public officers from maintaining bank accounts outside Nigeria.',
      ref: '1999 CFRN 5th Schedule S.3'
    },
    {
      q: 'What constitutes "Conflict of Interest" under the Code of Conduct and Public Service Rules?',
      opts: [
        'A situation where an officer\'s personal, financial, or family interests interfere or appear to interfere with the impartial discharge of their official duties',
        'An argument between two officers over office air conditioning',
        'A dispute between two rival football clubs',
        'Working beyond official 4:00 PM closing time'
      ],
      ans: 0,
      exp: 'Conflict of interest occurs when personal pecuniary or familial advantages compromise objective official decision-making.',
      ref: 'PSR 030402 & CCB Guidelines'
    },
    {
      q: 'What immediate administrative action must be taken when a public officer is formally arraigned in court by EFCC or ICPC on charges of bribery or embezzlement?',
      opts: [
        'Immediate interdiction or suspension from duty with withholding of emoluments pending the conclusion of the criminal trial',
        'Promotion to substantive director',
        'Award of executive bonus',
        'No action until retirement'
      ],
      ans: 0,
      exp: 'Officers facing formal criminal corruption arraignment must be interdicted or suspended under PSR 030404 / 030405 to safeguard public funds.',
      ref: 'PSR 030404 & 030405'
    },
    {
      q: 'What is the primary mission of the Independent Corrupt Practices and Other Related Offences Commission (ICPC) regarding MDAs?',
      opts: [
        'Enforcing the Corrupt Practices Act 2000, investigating bribery, conducting system corruption vulnerability reviews, and educating public officers',
        'Collecting custom import tariffs at seaports',
        'Constructing federal interstate expressways',
        'Managing commercial banking clearing houses'
      ],
      ans: 0,
      exp: 'The ICPC is statutorily empowered to investigate, prosecute, and eliminate institutional corruption through preventive system reviews in MDAs.',
      ref: 'Corrupt Practices Act 2000'
    }
  ]
};

