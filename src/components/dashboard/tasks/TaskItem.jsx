import {
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

const TaskItem = ({ task }) => {
  const getIcon = () => {
    if (task.type === "Call") {
      return <Phone size={17} />;
    }

    if (task.type === "Email") {
      return <Mail size={17} />;
    }

    return <Calendar size={17} />;
  };

  const priorityClass = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Low: "bg-green-50 text-green-600",
  };

  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-4 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {getIcon()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-800">
          {task.title}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {task.time}
          </span>

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              priorityClass[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;