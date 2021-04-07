import {
  CREATE_USERS,
  CREATE_USER_BY_ID,
  CREATE_USERS_SUCCSESS,
  CREATE_USER_BY_ID_SUCCSESS,
  CREATE_USERS_ERROR,
  READY,
  LOADING,
  ERROR,
  EDIT_USER,
} from "../../actions/types";

const INITIAL_STATE = { loadedUsers: [], isFull: false };

export const getUsers = (state = INITIAL_STATE, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_USERS:
      Object.assign(newState, { status: LOADING });
      return newState;
    case CREATE_USER_BY_ID:
      Object.assign(newState, { status: LOADING });
      return newState;
    case CREATE_USER_BY_ID_SUCCSESS:
      let user = newState.loadedUsers.concat([action.payload]);
      Object.assign(newState, { loadedUsers: user, status: READY });
      return newState;
    case CREATE_USERS_SUCCSESS:
      Object.assign(newState, { loadedUsers: action.payload, status: READY, isFull: true });
      return newState;
    case EDIT_USER:
      let newUser = newState.loadedUsers.map((user) => {
        if (user.id === action.payload.id) {
          user.name = action.payload.name;
          user.email = action.payload.email;
        }
        return user;
      });
      Object.assign(newState, { loadedUsers: newUser });
      return newState;
    case CREATE_USERS_ERROR:
      Object.assign(newState, { loadedUsers: [], status: ERROR });
      return newState;
    default:
      return state;
  }
};
