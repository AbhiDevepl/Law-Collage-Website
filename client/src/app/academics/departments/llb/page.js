"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Scale,
  BookOpen,
  Users,
  Award,
  Briefcase,
  FileText,
  Download,
  CheckCircle2,
  GraduationCap,
  Gavel,
  Target,
  Eye,
  Library,
  Building2,
  Phone,
  Mail,
  Globe,
  Clock,
  ChevronDown,
} from "lucide-react";

const quickNav = [
  { label: "Overview", href: "#overview" },
  { label: "Vision & Mission", href: "#vision" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Faculty", href: "#faculty" },
  { label: "Facilities", href: "#facilities" },
  { label: "Careers", href: "#careers" },
  { label: "Prospectus", href: "#prospectus" },
  { label: "Admission", href: "#admission" },
  { label: "Contact", href: "#contact" },
];

const highlights = [
  { icon: Users, label: "Experienced Faculty" },
  { icon: Gavel, label: "Dedicated Moot Court" },
  { icon: Scale, label: "Legal Aid Clinic" },
  { icon: BookOpen, label: "Workshops & Seminars" },
];

const missionPoints = [
  "Develop socially committed, professionally competent legal practitioners through doctrinal study combined with experiential learning — legal aid, policy analysis, real-time problem solving.",
  "Foster legal literacy and justice accessibility by engaging students with underserved communities.",
  "Advance interdisciplinary, technology-integrated legal education — AI, cyber law, data protection, digital governance.",
  "Build an institutional culture of ethical reasoning and democratic dialogue.",
  "Function as a legal ecosystem of mock trials, student parliaments, policy labs, legal awareness campaigns, and prison reform visits.",
];

const semesters = [
  {
    label: "Semester I",
    courses: [
      "Constitutional Law - I",
      "Law of Contract - I",
      "Family Law - I",
      "Law of Crimes",
      "Elective: Health & Food Law / Equity & Trust Law / Criminal Psychology & Sociology / Agricultural Marketing Law",
      "Generic Elective: Intellectual Property Rights",
    ],
  },
  {
    label: "Semester II",
    courses: [
      "Constitutional Law - II",
      "Law of Contract - II",
      "Family Law - II",
      "Jurisprudence",
      "Elective: Election Law / Insurance Law / Penology & Victimology / Comparative Constitution",
      "Generic Elective: Media Laws",
    ],
  },
  {
    label: "Semester III",
    courses: [
      "Criminal Procedure Code",
      "Law of Evidence",
      "Interpretation of Statutes",
      "Practical Training I: Professional Ethics & Contempt of Court Law",
      "Elective: Investments & Securities Law / Criminal Minor Acts / Cooperative Law / Private International Law",
    ],
  },
  {
    label: "Semester IV",
    courses: [
      "Civil Procedure Code & Limitation Act",
      "Company Law",
      "Law of Tort & Consumer Protection",
      "Practical Training II: Alternate Dispute Resolution System",
      "Elective: Human Rights Law & Practice / Civil Minor Acts / Competition Law / International Economic Law",
    ],
  },
  {
    label: "Semester V",
    courses: [
      "Property Law & Easement",
      "Public International Law",
      "Administrative Law",
      "Practical Training III: Drafting Pleading & Conveyance",
      "Skills: Introduction to Civil & Criminal Manual",
      "Elective: Defense & Strategic Studies / Law of Forensic Science / Land Laws / Artificial Intelligence & Law",
    ],
  },
  {
    label: "Semester VI",
    courses: [
      "Labour Laws",
      "Principles of Taxation",
      "Environmental Law",
      "Practical Training IV: Moot Court Exercise & Internship",
      "Skills: Legislative Drafting & Judgment Writing",
      "Elective: Bankruptcy & Insolvency Law / Comparative Criminal Justice System / Humanitarian & Refugee Law / Real Estate Law",
    ],
  },
];

const careers = [
  "Advocate",
  "Legal Advisor",
  "Judge (via Judiciary Exams)",
  "Corporate Counsel",
  "Public Prosecutor",
  "Legal Analyst",
  "Academic / Researcher",
];

const faculty = [
  {
    name: "Dr. Anjula Shrikrishna Chowbe",
    role: "Principal & HOD",
    detail:
      "B.Sc., LL.B., LL.M., Ph.D. (Amravati University). Specialization: Constitutional Law. Over a decade of teaching and industry experience; active Research Supervisor.",
  },
  {
    name: "Ms. Sakshi Babu Prathamshetty",
    role: "Assistant Professor & College Examination Officer",
    detail:
      "BA.LL.B. (YCLC Pune), LL.M. (Vishwakarma University Pune), DCCL. Specialization: Criminal Law, IPR & Cyber Law. Contributed to Nyaya Setu, an AI-enabled legal interface by the Dept. of Justice, Ministry of Law & Justice.",
  },
  {
    name: "Mr. Fate Purushottam Jagannath",
    role: "Assistant Professor",
    detail:
      "B.S.L., LL.B., LL.M., DCL, DLL. LL.B. from NBT Law College Nashik; LL.M. from ILS Law College Pune. Specialization: Business Law, 7 years industry experience.",
  },
];

const admissionSteps = [
  "Obtain the admission form from the college office or website.",
  "Fill the admission form manually and completely.",
  "Submit the hard copy with all required documents to the College Administrative Office before the deadline, and pay fees.",
  "Admission is processed after document verification and confirmation of eligibility.",
];

const documents = [
  "SSNLC Admission Form",
  "College Leaving Certificate / TC (original & photocopy)",
  "Migration Certificate, if applicable (original & photocopy)",
  "Gap Certificate, if applicable (original & photocopy)",
  "SSC, HSC & Graduation Marksheets (original & photocopy)",
  "MH CET Scorecard (original & photocopy)",
  "CET Application Form & Hall Ticket (original & photocopy)",
  "CET Allotment Letter (original & photocopy)",
  "Caste / Caste Validity Certificate, if applicable",
  "Non-Creamy Layer Certificate",
  "Income Certificate",
  "Domicile & Nationality Certificate",
  "Aadhaar Card (with photocopy)",
  "Five passport-size photographs",
];

export default function LLBDepartmentPage() {
  const [openSem, setOpenSem] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-12">
      {/* Hero Section */}
      <div className="relative h-72 md:h-96 w-full">
        <Image
          src="https://ik.imagekit.io/sk67opnzi/images/llb-department.jpg"
          alt="LLB Department"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/50 to-blue-900/30 flex flex-col justify-center items-center text-center px-4">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium mb-4 border border-white/20">
            <GraduationCap className="w-4 h-4" />
            3-Year Degree Programme &middot; Est. 2023
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
            Bachelor of Laws
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            Shri Shivajirao Nagawade Law College, Shrigonda — affiliated to
            Savitribai Phule Pune University, approved by the Bar Council of India.
          </p>
        </div>
      </div>

      {/* Quick Nav */}
      <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-blue-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex gap-1 overflow-x-auto px-4 py-3 no-scrollbar">
          {quickNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium text-blue-800 hover:bg-blue-50 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Highlights strip */}
      <div className="max-w-4xl mx-auto px-4 -mt-1 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {highlights.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 flex flex-col items-center text-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-700" />
              </div>
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overview */}
      <section id="overview" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-8 scroll-mt-20">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Scale className="w-6 h-6 text-blue-700" />
          About the Department
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Shri Shivajirao Nagawade Law College (SSNLC), Shrigonda, established in
          2023 under Tuljabhavani Seva Pratishthan, is a rising center of legal
          excellence guided by the visionary leadership of Shri Shivajirao
          (Bapu) Nagawade, Shri Rajendra (Dada) Nagawade, and Smt. Anuradha
          (Tai) Nagawade.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The department offers a rigorous three-year LL.B. programme for
          graduates of any discipline, integrating theoretical frameworks with
          hands-on practice — legal research, drafting, moot court, and
          professional ethics — supported by state-of-the-art facilities,
          digital classrooms, a rich law library, and a dedicated moot court hall.
        </p>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-8 scroll-mt-20">
        <div className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-700" />
            Our Vision
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            To establish a dynamic, inclusive centre of legal education,
            research, and innovation where law is not only taught but actively
            practiced and refined — bridging theory with grassroots advocacy,
            courtrooms with communities, and legal tradition with emerging
            digital realities.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-amber-400">
          <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-700" />
            Our Mission
          </h2>
          <ul className="space-y-2">
            {missionPoints.map((m, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-8 scroll-mt-20">
        <h2 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-700" />
          Curriculum — LL.B. (3-Year) 2023 Pattern (CBCS)
        </h2>
        <p className="text-sm text-gray-500 mb-6">Tap a semester to view its subjects.</p>
        <div className="space-y-2">
          {semesters.map((sem, i) => (
            <div key={sem.label} className="border border-blue-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenSem(openSem === i ? -1 : i)}
                className="w-full flex items-center justify-between px-4 py-3 bg-blue-50/60 hover:bg-blue-50 transition-colors text-left"
              >
                <span className="font-semibold text-blue-900 text-sm">{sem.label}</span>
                <ChevronDown
                  className={`w-4 h-4 text-blue-700 transition-transform ${
                    openSem === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSem === i && (
                <ul className="px-5 py-4 space-y-2 bg-white">
                  {sem.courses.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-8 scroll-mt-20">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-700" />
          Our Faculty
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {faculty.map((f) => (
            <div key={f.name} className="border border-blue-100 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center mb-3">
                {f.name.split(" ").filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join("")}
              </div>
              <p className="font-semibold text-blue-900 text-sm">{f.name}</p>
              <p className="text-xs text-blue-600 font-medium mb-2">{f.role}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities: Moot Court + Library + Infrastructure */}
      <section id="facilities" className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 mb-8 scroll-mt-20">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <Gavel className="w-5 h-5 text-blue-700" />
          </div>
          <h3 className="font-bold text-blue-900 mb-2 text-sm">Moot Court</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Regular intra-college moot court competitions train students in
            legal research, drafting memorials, and oral advocacy, preparing
            them for state, national, and international-level competitions.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <Library className="w-5 h-5 text-blue-700" />
          </div>
          <h3 className="font-bold text-blue-900 mb-2 text-sm">Library</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            "A Treasury of Legal Knowledge" — stocked with textbooks,
            reference books, journals, law reports, and periodicals as per
            university curriculum, in a serene reading environment.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-blue-700" />
          </div>
          <h3 className="font-bold text-blue-900 mb-2 text-sm">Infrastructure</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            A serene, student-friendly campus blending modern infrastructure
            with digital classrooms and the spirit of academic excellence.
          </p>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-8 scroll-mt-20">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-700" />
          Career Opportunities
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Graduates can pursue diverse careers in law and justice, and the
          programme also prepares students for competitive judiciary and
          civil services exams.
        </p>
        <div className="flex flex-wrap gap-2">
          {careers.map((c) => (
            <span
              key={c}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Prospectus 2025 */}
      <section id="prospectus" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-8 scroll-mt-20">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-700" />
            Prospectus 2025-26
          </h2>
          <a
            href="/pdfs/prospectus-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
        <div
          className="w-full border border-blue-100 rounded-xl overflow-hidden shadow-inner bg-gray-50"
          style={{ height: "80vh", minHeight: 600 }}
        >
          <iframe
            src="/pdfs/prospectus-2025.pdf"
            title="LL.B. Prospectus 2025 PDF Preview"
            width="100%"
            height="100%"
            className="w-full h-full border-none"
            style={{ minHeight: 600 }}
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Admission Procedure */}
      <section id="admission" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-8 scroll-mt-20">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-700" />
          Admission Procedure
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Admissions to the LL.B. (Three-Year) course are conducted through the
          Centralized Admission Process (CAP) via the State Common Entrance
          Test (CET) Cell, Maharashtra State, as per Government Notification
          No. CET-2015/C.R.243/Mashi-2 dated 2nd April 2016.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
          <h3 className="text-base font-semibold text-blue-800 mb-2">Eligibility Criteria</h3>
          <p className="text-gray-700 text-sm">
            Candidates must be graduates in any discipline from a recognized
            university with at least 45% marks (40% for SC/ST candidates), and
            must appear for CET and secure a place in the merit list.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-semibold text-blue-800 mb-3">Steps for Admission</h3>
            <ol className="space-y-2">
              {admissionSteps.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-base font-semibold text-blue-800 mb-3">Documents Required</h3>
            <ul className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pr-2">
              {documents.map((d) => (
                <li key={d} className="flex gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact / Useful Info */}
      <section id="contact" className="max-w-4xl mx-auto bg-blue-900 rounded-2xl shadow-md p-8 text-white scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Phone className="w-6 h-6" />
          Useful Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">LL.B. Classes</p>
                <p className="text-blue-100 text-sm">Morning session from 8:00 a.m.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Administrative Office</p>
                <p className="text-blue-100 text-sm">Mon–Fri 10:00 a.m.–4:30 p.m. · Sat 10:00 a.m.–1:30 p.m.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Library className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Library</p>
                <p className="text-blue-100 text-sm">Mon–Fri 10:00 a.m.–4:00 p.m.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <Phone className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
              <p className="text-blue-100 text-sm">9404449696</p>
            </div>
            <div className="flex gap-3 items-start">
              <Mail className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
              <p className="text-blue-100 text-sm">snlawcollegeshrigonda@gmail.com</p>
            </div>
            <div className="flex gap-3 items-start">
              <Globe className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
              <a href="https://www.ssnlc.in" target="_blank" rel="noopener noreferrer" className="text-blue-100 text-sm underline">
                www.ssnlc.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}