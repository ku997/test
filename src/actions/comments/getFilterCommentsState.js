import { CREATE_FILTER_COMMENTS_STATE } from "../types";

export function getFilterCommentsState (state) {
  return {
    type: CREATE_FILTER_COMMENTS_STATE,
    payload: state
  };
}
