const colors = {
  draft: "bg-gray-200",
  approved: "bg-yellow-200",
  published: "bg-green-200",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 text-xs rounded ${colors[status]}`}>
      {status}
    </span>
  );
}
