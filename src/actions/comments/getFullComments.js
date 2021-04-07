import {
  CREATE_FULL_COMMENTS,
  CREATE_FULL_COMMENTS_SUCCSESS,
  CREATE_COMMENTS_ERROR,
  CREATE_POSTS,
  CREATE_POSTS_SUCCSESS,
  CREATE_POSTS_ERROR,
} from "../types";
import { getItems } from "../../queries";

export function getFullComments() {
  return async (dispatch, getState) => {
    let comments =Object.assign([], getState().comments.loadedComments),
      posts = Object.assign([], getState().posts.loadedPosts);
    dispatch({
      type: CREATE_FULL_COMMENTS,
    });
    if (getState().posts.loadedPosts.length === 0 || !getState().posts.isFull) {
      dispatch({
        type: CREATE_POSTS,
      });
      await Promise.resolve(getItems("posts"))
        .then((value) => {
          dispatch({
            type: CREATE_POSTS_SUCCSESS,
            payload: value.data,
          });
          posts = Object.assign([], value.data);
        })
        .catch((error) => {
          console.log("Загрузка постов не удалась. " + error);
          dispatch({
            type: CREATE_POSTS_ERROR,
          });
        });
    }
    if (getState().comments.loadedComments.length === 0 || !getState().comments.isFull) {
      await Promise.resolve(getItems("comments"))
        .then((value) => {
          comments = Object.assign([], value.data);
          const FULL_COMMENTS = comments.map((comment) => {
            posts.forEach((post) => post.id == comment.postId && (comment.postTitle = post.title));
            comment.email == getState().authUser.initialEmail &&
              getState().authUser.edited &&
              (comment.email = getState().authUser.email);
            return comment;
          });
          dispatch({
            type: CREATE_FULL_COMMENTS_SUCCSESS,
            payload: FULL_COMMENTS,
          });
        })
        .catch((error) => {
          console.log(error);
          console.log("Загрузка комментариев не удалась. " + error);
          dispatch({
            type: CREATE_COMMENTS_ERROR,
          });
        });
    } else {
      const FULL_COMMENTS = comments.map((comment) => {
        posts.forEach((post) => +post.id === +comment.postId && (comment.postTitle = post.title));
        return comment;
      });
      dispatch({
        type: CREATE_FULL_COMMENTS_SUCCSESS,
        payload: FULL_COMMENTS,
      });
    }
  };
}
