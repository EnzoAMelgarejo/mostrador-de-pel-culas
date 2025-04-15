import { useState, useMemo } from "react";
import { useMyList } from "../context/myListContext";
import { useMovies } from "../context/moviesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import MovieCard from "./movieCard";
import ListOptionsMenu from "./listOptionsMenu";
import "../styles/myList.css";

interface MyListProps {
  sortBy: string;
  filterColor: string | null;
  filterTags: string[];
}

const MyList: React.FC<MyListProps> = ({ sortBy, filterColor, filterTags }) => {
  const { lists } = useMyList(); 
  const { movies } = useMovies();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  // Función para abrir el menú de opciones
  const openMenu = (listId: string) => {
    setSelectedListId(listId);
    setIsMenuOpen(true);
  };

  // Función para cerrar el menú de opciones
  const closeMenu = () => {
    setIsMenuOpen(false);
    setSelectedListId(null);
  };

  // Filtrar y ordenar listas
  const filteredAndSortedLists = useMemo(() => {
    return lists
      .filter((list) => {
        if (filterColor && list.color !== filterColor) return false;
        if (filterTags.length > 0 && !filterTags.some(tag => list.tags.includes(tag))) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "date") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [lists, sortBy, filterColor, filterTags]);

  return (
    <div className="listContainer">
      {filteredAndSortedLists.map((list) => (
        <div 
          key={list._id} 
          className="listItem"
          style={{ borderColor: list.color, boxShadow: `0 0 10px ${list.color}` }}
        >
          <div className="listHeader">
            <h2 className="listName">{list.name}</h2>
            <span className="listTags">
              <FontAwesomeIcon icon={faTag} className="icon" /> {list.tags.join(", ")}
            </span>
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="optionsIcon"
              onClick={() => openMenu(list._id)}
            />
          </div>
          <div className="movies">
            {list.movieIds
              .map((movieId) => movies.find((movie) => movie._id === movieId)) 
              .filter((movie) => movie) 
              .map((movie) => {
                if (!movie) return null; 
                return (
                  <MovieCard
                    key={`${list._id}-${movie._id}`}
                    id={movie._id}
                    title={movie.title}
                    image={movie.image}
                    duration={movie.duration}
                    category={movie.category}
                    genre={movie.genre}
                    premierDate={movie.premierDate}
                    isInListView={true}
                    listId={list._id}
                  />
                );
              })}
          </div>

          {/* Renderizar el menú de opciones solo si está abierto para esta lista */}
          {isMenuOpen && selectedListId === list._id && (
            <ListOptionsMenu
              isOpen={isMenuOpen}
              onClose={closeMenu}
              listId={list._id}
              userId={list.userId} // Asumiendo que cada lista tiene un userId
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MyList;
