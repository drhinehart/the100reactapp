import {
  FETCH_TOKEN,
  FETCH_TOKEN_RESULT,
  FETCH_TOKEN_ERROR,
  DECODE_TOKEN,
  DECODE_TOKEN_RESULT,
  DECODE_TOKEN_ERROR,
  REMOVE_TOKEN,
  REMOVE_TOKEN_ERROR
} from "../actions/authentication";

const initialState = {
  appLoading: true,
  isLoading: false,
  isAuthed: false,
  user: {},
  token: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN:
      return {
        ...state,
        username: action.username,
        password: action.password,
        isLoading: true
      };
    case FETCH_TOKEN_RESULT:
      return {
        ...state,
        token: action.token
      };
    case FETCH_TOKEN_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isAuthed: false
      };
    case DECODE_TOKEN:
      return {
        ...state,
        token: action.token,
        isLoading: true
      };
    case DECODE_TOKEN_RESULT:
      return {
        ...state,
        user: action.result,
        isLoading: false,
        isAuthed: true
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        isAuthed: false,
        isLoading: false,
        user: {},
        token: ""
      };
    case REMOVE_TOKEN_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isAuthed: false,
        user: {},
        token: ""
      };
    default:
      return state;
  }
};
