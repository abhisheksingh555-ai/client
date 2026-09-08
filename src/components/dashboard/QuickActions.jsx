import {
  Plus,
  UserPlus,
  BriefcaseBusiness,
  CheckSquare,
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      label: "Add Contact",
      icon: UserPlus,
    },
    {
      label: "Add Lead",
      icon: Plus,
    },
    {
      label: "Create Deal",
      icon: BriefcaseBusiness,
    },
    {
      label: "Create Task",
      icon: CheckSquare,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.label}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Icon size={17} />

            {action.label}
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;