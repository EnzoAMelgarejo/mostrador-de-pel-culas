import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useMyList } from "../context/myListContext";
import EditListModal from "./editListModal";
import "../styles/listOptionsMenu.css";

interface ListOptionsMenuProps {
    isOpen: boolean;
    onClose: () => void;
    listId: string;
    userId: string;
}

const ListOptionsMenu: React.FC<ListOptionsMenuProps> = ({ isOpen, onClose, listId, userId }) => {
    const { deleteList } = useMyList();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Abre el modal de edición
    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    // Cierra el modal de edición
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        onClose(); // También cerramos el menú de opciones
    };

    // Manejar la eliminación de la lista
    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta lista?");
        if (confirmDelete) {
            await deleteList(userId, listId);
            onClose(); // Cierra el menú después de eliminar
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Menú de opciones */}
            <div className="menu-overlay" onClick={onClose}>
                <div className="menu-container" onClick={(e) => e.stopPropagation()}>
                    <ul>
                        <li onClick={handleEdit}>Editar lista</li>
                        <li>Compartir</li>
                        <li className="delete-option" onClick={handleDelete}>
                            Eliminar lista
                            <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
                        </li>
                    </ul>
                </div>
            </div>

            {/* Modal de edición de lista */}
            {isEditModalOpen && (
                <EditListModal
                    listId={listId}
                    userId={userId}
                    onClose={handleCloseEditModal} // Cierra el modal
                />
            )}
        </>
    );
};

export default ListOptionsMenu;
