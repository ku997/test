import { CREATE_USER_BY_ID, CREATE_USER_BY_ID_SUCCSESS, CREATE_USERS_ERROR } from "../types";
import { getItemsById } from "../../queries";

export function getUserById(postId) {
  return async (dispatch) => {
    dispatch({
      type: CREATE_USER_BY_ID,
    });
    return await Promise.resolve(getItemsById('posts', postId)) 
      .then((value) => {
        dispatch({
          type: CREATE_USER_BY_ID_SUCCSESS,
          payload: value.data,
        });
      })
      .catch((error) => {
        console.log("Загрузка пользователей не удалась. " + error);
        dispatch({
          type: CREATE_USERS_ERROR,
        });
      });
  };
}
