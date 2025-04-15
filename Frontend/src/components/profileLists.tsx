import { useEffect, useState } from "react";
import { useMyList } from "../context/myListContext";
import MyList from "../components/myList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import "../styles/profileLists.css";

interface ProfileListsProps {
  userId: string;
}

const ProfileLists: React.FC<ProfileListsProps> = ({ userId }) => {
  const { fetchLists, lists, createList } = useMyList();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [filterTags, setFilterTags] = useState<string[]>([]);

  useEffect(() => {
    if (userId) {
      fetchLists(userId);
    }
  }, [userId]);

  const handleCreateList = () => {
    const name = prompt("Nombre de la nueva lista:");
    if (name) {
      createList(userId, name, "#4A90E2", []);
    }
  };

  const toggleFilterMenu = () => {
    console.log("Abriendo o cerrando el menú de filtros");
    setIsFilterOpen(!isFilterOpen);
  };

  const handleTagToggle = (tag: string) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  };

  const allColors = Array.from(new Set(lists.map((list) => list.color)));
  const allTags = Array.from(
    new Set(lists.flatMap((list) => list.tags))
  ).filter(Boolean);

  return (
    <div className="profile-lists-container">
      <div className="profile-lists-header">
        <h2>Mis Listas</h2>
        <div className="header-actions">
          <button className="new-list-btn" onClick={handleCreateList}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className="filter-btn" onClick={toggleFilterMenu}>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>

        {isFilterOpen && (
          <div className={`filter-menu ${isFilterOpen ? "open" : ""}`}>
            <p>Ordenar por:</p>
            <button onClick={() => setSortBy("name")}>A-Z</button>
            <button onClick={() => setSortBy("date")}>Fecha</button>
            <hr />

            <p>Filtrar por color:</p>
            <div className="filter-colors">
              {allColors.map((color) => (
                <div
                  key={color}
                  className={`color-dot ${
                    filterColor === color ? "active" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    setFilterColor(filterColor === color ? null : color)
                  }
                />
              ))}
            </div>

            <p>Filtrar por tags:</p>
            <div className="filter-tags">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-btn ${
                    filterTags.includes(tag) ? "selected" : ""
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <MyList
        sortBy={sortBy}
        filterColor={filterColor}
        filterTags={filterTags}
      />
    </div>
  );
};

export default ProfileLists;
