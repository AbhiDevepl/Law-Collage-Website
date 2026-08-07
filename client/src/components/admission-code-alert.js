"use client";
import React, { useEffect, useState } from "react";
import { X, Copy, Check, ExternalLink, Megaphone } from "lucide-react";

const COLLEGE_CODE = "2603010812";
const CET_URL = "https://mahacet.org";
const SESSION_KEY = "ssnlc-cap-modal-seen";

export default function AdmissionCodeAlert() {
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(COLLEGE_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <>
      {/* Sticky top banner — always visible until dismissed */}
      {showBanner && (
        <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 border-b border-amber-400/30">
          <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-left group"
            >
              <Megaphone className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              <span className="text-white text-sm font-medium">
                CAP Round — Option Form Filling is Live!
              </span>
              <span className="hidden sm:inline text-amber-300 text-sm font-bold border border-amber-400/40 rounded px-2 py-0.5 group-hover:bg-amber-400/10 transition-colors">
                Code: {COLLEGE_CODE}
              </span>
            </button>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowModal(true)}
                className="text-xs font-semibold bg-amber-400 text-blue-950 px-3 py-1.5 rounded-full hover:bg-amber-300 transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => setShowBanner(false)}
                aria-label="Dismiss banner"
                className="text-blue-300 hover:text-white transition-colors p-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal popup — shown once per session on load */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-b from-blue-950 to-blue-900 rounded-2xl shadow-2xl border border-amber-400/30"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-3 right-3 text-blue-300 hover:text-white transition-colors z-10 p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-6 pt-8 pb-6 text-center">
              <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
                Admissions 2025-26
              </p>
              <h2 className="text-2xl font-bold text-white leading-snug mb-1">
                CAP Round
                <br />
                Option Form Filling
              </h2>
              <p className="text-blue-200 text-sm mt-2">
                Now live! Submit your options.
              </p>
            </div>

            <div className="mx-6 mb-6 bg-gradient-to-b from-amber-300 to-amber-500 rounded-xl p-5 text-center shadow-inner">
              <p className="text-blue-950 text-xs font-bold uppercase tracking-wide mb-2">
                Official College Choice Code
              </p>
              <p className="text-blue-900 text-3xl sm:text-4xl font-extrabold tracking-wider mb-3">
                {COLLEGE_CODE}
              </p>
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-2 bg-blue-950 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-900 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Code
                  </>
                )}
              </button>
              <p className="text-blue-900/80 text-xs mt-3">
                Enter this code in your option form to secure your seat at SSNLC.
              </p>
            </div>

            <div className="px-6 pb-6">
              <a
                href={CET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 transition-colors text-white font-semibold text-sm py-3 rounded-xl"
              >
                Fill Your Form Today
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-center text-blue-300 text-xs mt-3">
                Official CET Website: mahacet.org
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
