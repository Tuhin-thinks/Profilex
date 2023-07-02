import jwtAxios from "../../config/service/api/jwt-auth";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, GET_USER_DETAILS, LOGOUT_USER, SHOW_MESSAGE } from "../../config/shared/action.type";

export const getUserDetails = () => {
  return (dispatch: any) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .get("/auth/verify")
      .then((data) => {
        dispatch({type: GET_USER_DETAILS, payload: data?.data?.user})
        dispatch({type: FETCH_SUCCESS})
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: '' });
        console.log(error)
      });
  };
}

// export const createUser = (userJson) => {
//   console.log("called here", userJson);
//   return (dispatch) => {
//     dispatch({ type: FETCH_START });
//     jwtAxios
//       .post("/auth/signup", userJson)
//       .then((data) => {
//         console.log("called in data", data);
//         dispatch({ type: GET_USER_DETAILS, payload: data.data?.user });
//         localStorage.setItem("token", data.data?.token);
//         dispatch({ type: SHOW_MESSAGE, payload: 'Successful login' });
//         // cb();
//       })
//       .catch((error) => {
//         dispatch({ type: FETCH_ERROR, payload: error.message });
//       });
//   };
// };

export const createUser = (userJson) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });

    fetch(process.env.REACT_APP_API_KEY+"/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userJson,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("called in data", data);
        dispatch({ type: GET_USER_DETAILS, payload: data.user });
        localStorage.setItem("token", data.token);
        dispatch({type: FETCH_SUCCESS})
        dispatch({ type: SHOW_MESSAGE, payload: "Successful login" });
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const logoutUser = () => {
  return (dispatch: any) => dispatch({type: LOGOUT_USER});
}