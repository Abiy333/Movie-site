import MovieCard from "../Components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import useDebounce from "../Components/useDebounce";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) return;

    const fetchLiveMovies = async () => {
      setLoading(true);
      try {
        const searchResults = await searchMovies(debouncedSearchQuery);
        setMovies(searchResults);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to search movies...");
      } finally {
        setLoading(false);
      }
    };
    fetchLiveMovies();
  }, [debouncedSearchQuery]);

  console.log("Current Search State:", searchQuery);

  return (
    <div className="w-full max-w-2xl mx-auto relative mb-10">
      <input
        type="text"
        placeholder="Search for movies..."
        className="w-full px-6 py-4 bg-gray-800 text-white text-lg rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {debouncedSearchQuery && (
        <p className="text-gray-400 text-sm mt-3 text-center">
          Live searching for:{" "}
          <span className="text-white font-semibold">
            {debouncedSearchQuery}
          </span>
        </p>
      )}
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
