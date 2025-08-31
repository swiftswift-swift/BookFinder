import React from "react";

interface Props {
  filterYear: string;
  setFilterYear: (y: string) => void;
  filterAuthor: string;
  setFilterAuthor: (a: string) => void;
  sort: string;
  setSort: (s: string) => void;
  applyFilters: () => void;
}

export default function Filters({
  filterYear,
  setFilterYear,
  filterAuthor,
  setFilterAuthor,
  sort,
  setSort,
  applyFilters,
}: Props) {
  return (
    <div className="flex justify-center gap-2 mb-6">
     
      <select
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">Filter by year</option>
        {Array.from({ length: 2025 - 1800 + 1 }, (_, i) => 1800 + i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>

      
      <input
        type="text"
        placeholder="Filter by author"
        value={filterAuthor}
        onChange={(e) => setFilterAuthor(e.target.value)}
        className="p-2 border rounded-md"
      />

      
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="title">Sort by Title</option>
        <option value="year">Sort by Year</option>
      </select>

      <button
        onClick={applyFilters}
        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        Apply
      </button>
    </div>
  );
}
