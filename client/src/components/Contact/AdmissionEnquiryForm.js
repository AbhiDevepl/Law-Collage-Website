"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const COURSES = ["LLB", "LLM", "Diploma in Cyber Law"];
const CATEGORIES = [
  "General",
  "OBC",
  "SC",
  "ST",
  "NT",
  "VJNT",
  "EWS",
  "Other",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+91[\s-]?)?[6-9]\d{9}$/;

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

export default function AdmissionEnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    cetScore: "",
    course: "",
    sendCopy: false,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!EMAIL_RE.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!PHONE_RE.test(formData.phone.trim())) {
      nextErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }
    if (!COURSES.includes(formData.course)) {
      nextErrors.course = "Please select a course.";
    }
    if (
      formData.course === "LLB" &&
      formData.cetScore.trim() &&
      !/^\d{1,3}$/.test(formData.cetScore.trim())
    ) {
      nextErrors.cetScore = "Please enter a valid CET score.";
    }
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          course: formData.course,
          category: formData.category || null,
          cetScore:
            formData.course === "LLB" && formData.cetScore.trim()
              ? formData.cetScore.trim()
              : null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setSubmitError(data.error || "Something went wrong. Please try again.");
        }
      } else {
        setStatus("success");
        return;
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        <div className="text-center py-10">
          <CheckCircle2
            className="w-16 h-16 text-emerald-500 mx-auto mb-4"
            aria-hidden="true"
          />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Enquiry Sent Successfully
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Thank you, {formData.name}. We have received your enquiry for the{" "}
            {formData.course} programme and will get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Admission Enquiry
      </h2>
      <p className="text-gray-600 text-base mb-6">
        Please fill in your details below and we&rsquo;ll get back to you
        shortly.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ae-name" className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ae-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              minLength={2}
              required
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="ae-email" className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="ae-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="ae-phone" className={labelClass}>
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="ae-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              required
              className={inputClass}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="ae-category" className={labelClass}>
              Category (optional)
            </label>
            <select
              id="ae-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="ae-course" className={labelClass}>
              Course <span className="text-red-500">*</span>
            </label>
            <select
              id="ae-course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select course</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="mt-1 text-sm text-red-600">{errors.course}</p>
            )}
          </div>

          {formData.course === "LLB" && (
            <div>
              <label htmlFor="ae-cet" className={labelClass}>
                CET Score (optional)
              </label>
              <input
                type="number"
                id="ae-cet"
                name="cetScore"
                value={formData.cetScore}
                onChange={handleChange}
                placeholder="e.g. 120"
                min={0}
                max={300}
                className={inputClass}
              />
              {errors.cetScore && (
                <p className="mt-1 text-sm text-red-600">{errors.cetScore}</p>
              )}
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 mt-4 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            name="sendCopy"
            checked={formData.sendCopy}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Send a copy of this enquiry to my email
        </label>

        {submitError && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
        >
          {status === "submitting" ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" aria-hidden="true" />
              Send Enquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
