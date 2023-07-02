import { GET_SUGGESTIONS } from "../../config/shared/action.type";

const INIT_STATE = {
  suggestions: null
};

const commonReducer = (state = INIT_STATE, action: { type: string; payload: object; }) => {
  switch (action.type) {
    case GET_SUGGESTIONS: {
      console.log(action.payload)
      return { ...state, suggestions: action.payload };
    }
    default:
      return state;
  }
};
export default commonReducer;
