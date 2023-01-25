// import all action types
import {
  UPDATE_LOADING,
  GET_ALL_DIETS,
  GET_100_RECIPES,
  FILTER_RECIPES_BY_NAME,
  ORDER_RECIPES_BY_ALPHA,
} from "./actions";

// helpers imports
const initialState = {
  loading: false,
  apiRecipes: [],
  filteredRecipes: [],
  allDiets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    // ! *******************************************************
    case GET_ALL_DIETS:
      return {
        ...state,
        allDiets: action.payload,
      };
    // ! *******************************************************
    case GET_100_RECIPES:
      return {
        ...state,
        apiRecipes: action.payload,
        filteredRecipes: action.payload,
      };
    // ! *******************************************************
    case FILTER_RECIPES_BY_NAME:
      return {
        ...state,
        filteredRecipes: action.payload,
      };
    // ! *******************************************************
    // case FILTER_RECIPES_BY_DIET_TYPE:
    //   const dietFiltered = state.apiRecipes.filter((recipe) =>
    //     recipe.dietType.includes(action.payload)
    //   );

    //   return {
    //     ...state,
    //     filteredRecipes: dietFiltered,
    //   };
    // ! *******************************************************
    case ORDER_RECIPES_BY_ALPHA:
      // if true, alpha ; else , inversed alpha
      const alphaOrderedDiets = action.payload
        ? state.apiRecipes.sort((prev, curr) => prev - curr)
        : state.apiRecipes.sort((prev, curr) => curr - prev);

      return {
        ...state,
        filteredRecipes: dietFiltered,
      };

    // ! *******************************************************
    default:
      return { ...state };
  }
};
