import { RESET_USERS_PAG_STATE } from "../types";

export function resetUsersPagState (state) {
  return {
    type: RESET_USERS_PAG_STATE,
    payload: state,
  };
}
