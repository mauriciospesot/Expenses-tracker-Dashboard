export default function ExpenseFilter({
  filterIsOpen,
  handleFilterOpening,
  options,
  applyFilter,
  onSelectValue,
  placeholder,
  filterName,
}) {
  function handleApplyFilter() {
    applyFilter();
    handleFilterOpening();
  }

  function handleCancelFilter() {
    handleFilterOpening();
  }

  function handleSelectedOption(event) {
    onSelectValue(event, filterName);
  }

  return (
    <div
      id="dropdownSearch"
      className={
        !filterIsOpen
          ? "z-10  transition scale-y-0 -translate-y-40 duration-0 ease-linear absolute mt-10  bg-white rounded-lg shadow w-60 overflow-hidden"
          : "z-10 transition ease-out absolute mt-10  bg-white rounded-lg w-60 shadow-md overflow-hidden"
      }
    >
      <div className="p-3">
        <label htmlFor="input-group-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-search"
            className="block w-full p-2 ps-10 text-sm rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 font-normal text-black outline-none focus:border-color-brand-500 focus:outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
            placeholder={placeholder}
          />
        </div>
      </div>
      <ul
        className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700"
        aria-labelledby="dropdownSearchButton"
      >
        {options &&
          options.map((option) => (
            <li key={option}>
              <div className="flex items-center ps-2 rounded hover:bg-gray-100">
                <input
                  onChange={(event) => handleSelectedOption(event)}
                  id="checkbox-item-11"
                  type="checkbox"
                  value={option}
                  className="w-4 h-4 text-color-brand-500 bg-gray-100 border-gray-300 rounded"
                />
                <label
                  htmlFor="checkbox-item-11"
                  className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded"
                >
                  {option}
                </label>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex justify-between p-3 text-sm font-medium text-color-brand-500 border-t border-gray-200 rounded-b-lg bg-gray-50 hover:bg-gray-100">
        <button onClick={handleApplyFilter}>Apply</button>
        <button onClick={handleCancelFilter}>Cancel</button>
      </div>
    </div>
  );
}
