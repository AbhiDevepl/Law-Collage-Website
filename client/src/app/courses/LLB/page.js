"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Shield,
} from "lucide-react";

export default function LLBCourse() {
  const course = {
    title: "Bachelor of Laws (LL.B.)",
    duration: "3 Years (6 Semesters)",
    eligibility:
      "Graduation in any discipline with minimum 45% marks (40% for reserved categories)",
    intake: "120 Seats",
    semesters: [
      {
        semester: "Semester 1",
        subjects: [
          "Constitutional Law I",
          "Law of Contract I",
          "Law of Torts",
          "Family Law I",
          "Legal Methods",
          "English & Legal Language",
        ],
      },
      {
        semester: "Semester 2",
        subjects: [
          "Constitutional Law II",
          "Law of Contract II",
          "Law of Crimes I",
          "Family Law II",
          "Environmental Law",
          "Professional Ethics",
        ],
      },
      {
        semester: "Semester 3",
        subjects: [
          "Jurisprudence",
          "Property Law",
          "Law of Crimes II",
          "Administrative Law",
          "Company Law I",
          "Labour Law I",
        ],
      },
      {
        semester: "Semester 4",
        subjects: [
          "Public International Law",
          "Law of Evidence",
          "Company Law II",
          "Labour Law II",
          "Intellectual Property Rights",
          "Alternative Dispute Resolution",
        ],
      },
      {
        semester: "Semester 5",
        subjects: [
          "Civil Procedure Code",
          "Criminal Procedure Code",
          "Taxation Law",
          "Interpretation of Statutes",
          "Drafting, Pleading & Conveyancing",
          "Clinical Course I",
        ],
      },
      {
        semester: "Semester 6",
        subjects: [
          "Land Laws",
          "Human Rights Law",
          "Banking & Insurance Law",
          "Cyber Law",
          "Clinical Course II",
          "Moot Court & Internship",
        ],
      },
    ],
    highlights: [
      "Bar Council of India Approved Program",
      "Experienced Faculty with Legal Practice",
      "Moot Court Hall & Legal Aid Clinic",
      "Internship with Courts & Law Firms",
      "Legal Research & Writing Training",
      "Regular Guest Lectures by Judges & Senior Advocates",
      "Placement Cell with Law Firm Tie-ups",
      "Scholarship for Meritorious Students",
    ],
    career: [
      "Advocate / Litigation Lawyer",
      "Corporate Legal Counsel",
      "Judicial Services (Civil Judge/JMFC)",
      "Legal Advisor in Government/PSU",
      "Legal Analyst / Researcher",
      "Academia & Teaching (after LL.M.)",
      "Legal Process Outsourcing (LPO)",
      "Compliance Officer",
      "Arbitration & Mediation Practitioner",
      "Public Prosecutor / Government Pleader",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20 lg:py-32">
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
            <span className="inline-block bg-blue-600/20 text-blue-100 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Undergraduate Degree Program • Bar Council of India Approved
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              Build a strong foundation in law with comprehensive legal
              education. Approved by Bar Council of India, this program prepares
              you for legal practice, judiciary, corporate law, and public
              service.
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

      {/* Course Details */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Semesters & Highlights */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                  Semester-wise Curriculum
                </h2>
                <div className="space-y-6">
                  {course.semesters.map((sem, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-blue-900">
                        {sem.semester}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {sem.subjects.map((subject, si) => (
                          <span
                            key={si}
                            className="px-3 py-1.5 bg-white border border-blue-200 text-blue-800 text-sm rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            {subject}
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
                <div className="space-y-4">
                  {course.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                        <Award className="w-5 h-5 text-blue-600" />
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
              <div className="bg-blue-950 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Admission Open 2024-25
                </h3>
                <p className="text-blue-200 mb-4">
                  BCI-approved 3-year LL.B. program. Limited seats for the
                  upcoming academic session.
                </p>
                <div className="space-y-2 mb-6 text-sm text-blue-200">
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
                  className="block bg-white text-blue-950 font-semibold py-3 px-4 rounded-lg text-center hover:bg-blue-50 transition-colors"
                >
                  Apply Now
                </Link>
                <Link
                  href="/academics/Enquiry"
                  className="block border border-blue-400 text-blue-100 font-semibold py-3 px-4 rounded-lg text-center mt-3 hover:bg-blue-900/50 transition-colors"
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
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BCI Approved Badge */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Bar Council of India Approved
                </h3>
                <p className="text-blue-800 text-sm">
                  This program is recognized by the Bar Council of India.
                  Graduates are eligible to enroll as Advocates and practice law
                  across all courts in India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-950 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Start Your Legal Career with SSNLC
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join a legacy of legal excellence. Learn from experienced faculty,
            gain practical court exposure, and build a network that lasts a
            lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/academics/AdmissionProcedure"
              className="bg-white text-blue-950 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View Admission Procedure
            </Link>
            <Link
              href="/academics/Enquiry"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-900/50 transition-colors"
            >
              Make an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
