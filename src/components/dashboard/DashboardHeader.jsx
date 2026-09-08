import { CalendarDays } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back, Ahmed. Here's what's happening today.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
        <CalendarDays size={17} />

        <span>September 8, 2026</span>
      </div>
    </div>
  );
};

export default DashboardHeader;