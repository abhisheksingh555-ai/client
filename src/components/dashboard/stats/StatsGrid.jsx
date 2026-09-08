import StatCard from "./StatCard";
import { dashboardStats } from "../../../data/dashboard.data";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default StatsGrid;