import { upcomingTasks } from "../../../data/dashboard.data";
import TaskItem from "./TaskItem";

const UpcomingTasks = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">
            Upcoming Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your tasks for today
          </p>
        </div>

        <button className="text-sm font-medium text-blue-600">
          View All
        </button>
      </div>

      <div className="mt-3">
        {upcomingTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;