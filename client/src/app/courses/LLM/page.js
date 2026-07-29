"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";

export default function LLMCourse() {
  const course = {
    title: "Master of Laws (LL.M.)",
    duration: "2 Years (4 Semesters)",
    eligibility:
      "LL.B. Degree with minimum 50% marks (45% for reserved categories)",
    intake: "30 Seats",
    specialization: [
      "Constitutional Law",
      "Corporate & Commercial Law",
      "Criminal Law",
      "Intellectual Property Rights",
      "International Law",
      "Human Rights Law",
    ],
    highlights: [
      "UGC Recognized Program",
      "Experienced Faculty with Industry Experience",
      "Moot Court & Legal Aid Clinic",
      "Research Publications & Journals",
      "Placement Assistance",
      "Guest Lectures by Legal Luminaries",
    ],
    career: [
      "Legal Practice & Litigation",
      "Corporate Legal Counsel",
      "Judicial Services",
      "Academia & Research",
      "Policy Making & Think Tanks",
      "International Organizations",
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
              Postgraduate Degree Program
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              Advance your legal career with specialized knowledge in your
              chosen field of law. Designed for law graduates seeking expertise
              and academic excellence.
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
                <Scale className="w-4 h-4 mr-2" />
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
            {/* Specializations */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                  Specializations Offered
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.specialization.map((spec, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 border border-blue-100 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold text-gray-900">{spec}</h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Highlights */}
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
                  Admission Open
                </h3>
                <p className="text-blue-200 mb-4">
                  Admissions open for Academic Year 2024-25. Limited seats
                  available.
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-950 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Advance Your Legal Career?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join SSNLC's prestigious LL.M. program and learn from distinguished
            faculty. Limited seats available for the upcoming academic session.
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
