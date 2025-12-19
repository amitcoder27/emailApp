import { Email } from "@/types/email";

export default function EmailList({
  emails,
  onOpen,
  onStar,
  onDelete,
}: {
  emails: Email[];
  onOpen: (e: Email) => void;
  onStar: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  if (!emails.length) return <p>No emails found.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {emails.map((e) => (
        <li
          key={e.id}
          onClick={() => onOpen(e)}
          style={{
            border: "1px solid #ccc",
            padding: 8,
            marginBottom: 6,
            cursor: "pointer",
            background: e.read ? "#fff" : "#eef",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <strong>{e.sender}</strong>
            {!e.read && <span style={{ color: "blue" }}> ●</span>}
            <div>{e.subject}</div>
            <small>{e.body.slice(0, 50)}...</small>
          </div>

          <div style={{ textAlign: "right" }}>
            <small>
              {new Date(e.timestamp).toLocaleTimeString()}
            </small>
            <div>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  onStar(e.id);
                }}
              >
                {e.starred ? "⭐" : "☆"}
              </button>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  onDelete(e.id);
                }}
              >
                🗑
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
