"use client";

import React from "react";
import { Mail, Phone, MapPin, MousePointerClick } from "lucide-react";

const phoneContacts = [
  {
    label: "Fate Sir",
    number: "+91 91444 49696",
    role: "Faculty — Business Law",
  },
  {
    label: "Kshitij Shitole",
    number: "+91 90691 69696",
    role: "Admin — Non-Teaching Staff",
  },
];

export default function ContactPage() {
  const handleEmailClick = () => {
    window.location.href = "mailto:hello@ssnlc.in";
  };

  const handlePhoneClick = (number) => {
    window.location.href = `tel:${number.replace(/\s+/g, "")}`;
  };

  return (
    <div className="relative bg-[#0a2a52] min-h-screen py-16 sm:py-24 overflow-hidden">
      {/* Background layers - matches Faculty page style */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Gradient mesh - directional light using brand blues */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(59,130,246,0.15), transparent)," +
              "radial-gradient(ellipse 60% 40% at 90% 90%, rgba(30,58,138,0.25), transparent)," +
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(14,165,233,0.08), transparent)",
          }}
        />
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Top edge fade */}
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,42,82,0) 0%, rgba(10,42,82,1) 100%)",
          }}
        />
        {/* Bottom edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,42,82,0) 0%, rgba(10,42,82,1) 100%)",
          }}
        />
        {/* Top border glow */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)",
          }}
        />
      </div>

      {/* Content - sits above background layers */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-blue-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Reach out through any of
            the channels below.
          </p>
        </div>

        {/* Main Layout - Side by side on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Contact Info Column - Order 1 on mobile, Order 2 on desktop */}
          <div className="lg:w-1/2 order-2 lg:order-1 flex flex-col gap-6">
            {/* Email Card */}
            <div
              className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/20 cursor-pointer"
              onClick={handleEmailClick}
            >
              <div className="flex items-start gap-4">
                {/* Icon with animated background */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300" />
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">
                      Email Us
                    </h2>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                      Click to compose
                    </span>
                  </div>
                  <p className="text-gray-600 text-base break-all group-hover:text-blue-700 transition-colors">
                    hello@ssnlc.in
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                    <MousePointerClick className="w-4 h-4" />
                    <span>Click to open mail client</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Contacts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200 uppercase tracking-wider">
                Phone Contacts
              </h3>

              {phoneContacts.map((contact, index) => (
                <div
                  key={index}
                  className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/20 cursor-pointer"
                  onClick={() => handlePhoneClick(contact.number)}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">
                          {contact.label}
                        </h2>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                          {contact.role}
                        </span>
                      </div>
                      <p className="text-gray-600 text-base font-mono group-hover:text-amber-700 transition-colors">
                        {contact.number}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-amber-500 text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                        <MousePointerClick className="w-3.5 h-3.5" />
                        <span>Tap to call</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Address Card */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Visit Us
                  </h2>
                  <address className="text-gray-600 text-base leading-relaxed not-italic">
                    Balaji Nagar, Mandavgaon Road,
                    <br />
                    MH SH 55, Shrigonda,
                    <br />
                    Ahilyanagar, Maharashtra 413701
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Map Column - Order 1 on desktop, Order 2 on mobile */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              {/* Map header */}
              <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-r from-blue-900/95 to-blue-700/95 backdrop-blur-sm text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold text-sm">Our Location</span>
                  </div>
                  <span className="text-xs text-blue-200">Drag to explore</span>
                </div>
              </div>

              {/* Map iframe */}
              <div className="relative h-[400px] sm:h-[450px] lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2924.3960710016295!2d74.70476099999999!3d18.61739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDM3JzAyLjYiTiA3NMKwNDInMTcuMSJF!5e1!3m2!1sen!2sin!4v1750003835201!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="SSNLC Location Map - Shri Shivajirao Nagawade Law College, Shrigonda"
                  style={{ border: 0 }}
                ></iframe>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent via-blue-500/10 to-blue-500/20 rounded-bl-2xl pointer-events-none" />
              </div>

              {/* Map footer with quick action */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-blue-900/95 to-transparent text-white">
                <p className="text-center text-sm opacity-90">
                  Balaji Nagar, Mandavgaon Road, Shrigonda, Maharashtra 413701
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA / Social hint */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-blue-200 text-sm">Office Hours:</span>
            <span className="text-white font-medium text-sm">
              Mon–Sat • 10:00 AM – 5:00 PM
            </span>
            <span className="text-blue-200 text-sm">|</span>
            <span className="text-blue-200 text-sm">
              Closed Sundays & Public Holidays
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
