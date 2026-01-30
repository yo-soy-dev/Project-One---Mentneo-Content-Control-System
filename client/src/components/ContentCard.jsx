import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import axios from "../services/api";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";


export default function ContentCard({ content, user, onApprove, onPublish, refresh }) {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);


  const handleDelete = async () => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");

      const res = await axios.delete(`/content/${content._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200 || res.data?.success) {
        toast.success("Deleted successfully");
        if (typeof refresh === "function") refresh();
        setShowDelete(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };


  const statusColors = {
    draft: "border-l-4 border-amber-400",
    approved: "border-l-4 border-sky-500",
    published: "border-l-4 border-emerald-500",
  };

  return (
    <div className={`relative bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col ${statusColors[content.status]}`}>

      <div className="absolute top-4 right-4">
        <StatusBadge status={content.status} />
      </div>

      <h2 className="text-lg font-bold text-gray-900 hover:text-sky-600 transition">
        {content.title}
      </h2>

      <p className="text-sm font-medium text-sky-600 mt-1 capitalize">
        {content.type}
      </p>

      <p className="text-sm text-gray-600 mt-3 line-clamp-3">
        {content.body}
      </p>

      <div className="mt-auto pt-4 text-xs text-gray-400">
        Author: {content.author?.name || "Unknown"}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">

        {content.status === "draft" && (
          <button
            onClick={() => navigate(`/create?id=${content._id}`)}
            className="px-3 py-1 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Edit
          </button>
        )}

        {(user.role === "admin" || (content.status === "draft" && user._id === content.author?._id)) && (
          <button
            onClick={() => setShowDelete(true)}
            className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>

        )}

        {user.role === "admin" && content.status === "draft" && (
          <button
            onClick={() => onApprove(content._id)}
            className="px-3 py-1 text-sm rounded-lg bg-amber-500 text-white"
          >
            Approve
          </button>
        )}

        {user.role === "admin" && content.status === "approved" && (
          <button
            onClick={() => onPublish(content._id)}
            className="px-3 py-1 text-sm rounded-lg bg-emerald-600 text-white"
          >
            Publish
          </button>
        )}
      </div>
      <ConfirmModal
        open={showDelete}
        title="Delete content?"
        message="This action cannot be undone."
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />

    </div>
  );
}
