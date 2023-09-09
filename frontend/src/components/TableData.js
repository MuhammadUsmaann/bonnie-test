import React from "react";
function TableData(props) {
  const { result } = props;
  return (
    <>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Country
              </th>
              <th scope="col" class="px-6 py-3">
                type
              </th>
              <th scope="col" class="px-6 py-3">
                Production
              </th>
              <th scope="col" class="px-6 py-3">
                Sales
              </th>
              <th scope="col" class="px-6 py-3">
                Export
              </th>
            </tr>
          </thead>
          <tbody>
            {(result || []).map((val, ind) => {
              return (
                <>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {val.country}
                    </th>
                    <td class="px-6 py-4">{val.type}</td>
                    <td class="px-6 py-4">{val.producation}</td>
                    <td class="px-6 py-4">{val.sales}</td>
                    <td class="px-6 py-4">{val.export}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableData;
