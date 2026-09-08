import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  trend,
  description,
}) => {
  const isUp = trend === "up";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {value}
        </h2>

        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            isUp ? "text-green-600" : "text-red-600"
          }`}
        >
          {isUp ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          {change}
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default StatCard;