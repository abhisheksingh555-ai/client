import { useCallback, useEffect, useState } from "react";
import { AlertCircle, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const portfolioApi = axios.create({
  baseURL: import.meta.env.VITE_DASH_API_BASE_URL || "http://localhost:5000/api/v1",
  headers: { "Content-Type": "application/json" },
});

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const formatValue = (value) => (value == null ? "—" : currency.format(value));

const formatDate = (value) => {
  if (!value) return "Market data unavailable";

  return `Updated ${new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))}`;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [generatedAt, setGeneratedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPortfolio = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await portfolioApi.get("/portfolio");
      setPortfolio(response.data.data);
      setGeneratedAt(response.data.meta?.generatedAt);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to load portfolio data. Check that dash-service is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const request = setTimeout(loadPortfolio, 0);

    return () => clearTimeout(request);
  }, [loadPortfolio]);

  const holdings = portfolio?.sectors?.flatMap((sector) => sector.holdings) || [];
  const total = portfolio?.grandTotal || {};
  const gainLossIsPositive = (total.gainLoss || 0) >= 0;
  const displayName = user?.firstName || user?.username || "Investor";

  if (loading && !portfolio) {
    return <DashboardState message="Loading portfolio data..." />;
  }

  if (error && !portfolio) {
    return (
      <DashboardState
        message={error}
        action={loadPortfolio}
        actionLabel="Retry"
      />
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">
            Welcome back, {displayName}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Portfolio dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">{formatDate(generatedAt)}</p>
        </div>

        <button
          type="button"
          onClick={loadPortfolio}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-wait disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh data
        </button>
      </header>

      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Invested capital" value={formatValue(total.investment)} />
        <SummaryCard label="Current value" value={formatValue(total.presentValue)} />
        <SummaryCard
          label="Unrealised gain / loss"
          value={formatValue(total.gainLoss)}
          tone={gainLossIsPositive ? "positive" : "negative"}
          icon={gainLossIsPositive ? <TrendingUp size={17} /> : <TrendingDown size={17} />}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-1">
          <div className="mb-5">
            <h2 className="font-semibold text-gray-900">Sector allocation</h2>
            <p className="mt-1 text-sm text-gray-500">Based on invested capital</p>
          </div>
          <div className="space-y-5">
            {portfolio?.sectors?.map((sector) => {
              const percentage = total.investment
                ? (sector.totals.investment / total.investment) * 100
                : 0;

              return (
                <div key={sector.name}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-gray-700">{sector.name}</span>
                    <span className="text-gray-500">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${percentage}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{formatValue(sector.totals.investment)}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900">Holdings</h2>
            <p className="mt-1 text-sm text-gray-500">{holdings.length} positions in your portfolio</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Holding</th>
                  <th className="px-5 py-3 font-medium">Qty</th>
                  <th className="px-5 py-3 font-medium">CMP</th>
                  <th className="px-5 py-3 font-medium">Present value</th>
                  <th className="px-5 py-3 font-medium">Gain / loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => {
                  const positive = (holding.gainLoss || 0) >= 0;
                  return (
                    <tr key={holding.exchangeCode} className="border-t border-gray-100">
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">{holding.particulars}</p>
                        <p className="mt-0.5 text-xs text-gray-400">{holding.exchangeCode} · {holding.sector}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{number.format(holding.qty)}</td>
                      <td className="px-5 py-4 text-gray-600">{formatValue(holding.cmp)}</td>
                      <td className="px-5 py-4 font-medium text-gray-900">{formatValue(holding.presentValue)}</td>
                      <td className={`px-5 py-4 font-medium ${positive ? "text-emerald-600" : "text-red-600"}`}>
                        {holding.gainLoss == null ? "—" : `${positive ? "+" : ""}${formatValue(holding.gainLoss)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

const SummaryCard = ({ label, value, tone = "neutral", icon }) => {
  const toneClass = {
    neutral: "text-gray-900",
    positive: "text-emerald-600",
    negative: "text-red-600",
  }[tone];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <div className={`mt-3 flex items-center gap-2 text-2xl font-bold ${toneClass}`}>
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
};

const DashboardState = ({ message, action, actionLabel }) => (
  <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
    <AlertCircle className="text-blue-600" size={30} />
    <p className="mt-4 max-w-md text-sm text-gray-600">{message}</p>
    {action && (
      <button
        type="button"
        onClick={action}
        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default Dashboard;