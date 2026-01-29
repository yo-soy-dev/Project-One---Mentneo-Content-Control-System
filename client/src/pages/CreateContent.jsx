// import { useState } from "react";
// import axios from "../services/api";

// export default function CreateContent() {
//   const [form, setForm] = useState({
//     title: "",
//     body: "",
//     type: "blog",
//     tags: ""
//   });

//   const submit = async () => {
//     const token = localStorage.getItem("token"); // ✅ get the JWT
//     if (!token) {
//       alert("You must login first!");
//       return;
//     }

//     try {
//       await axios.post(
//         "/content",
//         {
//           ...form,
//           tags: form.tags
//             .split(",")
//             .map(tag => tag.trim())
//             .filter(Boolean),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ include token
//           },
//         }
//       );

//       alert("Draft saved!");
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Failed to save draft");
//     }
//   };

//   return (
//     <div className="p-6">
//       <select
//         className="border p-2 w-full mb-2"
//         value={form.type}
//         onChange={e => setForm({ ...form, type: e.target.value })}
//       >
//         <option value="blog">Blog</option>
//         <option value="website">Website</option>
//         <option value="social">Social</option>
//         <option value="announcement">Announcement</option>
//       </select>

//       <input
//         className="border p-2 w-full mb-2"
//         placeholder="Title"
//         value={form.title}
//         onChange={e => setForm({ ...form, title: e.target.value })}
//       />

//       <textarea
//         className="border p-2 w-full mb-2"
//         placeholder="Content"
//         value={form.body}
//         onChange={e => setForm({ ...form, body: e.target.value })}
//       />

//       <input
//         className="border p-2 w-full mb-2"
//         placeholder="Tags (comma separated)"
//         value={form.tags}
//         onChange={e => setForm({ ...form, tags: e.target.value })}
//       />

//       <button
//         onClick={submit}
//         className="bg-black text-white px-4 py-2"
//       >
//         Save Draft
//       </button>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

export default function CreateContent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    body: "",
    type: "blog",
    tags: ""
  });

  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("write"); // write | preview

  const submit = async () => {
    if (!form.title || !form.body) {
      toast.error("Title and content are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "/content",
        {
          ...form,
          tags: form.tags
            .split(",")
            .map(t => t.trim())
            .filter(Boolean),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Draft saved successfully!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Create Content
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Write in markdown, preview live, then save draft
        </p>

        {/* TYPE */}
        <select
          className="w-full border rounded-lg px-3 py-2 mb-4"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="blog">Blog</option>
          <option value="website">Website</option>
          <option value="social">Social</option>
          <option value="announcement">Announcement</option>
        </select>

        {/* TITLE */}
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        {/* TABS */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setTab("write")}
            className={`px-4 py-1.5 rounded-lg text-sm
              ${tab === "write" ? "bg-sky-600 text-white" : "bg-gray-100"}
            `}
          >
            Write
          </button>
          <button
            onClick={() => setTab("preview")}
            className={`px-4 py-1.5 rounded-lg text-sm
              ${tab === "preview" ? "bg-sky-600 text-white" : "bg-gray-100"}
            `}
          >
            Preview
          </button>
        </div>

        {/* EDITOR */}
        {tab === "write" ? (
          <textarea
            rows="10"
            className="w-full border rounded-lg px-3 py-2 mb-4 font-mono"
            placeholder="Write markdown here..."
            value={form.body}
            onChange={e => setForm({ ...form, body: e.target.value })}
          />
        ) : (
          <div className="border rounded-lg p-4 mb-4 prose max-w-none">
            <ReactMarkdown>{form.body || "_Nothing to preview_"}</ReactMarkdown>
          </div>
        )}

        {/* TAGS */}
        <input
          className="w-full border rounded-lg px-3 py-2 mb-6"
          placeholder="tags: react, node, ui"
          value={form.tags}
          onChange={e => setForm({ ...form, tags: e.target.value })}
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          onClick={submit}
          className={`w-full py-2.5 rounded-xl font-medium transition
            ${loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-sky-600 text-white hover:bg-sky-700"
            }`}
        >
          {loading ? "Saving..." : "Save Draft"}
        </button>
      </div>
    </div>
  );
}
