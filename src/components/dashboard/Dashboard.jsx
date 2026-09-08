import DashboardHeader from "./DashboardHeader";
import QuickActions from "./QuickActions";

import StatsGrid from "./stats/StatsGrid";

import SalesOverview from "./charts/SalesOverview";
import LeadFunnel from "./charts/LeadFunnel";

import RecentLeads from "./leads/RecentLeads";

import UpcomingTasks from "./tasks/UpcomingTasks";

import RecentActivity from "./activity/RecentActivity";

const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Quick Actions */}
      <QuickActions />

      {/* Statistics */}
      <StatsGrid />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SalesOverview />
        </div>

        <LeadFunnel />
      </div>

      {/* Leads + Tasks */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentLeads />

        <UpcomingTasks />
      </div>

      {/* Recent Activity */}
      <RecentActivity />

    </div>
  );
};

export default Dashboard;