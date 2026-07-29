/**
 * Faculty data — single source of truth.
 * Used by the listing page AND all profile pages via FacultyProfileLayout.
 *
 * fields[] rows are rendered in order; every profile shows all 9 rows.
 * Use null/undefined value → renders as "N/A" in the table.
 */

export const FACULTY = [
  {
    slug: "anjula-chowbe",
    name: "Dr. Anjula Shrikrishna Chowbe",
    shortName: "Dr. Anjula Chowbe",
    role: "Principal, HOD",
    image: "https://ik.imagekit.io/sk67opnzi/images/faculty/principal.jpg",
    specialization: "Constitutional Law",
    fields: [
      { label: "Designation",            value: "Principal, HOD",       type: "designation" },
      { label: "Additional Designation", value: "HOD",                   type: "additional" },
      { label: "Education",              value: "BSC, LLB, LLM, PhD",   type: "education" },
      { label: "Specialization",         value: "Constitutional Law",    type: "specialization" },
      { label: "Industrial Experience",  value: "10 Years",              type: "industry" },
      { label: "Teaching Experience",    value: "10 Years",              type: "teaching" },
      { label: "Contact",                value: "dr.anjula.chowbe@lawcollege.edu", type: "contact" },
      { label: "Area of Interest",       value: "Constitutional Law",    type: "interest" },
    ],
  },
  {
    slug: "fate-jagannath",
    name: "Prof. Purushottam Jagannath Fate",
    shortName: "Prof. Fate Jagannath",
    role: "Assistant Professor",
    image: "https://ik.imagekit.io/sk67opnzi/images/faculty/fate.jpg",
    specialization: "Business Law",
    fields: [
      { label: "Designation",            value: "Assistant Professor",   type: "designation" },
      { label: "Additional Designation", value: null,                    type: "additional" },
      { label: "Education",              value: "B.SL, LL.B, LL.M, DCL, DLL & LW", type: "education" },
      { label: "Specialization",         value: "Business Law",          type: "specialization" },
      { label: "Industrial Experience",  value: "7 Years",               type: "industry" },
      { label: "Teaching Experience",    value: "3–4 Years",             type: "teaching" },
      { label: "Contact",                value: "pjfate96@gmail.com",    type: "contact" },
      {
        label: "Area of Interest",
        value: "Constitutional Law, Criminal Law, Civil Law, Contract Law, Tort Law, Property Law",
        type: "interest",
      },
    ],
  },
  {
    slug: "DipaliJawale",
    name: "Dr. Dipali V. Jawale (More)",
    shortName: "Dr. Dipali Jawale",
    role: "Assistant Professor, College Examination Officer",
    image: "https://ik.imagekit.io/sk67opnzi/images/faculty/Depali.jpeg",
    specialization: "Law",
    fields: [
      { label: "Designation",            value: "Assistant Professor, College Examination Officer", type: "designation" },
      {
        label: "Additional Designation",
        value:
          "College Examination Officer (additional charge) at Shri. Shivajirao Nagawade Law College, Shrigonda, since 20-03-2026",
        type: "additional",
      },
      {
        label: "Education",
        value:
          "B.S.L. LL.B (ILS Law College, Pune, 2009), LL.M (Pune University, 2011), Ph.D (Sant Gadge Baba Amravati University, 2017)",
        type: "education",
      },
      { label: "Specialization",         value: "Law",                   type: "specialization" },
      { label: "Industrial Experience",  value: null,                    type: "industry" },
      {
        label: "Teaching Experience",
        value:
          "9+ Years — Bhavan's College (Mumbai), BYK College (Nashik), PG Teaching Dept. of Law, Sant Gadge Baba Amravati University",
        type: "teaching",
      },
      { label: "Contact",                value: null,                    type: "contact" },
      {
        label: "Area of Interest",
        value:
          "Research: 10 published papers (incl. 1 Scopus-indexed), 1 academic patent, National Guru Ratna Award (National Public Grievance and Investigation Commission)",
        type: "interest",
      },
    ],
  },
  {
    slug: "RupaliGole",
    name: "Adv. Rupali D. Gole",
    shortName: "Adv. Rupali Gole",
    role: "Assistant Professor",
    image: "https://ik.imagekit.io/sk67opnzi/images/faculty/Rupali.jpeg",
    specialization: "Corporate Law, Insolvency & Bankruptcy Law, Criminal Law",
    fields: [
      { label: "Designation",            value: "Assistant Professor",   type: "designation" },
      { label: "Additional Designation", value: null,                    type: "additional" },
      {
        label: "Education",
        value:
          "B.S.L., LL.B., LL.M. (Corporate Law), MBA (Human Resource Management), B.A. (Psychology), Diploma in Labour Laws & Human Rights (Symbiosis Law College, Pune), PhD (Pursuing) — Sant Gadge Baba Amravati University, Insolvency and Bankruptcy Code (IBC)",
        type: "education",
      },
      { label: "Specialization",         value: "Corporate Law, Insolvency & Bankruptcy Law, Criminal Law", type: "specialization" },
      { label: "Industrial Experience",  value: "District and Civil Court Practice – 8 Years", type: "industry" },
      { label: "Teaching Experience",    value: "5 Years",               type: "teaching" },
      { label: "Contact",                value: null,                    type: "contact" },
      {
        label: "Area of Interest",
        value:
          "New Criminal Laws, Code of Criminal Procedure, Law of Evidence, Indian Penal Code, Civil Procedure Code, Law of Contract, Sale of Goods Act, Partnership Act, Transfer of Property Act, Constitution of India, Media Law, Advocates Act, Code of Conduct, Specific Relief Act, Law of Limitation",
        type: "interest",
      },
    ],
  },
];

/** Quick lookup by slug */
export function getFacultyBySlug(slug) {
  return FACULTY.find((f) => f.slug === slug) ?? null;
}

/** All faculty except the one with the given slug */
export function getOtherFaculty(slug) {
  return FACULTY.filter((f) => f.slug !== slug);
}
