import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import "./signup.css";
// import signupGraphic from "../../assets/img/signup_graphic.png";
import signupGraphic from "../../assets/img/signup_graphic.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_ERROR,
  GET_USER_DETAILS,
  SHOW_MESSAGE,
} from "../../config/shared/action.type";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // if user already logged in, redirect to home page
  const { user }: { user: any } = useSelector(
    ({ user }: { user: any }) => user
  );
  if (user) {
    navigate("/");
  }

  const login = useGoogleLogin({
    onSuccess: async (response: any) => {
      console.log(response);
      const userDataResponse = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
      );

      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();

        fetch(process.env.REACT_APP_API_KEY + "/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            console.log(response);
            if (!response.ok) {
              throw new Error("Request failed with status " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log("called in data", data);
            dispatch({ type: GET_USER_DETAILS, payload: data.user });
            localStorage.setItem("token", data.token);
            dispatch({ type: SHOW_MESSAGE, payload: "Successful login" });
            navigate('/')
          })
          .catch((error) => {
            dispatch({ type: FETCH_ERROR, payload: error.message });
          });
      } else {
        console.error("Failed to fetch user data from Google API");
      }
    },
  });

  return (
    <div className="signup-wrapper">
      <section className="signup-left">
        <div className="logo">
          <h1 style={{fontSize: "28px"}}>ProfileX</h1>
        </div>
        <div className="login-form-container">
          <div className="signup-greet">
            <h3>Welcome to ProfileX</h3>
            <p>Login with your trusted platform to continue.</p>
          </div>

          <div className="login-platforms">
            <button className="login-platform-btn" onClick={() => login()}>
              <FcGoogle />
              Google
            </button>
            {/* <button className="login-platform-btn">
              <AiFillFacebook fill="#1877F2" />
              Facebook
            </button> */}
          </div>

          <p className="signup-tnc">
            Account creation grants us data handling and storage permission.
          </p>
        </div>
      </section>

      <section className="signup-right">
        <img src={signupGraphic} alt="signup-graphic" />
      </section>
    </div>
  );
};

export default SignUpPage;
