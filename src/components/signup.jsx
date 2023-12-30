import { useState, useContext } from "react";
import { UserContext } from "../App";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";

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

const SignupPage = () => {
  const [showSignupError, setShowSignupError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newUser, setNewUser] = useState({ name: "", password: "", email: "" });
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({
      name: e.target.parentElement[0].value,
      password: e.target.parentElement[2].value,
      email: e.target.parentElement[1].value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[3].value !== e.target[2].value) {
      setShowSignupError(true);
      setTimeout(() => {
        setShowSignupError(false);
      }, 3000);
    } else {
      createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then((userCredential) => {
          setErrorMessage("Signing up and logging in...");
          setShowSignupError(true);
          localStorage.setItem("user", JSON.stringify(userCredential.user));
          
          updateProfile(auth.currentUser, {
            displayName: `${newUser.name}`,
          }).then(() => {
            setUser(newUser.name)
            setTimeout(() => {
              navigate("/room1");
            }, 1000);
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage) {
            setErrorMessage(errorMessage);
            setShowSignupError(true);
            setTimeout(() => {
              setShowSignupError(false);
            }, 3000);
          }
        });
    }
  };

  const handlePasswordConfirm = (e) => {
    console.log(e.target.value);
  };

  return (
    <form className="newClimbForm" onSubmit={handleSubmit}>
      <label htmlFor="nameinput">Enter your display name</label>
      <input
        id="nameinput"
        onChange={handleChange}
        className="form_items"
        required
      ></input>
      <label htmlFor="EmailSignupInput">Enter your email address</label>
      <input
        id="EmailSignupInput"
        onChange={handleChange}
        className="form_items"
        required
      ></input>
      <label htmlFor="PasswordSignupInput">Enter your password</label>
      <input
        id="PasswordSignupInput"
        onChange={handleChange}
        className="form_items"
        required
        type="password"
      ></input>
      <label htmlFor="PasswordSignupInput">Confirm password</label>
      <input
        id="PasswordSignupInput2"
        onChange={handlePasswordConfirm}
        className="form_items"
        required
        type="password"
      ></input>
      {showSignupError ? <h2>{errorMessage}</h2> : null}
      <button className="form_items">Signup!</button>
    </form>
  );
};

export default SignupPage;
