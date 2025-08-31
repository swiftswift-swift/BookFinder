import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState<"title" | "year" | "">("");
  const [languageFilter, setLanguageFilter] = useState("");

  const limit = 20; // fetch more per page to avoid empty results

  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${limit}`
        );
        const data = await response.json();

        const mappedBooks = data.docs.map((doc: any) => ({
          key: doc.key,
          title: doc.title,
          author_name: doc.author_name,
          cover_i: doc.cover_i,
          first_publish_year: doc.first_publish_year,
          language: doc.language,
        }));

        setBooks(mappedBooks);
        setTotalPages(Math.ceil(Math.min(data.numFound, 1000) / limit)); // cap at 1000 results
      } catch {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, page]);

  // Safe filtering
  let filteredBooks = books;
  if (languageFilter.trim() !== "") {
    filteredBooks = filteredBooks.filter(
      (book) => book.language && book.language.includes(languageFilter)
    );
  }

  // Sorting
  if (sortBy === "title") {
    filteredBooks = [...filteredBooks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortBy === "year") {
    filteredBooks = [...filteredBooks].sort(
      (a, b) => (a.first_publish_year ?? 0) - (b.first_publish_year ?? 0)
    );
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🔎 Search Books</h1>

      <div className="flex justify-center mb-6">
        <SearchBar
          onSearch={(q) => {
            setQuery(q);
            setPage(1);
          }}
        />
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {filteredBooks.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as "title" | "year" | "");
              setPage(1);
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="">Sort By</option>
            <option value="title">Title (A-Z)</option>
            <option value="year">Year (Oldest → Newest)</option>
          </select>

          <select
            value={languageFilter}
            onChange={(e) => {
              setLanguageFilter(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Languages</option>
            <option value="eng">English</option>
            <option value="fre">French</option>
            <option value="spa">Spanish</option>
            <option value="ger">German</option>
          </select>
        </div>
      )}

      {!loading && !error && query && (
        <>
          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-500">
              No books found{languageFilter ? ` for "${languageFilter}"` : ""}.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.key} book={book} />
              ))}
            </div>
          )}
        </>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
