// src/components/BookCard.tsx
interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
}

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <a
      href={`https://openlibrary.org${book.key}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition block"
    >
      {book.cover_i ? (
        <div className="w-full h-64 mb-3">
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt={book.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center mb-3 rounded-md">
          <span className="text-gray-500">No Cover</span>
        </div>
      )}

      <div className="space-y-1">
        <p className="font-bold">Title:</p>
        <p className="truncate">{book.title}</p>

        <p className="font-bold">Author:</p>
        <p>{book.author_name ? book.author_name.join(", ") : "Unknown"}</p>

        <p className="font-bold">Published:</p>
        <p>{book.first_publish_year ?? "Unknown"}</p>

        <p className="font-bold">Language:</p>
        <p>
          {book.language
            ? book.language.map((l) => l.toUpperCase()).join(", ")
            : "Unknown"}
        </p>
      </div>
    </a>
  );
}
