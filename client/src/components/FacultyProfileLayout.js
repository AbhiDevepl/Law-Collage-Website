"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Briefcase,
  Award,
  GraduationCap,
  Scale,
  Building2,
  BookOpen,
  Mail,
  Lightbulb,
  ChevronRight,
  ArrowLeft,
  Users,
} from "lucide-react";
import { getFacultyBySlug, getOtherFaculty } from "@/data/faculty";

/** Icon map keyed by field type */
const FIELD_ICONS = {
  designation: (
    <Briefcase size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
  ),
  additional: (
    <Award size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
  ),
  education: (
    <GraduationCap size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
  ),
  specialization: (
    <Scale size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
  ),
  industry: (
    <Building2 size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
  ),
  teaching: (
    <BookOpen size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
  ),
  contact: <Mail size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />,
  interest: (
    <Lightbulb size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
  ),
};

/**
 * Shared profile layout used by every faculty profile page.
 * Pass only the slug — all data is pulled from the faculty config.
 */
export default function FacultyProfileLayout({ slug }) {
  const member = getFacultyBySlug(slug);
  const others = getOtherFaculty(slug);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, []);

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-gray-500">
        Faculty profile not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 flex-wrap">
          <Link href="/" className="hover:text-blue-700 transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <Link
            href="/faculty"
            className="hover:text-blue-700 transition-colors"
          >
            Faculty
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-blue-900 font-medium">{member.shortName}</span>
        </nav>

        {/* ── Back button ───────────────────────────────────────────── */}
        <Link
          href="/faculty"
          className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 font-medium mb-6 group transition-colors"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-0.5 transition-transform duration-150"
          />
          Back to Faculty
        </Link>

        {/* ── Profile card ─────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 rounded-xl overflow-hidden ring-4 ring-white/30 shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="160px"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-1">
                {member.name}
              </h1>
              <p className="text-blue-200 font-medium text-base mb-2">
                {member.role}
              </p>
              {member.specialization && (
                <p className="text-sm text-blue-100">
                  <span className="font-semibold text-white">
                    Specialization:{" "}
                  </span>
                  {member.specialization}
                </p>
              )}
            </div>
          </div>

          {/* Details table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <tbody className="divide-y divide-gray-100">
                {/* Name row (always first) */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="px-6 py-4 font-semibold text-gray-700 bg-gray-50 w-1/3 text-left align-top">
                    <span className="flex items-center gap-2">
                      <User size={15} className="text-blue-500 flex-shrink-0" />
                      Name
                    </span>
                  </th>
                  <td className="px-6 py-4 text-blue-900 font-bold align-top">
                    {member.name}
                  </td>
                </tr>

                {/* Dynamic field rows */}
                {member.fields.map((field) => (
                  <tr
                    key={field.label}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <th className="px-6 py-4 font-semibold text-gray-700 bg-gray-50 text-left align-top">
                      <span className="flex items-center gap-2">
                        {FIELD_ICONS[field.type] ?? null}
                        {field.label}
                      </span>
                    </th>
                    <td
                      className={`px-6 py-4 align-top ${
                        field.label === "Designation"
                          ? "text-blue-800 font-semibold"
                          : "text-gray-600"
                      } ${field.label === "Contact" ? "break-words" : ""}`}
                    >
                      {field.value ?? "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Other Faculty Members */}
          <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50">
            <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900 mb-4">
              <Users size={16} className="text-blue-600" />
              Other Faculty Members
            </h3>
            <div className="flex flex-wrap gap-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/faculty/staff/${other.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-200 shadow-sm"
                >
                  {other.shortName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
