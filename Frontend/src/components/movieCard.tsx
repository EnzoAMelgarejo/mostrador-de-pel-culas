import React, { useState } from "react";
import '../styles/movieCard.css';
import { Link } from "react-router-dom";
import { useMyList } from "../context/myListContext";
import ListSelector from "./listSelector";

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  duration: string;
  category: string;
  genre: string;
  premierDate: string;
  isInListView?: boolean;
  listId?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
    title, image, duration, category, genre, premierDate, id, isInListView, listId
  }) => {
    const { removeMovieFromList } = useMyList();
  
    const [isHovered, setIsHovered] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [isAddHovered, setIsAddHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  
    const handleCardMouseEnter = () => setIsHovered(true);
    const handleCardMouseLeave = () => {
      setIsHovered(false);
      setIsAddHovered(false);
      setIsDeleteHovered(false);
    };
  
    let cardClassName = "movieCard";
    if (isInListView) cardClassName += " list-mode";
    if (isAddHovered) cardClassName += " hover-add";
    else if (isDeleteHovered) cardClassName += " hover-delete";
  
    return (
      <div
        className={cardClassName}
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
      >
        <button
          className="add-btn"
          onMouseEnter={() => setIsAddHovered(true)}
          onMouseLeave={() => setIsAddHovered(false)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowSelector((prev) => !prev);
          }}
        >
          +
        </button>
  
        {isInListView && (
          <button
            className="delete-btn"
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (listId) removeMovieFromList(listId, id);
            }}
          >
            −
          </button>
        )}

      <Link to={`/movie/${id}`}>
        <div className="imageCard">
          <img src={image} className="image" />
        </div>
        <div className="infoCard">
          <h1>{title}</h1>
          <h1>{genre}</h1>
          <h1>{category}</h1>
          <h1>{duration}</h1>
          <h1>{premierDate}</h1>
        </div>
      </Link>

      {showSelector && (
        <div className="add-to-list">
          <ListSelector movieId={id} />
        </div>
      )}
    </div>
  );
};

export default MovieCard;
