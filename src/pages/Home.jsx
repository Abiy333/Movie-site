import React, { useState } from "react";
import useDebounce from "../Components/useDebounce";
import { useMovies } from "../Components/useMovies";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const { movies, loading, error } = useMovies(debouncedSearchQuery);

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      {loading && <p className="text-white text-center mt-8">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-8">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {movies.map((movie) => (
          <div key={movie.id} className="text-white">
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
}
