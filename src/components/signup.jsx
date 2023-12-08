import { useState } from "react";
import { postNewUser } from "./apirequests";

const SignupPage = () => {
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [doPasswordMatch, SetdoPasswordMatch] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", password: "", email: "" });

  const handleChange = (e) => {
    setNewUser({
      name: e.target.parentElement[0].value,
      password: e.target.parentElement[2].value,
      email: e.target.parentElement[1].value,
    });
  };
  const handleSubmit = (e) => {
    console.log(newUser );
    e.preventDefault();
    if (e.target[3].value !== e.target[2].value) {
      setPasswordMatchError(true);
      SetdoPasswordMatch(false);
      setTimeout(() => {
        setPasswordMatchError(false);
      }, 3000);
    } else {
      console.log("new user submitted")
      postNewUser(newUser)
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
      {passwordMatchError ? (
        <h2>Password and confirmation dont match</h2>
      ) : null}
      <button className="form_items">Signup!</button>
    </form>
  );
};

export default SignupPage;
