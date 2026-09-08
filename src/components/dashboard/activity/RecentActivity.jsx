import { recentActivities } from "../../../data/dashboard.data";
import ActivityItem from "./ActivityItem";

const RecentActivity = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="font-semibold text-gray-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest activity from your team
          </p>
        </div>

        <button className="text-sm font-medium text-blue-600">
          View All
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {recentActivities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;