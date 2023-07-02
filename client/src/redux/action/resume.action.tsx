import jwtAxios from "../../config/service/api/jwt-auth";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, GET_SUGGESTIONS, LOGOUT_USER, SHOW_MESSAGE } from "../../config/shared/action.type";

export const uploadFile = (formData, cb) => {
  return (dispatch: any) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .post("/resume/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((data) => {
        dispatch({ type: SHOW_MESSAGE, payload: 'File uploaded succesfully!' });
        dispatch({type: FETCH_SUCCESS})
        cb()
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.messsage });
        console.log(error);
      });
  };
};

export const getSuggestions = (cb) => {
  return (dispatch: any) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .get("/resume/suggestions")
      .then((data) => {
        dispatch({ type: GET_SUGGESTIONS, payload: data.data?.suggestions });
        console.log(data)
        dispatch({type: FETCH_SUCCESS})
        cb()
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.messsage });
        console.log(error);
      });
  };
};


export const logoutUser = () => {
  return (dispatch: any) => dispatch({type: LOGOUT_USER});
}