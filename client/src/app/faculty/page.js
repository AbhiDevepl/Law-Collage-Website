"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FACULTY } from "@/data/faculty";

export default function Faculty() {
  return (
    <div className="bg-[#0a2a52] py-14 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Heading */}
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-3 tracking-tight">Our Faculty</h2>
          <p className="text-lg text-blue-200">
            Meet our distinguished and dedicated faculty members
          </p>
        </div>

        {/* Flexbox layout — centered, wraps horizontally across screen sizes */}
        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {FACULTY.map((member) => (
            <div
              key={member.slug}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col w-full max-w-sm
                         hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                {/* Image */}
                <div className="mb-5 relative w-40 h-40 rounded-xl overflow-hidden shadow ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all duration-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 160px, 160px"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1 w-full">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-700 font-semibold uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed pt-1">
                    {member.specialization}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href={`/faculty/staff/${member.slug}`}
                  className="block w-full px-4 py-2.5 bg-[#0a2a52] text-white text-sm font-semibold rounded-lg
                             hover:bg-[#143c72] active:scale-95 transition-all duration-200 text-center"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
