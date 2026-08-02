"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

const CATEGORY_OPTIONS = [
  "General",
  "OBC",
  "SC",
  "ST",
  "NT",
  "VJNT",
  "EWS",
  "Other",
];

export default function ReachUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    branch: "",
    category: "",
    cetScore: "",
    code: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Auto-set branch when course changes
  useEffect(() => {
    if (formData.course === "LLB") {
      setFormData((prev) => ({ ...prev, branch: "Business Law" }));
    } else if (formData.course === "Diploma in Cyber Law") {
      setFormData((prev) => ({ ...prev, branch: "Cyber Law", cetScore: "" }));
    } else if (formData.course === "LLM") {
      setFormData((prev) => ({ ...prev, branch: "", cetScore: "" })); // Force user to actively choose
    }
    // CET Score only applies to LLB — clear it whenever course isn't LLB
    if (formData.course !== "LLB") {
      setFormData((prev) => ({ ...prev, cetScore: "" }));
    }
  }, [formData.course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear the field's error as soon as the user edits it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};

    if (formData.name.trim().length < 2) {
      next.name = "Name must be at least 2 characters.";
    }

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!PHONE_REGEX.test(formData.mobile.trim())) {
      next.mobile = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.course) {
      next.course = "Please select a course.";
    }

    if (formData.course === "LLM" && !formData.branch) {
      next.branch = "Please select a branch.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");

    if (!validate()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "81d3b850-23f0-4ead-b88e-d1ab316bae7d",
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          course: "",
          branch: "",
          category: "",
          cetScore: "",
          code: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  const inputClass = (field) =>
    `mt-1 block w-full rounded-md shadow-sm transition duration-300 ease-in-out focus:ring-blue-500 ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-gray-300 focus:border-blue-500 hover:border-blue-400"
    }`;

  return (
    <div id="admission-enquiry" className="py-12 bg-gray-50">
      <div className="lg:text-center mb-12"></div>
      <div className="container mx-auto px-4">
        <div
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
          role="form"
          aria-labelledby="enquiry-title"
        >
          <h2
            id="enquiry-title"
            className="text-3xl font-bold text-center mb-8 text-gray-800 relative"
          >
            <div className="flex justify-center mb-6">
              <Image
                src="https://ik.imagekit.io/sk67opnzi/images/logo.png"
                alt="College Logo"
                width={150}
                height={150}
              />
            </div>
            <span className="relative inline-block">
              Admission Enquiry
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform origin-left transition-transform duration-300"></span>
            </span>
          </h2>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <p className="text-gray-600 text-center mb-6">
              Please fill in your details below and we'll get back to you
              shortly.
            </p>

            {/* 1. Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                minLength={2}
                className={inputClass("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                required
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* 2. Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={inputClass("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 3. Phone Number */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="e.g. 9876543210 or +91 9876543210"
                className={inputClass("mobile")}
                aria-invalid={!!errors.mobile}
                aria-describedby={errors.mobile ? "mobile-error" : undefined}
                required
              />
              {errors.mobile && (
                <p id="mobile-error" className="mt-1 text-xs text-red-600">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* 4. Course (select) */}
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Course <span className="text-red-500">*</span>
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={inputClass("course")}
                required
              >
                <option value="">Select Course</option>
                <option value="LLM">LLM</option>
                <option value="LLB">LLB</option>
                <option value="Diploma in Cyber Law">
                  Diploma in Cyber Law
                </option>
              </select>
              {errors.course && (
                <p className="mt-1 text-xs text-red-600">{errors.course}</p>
              )}
            </div>

            {/* 5. Branch (conditional) - only shows for LLM */}
            {formData.course === "LLM" && (
              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Branch <span className="text-red-500">*</span>
                </label>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className={inputClass("branch")}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="Cyber Law">Cyber Law</option>
                  <option value="Business Law">Business Law</option>
                </select>
                {errors.branch && (
                  <p className="mt-1 text-xs text-red-600">{errors.branch}</p>
                )}
              </div>
            )}

            {/* Hidden branch fields for LLB and Diploma (auto-submitted) */}
            {(formData.course === "LLB" ||
              formData.course === "Diploma in Cyber Law") && (
              <input type="hidden" name="branch" value={formData.branch} />
            )}

            {/* 6. CET Score — LLB only, MH-CET Law does not apply to LLM/Diploma */}
            {formData.course === "LLB" && (
              <div>
                <label
                  htmlFor="cetScore"
                  className="block text-sm font-medium text-gray-700"
                >
                  CET Score <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="number"
                  id="cetScore"
                  name="cetScore"
                  value={formData.cetScore}
                  onChange={handleChange}
                  placeholder="Enter your MH-CET Law score, if available"
                  min={0}
                  className={inputClass("cetScore")}
                />
              </div>
            )}

            {/* 7. Category (optional) */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category <span className="text-gray-400">(optional)</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass("category")}
              >
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 8. Verification code / captcha */}
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                CET Score <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter your MH-CET Law score, if available"
                className={inputClass("code")}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                For verification purposes, please enter the code shown above.
              </p>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </button>
            </div>

            {submitStatus === "success" && (
              <div className="text-center text-green-600 bg-green-50 p-4 rounded-md border border-green-200 animate-fade-in">
                <svg
                  className="w-6 h-6 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Form submitted successfully! We'll contact you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-center text-red-600 bg-red-50 p-4 rounded-md border border-red-200 animate-fade-in">
                <svg
                  className="w-6 h-6 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Please fix the highlighted fields and try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}