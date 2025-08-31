export default function About() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">ℹ️ About BookApp</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        BookApp is a simple React + TypeScript application that lets you explore
        and search for books using the{" "}
        <span className="font-semibold">Open Library API</span>. You can browse
        books by categories, search by title, and sort results to find exactly
        what you’re looking for.
      </p>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">🚀 Features</h2>
        <ul className="text-left list-disc list-inside text-gray-700 space-y-2">
          <li>Browse books by category (fiction, science, history, etc.)</li>
          <li>Search books by title</li>
          <li>Sort search results by title or publish year</li>
          <li>View book covers and author information</li>
        </ul>
      </div>

      <p className="mt-8 text-gray-600 italic">
        📖 Built with React, TypeScript, TailwindCSS, and Open Library API.
      </p>
    </div>
  );
}
