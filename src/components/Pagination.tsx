interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  const maxVisible = 5;

  const clamp = (n: number) => Math.min(Math.max(1, n), totalPages);

  const getPageNumbers = () => {
    if (totalPages <= 0) return [];
    const pages: number[] = [];

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // adjust when near the end
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => setPage(clamp(page - 1))}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        aria-label="Previous page"
      >
        Prev
      </button>

      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={`px-3 py-1 rounded ${
            page === num
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-300"
          }`}
          aria-current={page === num ? "page" : undefined}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => setPage(clamp(page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
