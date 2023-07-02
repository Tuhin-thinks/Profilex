import { GET_USER_DETAILS, LOGOUT_USER } from "../../config/shared/action.type";

const INIT_STATE = {
  user: null,
};

const userReducer = (
  state = INIT_STATE,
  action: { type: string; payload: any }
) => {
  const {type, payload} = action
  switch (type) {
    case GET_USER_DETAILS: {
      return { ...state, user: payload };
    }
    case LOGOUT_USER: {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};
export default userReducer;
