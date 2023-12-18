import { useState } from "react";
import { postNewUser } from "./apirequests";

const SignupPage = () => {
  const [showSignupError, setShowSignupError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [newUser, setNewUser] = useState({ name: "", password: "", email: "" });

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
      postNewUser(newUser).then((response) => {
        if (response.message){
          setErrorMessage(response.message)
          setShowSignupError(true)
          setTimeout(() => {
            setShowSignupError(false)
          },3000)
        }
        else {
          setErrorMessage("Signup Successful, please return to the login screen to login")
          setShowSignupError(true)
          setTimeout(() => {
            setShowSignupError(false)
          },3000)
        }
        })
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
      {showSignupError ? (
        <h2>{errorMessage}</h2>
      ) : null}
      <button className="form_items">Signup!</button>
    </form>
  );
};

export default SignupPage;
