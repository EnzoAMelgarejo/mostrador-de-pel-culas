import React from "react";
import { useSearch } from '../context/contextSearch';  // Asegúrate de importar el hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../styles/search-bar.css";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();  // Accede a `searchQuery` y `setSearchQuery` desde el contexto

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);  // No necesitamos estado local aquí, directamente actualizamos el contexto
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // La búsqueda ya está actualizada por el cambio, no es necesario hacer nada aquí
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}  // Usamos el query del contexto aquí
          onChange={handleChange}  // Actualiza el contexto en cada cambio
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} style={{ color: '#B0B0B0' }} className="search search-icon" />
      </form>
    </div>
  );
};

export default SearchBar;
