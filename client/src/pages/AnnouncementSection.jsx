import { useEffect, useState } from "react";
import axios from "../services/api";

export default function AnnouncementSection() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("/public/content?type=announcement")
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Announcements
        </h1>

        <div className="space-y-4">
          {content.map(c => (
            <div
              key={c._id}
              className="bg-white rounded-lg border p-5 shadow-sm flex items-start gap-3"
            >
              <span className="text-sky-500 font-bold text-lg">📢</span>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {c.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
