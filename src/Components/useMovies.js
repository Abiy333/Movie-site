import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";

export function useMovies(debouncedSearchQuery) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. If the search box is empty, clear the movies and do nothing
    if (!debouncedSearchQuery.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    const fetchLiveMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchResults = await searchMovies(debouncedSearchQuery);
        setMovies(searchResults);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMovies();
  }, [debouncedSearchQuery]);

  // The hook returns exactly what the UI needs to render
  return { movies, loading, error };
}
