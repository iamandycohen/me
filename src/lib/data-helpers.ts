import type { Contact, Role, Bio } from "@/types";

// Extract first name from contact name
export function getFirstName(contact: Contact): string {
  return contact.name.split(" ")[0];
}

// Extract last name from contact name
export function getLastName(contact: Contact): string {
  const parts = contact.name.split(" ");
  return parts[parts.length - 1];
}

// Get display name (just use the full name now)
export function getDisplayName(contact: Contact): string {
  return contact.name;
}

// Get current role (first in resume array)
export function getCurrentRole(resume: Role[]): Role {
  return resume[0];
}

// Format LinkedIn URL to ensure https prefix
export function formatLinkedInUrl(linkedin: string): string {
  return linkedin.startsWith("http") ? linkedin : `https://${linkedin}`;
}

// Split bio into paragraphs for rendering
export function getBioParagraphs(bioText: string): string[] {
  return bioText.split("\n\n").filter((paragraph) => paragraph.trim());
}

// Truncate description with ellipsis
export function truncateDescription(
  text: string,
  maxLength: number = 50
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

// Format role for display
export function formatRoleTitle(role: Role): string {
  return `${role.title} at ${role.company}`;
}

// Get role duration or current indicator
export function getRoleDuration(role: Role): string {
  return role.period.toLowerCase().includes("present")
    ? "Current Role"
    : role.period;
}

// Generate professional tagline
export function getProfessionalTagline(role: Role, bio: Bio): string {
  return `${role.title} at ${role.company}. ${bio.short}`;
}
