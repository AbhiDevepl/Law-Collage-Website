import { NextResponse } from "next/server";
import { Resend } from "resend";

const COLLEGE_EMAIL = "hello@ssnlc.in";
const COURSES = ["LLM", "LLB", "Diploma in Cyber Law"];
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

export async function POST(request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const course = body.course;
  const category = body.category || null;
  const cetScore = body.cetScore;
  const sendCopy = body.sendCopy === true;

  const errors = {};

  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(phone.replace(/[\s-]/g, "")))
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  if (!COURSES.includes(course))
    errors.course = "Please select a course.";

  const cleanedPhone = phone.replace(/[\s-]/g, "");
  const prefixedPhone = /^[6-9]\d{9}$/.test(cleanedPhone)
    ? `+91 ${cleanedPhone}`
    : cleanedPhone;

  if (category !== null && !CATEGORIES.includes(category))
    errors.category = "Please select a valid category.";
  if (cetScore !== null && cetScore !== undefined && cetScore !== "") {
    if (!/^\d{1,3}$/.test(String(cetScore)))
      errors.cetScore = "Please enter a valid CET score.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${prefixedPhone}`,
    `Course: ${course}`,
  ];
  if (category) lines.push(`Category: ${category}`);
  if (course === "LLB" && cetScore !== null && cetScore !== undefined && cetScore !== "")
    lines.push(`MH-CET Law Score: ${cetScore}`);
  const text = lines.join("\n");

  try {
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "SSNLC Website <onboarding@resend.dev>",
      to: [COLLEGE_EMAIL],
      replyTo: email,
      subject: `New Admission Enquiry — ${course} — ${name}`,
      text,
    });

    if (sendCopy) {
      await resend.emails.send({
        from: "SSNLC Website <onboarding@resend.dev>",
        to: [email],
        subject: "We received your admission enquiry — SSNLC",
        text:
          `Dear ${name},\n\nWe have received your admission enquiry for the ${course} programme.\n\n` +
          text +
          `\n\nOur admissions team will get back to you shortly.\n\nShri Shivajirao Nagawade Law College, Shrigonda`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send admission enquiry email:", error);
    return NextResponse.json(
      { error: "Failed to send your enquiry. Please try again or contact us by phone." },
      { status: 500 }
    );
  }
}
