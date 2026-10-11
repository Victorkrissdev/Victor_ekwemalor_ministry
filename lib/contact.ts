// Shared by the contact form (in the browser) and the email API route (on the server).

export const SUBJECTS = [
  "Prayer Request",
  "Testimony",
  "Question about Faith",
  "Collaboration",
  "Other",
] as const;

export type Subject = (typeof SUBJECTS)[number];

export const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
};

export function isSubject(value: unknown): value is Subject {
  return typeof value === "string" && (SUBJECTS as readonly string[]).includes(value);
}

export function isValidEmail(value: string): boolean {
  return value.length <= LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export type ContactResponse = { ok: true } | { ok: false; error: string };
