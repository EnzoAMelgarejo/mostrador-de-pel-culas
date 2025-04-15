import React, {createContext, useContext, useState, ReactNode} from "react";
import axios from "axios";

interface List {
    _id: string;
    userId: string;
    name: string;
    color: string;
    tags: string[];
    movieIds: string[];
    createdAt: string;
}

interface MyListContextProps {
    lists: List[];
    fetchLists: (userId: string) => void;
    createList: (userId: string, name: string, color: string, tags: string[]) => void;
    addMovieToList: ( listId: string, movieId: string) => void;
    removeMovieFromList: ( listId: string, movieId: string) => void;
    updateList: (userId: string, listId: string, name?: string, color?: string, tags?: string[]) => void
    deleteList: (userId: string, listId: string,) => void;
}

const MyListContext = createContext<MyListContextProps | undefined>(undefined);

export const MyListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lists, setLists] = useState<List[]>([]);

    //Obtener lista
    const fetchLists = async(userId: string) => {
        try{

            const { data } = await axios.get(`http://localhost:3001/lists/users/${userId}/alllists`);
            const formattedLists = data.map((list: any) => ({
                ...list,
                movieIds: list.movies.map((movie: any) => movie._id),
            }));
    
            setLists(formattedLists);
            console.log("Listas obtenidas:", formattedLists);
        } catch(error) {

            console.error("Error al obtener las listas:", error);

        }
    };

    //Crear una lista
    const createList = async (userId: string, name: string, color: string, tags: string[]) => {
        try {

            await axios.post(`http://localhost:3001/lists/list`, {userId, name, color, tags})
            fetchLists(userId);

        }catch (error) {

            console.error("Error al crear la lista:", error);

        }
    };

    //Agregar peliculas a la lista
    const addMovieToList = async (listId: string, movieId: string) => {
        try{

            console.log("Lista seleccionada:", listId);
            console.log("Película seleccionada:", movieId);

            await axios.put(`http://localhost:3001/lists/${listId}/movies`, {
                movieId, 
                action: "add"
            })

            setLists((prevLists) => {
                console.log("Listas antes de actualizar:", prevLists);
                console.log("Lista encontrada:", prevLists.find((l) => l._id === listId));
            
                return prevLists.map((list) =>
                    list._id === listId ? { ...list, movieIds: [...list.movieIds, movieId] } : list
                );
            });
            

        } catch (error){

            console.error("Error al agregar pelicula", error);

        }
    };

    //Remover peliculas de la lista
    const removeMovieFromList = async ( listId: string, movieId: string) => {
        try{

            await axios.put(`http://localhost:3001/lists/${listId}/movies`, {movieId, action: "remove"})

            setLists((prevLists) =>
                prevLists.map((list) =>
                    list._id === listId ? { ...list, movieIds: list.movieIds.filter((id) => id !== movieId) } : list
                )
            );

        } catch(error) {

            console.error("Error al remover la pelicula:", error);

        }
    };

    //Editar listas
    const updateList = async (userId: string, listId: string, name?: string, color?: string, tags?: string[]) => {
        try {
            await axios.put(`http://localhost:3001/lists/list/${listId}`, {listId, name, color, tags} )
            fetchLists(userId)
        }catch (error) {
            console.error("Error al actualizar datos", error)
        }
    };

    //Eliminar lista
    const deleteList = async (userId: string, listId: string) => {
    try{

        await axios.delete(`http://localhost:3001/lists/list/${listId}`)
        fetchLists(userId)

    } catch (error){

        console.error("Error al eliminar lista", error);

    }
    

    };

    return(
        <MyListContext.Provider 
            value={{
                lists,
                fetchLists,
                createList,
                addMovieToList,
                removeMovieFromList,
                updateList,
                deleteList,
            }}
        >
            {children}
        </MyListContext.Provider>
    );
}

export const useMyList = () => {
    const context = useContext(MyListContext);
    if(!context) {
        throw new Error("useMyList debe usarse dentro de un MyListProvider");
    };
    return context;
}