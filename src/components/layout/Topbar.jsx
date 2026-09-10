import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ChevronDown,
  Menu,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Topbar = ({ onMobileMenu }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";
  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .toUpperCase() || "U";

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Mobile Menu */}
      <button
        onClick={onMobileMenu}
        className="mr-3 rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
      >
        <Menu size={21} />
      </button>

      <div className="ml-auto flex items-center gap-2">
        {/* Profile */}
        <div className="relative ml-2">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
              {initials}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {fullName}
              </p>

              <p className="text-xs text-gray-500">
                {user?.role || "User"}
              </p>
            </div>

            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <Link to="/me" onClick={() => setProfileOpen(false)} className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">
                My Profile
              </Link>

              <hr className="my-2" />

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;