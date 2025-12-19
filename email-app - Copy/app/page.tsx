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

  useEffect(() => {
  
  if (page > totalPages && totalPages > 0) {
    setPage(totalPages); 
  }
}, [totalPages, page]);

console.log(totalPages,"totalPages");

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
  <button 
    disabled={page <= 1} 
    onClick={() => setPage(p => p - 1)}
  >
    Prev
  </button>
  
  <span>{page} / {totalPages || 1}</span>
  
  <button 
    disabled={page >= totalPages || totalPages === 0} 
    onClick={() => setPage(p => p + 1)}
  >
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
    background-color: #f9fafb; /* Light neutral background */
    color: #1f2937;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .sidebar {
    width: 380px;
    background: #ffffff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
  }

  .content {
    flex: 1;
    background: #ffffff;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

 
  .pager {
    margin-top: auto;
    padding: 1rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f3f4f6;
  }

  .pager span {
    font-size: 0.875rem;
    font-weight: 500;
    color: #181819ff;
  }

  .pager button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pager button:hover:not(:disabled) {
    background: #c0c2c5ff;
    border-color: #d1d5db;
  }

  .pager button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }


  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
      height: 50vh;
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
    }
  }
`}</style>
    </main>
  );
}
