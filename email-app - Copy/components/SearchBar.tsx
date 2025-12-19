"use client";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      id="search"
      placeholder="Search by sender or subject..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
       style={{ width: "100%", padding: 6, marginBottom: 8 , border: "1px solid #ccc" }}
    />
  );
}

