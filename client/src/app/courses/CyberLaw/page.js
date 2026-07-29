"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Shield,
  Lock,
  Globe,
  Cpu,
  Users,
} from "lucide-react";

export default function CyberLawCourse() {
  const course = {
    title: "Diploma in Cyber Law",
    duration: "1 Year (2 Semesters)",
    eligibility:
      "Graduation in any discipline / LL.B. students / Legal professionals",
    intake: "60 Seats",
    modules: [
      {
        title: "Module 1: Fundamentals of Cyber Law",
        topics: [
          "Introduction to Information Technology Act, 2000",
          "Digital Signature & Electronic Records",
          "E-Governance & E-Commerce Legal Framework",
          "Cyber Crimes & Offences under IT Act",
          "Adjudication & Appellate Tribunal",
          "Case Studies: Landmark Judgments",
        ],
      },
      {
        title: "Module 2: Data Protection & Privacy Laws",
        topics: [
          "Digital Personal Data Protection Act, 2023",
          "GDPR & International Data Protection Standards",
          "Data Localization & Cross-border Transfer",
          "Consent Framework & Data Principal Rights",
          "Data Fiduciary Obligations & Penalties",
          "Privacy by Design & Impact Assessment",
        ],
      },
      {
        title: "Module 3: Emerging Technologies & Law",
        topics: [
          "Artificial Intelligence & Legal Implications",
          "Blockchain, Cryptocurrency & Regulation",
          "Cloud Computing & Legal Challenges",
          "IoT & Cyber Security Framework",
          "Social Media & Intermediary Liability",
          "Electronic Evidence & Digital Forensics",
        ],
      },
      {
        title: "Module 4: Intellectual Property in Cyberspace",
        topics: [
          "Copyright in Digital Environment",
          "Software Patents & Open Source Licensing",
          "Domain Name Disputes & Cybersquatting",
          "Trademark Protection Online",
          "Digital Rights Management (DRM)",
          "Intermediary Liability & Safe Harbor",
        ],
      },
    ],
    highlights: [
      "Industry-Aligned Curriculum with Legal & Tech Experts",
      "Practical Training: Drafting Cyber Complaints & Contracts",
      "Workshops on Digital Forensics & Incident Response",
      "Guest Lectures by CERT-In, Police Cyber Cells, Law Firms",
      "Live Projects: Privacy Policies, Terms of Use, DPA",
      "Certification Recognized by Industry & Legal Employers",
      "Flexible Schedule for Working Professionals",
      "Placement Support in Law Firms, IT Companies, Compliance",
    ],
    career: [
      "Cyber Law Consultant / Legal Advisor",
      "Data Protection Officer (DPO)",
      "Compliance Officer - IT/Finance Sector",
      "Legal Counsel - Tech Companies & Startups",
      "Cyber Crime Investigation Support",
      "Privacy & GDPR Compliance Specialist",
      "Technology Contracts Drafting & Negotiation",
      "Legal Tech & Regulatory Analyst",
      "Freelance Cyber Law Practice",
      "In-house Counsel - E-commerce/Fintech",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>

          <div className="max-w-3xl">
            <span className="inline-block bg-indigo-600/20 text-indigo-100 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Professional Diploma Program • 1 Year
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              Master the legal framework governing cyberspace, data protection,
              and emerging technologies. India's most comprehensive cyber law
              diploma designed for legal professionals, tech enthusiasts, and
              compliance officers.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                <GraduationCap className="w-4 h-4 mr-2" />
                {course.duration}
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                <Award className="w-4 h-4 mr-2" />
                {course.eligibility}
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                <Users className="w-4 h-4 mr-2" />
                {course.intake}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Modules */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                  Course Modules
                </h2>
                <div className="space-y-6">
                  {course.modules.map((module, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          {index === 0 && (
                            <Lock className="w-6 h-6 text-blue-600" />
                          )}
                          {index === 1 && (
                            <Shield className="w-6 h-6 text-blue-600" />
                          )}
                          {index === 2 && (
                            <Cpu className="w-6 h-6 text-blue-600" />
                          )}
                          {index === 3 && (
                            <Globe className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {module.title}
                        </h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 ml-16">
                        {module.topics.map((topic, ti) => (
                          <span
                            key={ti}
                            className="px-3 py-1.5 bg-white border border-blue-200 text-blue-800 text-sm rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Highlights */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="w-8 h-8 text-blue-600 mr-3" />
                  Program Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 bg-indigo-50 border border-indigo-100 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                        <Award className="w-5 h-5 text-indigo-600" />
                      </div>
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Admission Card */}
              <div className="bg-indigo-950 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Admission Open 2024-25
                </h3>
                <p className="text-indigo-200 mb-4">
                  Specialized diploma for the digital age. Limited seats for
                  professionals & graduates.
                </p>
                <div className="space-y-2 mb-6 text-sm text-indigo-200">
                  <p>
                    <strong>Eligibility:</strong> {course.eligibility}
                  </p>
                  <p>
                    <strong>Intake:</strong> {course.intake}
                  </p>
                  <p>
                    <strong>Duration:</strong> {course.duration}
                  </p>
                </div>
                <Link
                  href="/academics/AdmissionProcedure"
                  className="block bg-white text-indigo-950 font-semibold py-3 px-4 rounded-lg text-center hover:bg-indigo-50 transition-colors"
                >
                  View Admission Procedure
                </Link>
                <Link
                  href="/academics/Enquiry"
                  className="block border border-indigo-400 text-indigo-100 font-semibold py-3 px-4 rounded-lg text-center mt-3 hover:bg-indigo-900/50 transition-colors"
                >
                  Enquiry Form
                </Link>
              </div>

              {/* Career Prospects */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                  Career Opportunities
                </h3>
                <ul className="space-y-3">
                  {course.career.map((career, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Cyber Law */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  Why Cyber Law Now?
                </h3>
                <p className="text-blue-800 text-sm">
                  With DPDP Act 2023, rising cybercrimes, AI regulation, and
                  digital transformation across industries, demand for cyber law
                  professionals has surged 300% in 3 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-950 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Secure Your Future in Digital Law
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Be at the forefront of legal technology. Gain expertise in data
            protection, cyber crimes, AI governance, and digital commerce law.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/academics/AdmissionProcedure"
              className="bg-white text-indigo-950 font-semibold py-3 px-8 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Admission Procedure
            </Link>
            <Link
              href="/academics/Enquiry"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-900/50 transition-colors"
            >
              Make an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
