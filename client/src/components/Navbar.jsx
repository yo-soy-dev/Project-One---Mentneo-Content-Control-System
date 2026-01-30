import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { X, Menu, Bell, Settings, HelpCircle, LogOut } from "lucide-react";

export default function Navbar({ user, pending = 3 }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide hover:text-sky-200 transition"
          >
            Mentneo CMS
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/notifications"
              className="relative flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-sky-400/20 transition"
            >
              <Bell size={20} />
              <span>Notifications</span>
              {pending > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 text-xs flex items-center justify-center bg-red-500 rounded-full font-bold shadow-md animate-pulse">
                  {pending}
                </span>
              )}
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-sky-400/20 transition"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>

            <Link
              to="/help"
              className="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-sky-400/20 transition"
            >
              <HelpCircle size={20} />
              <span>Help</span>
            </Link>

            <div className="flex items-center gap-3 px-4 py-1 rounded-2xl bg-white/20 backdrop-blur-sm shadow-inner">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                {user?.name[0] || "G"}
              </div>
              <div className="flex flex-col text-sm leading-tight">
                <span className="font-semibold">{user ? user.name : "Guest"}</span>
                <span className="text-gray-200 text-xs">{user ? user.role : ""}</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-1 rounded-full bg-red-600 hover:bg-red-700 shadow-md transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded hover:bg-sky-600 transition"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden bg-sky-600 overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
      >
        <div className="px-6 space-y-3">
          <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-sky-500/30 transition" to="/notifications">
            <Bell size={20} /> Notifications
            {pending > 0 && (
              <span className="ml-2 w-5 h-5 text-xs flex items-center justify-center bg-red-500 rounded-full font-bold animate-pulse">
                {pending}
              </span>
            )}
          </Link>
          <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-sky-500/30 transition" to="/settings">
            <Settings size={20} /> Settings
          </Link>
          <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-sky-500/30 transition" to="/help">
            <HelpCircle size={20} /> Help
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/20 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
              {user?.name[0] || "G"}
            </div>
            <div className="flex flex-col text-sm leading-tight text-white">
              <span className="font-semibold">{user ? user.name : "Guest"}</span>
              <span className="text-gray-200 text-xs">{user ? user.role : ""}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 w-full justify-center transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
