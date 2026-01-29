import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";
import ContentCard from "../components/ContentCard";
import ContentFilters from "../components/ContentFilters";

export default function Dashboard() {
  const [contents, setContents] = useState([]);
  const [filters, setFilters] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Fetch contents
  const fetchContents = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const params = new URLSearchParams(filters).toString();

    try {
      const res = await axios.get(`/content?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContents(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  }, [filters]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login again</p>;

  const approve = async id => {
    const token = localStorage.getItem("token");
    await axios.put(`/content/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContents();
  };

  const publish = async id => {
    const token = localStorage.getItem("token");
    await axios.put(`/content/${id}/publish`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContents();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

//   return (
//   <div className="max-w-7xl mx-auto px-6 py-8">

//     {/* TOP NAV */}
//     <div className="hidden md:flex items-center gap-6 mb-10">
//       <div className="relative">
//         <button
//           onClick={() => setDropdownOpen(prev => !prev)}
//           className="font-medium hover:text-sky-500 transition"
//         >
//           Sections ▾
//         </button>

//         {dropdownOpen && (
//           <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-lg border z-50">
//             {["website", "blog", "social", "announcement"].map(section => (
//               <Link
//                 key={section}
//                 to={`/${section}`}
//                 className="block px-4 py-2 text-sm hover:bg-sky-50 capitalize"
//                 onClick={() => setDropdownOpen(false)}
//               >
//                 {section}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>

//     {/* HEADER */}
//     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//       <div>
//         <h1 className="text-3xl font-extrabold tracking-tight">
//           Content Dashboard
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Manage and publish content across platforms
//         </p>
//       </div>

//       <Link
//         to="/create"
//         className="inline-flex items-center gap-2 px-5 py-2.5 
//                    rounded-xl bg-sky-600 text-white font-medium 
//                    shadow hover:bg-sky-700 transition"
//       >
//         + Add Content
//       </Link>
//     </div>

//     {/* FILTERS */}
//     <div className="bg-green-500 rounded-2xl border shadow-sm p-5 mb-8 ">
//       <ContentFilters className="bg-yellow-500" onChange={handleFilterChange} />
//     </div>

  

//     {/* CONTENT GRID */}
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {contents.map(content => (
//         <ContentCard
//           key={content._id}
//           content={content}
//           user={user}
//           onApprove={approve}
//           onPublish={publish}
//         />
//       ))}
//     </div>
//   </div>
// );
// }

return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-700">
          Dashboard
        </h2>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            Sections ▾
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border z-50">
              {["website", "blog", "social", "announcement"].map(section => (
                <Link
                  key={section}
                  to={`/${section}`}
                  className="block px-4 py-2 text-sm hover:bg-sky-50 capitalize"
                  onClick={() => setDropdownOpen(false)}
                >
                  {section}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Content Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage drafts, approvals and publishing across platforms
          </p>
        </div>

        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 text-white font-medium shadow hover:bg-sky-700 transition"
        >
          + Add Content
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total" value={contents.length} />
        <StatCard title="Drafts" value={contents.filter(c => c.status === "draft").length} />
        <StatCard title="Approved" value={contents.filter(c => c.status === "approved").length} />
        <StatCard title="Published" value={contents.filter(c => c.status === "published").length} />
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Filters
        </h3>
        <ContentFilters onChange={handleFilterChange} />
      </div>

      {/* CONTENT GRID */}
      {contents.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No content found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map(content => (
            <ContentCard
              key={content._id}
              content={content}
              user={user}
              onApprove={approve}
              onPublish={publish}
            />
          ))}
        </div>
      )}

    </div>
  </div>
);
}



function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
