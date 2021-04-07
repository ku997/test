import { NEW_COMMENT } from "../types";

export function newComment(comment) {
  return {
    type: NEW_COMMENT,
    payload: comment,
  };
}
