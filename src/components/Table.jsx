import { useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2, // Esto asegura que siempre se muestren dos dígitos decimales
});

export default function Table({
  data,
  columns,
  onDelete,
  hasTotal,
  hasSelectRow,
}) {
  const [itemsToDelete, setItemsToDelete] = useState([]);

  // temporal loading variable
  let loading = false;

  const handleDeleteItems = (id, event) => {
    let updatedSelectedIds = [];

    if (event["_reactName"] === "onChange") {
      updatedSelectedIds = event.target.checked
        ? [...itemsToDelete, id]
        : itemsToDelete.filter((selectedId) => selectedId !== id);
      setItemsToDelete(updatedSelectedIds);
    } else if (event["_reactName"] === "onClick") {
      updatedSelectedIds.push(id);
    }

    onDelete(updatedSelectedIds);
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-800 uppercase bg-white">
        <tr>
          {hasSelectRow && (
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 accent-color-brand-500 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
          )}

          {columns.map((col, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-base text-slate-300"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      {!loading ? (
        <tbody className="text-secondaryGray-900 font-extrabold">
          {data.map((item, index) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              {hasSelectRow && (
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      onChange={(event) => handleDeleteItems(item.id, event)}
                      id="checkbox-table-search-2"
                      type="checkbox"
                      className="w-4 h-4 accent-color-brand-500 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="checkbox-table-search-2"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
              )}
              {Object.keys(item).map(
                (key) =>
                  key !== "id" && (
                    <td
                      key={`${item.id}-${key}`}
                      scope="row"
                      className="px-6 py-4"
                    >
                      {!item.edit ? (
                        item[key]
                      ) : (
                        <input
                          key={`${item.id}-${key}`}
                          ref={name}
                          type="text"
                          id="table-search"
                          className="w-28 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none focus:border-color-brand-500 focus:outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          defaultValue={item[key]}
                        />
                      )}
                    </td>
                  )
              )}
              <td key={`${item.id}-actions`} className="px-6 py-4">
                {!item.edit ? (
                  <>
                    <button
                      onClick={() => handleEditButton(index)}
                      type="button"
                      className="text-white focus:outline-none font-medium rounded-full text-sm p-2 text-center inline-flex items-center me-2"
                    >
                      <svg
                        className="h-5 w-5 text-color-brand-600 hover:text-color-brand-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#000000"}
                        fill={"none"}
                      >
                        <path
                          d="M3.89089 20.8727L3 21L3.12727 20.1091C3.32086 18.754 3.41765 18.0764 3.71832 17.4751C4.01899 16.8738 4.50296 16.3898 5.47091 15.4218L16.9827 3.91009C17.4062 3.48654 17.618 3.27476 17.8464 3.16155C18.2811 2.94615 18.7914 2.94615 19.2261 3.16155C19.4546 3.27476 19.6663 3.48654 20.0899 3.91009C20.5135 4.33365 20.7252 4.54543 20.8385 4.77389C21.0539 5.20856 21.0539 5.71889 20.8385 6.15356C20.7252 6.38201 20.5135 6.59379 20.0899 7.01735L8.57816 18.5291C7.61022 19.497 7.12625 19.981 6.52491 20.2817C5.92357 20.5823 5.246 20.6791 3.89089 20.8727Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 15L9 18M8.5 12.5L11.5 15.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                    <button
                      onClick={(event) => handleDeleteItems(item.id, event)}
                      type="button"
                      className="text-white focus:outline-none font-medium rounded-full text-sm p-2 text-center inline-flex items-center me-2"
                    >
                      <svg
                        className="h-5 w-5 text-black hover:text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#000000"}
                        fill={"none"}
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9.5 16.5L9.5 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14.5 16.5L14.5 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                  </>
                ) : (
                  <div className="flex">
                    <button
                      onClick={() => handleSaveEditButton(index)}
                      type="button"
                      className="text-white focus:outline-none font-medium rounded-full text-sm p-2 text-center inline-flex items-center me-2"
                    >
                      <svg
                        className="h-4 w-4 text-black"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                    <button
                      onClick={() => handleCancelEditButton(item, index)}
                      type="button"
                      className="text-white focus:outline-none font-medium rounded-full text-sm p-2 text-center inline-flex items-center me-2"
                    >
                      <svg
                        className="h-4 w-4 text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />{" "}
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <div className="grid place-items-center" role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {hasTotal && (
        <tfoot className="bg-white text-secondaryGray-900 font-bold text-lg">
          <tr>
            <th scope="row" className="px-6 py-3 text-base"></th>
            <th scope="row" className="px-6 py-3 uppercase">
              Total
            </th>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3">{formatter.format(222222)}</td>
            <td className="px-6 py-3"></td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
