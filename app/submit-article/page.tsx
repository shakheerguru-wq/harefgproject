'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SubmitArticlePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // While session is loading
  if (status === "loading") return <p>Loading...</p>;

  // Redirect if not logged in
  if (!session) {
    router.push("/login");
    return null;
  }

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

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Submit an Article</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          style={{ padding: "8px", minHeight: "150px" }}
        />
        <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>Submit</button>
      </form>
    </div>
  );
}
