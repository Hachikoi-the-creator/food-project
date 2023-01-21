// import all action types
import { UPDATE_LOADING } from "./actions";

// helpers imports

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    // * ------------------------------------------------------
    default:
      return { ...state };
  }
};
