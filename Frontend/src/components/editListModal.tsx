import { useState } from "react";
import { useMyList } from "../context/myListContext";
import { useReducer } from "react";
import { editListReducer, initialState } from "../reducers/editListReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { BlockPicker } from "react-color";
import "../styles/editListModal.css";

interface EditListModalProps {
    listId: string;
    userId: string;
    onClose: () => void;
}

const EditListModal: React.FC<EditListModalProps> = ({ listId, userId, onClose }) => {
    const { updateList } = useMyList();
    const [state, dispatch] = useReducer(editListReducer, initialState);
    const [showColorPicker, setShowColorPicker] = useState(false);

    // Guardar cambios
    const handleSave = async () => {
        await updateList(userId, listId, state.name, state.color, state.tags);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">

            <div className="close-button-container">
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>

                <h2>Editar lista</h2>

                <label>Nombre:</label>
                <input
                    type="text"
                    value={state.name}
                    onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
                    placeholder="Nuevo nombre"
                />

                <label>Etiquetas:</label>
                <div className="tag-input">
                    <input
                        type="text"
                        value={state.newTag}
                        onChange={(e) => dispatch({ type: "SET_NEW_TAG", payload: e.target.value })}
                        placeholder="Añadir etiqueta"
                    />
                    <button onClick={() => dispatch({ type: "ADD_TAG" })}>+</button>
                </div>

                <div className="tags-container">
                    {state.tags.map(tag => (
                        <span key={tag} className="tag">
                            <FontAwesomeIcon icon={faTag} className="tag-icon" />
                            {tag}
                            <button onClick={() => dispatch({ type: "REMOVE_TAG", payload: tag })}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </span>
                    ))}
                </div>

                <div className="color-picker-container">
                    <div className="color-label" onClick={() => setShowColorPicker(!showColorPicker)}>
                        <span>Color:</span>
                        <FontAwesomeIcon icon={faChevronDown} className={`dropdown-icon ${showColorPicker ? "open" : ""}`} />
                    </div>

                    {showColorPicker && (
                        <div className="block-picker-container">                            
                            <BlockPicker
                                color={state.color}
                                onChange={(color) => dispatch({ type: "SET_COLOR", payload: color.hex })}
                            />
                        </div>
                    )}

                </div>

                <div className="modal-actions">
                    <button className="save-button" onClick={handleSave}>Guardar</button>
                    <button className="cancel-button" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditListModal;