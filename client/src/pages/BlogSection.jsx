import { useEffect, useState } from "react";
import axios from "../services/api";

export default function BlogSection() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("/public/content?type=blog")
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Blog Posts
        </h1>

        <div className="grid gap-6">
          {content.map(c => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow-sm border border-sky-200 p-6 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{c.title}</h2>
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
