import { useState } from "react";

import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Menu,
} from "lucide-react";

const Topbar = ({ onMobileMenu }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Mobile Menu */}
      <button
        onClick={onMobileMenu}
        className="mr-3 rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
      >
        <Menu size={21} />
      </button>

      {/* Search */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search contacts, leads, deals..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Help */}
        <button className="rounded-lg p-2.5 text-gray-500 hover:bg-gray-100">
          <HelpCircle size={20} />
        </button>

        {/* Notifications */}
        <button className="relative rounded-lg p-2.5 text-gray-500 hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="relative ml-2">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
              AK
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-gray-800">
                Ahmed Khan
              </p>

              <p className="text-xs text-gray-500">
                Admin
              </p>
            </div>

            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <button className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">
                My Profile
              </button>

              <button className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">
                Account Settings
              </button>

              <hr className="my-2" />

              <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;