import { CREATE_POST_BY_ID, CREATE_POST_BY_ID_SUCCSESS, CREATE_POSTS_ERROR } from "../types";
import { getItemsById } from "../../queries";

export function getPostById(postId) {
  return async (dispatch) => {
    dispatch({
      type: CREATE_POST_BY_ID,
    });
    return await Promise.resolve(getItemsById('posts', postId))
      .then((post) => {
        return Promise.resolve(getItemsById('users', post.data.userId))
        .then((user)=>{
          let newPost = Object.assign(post.data, { userEmail: user.data.email });
          dispatch({
            type: CREATE_POST_BY_ID_SUCCSESS,
            payload: newPost,
          });
        })
      })
      .catch((error) => {
        console.log("Загрузка постов не удалась. " + error);
        dispatch({
          type: CREATE_POSTS_ERROR,
        });
      });
  };
}
