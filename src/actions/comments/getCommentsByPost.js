import { CREATE_COMMENT_BY_ID, CREATE_COMMENT_BY_ID_SUCCSESS, CREATE_POSTS_ERROR } from "../types";
const axios = require("axios");

export function getCommentsByPost(postId) {
  return async (dispatch) => {
    dispatch({
      type: CREATE_COMMENT_BY_ID,
    });
    return await axios
      .request({
        url: `/posts/${postId}/comments`,
        method: "GET",
        baseURL: "https://jsonplaceholder.typicode.com/",
        responseType: "json",
      })
      .then((comments)=>{
        dispatch({
          type: CREATE_COMMENT_BY_ID_SUCCSESS,
          payload: comments.data,
        });
      })
      .catch((error) => {
        console.log("Загрузка комментариев не удалась. " + error);
        dispatch({
          type: CREATE_POSTS_ERROR,
        });
      });
  };
}
