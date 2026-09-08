const Dashboard = () => {
  const stats = [
    {
      title: "Total Leads",
      value: "1,248",
      change: "+12.5%",
      description: "from last month",
    },
    {
      title: "Customers",
      value: "684",
      change: "+8.2%",
      description: "from last month",
    },
    {
      title: "Active Deals",
      value: "156",
      change: "+15.4%",
      description: "from last month",
    },
    {
      title: "Revenue",
      value: "₹12.8L",
      change: "+10.8%",
      description: "from last month",
    },
  ];

  const recentLeads = [
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      status: "New",
      value: "₹25,000",
    },
    {
      name: "Priya Singh",
      email: "priya@example.com",
      status: "Contacted",
      value: "₹42,000",
    },
    {
      name: "Amit Kumar",
      email: "amit@example.com",
      status: "Qualified",
      value: "₹65,000",
    },
    {
      name: "Neha Verma",
      email: "neha@example.com",
      status: "New",
      value: "₹31,000",
    },
    {
      name: "Arjun Mehta",
      email: "arjun@example.com",
      status: "Negotiation",
      value: "₹85,000",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";

      case "Contacted":
        return "bg-yellow-100 text-yellow-700";

      case "Qualified":
        return "bg-green-100 text-green-700";

      case "Negotiation":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        <button
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white
                     transition hover:bg-blue-700"
        >
          + Add Lead
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>

            <div className="mt-3 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>

              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Revenue Overview */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Revenue Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monthly revenue performance
              </p>
            </div>

            <select
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                         text-gray-700 outline-none focus:border-blue-500"
            >
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>Last 12 months</option>
            </select>
          </div>

          {/* Simple Chart Placeholder */}
          <div className="mt-8 flex h-64 items-end gap-3 border-b border-gray-200 px-2">
            {[45, 65, 50, 80, 60, 90, 75].map((height, index) => (
              <div
                key={index}
                className="group flex flex-1 flex-col items-center justify-end"
              >
                <div
                  style={{ height: `${height}%` }}
                  className="w-full max-w-12 rounded-t-md bg-blue-500
                             transition hover:bg-blue-600"
                />

                <span className="mt-2 text-xs text-gray-400">
                  {["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Summary */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Lead Summary
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current lead pipeline
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600">New</span>
                <span className="font-medium">320</span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div className="h-2 w-[70%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600">Contacted</span>
                <span className="font-medium">245</span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div className="h-2 w-[55%] rounded-full bg-yellow-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600">Qualified</span>
                <span className="font-medium">180</span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div className="h-2 w-[42%] rounded-full bg-green-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600">Negotiation</span>
                <span className="font-medium">95</span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div className="h-2 w-[30%] rounded-full bg-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
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

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Deal Value</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {recentLeads.map((lead) => (
                <tr
                  key={lead.email}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {lead.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {lead.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {lead.value}
                  </td>

                  <td className="px-6 py-4">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {recentLeads.map((lead) => (
            <div key={lead.email} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {lead.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {lead.email}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {lead.value}
                </span>

                <button className="text-sm font-medium text-blue-600">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;