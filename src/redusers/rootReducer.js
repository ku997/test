import { combineReducers } from "redux";
import { getAuthUser } from "./users/getAuthUser";
import { getUsers } from "./users/getUsers";
import { getPosts } from "./posts/getPosts";
import { getComments } from "./comments/getComments";
import { getPagState } from "./pagination/getPagState";
import { getFilterCommentsState } from "./comments/getFilterCommentsState";
import { getSearchState } from "./users/getSearchState";
import { getUsersPagState } from "./users/getUsersPagState";

export const rootReducer = combineReducers({
  authUser: getAuthUser,
  users: getUsers,
  posts: getPosts,
  comments: getComments,
  pagState: getPagState,
  usersPagState: getUsersPagState,
  filterСommentsState: getFilterCommentsState,
  searchState: getSearchState
});
