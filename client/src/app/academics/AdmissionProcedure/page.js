"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  ADMISSION_PROCEDURES,
  getProcedureBySlug,
} from "@/data/admission-procedures";

export default function AdmissionProcedure() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("programme") || "llb";
  const initialProc = getProcedureBySlug(initialSlug);
  const [activeProc, setActiveProc] = useState(initialProc);

  // Update URL when tab changes (for deep-linking & refresh)
  const handleTabChange = (proc) => {
    setActiveProc(proc);
    const url = new URL(window.location.href);
    url.searchParams.set("programme", proc.slug);
    window.history.replaceState({}, "", url);
  };

  // In case user navigates via browser back/forward
  useEffect(() => {
    const onPopState = () => {
      const slug =
        new URLSearchParams(window.location.search).get("programme") || "llb";
      setActiveProc(getProcedureBySlug(slug));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const sections = [
    { id: "programme", label: "Programme Overview" },
    { id: "eligibility", label: "Eligibility Criteria" },
    { id: "steps", label: "Steps for Admission" },
    { id: "documents", label: "Documents Required" },
  ];

  const renderPlaceholder = (note) => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg my-6">
      <p className="text-yellow-800 italic">
        <strong>Content pending:</strong> {note}
      </p>
    </div>
  );

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
            Admission Procedure
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto my-4"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete guide to the admission process at Shri Shivajirao Nagawade
            Law College
          </p>
        </div>

        {/* Programme Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav
            className="flex flex-wrap -mb-px gap-1"
            aria-label="Programme selection"
          >
            {ADMISSION_PROCEDURES.map((proc) => (
              <button
                key={proc.slug}
                onClick={() => handleTabChange(proc)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-200 rounded-t-lg
                  ${
                    activeProc.slug === proc.slug
                      ? "border-blue-600 text-blue-700 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                role="tab"
                aria-selected={activeProc.slug === proc.slug}
              >
                {proc.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit lg:sticky lg:top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
              Quick Navigation
            </h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-blue-700 hover:text-blue-900 hover:underline py-1"
                >
                  {section.label}
                </a>
              ))}
            </nav>

            {/* Download PDF Button - changes per programme */}
            {activeProc.pdfPath && (
              <a
                href={activeProc.pdfPath}
                download
                className="mt-6 inline-block bg-blue-700 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-800 transition w-full"
              >
                📄 {activeProc.pdfLabel}
              </a>
            )}
            {!activeProc.pdfPath && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  PDF not yet available for {activeProc.label}.
                </p>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4 bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="text-center mb-10">
              <p className="text-base leading-8 text-gray-600">
                Tuljabhavani Seva Pratishthan (TSP&rsquo;s)
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Shri Shivajirao Nagawade Law College Shrigonda
              </h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto mt-4"></div>
            </div>

            {/* Programme Overview */}
            <section id="programme" className="mb-10 scroll-mt-24">
              <h3 className="text-2xl font-semibold text-blue-900 border-b border-gray-200 pb-2">
                Programme: {activeProc.fullName}
              </h3>
              <div className="mt-4 space-y-4">
                {activeProc.programme.description.length > 0
                  ? activeProc.programme.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
                  : renderPlaceholder(activeProc.note)}
              </div>
            </section>

            {/* Eligibility Criteria */}
            <section id="eligibility" className="mb-10 scroll-mt-24">
              <h4 className="text-xl font-semibold text-blue-900 border-b border-gray-200 pb-2">
                Eligibility Criteria:
              </h4>
              <div className="mt-4 space-y-4">
                {activeProc.eligibility.length > 0
                  ? activeProc.eligibility.map((item, i) => (
                      <div
                        key={i}
                        className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"
                      >
                        <p>
                          <strong>{item.label}:</strong> {item.details}
                        </p>
                      </div>
                    ))
                  : renderPlaceholder(activeProc.note)}
              </div>
            </section>

            {/* Steps for Admission */}
            <section id="steps" className="mb-10 scroll-mt-24">
              <h4 className="text-xl font-semibold text-blue-900 border-b border-gray-200 pb-2">
                Steps for Admission:
              </h4>
              <div className="mt-4">
                {activeProc.steps.length > 0 ? (
                  <ol className="list-decimal space-y-3 pl-5">
                    {activeProc.steps.map((step, i) => (
                      <li key={i} className="text-gray-800 leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                ) : (
                  renderPlaceholder(activeProc.note)
                )}
              </div>
            </section>

            {/* Documents Required */}
            <section id="documents" className="scroll-mt-24">
              <h4 className="text-xl font-semibold text-blue-900 border-b border-gray-200 pb-2">
                Documents Required for Admission:
              </h4>
              <div className="mt-6">
                {activeProc.documents.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-y-3 gap-x-6">
                      {activeProc.documents.map((doc, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-blue-700 mr-2 flex-shrink-0">
                            •
                          </span>
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>

                    {activeProc.note && (
                      <p className="italic text-gray-700 mt-8 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                        <strong>Note:</strong> {activeProc.note}
                      </p>
                    )}

                    <blockquote className="mt-8 border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 rounded-r-lg">
                      <p className="text-lg text-blue-900 italic">
                        "Every page you turn is a step toward your future; some
                        lessons inspire, some challenge, and some transform
                        you."
                      </p>
                    </blockquote>
                  </>
                ) : (
                  renderPlaceholder(activeProc.note)
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
