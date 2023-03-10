import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UPDATE_LOADING = "UPDATE_LOADING";
export const GET_100_RECIPES = "GET_100_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";

export const FILTER_RECIPES_BY_NAME = "FILTER_RECIPES_BY_NAME";
export const FILTER_RECIPES_BY_DIET_TYPE = "FILTER_RECIPES_BY_DIET_TYPE";
export const ORDER_RECIPES_BY_ALPHA = "ORDER_RECIPES_BY_ALPHA";

// * -------------------------------
// * UPDATE_LOADING
// * -------------------------------
export function updateLoading() {
  return {
    type: UPDATE_LOADING,
  };
}

// * -------------------------------
// * GET_100_RECIPES
// * -------------------------------
export function apiRecipesFetch() {
  return async (dispatch) => {
    // dispatch(updateLoading());
    const { data } = await axios(`${BASE_URL}/recipes?name=c&amount=113`);
    // dispatch(updateLoading());

    dispatch({ type: GET_100_RECIPES, payload: data });
  };
}

// * -------------------------------
// * GET_ALL_DIETS
// * -------------------------------
export function getAllDiets() {
  return async (dispatch) => {
    // dispatch(updateLoading());
    const { data: allDiets } = await axios(`${BASE_URL}/diets/all`);
    // dispatch(updateLoading());

    dispatch({ type: GET_ALL_DIETS, payload: allDiets });
  };
}

// * -------------------------------
// * FILTER_RECIPES_BY_NAME
// * -------------------------------
/**
 * @param {String} name name of a recipe or part of a name
 * @returns {ReduxAction}
 */
export function filterRecipesByName(name) {
  return async (dispatch) => {
    // dispatch(updateLoading());
    const { data } = await axios(`${BASE_URL}/recipes?name=${name}`);
    // dispatch(updateLoading());

    dispatch({ type: FILTER_RECIPES_BY_NAME, payload: data });
  };
}

// * -------------------------------
// * FILTER_RECIPES_BY_DIET_TYPE
// * -------------------------------
/**
 * @param {String} dietName lowecase name of the diet type
 * @returns {ReduxAction}
 */
export function filterByDietType(dietName) {
  return async (dispatch) => {
    // dispatch(updateLoading());
    const { data } = await axios(
      `${BASE_URL}/diets/related/?dietName=${dietName}`
    );
    // dispatch(updateLoading());

    dispatch({ type: FILTER_RECIPES_BY_NAME, payload: data });
  };
}

// * -------------------------------
// * FILTER_RECIPES_BY_ASC_ALPHA
// * -------------------------------
/**
 * @param {Boolean} ascending Wheter or not the ordering would be in ascending order
 * @returns {ReduxAction}
 */
export function filterByAlpha(ascending) {
  return { type: ORDER_RECIPES_BY_ALPHA, payload: ascending };
}
