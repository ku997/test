import { GET_CURRENT_POST_ID } from "../types";

export function getCurrentPostId(postId) {
    return {
      type: GET_CURRENT_POST_ID,
      payload: postId,
    }
}