
export default function ContentFilters({ onChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 
                    bg-white p-5 rounded-2xl border shadow-sm">

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Status
        </label>
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 
                     text-sm bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-sky-400"
          onChange={e => onChange("status", e.target.value)}
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="approved">Approved</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Content Type
        </label>
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 
                     text-sm bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-sky-400"
          onChange={e => onChange("type", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="blog">Blog</option>
          <option value="website">Website</option>
          <option value="social">Social</option>
          <option value="announcement">Announcement</option>
        </select>
      </div>

    </div>
  );
}
