import { CREATE_AUTHUSER, EDIT_AUTHUSER } from "../../actions/types";

const INITIAL_STATE = {};

export const getAuthUser = (state = INITIAL_STATE, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_AUTHUSER:
      Object.assign(newState, action.payload, {initialEmail: action.payload.email});
      return newState;
    case EDIT_AUTHUSER:
      Object.assign(newState, { name: action.payload.name, email: action.payload.email, edited:true });
      return newState;
    default:
      return state;
  }
};