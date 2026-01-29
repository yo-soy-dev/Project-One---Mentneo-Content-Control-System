import { useEffect, useState } from "react";
import axios from "../services/api";

export default function ContentSection({ title, type }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/public/content?type=${type}`)
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, [type]);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {title}
        </h1>

        {loading && (
          <p className="text-gray-500">Loading...</p>
        )}

        {!loading && content.length === 0 && (
          <p className="text-gray-500 text-center">
            No content available
          </p>
        )}

        <div className="grid gap-6">
          {content.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-sky-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-sky-700 mb-2">
                {item.title}
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
