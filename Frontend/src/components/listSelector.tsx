import React, { useEffect } from "react";
import { useMyList } from "../context/myListContext";
import { useAuth } from "../context/authContext"; // reemplazo correcto
import "../styles/listSelector.css";

interface ListSelectorProps {
    movieId: string;
}

const ListSelector: React.FC<ListSelectorProps> = ({ movieId }) => {
    const { lists, addMovieToList, fetchLists } = useMyList();
    const { user } = useAuth(); // cambio aquí

    const userId = user?._id;

    useEffect(() => {
        if (lists.length === 0 && userId) {
            fetchLists(userId); // Carga las listas si están vacías
        }
    }, [lists, userId, fetchLists]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const listId = event.target.value;
        if (userId && movieId && listId) {
            addMovieToList(listId, movieId);
        }
    };

    return (
        <div className="list-selector">
            <select onChange={handleSelect} defaultValue="">
                <option value="" disabled>
                    Selecciona una lista
                </option>
                {lists.map((list) => (
                    <option key={list._id} value={list._id}>
                        {list.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ListSelector;
