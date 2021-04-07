import { CREATE_PAG_STATE } from "../types";

export function getPagState (state) {
  return {
    type: CREATE_PAG_STATE,
    payload: state,
  };
}
