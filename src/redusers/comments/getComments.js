import {
  CREATE_COMMENTS,
  CREATE_COMMENTS_SUCCSESS,
  CREATE_COMMENTS_ERROR,
  CREATE_COMMENT_BY_ID,
  CREATE_COMMENT_BY_ID_SUCCSESS,
  CREATE_FULL_COMMENTS,
  CREATE_FULL_COMMENTS_SUCCSESS,
  NEW_COMMENT,
  EDIT_COMMENT_EMAIL,
  READY,
  LOADING,
  ERROR,
} from "../../actions/types";

const INITIAL_STATE = { loadedComments: [], isFull: false, isFullComment: false, addedComments: [] };

export const getComments = (state = INITIAL_STATE, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_COMMENTS:
      Object.assign(newState, { status: LOADING });
      return newState;
    case CREATE_FULL_COMMENTS:
      Object.assign(newState, { status: LOADING });
      return newState;
    case CREATE_COMMENT_BY_ID:
      Object.assign(newState, { status: LOADING });
      return newState;
    case CREATE_COMMENT_BY_ID_SUCCSESS:
      let comment = newState.loadedComments.concat(action.payload);
      Object.assign(newState, { loadedComments: comment, status: READY });
      return newState;
    case CREATE_COMMENTS_SUCCSESS:
      Object.assign(newState, { loadedComments: action.payload, status: READY, isFull: true });
      return newState;
    case CREATE_FULL_COMMENTS_SUCCSESS:
      Object.assign(newState, {
        loadedComments: action.payload.concat(state.addedComments),
        status: READY,
        isFull: true,
        isFullComment: true,
        addedComments: [],
      });
      return newState;
    case NEW_COMMENT:
      if (state.isFull) {
        let newComment = newState.loadedComments.concat([action.payload]);
        Object.assign(newState, { loadedComments: newComment });
      } else {
        let newComment = newState.addedComments.concat([action.payload]);
        Object.assign(newState, { addedComments: newComment });
      }
      return newState;
    case EDIT_COMMENT_EMAIL:
      const newUserEmail = newState.loadedComments.map((comment) => {
        if (comment.userId == action.payload.id) {
          comment.email = action.payload.email;
        }
        return comment;
      });
      Object.assign(newState, { loadedComments: newUserEmail });
      return newState;
    case CREATE_COMMENTS_ERROR:
      Object.assign(newState, { loadedComments: [], status: ERROR });
      return newState;
    default:
      return state;
  }
};
