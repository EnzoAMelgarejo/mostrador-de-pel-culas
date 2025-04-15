import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMovies } from '../context/moviesContext'; // Suponiendo que usas el contexto correctamente
import "../styles/movieDetails.css";
import "../styles/loading.css";

const Movie = () => {
    const { id } = useParams<{ id: string }>();
    const { movies, loading, error, fetchMovieById } = useMovies();

    // Buscamos la película con el id en la lista de `movies` del contexto
    const movie = movies.find((movie) => movie._id === id);

    useEffect(() => {
        if (id && !movie) {
            fetchMovieById(id); // Si no está en el contexto, la buscamos
        }
    }, [id, movie, fetchMovieById]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="movie-details">
            <div className="movie-container">
                <img src={movie.image} alt={movie.title} className="movie-image" />
                <div className="movie-info">
                    <h1 className="movie-title">{movie.title}</h1>
                    <div className="movie-details-tags">
                        <span className="tag">{movie.genre}</span>
                        <span className="tag">{movie.duration}</span>
                        <span className="tag">{movie.category}</span>
                        <span className="tag">{movie.premierDate}</span>
                    </div>
                </div>
            </div>
            <p className="summary">{movie.summary}</p>
        </div>
    );
};

export default Movie;
