import {ADD_FAV, REMOVE_FAV, FILTER, ORDER} from "./actions.types";

const initialState = {
    myFavorites: [],
    allCharacters: [],
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            return {
                ...state,
                myFavorites: [...state.allCharacters, action.payload],
                allCharacters: [...state.allCharacters, action.payload]
            }

        case REMOVE_FAV:
            let deleteCharacter = state.myFavorites.filter (character => character.id !== Number (action.payload)) //guardamos el eliminado
            return {
                ...state,
                myFavorites: deleteCharacter
            }
        
        case FILTER:
            const filterCharacters = state.allCharacters.filter(character => character.gender === action.payload);
            return {
                ...state,
                myFavorites: [...filterCharacters]
            }

        case ORDER:
            const sortCharacters = [...state.allCharacters];
            if (action.payload === 'A') {
            sortCharacters.sort((a, b) => a.id - b.id);
            } else if (action.payload === 'D') {
            sortCharacters.sort((a, b) => b.id - a.id);
            }
            return {
                ...state,
                myFavorites: [...sortCharacters]
            };
            

        default:
            return {
                ...state
            }
    }

}

export default reducer;
