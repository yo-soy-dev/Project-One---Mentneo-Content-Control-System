// Notifications.jsx
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]); 

  useEffect(() => {
    const dummyNotifications = [
      {
        id: 1,
        title: "Blog post 'React Tips' pending approval",
        type: "Blog",
        status: "Pending",
        details: `Author: Alice Johnson
Created: 2026-01-28
Tags: React, JavaScript, Tips
Summary: A detailed guide on React hooks and best practices for beginners.`,
      },
      {
        id: 2,
        title: "Website update 'Landing Page Hero'",
        type: "Website",
        status: "Pending",
        details: `Author: Mark Smith
Created: 2026-01-27
Page Section: Hero Banner
Change: Updated the main CTA button text and background image.`,
      },
      {
        id: 3,
        title: "Social media post 'LinkedIn Campaign'",
        type: "Social",
        status: "Pending",
        details: `Author: Sarah Lee
Created: 2026-01-26
Platform: LinkedIn
Content: New campaign post targeting tech professionals for product launch.`,
      },
    ];
    setNotifications(dummyNotifications);
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No pending notifications. ✅</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => {
            const isExpanded = expandedIds.includes(notif.id);
            return (
              <li
                key={notif.id}
                className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-gray-500">{notif.type} - {notif.status}</p>
                  </div>
                  <button
                    onClick={() => toggleExpand(notif.id)}
                    className="text-sky-600 font-medium hover:text-sky-800 transition"
                  >
                    {isExpanded ? "Collapse ▲" : "View ▼"}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 text-sm text-gray-700 whitespace-pre-line bg-sky-50 p-3 rounded transition-all duration-300">
                    {notif.details}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
