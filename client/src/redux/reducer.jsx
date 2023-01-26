// import all action types
import {
  UPDATE_LOADING,
  GET_ALL_DIETS,
  GET_100_RECIPES,
  FILTER_RECIPES_BY_NAME,
  ORDER_RECIPES_BY_ALPHA,
} from "./actions";

const normalAlpha = (a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const reversedAlpha = (a, b) => {
  if (a.name > b.name) {
    return -1;
  } else if (a.name < b.name) {
    return 1;
  }
  return 0;
};
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
        ? state.filteredRecipes.sort((a, b) => normalAlpha(a, b))
        : state.filteredRecipes.sort((a, b) => reversedAlpha(a, b));

      return {
        ...state,
        filteredRecipes: [...alphaOrderedDiets],
      };
    // ! *******************************************************
    default:
      return { ...state };
  }
};
