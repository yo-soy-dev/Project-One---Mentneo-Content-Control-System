import { useEffect } from "react";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message,
  onCancel,
  onConfirm,
  loading = false,
}) {
  useEffect(() => {
    if (!open) return;

    const onEsc = (e) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
