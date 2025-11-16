'use client';
export const dynamic = "force-dynamic";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SubmitArticlePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    // Redirect to login if no session
    if (!session) {
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("Article submitted successfully!");
      setTitle("");
      setContent("");
    } else {
      const data = await res.json();
      alert(data.error || "Submission failed");
    }
  };

  if (!ready) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h1>Submit an Article</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: 8 }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ padding: 8, minHeight: 150 }}
        />
        <button type="submit" style={{ padding: 8, cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
