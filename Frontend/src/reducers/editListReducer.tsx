
interface State {
    name: string;
    color: string;
    tags: string[];
    newTag: string;
}

export const initialState: State = {
    name: "",
    color: "#4A90E2",
    tags: [],
    newTag: "",
};

type Action =
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_COLOR"; payload: string }
    | { type: "SET_NEW_TAG"; payload: string }
    | { type: "ADD_TAG" }
    | { type: "REMOVE_TAG"; payload: string };

// Reducer para manejar el estado
export const editListReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload };
        case "SET_COLOR":
            return { ...state, color: action.payload };
        case "SET_NEW_TAG":
            return { ...state, newTag: action.payload };
        case "ADD_TAG":
            return state.newTag.trim() && !state.tags.includes(state.newTag)
                ? { ...state, tags: [...state.tags, state.newTag.trim()], newTag: "" }
                : state;
        case "REMOVE_TAG":
            return { ...state, tags: state.tags.filter(tag => tag !== action.payload) };
        default:
            return state;
    }
};