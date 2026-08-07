"use client";
import React from "react";
import { Clock, Mail, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FeesStructurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-blue-700" />
        </div>

        <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          Coming Soon
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
          Fees Structure
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          We're finalizing the fees structure for this academic year. This
          page will be updated shortly with complete details.
        </p>

        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 mb-8 text-left">
          <h2 className="text-sm font-semibold text-blue-800 mb-4">
            For fee-related queries, reach out to us:
          </h2>
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-sm text-gray-700">9404449696</span>
            </div>
            <div className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-sm text-gray-700">
                snlawcollegeshrigonda@gmail.com
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}