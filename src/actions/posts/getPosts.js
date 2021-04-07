import { CREATE_POSTS, CREATE_POSTS_SUCCSESS, CREATE_POSTS_ERROR } from "../types";
import { getItems } from "../../queries";

export function getPosts() {
  return async (dispatch) => {
    dispatch({
      type: CREATE_POSTS,
    });
    return await Promise.resolve(getItems('users'))
      .then((value) => {
        dispatch({
          type: CREATE_POSTS_SUCCSESS,
          payload: value.data,
        });
      })
      .catch((error) => {
          console.log('Загрузка постов не удалась. ' + error);
        dispatch({
            type: CREATE_POSTS_ERROR,
          });
      })
  };
}
