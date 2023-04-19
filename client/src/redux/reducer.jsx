import { normalAlpha, reversedAlpha } from "../utils/reducerOrdering";
// import all action types
import {
  UPDATE_LOADING,
  GET_ALL_DIETS,
  GET_100_RECIPES,
  FILTER_RECIPES_BY_NAME,
  FILTER_RECIPES_BY_DIET_TYPE,
  ORDER_RECIPES_BY_ALPHA,
} from "./actions";

// helpers imports
const initialState = {
  loading: false,
  apiRecipes: [],
  filteredRecipes: [],
  allDiets: [],
};
// some randnom coomment 
//
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    // ! *******************************************************
    case GET_ALL_DIETS:
      return state.allDiets.length
        ? { ...state }
        : {
            ...state,
            allDiets: action.payload,
          };
    // ! *******************************************************
    case GET_100_RECIPES:
      return state.filteredRecipes.length
        ? { ...state }
        : {
            ...state,
            apiRecipes: action.payload,
            filteredRecipes: action.payload,
          };
    // ! *******************************************************
    // both do exatly the same, just update 'filteredRecipes'
    case FILTER_RECIPES_BY_NAME:
    case FILTER_RECIPES_BY_DIET_TYPE:
      return {
        ...state,
        filteredRecipes: [...action.payload],
      };
    // ! *******************************************************
    case ORDER_RECIPES_BY_ALPHA:
      // if true => alpha | else => reversed alpha
      const recipesCopy = [...state.filteredRecipes];
      const alphaOrderedDiets = action.payload
        ? recipesCopy.sort((a, b) => normalAlpha(a, b))
        : recipesCopy.sort((a, b) => reversedAlpha(a, b));

      return {
        ...state,
        filteredRecipes: alphaOrderedDiets,
      };
    // ! *******************************************************
    default:
      return { ...state };
  }
};
