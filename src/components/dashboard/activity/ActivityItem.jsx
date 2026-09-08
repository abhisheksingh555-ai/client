import { User } from "lucide-react";

const ActivityItem = ({ activity }) => {
  return (
    <div className="flex items-start gap-3 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
        <User size={17} />
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">
            {activity.user}
          </span>{" "}
          {activity.action}{" "}
          <span className="font-medium text-blue-600">
            {activity.target}
          </span>
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {activity.time}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;