"use client";

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

  // Fetch all articles from the admin API
  useEffect(() => {
    fetch("/api/admin/articles")
      .then(res => res.json())
      .then(setArticles)
      .catch(err => console.error(err));
  }, []);

  // Toggle published status
  const togglePublish = async (id: string, published: boolean) => {
    try {
      const res = await fetch("/api/admin/articles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: !published }),
      });

      const updatedArticle = await res.json();

      // Update UI after toggling
      setArticles(prev =>
        prev.map(a => (a.id === id ? { ...a, published: updatedArticle.published } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Articles</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Author</th>
            <th className="px-4 py-2 text-left">Published</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id} className="border-b">
              <td className="px-4 py-2">{article.title}</td>
              <td className="px-4 py-2">{article.author.name || article.author.email}</td>
              <td className="px-4 py-2">{article.published ? "Yes" : "No"}</td>
              <td className="px-4 py-2">
                <button
                  className={`px-2 py-1 rounded text-white ${
                    article.published ? "bg-red-500" : "bg-green-500"
                  }`}
                  onClick={() => togglePublish(article.id, article.published)}
                >
                  {article.published ? "Unpublish" : "Publish"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
