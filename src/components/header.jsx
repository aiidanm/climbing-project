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
    
      {user ? <p>logged in as: {user}</p> : null}

      
      {user ? <button onClick={onLogoutClick}>LogOut</button> : null}
      
    </>
  );
};

export default Header;
