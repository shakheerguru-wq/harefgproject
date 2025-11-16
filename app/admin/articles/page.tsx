'use client';
export const dynamic = "force-dynamic";


import { useEffect, useState } from "react";

type Article = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: { name: string | null; email: string };
};

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [search, setSearch] = useState("");

  // Fetch all articles from the admin API
  useEffect(() => {
    fetch("/api/admin/articles")
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setFiltered(data);
      })
      .catch(err => console.error(err));
  }, []);

  // Search filter
  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      articles.filter(
        a =>
          a.title.toLowerCase().includes(s) ||
          a.author.email.toLowerCase().includes(s)
      )
    );
  }, [search, articles]);

  // Toggle published status
  const togglePublish = async (id: string, published: boolean) => {
    try {
      const res = await fetch("/api/admin/articles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: !published }),
      });

      const updated = await res.json();

      setArticles(prev =>
        prev.map(a => (a.id === id ? { ...a, published: updated.published } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Header */}
      <h1 className="text-4xl font-black text-center mb-8 bg-clip-text text-transparent 
      bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 drop-shadow-md">
        Admin – Manage Articles
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search articles or authors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-xl shadow-md border border-purple-300 focus:ring-4 
          focus:ring-purple-300 focus:outline-none bg-white placeholder-gray-500 text-lg"
        />
      </div>

      {/* Articles Container */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(article => (
          <div
            key={article.id}
            className="p-6 rounded-2xl shadow-xl bg-white border border-purple-200 hover:shadow-2xl 
            transition-all duration-200 relative"
          >
            {/* Published Status */}
            <span
              className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full 
              ${
                article.published
                  ? "bg-green-500 text-white shadow-green-300 shadow-sm"
                  : "bg-red-400 text-white shadow-red-300 shadow-sm"
              }`}
            >
              {article.published ? "PUBLISHED" : "UNPUBLISHED"}
            </span>

            {/* Title */}
            <h2 className="text-xl font-bold mb-2 text-purple-700">{article.title}</h2>

            {/* Author */}
            <p className="text-sm text-gray-600 mb-4">
              By:{" "}
              <span className="font-semibold text-gray-800">
                {article.author.name || article.author.email}
              </span>
            </p>

            {/* Content Preview */}
            <p className="text-gray-700 text-sm line-clamp-3 mb-6">
              {article.content}
            </p>

            {/* Publish Button */}
            <button
              onClick={() => togglePublish(article.id, article.published)}
              className={`w-full py-3 rounded-xl text-white font-bold text-lg transition-all shadow-md 
              ${
                article.published
                  ? "bg-red-500 hover:bg-red-600 shadow-red-300"
                  : "bg-green-500 hover:bg-green-600 shadow-green-300"
              }`}
            >
              {article.published ? "Unpublish ❌" : "Publish ✅"}
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-600 mt-20 text-lg">
          No articles found…
        </p>
      )}
    </div>
  );
}
