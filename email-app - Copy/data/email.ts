import { Email } from "@/types/email";

export const emails: Email[] = [
  {
    id: 1,
    sender: "hr@company.com",
    subject: "Interview Schedule",
    body: "Your interview is scheduled for Monday at 10 AM...",
    timestamp: "2025-12-18T10:30:00",
    read: false,
    starred: false,
  },
  {
    id: 2,
    sender: "newsletter@react.dev",
    subject: "React 19 Released",
    body: "React 19 introduces new features including...",
    timestamp: "2025-12-17T08:15:00",
    read: true,
    starred: true,
  },
];
