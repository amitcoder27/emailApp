"use client";

import { useEffect, useMemo, useState } from "react";
import { emails as mock } from "@/data/email";
import { Email } from "@/types/email";
import EmailList from "@/components/EmailList";
import EmailDetail from "@/components/EmailDetail";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";

const PAGE_SIZE = 5;

export default function Home() {
  const [emails, setEmails] = useState<Email[]>(mock);
  console.log(emails,"emails");
  
  const [selected, setSelected] = useState<Email | null>(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  const [page, setPage] = useState(1);


  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

 
  // useEffect(() => {
  //   const handler = (e: KeyboardEvent) => {
  //     if (e.key === "/") {
  //       e.preventDefault();
  //       document.getElementById("search")?.focus();
  //     }
  //   };
  //   window.addEventListener("keydown", handler);
  //   return () => window.removeEventListener("keydown", handler);
  // }, []);

  const filtered = useMemo(() => {
    return emails.filter((e) => {
      const q = debounced.toLowerCase();
      const match =
        e.sender.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q);

      const byFilter =
        filter === "all" ||
        (filter === "unread" && !e.read) ||
        (filter === "starred" && e.starred);

      return match && byFilter;
    });
  }, [emails, debounced, filter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const openEmail = (email: Email) => {
    setSelected(email);
    setEmails((prev) =>
      prev.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      )
    );
  };

  const toggleStar = (id: number) => {
    setEmails((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, starred: !e.starred } : e
      )
    );
  };

  const deleteEmail = (id: number) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <main className="container">
      <div className="sidebar">
        <SearchBar value={query} onChange={setQuery} />
        <Filters value={filter} onChange={setFilter} />

        <EmailList
          emails={paginated}
          onOpen={openEmail}
          onStar={toggleStar}
          onDelete={deleteEmail}
        />

       
        <div className="pager">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>
          <span>{page} / {totalPages || 1}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
      </div>

      <div className="content">
        <EmailDetail email={selected} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
        }
        .sidebar {
          width: 40%;
          min-width: 320px;
          border-right: 1px solid #ddd;
          padding: 12px;
        }
        .content {
          flex: 1;
          padding: 12px;
        }
        .pager {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
        @media (max-width: 1024px) {
          .sidebar {
            width: 45%;
          }
        }
      `}</style>
    </main>
  );
}
