import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  UPDATING_CONTENT
} from "../../config/shared/action.type";

const INIT_STATE = {
  error: "",
  loading: false,
  updatingContent: false,
  displayMessage: "",
  user: null
};

const commonReducer = (state = INIT_STATE, action: { type: string; payload: object; }) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: "", displayMessage: "", loading: true };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        displayMessage: "",
        updatingContent: false,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        error: "",
        displayMessage: "",
        loading: false,
        updatingContent: false,
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        error: '',
        displayMessage: action.payload,
        loading: false,
        updatingContent: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        loading: false,
        error: '',
        displayMessage: '',
        updatingContent: false,
      };
    }
    case UPDATING_CONTENT: {
      return {...state, error: '', displayMessage: '', updatingContent: true};
    }
    default:
      return state;
  }
};
export default commonReducer;
