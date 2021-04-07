import { CREATE_COMMENTS, CREATE_COMMENTS_SUCCSESS, CREATE_COMMENTS_ERROR } from "../types";
import { getItems } from "../../queries";

export function getComments() {
  return async (dispatch) => {
    dispatch({
      type: CREATE_COMMENTS,
    });
    return await Promise.resolve(getItems('comments')) 
      .then((value) => {
        dispatch({
          type: CREATE_COMMENTS_SUCCSESS,
          payload: value.data,
        });
      })
      .catch((error) => {
          console.log('Загрузка комментариев не удалась. ' + error);
        dispatch({
            type: CREATE_COMMENTS_ERROR,
          });
      })
  };
}
