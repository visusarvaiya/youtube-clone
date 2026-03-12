import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-2 hidden w-full max-w-2xl flex-1 items-center md:flex"
      role="search"
    >
      <div className="flex w-full items-center rounded-full border border-zinc-300 bg-zinc-50 pl-4 text-sm shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-zinc-700 dark:bg-[#121212]">
        <input
          type="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mr-2 w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 outline-none dark:text-zinc-100"
          aria-label="Search videos"
        />
        <button
          type="submit"
          className="flex h-9 items-center border-l border-zinc-300 bg-zinc-100 px-4 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 text-zinc-700 dark:text-zinc-200"
          >
            <circle cx="11" cy="11" r="6" />
            <line x1="16" y1="16" x2="21" y2="21" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

