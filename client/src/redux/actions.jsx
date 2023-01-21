export const UPDATE_LOADING = "UPDATE_LOADING";

// * UPDATE_LOADING
export function updateLoading() {
  return {
    type: UPDATE_LOADING,
  };
}

// * ASYNC example
function fetchOneCharacter(charaName) {
  return function (dispatch) {
    dispatch(updateLoading()); //set as true
    fetch(`https://rickandmortyapi.com/api/character/?name=${charaName}`)
      .then((data) => data.json())
      .then((data) => {
        console.log("KEKW");
        // dispatch({ type: FETCH_ONE_CHARACTER, payload: data.results });
        dispatch(updateLoading()); //set as false
      });
  };
}
