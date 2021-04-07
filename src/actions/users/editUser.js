import { EDIT_AUTHUSER, EDIT_USER, EDIT_POST_EMAIL, EDIT_COMMENT_EMAIL } from "../types";

export function editUser(payload) {
  return (dispatch) => {
    dispatch({
      type: EDIT_AUTHUSER,
      payload
    });
    
    dispatch({
      type: EDIT_USER,
      payload
    });

    dispatch({
      type: EDIT_POST_EMAIL,
      payload
    });

    dispatch({
      type: EDIT_COMMENT_EMAIL,
      payload
    });
  }   
}