import { useState, useContext } from "react";
import { UserContext } from "../App";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3PuUCQ2CG091f43W_-hidQbQzwy8PMTo",
  authDomain: "climbing-app-c27f6.firebaseapp.com",
  projectId: "climbing-app-c27f6",
  storageBucket: "climbing-app-c27f6.appspot.com",
  messagingSenderId: "260370634692",
  appId: "1:260370634692:web:ba55c2d89bb278ac283691",
  measurementId: "G-RVCMRM5CC5",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setLoginDetails({
      email: e.target.parentElement[0].value,
      password: e.target.parentElement[1].value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
      .then((userCredential) => {
        localStorage.setItem("user", userCredential.user);
        const Authuser = {
          email: userCredential.user.email,
          accessToken: userCredential.user.accessToken,
        };
        setUser(userCredential.user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <>
      <h1>Login</h1>
      <form
        className="newClimbForm"
        onChange={handleChange}
        onSubmit={handleLogin}
      >
        <label htmlFor="loginemail">Email address</label>
        <input id="loginemail"></input>
        <label htmlFor="loginpassword">Password</label>
        <input id="loginpasword" type="password"></input>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
