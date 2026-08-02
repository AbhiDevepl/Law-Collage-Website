/**
 * Admission procedures per programme.
 * Each entry is self-contained so the page stays a pure renderer.
 *
 * For LLM and Diploma in Cyber Law: the college has NOT supplied
 * admission steps / documents yet. Those arrays stay empty and the
 * renderer shows a "content pending" placeholder.
 * Do NOT fabricate — legal admissions pages must be accurate.
 */

export const ADMISSION_PROCEDURES = [
  {
    id: "llb",
    label: "LL.B. (3 Years)",
    slug: "llb",
    fullName: "LL.B. Three Years Course",
    duration: "3 Years",
    mode: "Full Time",
    approval: ["Bar Council of India (BCI)"],
    affiliation: "Savitribai Phule Pune University",
    intake: "As approved by the competent authorities",
    admissionMode: "MH CET Law + CAP",
    medium: "English",
    careerOpportunities: [
      "Advocate",
      "Judicial Services",
      "Corporate Lawyer",
      "Legal Advisor",
      "Legal Officer",
      "Public Prosecutor",
      "Legal Researcher",
      "Higher Education",
    ],
    programme: {
      description: [
        "The LL.B. Three-Year Programme is a full-time professional law degree consisting of six semesters spread across three academic years.",
        "The programme is approved by the Bar Council of India (BCI) and affiliated with Savitribai Phule Pune University.",
        "It is designed for graduates from any recognized discipline who wish to pursue a career in litigation, judiciary, corporate law, legal consultancy, public service, legal research, and higher legal education.",
        "Admissions are conducted through the Maharashtra State Common Entrance Test (MH CET Law) followed by the Centralized Admission Process (CAP) conducted by the Maharashtra State CET Cell.",
      ],
    },
    eligibility: [
      {
        label: "LL.B. (Three Year Course)",
        details:
          "Candidates must be graduates in any discipline from a recognized university. Admission is conducted through the Maharashtra State Common Entrance Test (MH CET Law) and the Centralized Admission Process (CAP) of the Maharashtra State CET Cell, in accordance with the norms prescribed by the affiliating university and the Bar Council of India.",
      },
    ],
    steps: [
      "Register for the MAH LL.B. 3-Year CET examination through the Maharashtra State CET Cell.",
      "Appear for the entrance examination and obtain a valid CET score.",
      "Complete the Centralized Admission Process (CAP) registration on the CET Cell portal.",
      "Upload all required documents and complete online document verification.",
      "Fill the college preference (Option Form) during CAP.",
      "Accept the allotted seat after CAP allotment.",
      "Report to SSNLC within the prescribed dates.",
      "Submit original documents for verification.",
      "Pay the prescribed tuition and admission fees.",
      "Receive admission confirmation and complete college enrollment.",
    ],
    documents: [
      "CAP Allotment Letter",
      "MH CET Law Score Card",
      "MH CET Application Form",
      "CET Hall Ticket",
      "SSC Marksheet",
      "HSC Marksheet",
      "Graduation Marksheets (All Years/Semesters)",
      "Degree Certificate or Provisional Degree Certificate",
      "Transfer Certificate (TC)",
      "Migration Certificate (If Applicable)",
      "Gap Certificate (If Applicable)",
      "Nationality Certificate",
      "Domicile Certificate",
      "Aadhaar Card",
      "PAN Card (if available)",
      "Income Certificate (Reserved Categories)",
      "Caste Certificate (Reserved Categories)",
      "Caste Validity Certificate",
      "Non-Creamy Layer Certificate (Applicable Categories)",
      "EWS Certificate (If Applicable)",
      "Disability Certificate (PwD Candidates)",
      "Passport-size Photographs",
      "Anti-Ragging Undertaking (if required)",
      "Fee Payment Receipt",
    ],
    pdfPath: "/pdfs/admission-requirements.pdf",
    pdfLabel: "Download LL.B. Admission PDF",
    note: "All candidates applying through the CET Cell must scan and upload all relevant documents in PDF format during the CET online registration process.",
  },
  {
    id: "llm",
    label: "LL.M. (2 Years)",
    slug: "llm",
    fullName: "LL.M. Two Years Course",
    duration: "2 Years",
    mode: "Full Time",
    approval: ["Bar Council of India (BCI)"],
    affiliation: "Savitribai Phule Pune University",
    intake: "As approved by the competent authorities",
    admissionMode: "As notified by the college and the affiliating university",
    medium: "English",
    careerOpportunities: [
      "Specialized Legal Practice",
      "Legal Research & Policy",
      "Academia & Teaching",
      "Corporate Law",
      "Judicial Services",
      "Doctoral Studies (Ph.D.)",
    ],
    programme: {
      description: [
        "The LL.M. Programme is a two-year postgraduate law degree consisting of four semesters.",
        "SSNLC offers specializations in Business Law and Cyber Law.",
        "The programme focuses on advanced legal research, specialization, academic writing, and professional development.",
      ],
    },
    eligibility: [
      {
        label: "LL.M.",
        details:
          "Candidates must possess an LL.B. degree from a recognized university. Additional eligibility and admission criteria are notified by the college and the affiliating university.",
      },
    ],
    steps: [],
    documents: [],
    pdfPath: null,
    pdfLabel: "Download LL.M. Admission PDF",
    note: "Detailed admission steps and document requirements for LL.M. are currently being updated. Please contact the college office for the latest information.",
  },
  {
    id: "diploma-cyber-law",
    label: "Diploma in Cyber Law",
    slug: "diploma-cyber-law",
    fullName: "Diploma in Cyber Law",
    duration: "1 Year",
    mode: "As notified by the college",
    approval: ["Savitribai Phule Pune University"],
    affiliation: "Savitribai Phule Pune University",
    intake: "As approved by the competent authorities",
    admissionMode: "As notified by the college",
    medium: "English",
    careerOpportunities: [
      "Legal Advisory in IT & Cyber Law",
      "Data Protection & Privacy Roles",
      "Cybercrime Investigation",
      "Cybersecurity Compliance",
      "Legal Research in Technology Law",
    ],
    programme: {
      description: [
        "The Diploma in Cyber Law is a one-year programme focusing on cybercrime, information technology law, digital evidence, privacy, data protection, cyber regulations, and emerging technology law.",
        "The programme is intended for students, legal professionals, IT professionals, law enforcement personnel, and individuals interested in cyber legislation.",
      ],
    },
    eligibility: [
      {
        label: "Eligibility",
        details:
          "Eligibility criteria will be notified by the college before commencement of admissions.",
      },
    ],
    steps: [],
    documents: [],
    pdfPath: null,
    pdfLabel: "Download Diploma Admission PDF",
    note: "Detailed admission steps and document requirements for the Diploma in Cyber Law are currently being updated. Please contact the college office for the latest information.",
  },
];

/** Lookup by slug for deep-linking */
export function getProcedureBySlug(slug) {
  return ADMISSION_PROCEDURES.find((p) => p.slug === slug) ?? ADMISSION_PROCEDURES[0];
}

/** All slugs for static generation / validation */
export function getAllProcedureSlugs() {
  return ADMISSION_PROCEDURES.map((p) => p.slug);
}
