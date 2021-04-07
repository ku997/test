import {
  CREATE_POSTS,
  CREATE_POSTS_SUCCSESS,
  CREATE_POSTS_ERROR,
  CREATE_POST_BY_ID,
  CREATE_POST_BY_ID_SUCCSESS,
  GET_CURRENT_POST_ID,
  CREATE_FULL_POSTS,
  CREATE_FULL_POSTS_SUCCSESS,
  EDIT_POST_EMAIL,
  READY,
  LOADING,
  ERROR,
} from "../../actions/types";

const INITIAL_STATE = { loadedPosts: [], isFull: false, currentPost: -1, isFullPost: false };

export const getPosts = (state = INITIAL_STATE, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_POSTS:
      Object.assign(newState, { status: LOADING });
      return newState;
    case CREATE_FULL_POSTS:
      Object.assign(newState, { status: LOADING });
      return newState;
    case CREATE_POST_BY_ID:
      Object.assign(newState, { status: LOADING });
      return newState;
    case CREATE_POST_BY_ID_SUCCSESS:
      let post = newState.loadedPosts.concat([action.payload]);
      Object.assign(newState, { loadedPosts: post, status: READY });
      return newState;
    case CREATE_POSTS_SUCCSESS:
      Object.assign(newState, { loadedPosts: action.payload, status: READY, isFull: true });
      return newState;
    case CREATE_FULL_POSTS_SUCCSESS:
      const editFullPosts = action.payload.map((post) => {
        if (post.userId === action.payload.id) {
          post.userEmail = action.payload.email;
        }
        return post;
      });
      Object.assign(newState, { loadedPosts: editFullPosts, status: READY, isFull: true, isFullPost: true });
      return newState;
    case GET_CURRENT_POST_ID:
      Object.assign(newState, { currentPost: action.payload });
      return newState;
    case CREATE_POSTS_ERROR:
      Object.assign(newState, { loadedPosts: [], status: ERROR });
      return newState;
    case EDIT_POST_EMAIL:
      const newUserEmail = newState.loadedPosts.map((post) => {
        if (post.userId === action.payload.id) {
          post.userEmail = action.payload.email;
        }
        return post;
      });
      Object.assign(newState, { loadedPosts: newUserEmail });
      return newState;
    default:
      return state;
  }
};
