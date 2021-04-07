import { CREATE_SEARCH_STATE } from "../types";

export function getSearchState (state) {
  return {
    type: CREATE_SEARCH_STATE,
    payload: state,
  };
}
