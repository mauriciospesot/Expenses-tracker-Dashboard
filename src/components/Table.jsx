import { createRef, useRef, useState } from "react";

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
}) {
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [refValues, setRefValues] = useState([]);

  const refs = useRef(Object.keys(columns).map(() => createRef()));

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

  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (id) => {
    setEditRowId(id);
    const rowData = data.find((row) => row.id === id);
    console.log(rowData);
    setEditData(rowData);
  };

  const handleSaveClick = (id) => {
    const newRefValues = refs.current.map((ref) => ref.current.value);
    const keyColumns = Object.keys(columns);
    newRefValues.map((value, index) => {
      if (value !== editData[keyColumns[index]]) {
        console.log(
          "Se modificó el campo " +
            keyColumns[index] +
            ". " +
            "El valor anterior era " +
            editData[keyColumns[index]] +
            " y el nuevo valor es " +
            value +
            ". El Id del registro es: " +
            id
        );
      }
    });

    //console.log(currentRefValues);
    /*
    refs.current.map((ref, index) => {

      if (ref.current.value !== refValues[index]) {
        console.log(
          "Es diferente. El valor anterior era " +
            refValues[index] +
            " y el nuevo valor es " +
            ref.current.value
        );
      }
    });
    */
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

          {Object.keys(columns).map((key) => (
            <th
              key={columns[key]}
              scope="col"
              className="px-6 py-3 text-base text-slate-300"
            >
              {columns[key]}
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
              {Object.keys(columns).map(
                (key, index) =>
                  key !== "id" && (
                    <td
                      key={`${item.id}-${key}`}
                      scope="row"
                      className="px-6 py-4"
                    >
                      {editData.id !== item.id ? (
                        item[key]
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
                  {!item.edit ? (
                    <>
                      <button
                        onClick={() => handleEditClick(item.id)}
                        type="button"
                        className="text-lg tracking-widest text-black focus:outline-none font-extrabold rounded-full p-2 text-center inline-flex items-center me-2"
                      >
                        ...
                      </button>
                      <button
                        onClick={() => handleSaveClick(item.id)}
                        type="button"
                        className="text-lg tracking-widest text-black focus:outline-none font-extrabold rounded-full p-2 text-center inline-flex items-center me-2"
                      >
                        ***
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
            <td className="px-6 py-3">{formatter.format(222222)}</td>
            <td className="px-6 py-3"></td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
