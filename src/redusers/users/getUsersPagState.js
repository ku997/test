import { CREATE_USERS_PAG_STATE, RESET_USERS_PAG_STATE } from "../../actions/types";

const INITIAL_STATE = 0;
export const getUsersPagState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USERS_PAG_STATE:
      return state + action.payload;
    case RESET_USERS_PAG_STATE:
      return action.payload;
    default:
      return state;
  }
};
