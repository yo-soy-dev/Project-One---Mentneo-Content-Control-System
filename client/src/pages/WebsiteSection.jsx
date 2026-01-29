import { useEffect, useState } from "react";
import axios from "../services/api";

export default function WebsiteSection() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("/public/content?type=website")
      .then(res => setContent(res.data))
      .catch(err => console.error("API ERROR:", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Website Content
        </h1>

        <div className="grid gap-6">
          {content.map(c => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {c.title}
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
