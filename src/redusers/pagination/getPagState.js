import { CREATE_PAG_STATE } from "../../actions/types";

const INITIAL_STATE = 0;
export const getPagState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PAG_STATE:
      return action.payload;
    default:
      return state;
  }
};