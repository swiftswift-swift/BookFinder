// src/components/Sorting.tsx
interface Props {
  sortOption: string;
  setSortOption: (value: string) => void;
}

export default function Sorting({ sortOption, setSortOption }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border rounded-md px-3 py-2"
      >
        <option value="title">Title</option>
        <option value="year">Year</option>
      </select>
    </div>
  );
}
