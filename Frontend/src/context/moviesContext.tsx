import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface Movie {
    _id: string;
    title: string;
    duration: string;
    genre: string;
    category: string;
    premierDate: string;
    image: string;
    summary: string;
}

interface MovieContextType {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    fetchMovies: (searchQuery?: string, page?: number) => void;
    fetchMovieById: (id: string) => Promise<Movie | undefined>;
}

interface MovieProviderProps {
    children: ReactNode;
}

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: MovieProviderProps) => {
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const URL = 'http://localhost:3001/movies'

    const fetchMovies = async(searchQuery = "", page = 1) => {
        try{

            setLoading(true);
            setError(null);

            const params = {search: searchQuery, page, limit: 10}
            const response = await axios.get(URL, {params});

            const moviesWithImage = response.data.movies.map((movie: Movie) => ({
                ...movie,
                image: `http://localhost:3001${movie.image}`,
            }));

            setMovies(moviesWithImage);

        } catch(err: any){

            setError(err.message);
            return undefined;

        } finally {
            setLoading(false);
        }
    };

    const fetchMovieById = async(id: string): Promise<Movie | undefined> => {
    
        try{
    
            const response = await axios.get(`${URL}/${id}`)
            return response.data;

        } catch(err: any){
    
            setError(err.message);
            return undefined;
    
        } finally{
    
            setLoading(false);
    
        }
    
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return(
    
        <MovieContext.Provider 
            value={{
                movies,
                loading,
                error,
                fetchMovies,
                fetchMovieById,
            }}
        >
    
            {children}
    
        </MovieContext.Provider>
    
    );
};


export const useMovies = (): MovieContextType => {
    const context = useContext(MovieContext);
    if(!context) {
        throw new Error("useMovuesMust be used within a MovieProvider")
    }
    return context;
};