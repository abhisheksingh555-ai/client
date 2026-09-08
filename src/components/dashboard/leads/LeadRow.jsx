const LeadRow = ({ lead }) => {
  return (
    <tr className="border-t border-gray-100">
      <td className="px-5 py-4">
        <div>
          <p className="font-medium text-gray-900">
            {lead.name}
          </p>

          <p className="mt-0.5 text-xs text-gray-400">
            {lead.email}
          </p>
        </div>
      </td>

      <td className="px-5 py-4 text-gray-600">
        {lead.company}
      </td>

      <td className="px-5 py-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {lead.status}
        </span>
      </td>

      <td className="px-5 py-4 font-medium text-gray-900">
        {lead.value}
      </td>
    </tr>
  );
};

export default LeadRow;