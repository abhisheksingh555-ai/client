import { leadFunnelData } from "../../../data/dashboard.data";

const LeadFunnel = () => {
  const maxCount = Math.max(
    ...leadFunnelData.map((item) => item.count)
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="font-semibold text-gray-900">
          Lead Funnel
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Lead conversion stages
        </p>
      </div>

      <div className="space-y-5">
        {leadFunnelData.map((item) => {
          const width =
            (item.count / maxCount) * 100;

          return (
            <div key={item.id}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {item.stage}
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {item.count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${width}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadFunnel;