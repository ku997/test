import { CREATE_USERS_PAG_STATE } from "../types";

export function getUsersPagState (state) {
  return {
    type: CREATE_USERS_PAG_STATE,
    payload: state,
  };
}
