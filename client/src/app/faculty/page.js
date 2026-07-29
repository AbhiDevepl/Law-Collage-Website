"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FACULTY } from "@/data/faculty";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "teaching", label: "Teaching Faculty" },
  { key: "non-teaching", label: "Non-Teaching Staff" },
];

export default function Faculty() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(
    () =>
      active === "all" ? FACULTY : FACULTY.filter((m) => m.category === active),
    [active],
  );

  return (
    <div className="relative bg-[#0a2a52] py-24 min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Gradient mesh - directional light using brand blues */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(59,130,246,0.18), transparent)," +
              "radial-gradient(ellipse 60% 40% at 90% 90%, rgba(30,58,138,0.25), transparent)," +
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(14,165,233,0.08), transparent)",
          }}
        />
        {/* Subtle noise texture - breaks up banding on large screens */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Top edge fade - soft transition from preceding section */}
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,42,82,0) 0%, rgba(10,42,82,1) 100%)",
          }}
        />
        {/* Bottom edge fade - soft transition to following section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,42,82,0) 0%, rgba(10,42,82,1) 100%)",
          }}
        />
        {/* Top border glow - subtle separation from previous section */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)",
          }}
        />
      </div>

      {/* Content - sits above background layers */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Heading */}
        <div className="text-center text-white mb-10">
          <h2 className="text-4xl font-bold mb-3 tracking-tight">
            Our Faculty
          </h2>
          <p className="text-lg text-blue-200">
            Meet our distinguished and dedicated faculty members
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border
                ${
                  active === f.key
                    ? "bg-white text-[#0a2a52] border-white shadow-md"
                    : "bg-transparent text-blue-100 border-blue-400/40 hover:border-blue-200 hover:text-white"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((member) => (
            <div
              key={member.slug}
              className="relative bg-white rounded-2xl shadow-sm p-6 flex flex-col overflow-hidden
                         border border-gray-100 hover:border-transparent
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Category badge */}
              <span
                className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                  ${
                    member.category === "teaching"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
              >
                {member.category === "teaching" ? "Teaching" : "Non-Teaching"}
              </span>

              <div className="flex flex-col items-center text-center flex-grow pt-2">
                {/* Image */}
                <div className="mb-5 relative w-32 h-32 rounded-full overflow-hidden shadow-md ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    sizes="128px"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1.5 w-full">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-700 font-semibold uppercase tracking-wide">
                    {member.role}
                  </p>
                  {member.specialization && (
                    <p className="text-xs text-gray-500 leading-relaxed pt-1 line-clamp-2">
                      {member.specialization}
                    </p>
                  )}
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

        {filtered.length === 0 && (
          <p className="text-center text-blue-200 mt-12">
            No faculty found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
