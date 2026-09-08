import { recentLeads } from "../../../data/dashboard.data";
import LeadRow from "./LeadRow";

const RecentLeads = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h2 className="font-semibold text-gray-900">
            Recent Leads
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest leads added to your CRM
          </p>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-500">
                Lead
              </th>

              <th className="px-5 py-3 font-medium text-gray-500">
                Company
              </th>

              <th className="px-5 py-3 font-medium text-gray-500">
                Status
              </th>

              <th className="px-5 py-3 font-medium text-gray-500">
                Value
              </th>
            </tr>
          </thead>

          <tbody>
            {recentLeads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;