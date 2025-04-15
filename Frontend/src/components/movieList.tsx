import { useState, useEffect } from "react";
import { useMovies } from "../context/moviesContext";
import { useSearch } from "../context/contextSearch";
import MovieCard from "./movieCard";
import Pagination from "./pagination";
import '../styles/movieCard.css'
import '../styles/loading.css'

const MovieList = () => {
    const { movies, loading, error, fetchMovies } = useMovies();
    const [currentPage, setCurrentPages] = useState(1)
    const {searchQuery} = useSearch()

    useEffect(() => {
        fetchMovies(searchQuery, currentPage);
    }, [searchQuery, currentPage])

    if (loading) {
        return (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        );
    }

    if(error) {
        return <p className="error-message">Error: {error}</p>
    }

    return(
        <div className="movieList-container">

            <div className="movieList">
                {movies.map((movie) => (
                    <MovieCard
                    key={movie._id}
                    id={movie._id}
                    image={movie.image}
                    title={movie.title}
                    duration={movie.duration}
                    category={movie.category}
                    genre={movie.genre}
                    premierDate={movie.premierDate}
                    />
                ))}
            </div>

            <div className="pagination-container">
                <Pagination 
                    currentPage={currentPage}
                    totalPages={Math.ceil(movies.length / 10)}
                    onPageChange={setCurrentPages}
                />
            </div>

        </div>
    )
}

export default MovieList