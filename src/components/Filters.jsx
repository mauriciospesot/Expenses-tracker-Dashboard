import { useState } from "react";

export default function Filters({
  visibility,
  inputs,
  handleAplyFilters,
  handleResetFilters,
}) {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (event, column) => {
    setFilters({
      ...filters,
      [column]: event.target.value,
    });
  };

  const search = () => {
    handleAplyFilters(filters);
  };

  const reset = () => {
    const resetFilters = {};
    inputs.forEach((input) => {
      resetFilters[input.column] = "None";
    });
    setFilters(resetFilters);
    handleResetFilters();
  };

  return (
    <div
      className={
        visibility
          ? "bg-white p-6 border-t-[1px] border-b-[1px] w-full"
          : "bg-white p-6 hidden transition"
      }
    >
      <h2 className="text-stone-700 text-xl font-bold">Filters</h2>
      <p className="mt-1 text-sm">Use filters to further refine search</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {inputs.map((input, index) => (
          <div className="flex flex-col" key={input + index}>
            <label
              htmlFor="month"
              className="text-stone-600 text-sm font-medium"
            >
              {input.label}
            </label>

            <select
              value={filters[input.column] || "None"}
              onChange={(event) => handleFilterChange(event, input.column)}
              id="status"
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {input.options.map((option, optionIndex) => (
                <option key={optionIndex}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
        <button
          onClick={reset}
          className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90"
        >
          Reset
        </button>
        <button
          onClick={search}
          className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
        >
          Search
        </button>
      </div>
    </div>
  );
}
