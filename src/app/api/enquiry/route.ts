import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmail, EnquiryPayload } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EnquiryPayload;

    // 1. Basic Anti-Spam Honeypot check
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Enquiry received." },
        { status: 200 }
      );
    }

    // 2. Server-side validation
    const name = (body.name || "").trim();
    const phone = (body.phone || "").replace(/\D/g, "");

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    // Email format validation if email provided
    if (body.email && body.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email.trim())) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid email address." },
          { status: 400 }
        );
      }
    }

    // 3. Fallback defaults for source tracking
    const payload: EnquiryPayload = {
      ...body,
      name,
      pageName: body.pageName || "Website",
      pageUrl: body.pageUrl || "https://www.aquvana.in/",
      formName: body.formName || "Direct Website Form",
      formType: body.formType || "Customer Enquiry",
    };

    // 4. Send email via centralized mailer
    const result = await sendEnquiryEmail(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We've received your enquiry. We'll get back to you shortly.",
        customerEmailed: result.customerEmailed,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Detailed server-side logging without exposing secrets
    console.error("[Aquvana Enquiry API] Submission error:", error?.message || error);

    // If SMTP_PASSWORD missing
    if (error?.message?.includes("SMTP_PASSWORD")) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service is temporarily unavailable. Please connect via WhatsApp or phone.",
        },
        { status: 503 }
      );
    }

    // Generic safe error message to client (Section 19: do not expose SMTP/nodemailer internals)
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't send your enquiry right now. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
