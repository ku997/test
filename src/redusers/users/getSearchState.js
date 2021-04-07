import { CREATE_SEARCH_STATE } from "../../actions/types";

const INITIAL_STATE = {};

export const getSearchState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_SEARCH_STATE:
      return action.payload;
    default:
      return state;
  }
};