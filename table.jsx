<div className="overflow-x-auto">
  <table className="w-full text-left text-sm">
    <thead className="text-gray-600 uppercase text-xs tracking-wider">
      <tr>
        <th className="px-3 py-2">Name</th>
        <th className="px-3 py-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-400">
      {Array.from({ length: 10 }).map((item, index) => (
        <tr>
          <td className="px-3 py-2">Name</td>
          <td className="px-3 py-2 flex gap-2 ">
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>;
