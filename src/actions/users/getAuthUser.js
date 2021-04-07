import { CREATE_AUTHUSER } from "../types";
import { getItemsById } from "../../queries";

export function authUser() {
  const RAND_USER_ID = Math.floor(1 + Math.random() * 10);
  return async (dispatch) => {
    return await Promise.resolve(getItemsById('users', RAND_USER_ID)) 
      .then((value) => {
        dispatch({
          type: CREATE_AUTHUSER,
          payload: value.data
        });
      });
  };
}
