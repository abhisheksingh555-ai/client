import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      path: "/me",
      icon: UserCircle,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <LayoutDashboard size={20} />
            </div>

            <span className="text-lg font-bold text-gray-900">
              Portfolio
            </span>
          </div>
        )}

        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <LayoutDashboard size={20} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p
          className={`mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Workspace
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : ""}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <Icon size={19} />

                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

      </nav>

      {/* Collapse Button */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}

          {!collapsed && (
            <span className="ml-2 text-sm">
              Collapse sidebar
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;