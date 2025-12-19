"use client";

export default function Filters({
  value,
  onChange,
}: {
  value: "all" | "unread" | "starred";
  onChange: (v: "all" | "unread" | "starred") => void;
}) {
  return (
    <div style={{ marginBottom: 8 }}>
      {(["all", "unread", "starred"] as const).map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{
            marginRight: 6,
            fontWeight: value === f ? "bold" : "normal",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
