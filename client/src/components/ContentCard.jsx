import StatusBadge from "./StatusBadge";

export default function ContentCard({ content, user, onApprove, onPublish }) {

const statusColors = { draft: "border-l-4 border-amber-400", approved: "border-l-4 border-sky-500", published: "border-l-4 border-emerald-500", };


  return (
  <div className={`relative bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col ${statusColors[content.status]}`}>
      {/* STATUS */}
      <div className="absolute top-4 right-4">
        <StatusBadge status={content.status} />
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-bold text-gray-900 
                     hover:text-sky-600 transition">
        {content.title}
      </h2>

      {/* TYPE */}
      <p className="text-sm font-medium text-sky-600 mt-1 capitalize">
        {content.type}
      </p>

      {/* BODY */}
      <p className="text-sm text-gray-600 mt-3 line-clamp-3">
        {content.body}
      </p>

      {/* FOOTER */}
      <div className="mt-auto pt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Author: {content.author?.name || "Unknown"}
        </span>
      </div>

      {/* ACTIONS */}
      {user.role === "admin" && (
        <div className="mt-4 flex gap-2">
          {content.status === "draft" && (
            <button
              onClick={() => onApprove(content._id)}
              className="px-4 py-1.5 text-sm rounded-lg 
                         bg-amber-500 text-white 
                         hover:bg-amber-600 transition"
            >
              Approve
            </button>
          )}

          {content.status === "approved" && (
            <button
              onClick={() => onPublish(content._id)}
              className="px-4 py-1.5 text-sm rounded-lg 
                         bg-emerald-600 text-white 
                         hover:bg-emerald-700 transition"
            >
              Publish
            </button>
          )} 
  </div>
)}

    </div>
  );
}

