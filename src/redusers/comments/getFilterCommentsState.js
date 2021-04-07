import { CREATE_FILTER_COMMENTS_STATE, REMOVE_FILTER_COMMENTS_STATE } from "../../actions/types";

const INITIAL_STATE = {email: null, postTitle: null};

export const getFilterCommentsState = (state = INITIAL_STATE, action) => {

  const newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_FILTER_COMMENTS_STATE:
      Object.assign(newState, action.payload);
      return newState;
    case REMOVE_FILTER_COMMENTS_STATE:
      return INITIAL_STATE
    default:
      return state;
  }
};