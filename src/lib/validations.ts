import { z } from "zod";

export const quoteWizardSchema = z.object({
  businessType: z.string().min(1, "Please select an occasion or business category"),
  quantity: z.string().min(1, "Please select an estimated quantity"),
  bottleSize: z.enum(["500ml", "1000ml", "250ml"], {
    message: "Please select a bottle size",
  }),
  labelStyle: z.string().default("Ultra-Matte Velvet"),
  name: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z.string().min(2, "Business or event name is required"),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit mobile number")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid phone format"),
  whatsapp: z.string().optional(),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  location: z.string().min(3, "Delivery city or venue location is required"),
  notes: z.string().optional(),
  logoUrl: z.string().optional(),
});

export type QuoteWizardData = z.infer<typeof quoteWizardSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z.string().min(2, "Business or event name is required"),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid phone format"),
  whatsapp: z.string().optional(),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  bottleSize: z.string().min(1, "Please select a bottle size"),
  quantity: z.string().min(1, "Please select approximate bottle quantity"),
  location: z.string().min(3, "Delivery city is required"),
  message: z.string().min(10, "Please provide a brief message or description"),
  logoUrl: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
