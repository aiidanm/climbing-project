import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const onLogoutClick = (e) => {
    e.preventDefault();
    setUser();
    localStorage.clear();
  };

  return (
    <>
      <img
        src="Cruxlogo.png"
        id="logo"
        alt="the word Crux but the c is a carabiner"
      ></img>
      <p className="hiremelink">
        <a href="https://www.linkedin.com/in/aidanalexandermurray/">
          hire me pls
        </a>
      </p>
      <p>logged in as: {user}</p>
      <button onClick={onLogoutClick}>LogOut</button>
    </>
  );
};

export default Header;
