/**
 * Admission procedures per programme.
 * Each entry is self-contained so the page stays a pure renderer.
 *
 * For LLM and Diploma in Cyber Law: the college has NOT supplied
 * eligibility / steps / documents yet. Those arrays stay empty
 * and the renderer shows a "content pending" placeholder.
 * Do NOT fabricate — legal admissions pages must be accurate.
 */

export const ADMISSION_PROCEDURES = [
  {
    id: "llb",
    label: "LL.B. (3 Years)",
    slug: "llb",
    fullName: "LL.B. Three Years Course",
    programme: {
      description: [
        "The College offers Three Year Law programme under SSNLC. The courses offered are Three-Year Law Course LL.B. The duration of the above-mentioned degree course shall be for a period of three academic years...",
        "As per the Government of Maharashtra's Notification No. CET-2015/C.R.243/Mashi-2 dated 2nd April 2016, admissions to the LL.B. (Three Year) and B.A. LL.B. (Five Year) courses are conducted through a Centralized Admission Process (CAP) via the State Common Entrance Test (CET) Cell, Maharashtra State."
      ],
    },
    eligibility: [
      {
        label: "LL.B. (Three Year Course)",
        details: "Candidates must be graduates in any discipline from a recognized university with at least 45% marks. For SC/ST candidates, the minimum required marks are 40%.",
      },
    ],
    steps: [
      "Obtain the Admission Form from the college office or download it from the college website if available.",
      "Fill in the admission form manually and completely.",
      "Submit the duly filled hard copy of the admission form, along with all required documents...",
      "Admission will be processed after document verification, confirmation of eligibility, and payment of prescribed fees.",
    ],
    documents: [
      "SSNLC Admission Form",
      "College Leaving Certificate/TC – original & photocopy",
      "Migration Certificate (if applicable)",
      "Gap Certificate (applicable to students having a break in education)",
      "SSC, HSC and Graduation Marksheets – original & photocopy",
      "MH CET Scorecard – original & photocopy",
      "CET Application Form and Hall Ticket – original & photocopy",
      "CET Allotment Letter – original & photocopy",
      "Caste Certificate (if applicable) – original & photocopy",
      "Caste Validity Certificate (if applicable) – original & photocopy",
      "Non‐Creamy Layer Certificate – original & photocopy",
      "Income Certificate – original & photocopy",
      "Domicile and Nationality Certificate – original & photocopy",
      "Aadhaar Card – with photocopy",
      "Five (5) Passport‐Size Photographs",
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
    programme: {
      description: [
        "The College offers Two Year LL.M. programme with specializations in Cyber Law and Business Law under SSNLC.",
      ],
    },
    eligibility: [],
    steps: [],
    documents: [],
    pdfPath: null,
    pdfLabel: "Download LL.M. Admission PDF",
    note: "Admission details for LL.M. are currently being updated. Please contact the college office for the latest eligibility criteria, admission steps, and required documents.",
  },
  {
    id: "diploma-cyber-law",
    label: "Diploma in Cyber Law",
    slug: "diploma-cyber-law",
    fullName: "Diploma in Cyber Law",
    programme: {
      description: [
        "The College offers a Diploma in Cyber Law under SSNLC. This programme covers legal frameworks governing cyberspace, data protection, and emerging technology law.",
      ],
    },
    eligibility: [],
    steps: [],
    documents: [],
    pdfPath: null,
    pdfLabel: "Download Diploma Admission PDF",
    note: "Admission details for the Diploma in Cyber Law are currently being updated. Please contact the college office for the latest eligibility criteria, admission steps, and required documents.",
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
