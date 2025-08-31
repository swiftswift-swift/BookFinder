import { useEffect, useState } from "react";
import Card from "../components/BookCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

const categories = ["fiction", "science", "history", "fantasy", "romance"];

export default function Home() {
  const [booksByCategory, setBooksByCategory] = useState<
    Record<string, Book[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const results: Record<string, Book[]> = {};
        for (const category of categories) {
          const response = await fetch(
            `https://openlibrary.org/search.json?subject=${category}&limit=5`
          );
          const data = await response.json();
          results[category] = data.docs.map((doc: any) => ({
            key: doc.key,
            title: doc.title,
            author_name: doc.author_name,
            cover_i: doc.cover_i,
          }));
        }
        setBooksByCategory(results);
      } catch {
        setError("Failed to fetch category books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <span style={{ fontSize: 32 }}>📚</span> 
        Explore Books by Category
      </h1>

      {categories.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {booksByCategory[category]?.map((book) => (
              <Card key={book.key} book={book} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
