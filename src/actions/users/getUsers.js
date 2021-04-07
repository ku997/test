import { CREATE_USERS, CREATE_USERS_SUCCSESS, CREATE_USERS_ERROR } from "../types";
import { getItems } from "../../queries";

export function getUsers() {
  return async (dispatch) => {
    dispatch({
      type: CREATE_USERS,
    });
    return await Promise.resolve(getItems('users'))
      .then((value) => {
        dispatch({
          type: CREATE_USERS_SUCCSESS,
          payload: value.data,
        });
      })
      .catch((error) => {
          console.log('Загрузка пользователей не удалась. ' + error);
        dispatch({
            type: CREATE_USERS_ERROR,
          });
      })
  };
}
