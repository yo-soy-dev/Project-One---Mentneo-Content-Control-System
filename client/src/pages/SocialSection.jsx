import { useEffect, useState } from "react";
import axios from "../services/api";

export default function SocialSection() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("/public/content?type=social")
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Social Updates
        </h1>

        <div className="space-y-4">
          {content.map(c => (
            <div
              key={c._id}
              className="bg-white border-l-4 border-sky-500 rounded-lg p-5 shadow-sm"
            >
              <h2 className="font-semibold text-gray-900 mb-1">
                {c.title}
              </h2>
              <p className="text-gray-600">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
