import { createRef, useRef, useState, useEffect } from "react";

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
  hasActions,
  onUpdatedRow,
}) {
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [editData, setEditData] = useState({});
  const [selectedRow, setSelectedRow] = useState({});
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const refs = useRef(Object.keys(columns).map(() => createRef()));

  useEffect(() => {
    const totalTemp = data.reduce((sum, expense) => sum + +expense.price, 0);
    setTotal(totalTemp);
  }, [data]);

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
    toggleShowModal();
    setSelectedRow({});
  };

  const handleEditClick = (id) => {
    const rowData = data.find((row) => row.id === id);
    setEditData(rowData);
    setSelectedRow({});
  };

  const handleSaveClick = async (id) => {
    const newRefValues = refs.current.map((ref) => ref.current.value);
    const keyColumns = Object.keys(columns);
    const updatedData = {};
    let hasChanges = false;

    newRefValues.map((value, index) => {
      if (value !== editData[keyColumns[index]]) {
        updatedData[keyColumns[index]] = value;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      updatedData.id = id;
      onUpdatedRow(updatedData);
    }
    setEditData({});
    setSelectedRow({});
  };

  const handleSelectedRow = (id) => {
    const rowData = data.find((row) => row.id === id);
    setSelectedRow(rowData);
  };

  const handleCancelAction = (event) => {
    event.preventDefault();
    setSelectedRow({});
    setEditData({});
  };

  const toggleShowModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleShowModal = () => {
    toggleShowModal();
  };

  const handleCancelModal = () => {
    toggleShowModal();
    setSelectedRow({});
  };

  return (
    <>
      <div
        className={`fixed ${
          !showModal ? "hidden" : undefined
        } inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center`}
      >
        <div
          aria-hidden="true"
          className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
        ></div>
        <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
          <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
            <button
              onClick={handleShowModal}
              type="button"
              className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
            >
              <svg
                title="Close"
                className="h-4 w-4 cursor-pointer text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>

            <div className="space-y-2 p-2">
              <div className="p-4 space-y-2 text-center dark:text-white">
                <h2
                  className="text-xl font-bold tracking-tight"
                  id="page-action.heading"
                >
                  Delete {selectedRow.name}
                </h2>

                <p className="text-gray-500">
                  Are you sure you would like to do this?
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div
                aria-hidden="true"
                className="border-t dark:border-gray-700 px-2"
              ></div>

              <div className="px-6 py-2">
                <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                  <button
                    onClick={handleCancelModal}
                    type="button"
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
                  >
                    <span className="flex items-center gap-1">
                      <span className="">Cancel</span>
                    </span>
                  </button>

                  <button
                    onClick={(event) =>
                      handleDeleteItems(selectedRow.id, event)
                    }
                    type="submit"
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700"
                  >
                    <span className="flex items-center gap-1">
                      <span className="">Confirm</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

            {Object.keys(columns).map((key) => (
              <th
                key={columns[key].label}
                scope="col"
                className="px-6 py-3 text-base text-slate-300"
              >
                {columns[key].label}
              </th>
            ))}
            {hasActions && (
              <th
                key="Actions"
                scope="col"
                className="px-6 py-3 text-base text-slate-300"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        {!loading ? (
          <tbody className="text-secondaryGray-900 font-extrabold">
            {data.map((item) => (
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
                {Object.keys(columns).map(
                  (key, index) =>
                    key !== "id" && (
                      <td
                        key={`${item.id}-${key}`}
                        scope="row"
                        className="px-6 py-4"
                      >
                        {editData.id !== item.id ||
                        Object.keys(editData).length === 0 ? (
                          columns[key].dataType === "currency" ? (
                            formatter.format(item[key])
                          ) : (
                            item[key]
                          )
                        ) : (
                          <input
                            key={`${item.id}-${key}`}
                            ref={refs.current[index]}
                            type="text"
                            id="table-search"
                            className="w-28 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none focus:border-color-brand-500 focus:outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            defaultValue={item[key]}
                          />
                        )}
                      </td>
                    )
                )}
                {hasActions && (
                  <td key={`${item.id}-actions`} className="px-6 py-4">
                    <div className="inline-block text-left">
                      <button
                        onClick={() => handleSelectedRow(item.id)}
                        type="button"
                        className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        <span className="sr-only"></span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      {selectedRow.id === item.id &&
                        Object.keys(selectedRow).length !== 0 && (
                          <div
                            id="dropdownNavbar"
                            className="z-10 font-normal absolute origin-top-right right-40 mt-3 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-400"
                              aria-labelledby="dropdownLargeButton"
                            >
                              {Object.keys(editData).length === 0 ? (
                                <>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={() => handleEditClick(item.id)}
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={handleShowModal}
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Delete
                                    </a>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={() => handleSaveClick(item.id)}
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Save
                                    </a>
                                  </li>
                                </>
                              )}
                            </ul>
                            <div className="py-1">
                              <a
                                href="#"
                                onClick={handleCancelAction}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        )}
                    </div>
                  </td>
                )}
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
              <td className="px-6 py-3">{formatter.format(total)}</td>
              <td className="px-6 py-3"></td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  );
}
