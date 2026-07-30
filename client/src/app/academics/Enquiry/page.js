"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ReachUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    branch: "",
    code: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Auto-set branch when course changes
  useEffect(() => {
    if (formData.course === "LLB") {
      setFormData((prev) => ({ ...prev, branch: "Business Law" }));
    } else if (formData.course === "Diploma in Cyber Law") {
      setFormData((prev) => ({ ...prev, branch: "Cyber Law" }));
    } else if (formData.course === "LLM") {
      setFormData((prev) => ({ ...prev, branch: "" })); // Force user to actively choose
    }
  }, [formData.course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Validation: Branch required only when Course = LLM
    if (formData.course === "LLM" && !formData.branch) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

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
          code: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
                required
              />
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
                required
              />
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
                placeholder="Enter your 10-digit mobile number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
                required
              />
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
                required
              >
                <option value="">Select Course</option>
                <option value="LLM">LLM</option>
                <option value="LLB">LLB</option>
                <option value="Diploma in Cyber Law">
                  Diploma in Cyber Law
                </option>
              </select>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="Criminal law">Criminal law</option>
                  <option value="Business Law">Business Law</option>
                </select>
              </div>
            )}

            {/* Hidden branch fields for LLB and Diploma (auto-submitted) */}
            {(formData.course === "LLB" ||
              formData.course === "Diploma in Cyber Law") && (
              <input type="hidden" name="branch" value={formData.branch} />
            )}

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
                An error occurred. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
