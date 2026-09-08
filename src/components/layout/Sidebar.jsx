import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Building2,
  UserPlus,
  BriefcaseBusiness,
  CheckSquare,
  Activity,
  BarChart3,
  Settings,
  ShieldCheck,
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
      label: "Contacts",
      path: "/contacts",
      icon: Users,
    },
    {
      label: "Companies",
      path: "/companies",
      icon: Building2,
    },
    {
      label: "Leads",
      path: "/leads",
      icon: UserPlus,
    },
    {
      label: "Deals",
      path: "/deals",
      icon: BriefcaseBusiness,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      label: "Activities",
      path: "/activities",
      icon: Activity,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
  ];

  const systemItems = [
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      label: "Security",
      path: "/security",
      icon: ShieldCheck,
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
              <Users size={20} />
            </div>

            <span className="text-lg font-bold text-gray-900">
              RelationCRM
            </span>
          </div>
        )}

        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Users size={20} />
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
          Main Menu
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

        <p
          className={`mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          System
        </p>

        <div className="space-y-1">
          {systemItems.map((item) => {
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