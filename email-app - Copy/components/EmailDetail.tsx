import { Email } from "@/types/email";

export default function EmailDetail({ email }: { email: Email | null }) {
  if (!email) return <p>Select an email to read.</p>;

  return (
    <div>
      <h2>{email.subject}</h2>
      <p><b>{email.sender}</b></p>
      <hr />
      <p>{email.body}</p>
    </div>
  );
}
