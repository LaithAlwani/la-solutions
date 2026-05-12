import { z } from "zod";

export const BUDGET_VALUES = [
  "<$200/mo",
  "$200–$500/mo",
  "$500–$1,000/mo",
  "$1,000+/mo",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(60).optional().or(z.literal("")),
  budget: z.enum(BUDGET_VALUES).optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a little about your project").max(2000),
  // honeypot — bots fill this, humans don't
  website: z.string().max(0).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Please agree to be contacted" }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string[]>>;

export type ContactActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };

export const INITIAL_CONTACT_STATE: ContactActionState = { status: "idle" };
