import {
  CREATE_FULL_POSTS,
  CREATE_FULL_POSTS_SUCCSESS,
  CREATE_POSTS_ERROR,
  CREATE_USERS,
  CREATE_USERS_SUCCSESS,
  CREATE_USERS_ERROR,
} from "../types";
import { getItems } from "../../queries";

export function getFullPosts() {
  return async (dispatch, getState) => {
    let users = Object.assign([], getState().users.loadedUsers),
      posts = Object.assign([], getState().posts.loadedPosts);
    dispatch({
      type: CREATE_FULL_POSTS,
    });
    if (getState().users.loadedUsers.length === 0 || !getState().posts.isFull) {
      dispatch({
        type: CREATE_USERS,
      });
      await Promise.resolve(getItems('users'))
        .then((value) => {
          users = Object.assign([],value.data);
          if (getState().authUser.edited)
            users = users.map((user) => {
              user.id == getState().authUser.id && (user.email = getState().authUser.email);
              return user
            });
          dispatch({
            type: CREATE_USERS_SUCCSESS,
            payload: users,
          });
        })
        .catch((error) => {
          console.log("Загрузка пользователей не удалась. " + error);
          dispatch({
            type: CREATE_USERS_ERROR,
          });
        });
    }
    if (getState().posts.loadedPosts.length === 0 || !getState().posts.isFull) {
      await Promise.resolve(getItems('posts'))
        .then((value) => {
          posts = Object.assign([],value.data);
          const FULL_POSTS = posts.map((post) => {
            users.forEach((user) => post.userId === user.id && (post.userEmail = user.email));
            return post;
          });
          dispatch({
            type: CREATE_FULL_POSTS_SUCCSESS,
            payload: FULL_POSTS,
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: CREATE_POSTS_ERROR,
          });
        });
    } else {
      const FULL_POSTS = posts.map((post) => {
        users.forEach((user) => post.userId === user.id && (post.userEmail = user.email));
        return post;
      });
      dispatch({
        type: CREATE_FULL_POSTS_SUCCSESS,
        payload: FULL_POSTS,
      });
    }
  };
}
