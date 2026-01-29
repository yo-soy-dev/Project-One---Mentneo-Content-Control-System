import { useState, useEffect } from "react";
import axios from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

export default function CreateContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // 👈 edit mode if exists

  const [form, setForm] = useState({
    title: "",
    body: "",
    type: "blog",
    tags: ""
  });

  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("write"); // write | preview

  // 🔹 FETCH CONTENT FOR EDIT
  useEffect(() => {
    if (!id) return;

    const fetchContent = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`/content/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = res.data;

        setForm({
          title: data.title || "",
          body: data.body || "",
          type: data.type || "blog",
          tags: data.tags?.join(", ") || ""
        });
      } catch (err) {
        toast.error("Failed to load content");
      }
    };

    fetchContent();
  }, [id]);

  // 🔹 CREATE / UPDATE
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

      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map(t => t.trim())
          .filter(Boolean)
      };

      if (id) {
        await axios.put(`/content/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Content updated successfully!");
      } else {
        await axios.post("/content", payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Draft saved successfully!");
      }

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {id ? "Edit Content" : "Create Content"}
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
            className={`px-4 py-1.5 rounded-lg text-sm ${
              tab === "write" ? "bg-sky-500 text-white" : "bg-gray-100"
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setTab("preview")}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              tab === "preview" ? "bg-sky-500 text-white" : "bg-gray-100"
            }`}
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
            <ReactMarkdown>
              {form.body || "_Nothing to preview_"}
            </ReactMarkdown>
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
          className={`w-full py-2.5 rounded-xl font-medium transition ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-sky-500 text-white hover:bg-sky-700"
          }`}
        >
          {loading
            ? "Saving..."
            : id
            ? "Update Content"
            : "Save Draft"}
        </button>
      </div>
    </div>
  );
}
