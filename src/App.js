import "./App.css";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import NavButtons from "./components/navbuttons";
import Leaflet1 from "./components/leafletRoom1";
import Leaflet2 from "./components/leafletRoom2";
import Leaflet3 from "./components/leafletRoom3";
import { useState } from "react";
import UserButtons from "./components/userbuttons";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";

function App() {
  const [hasloggedin, SetHasLoggedIn] = useState(false);

  return (
    <div className="App">
      <div className="mainContainer">
        <Header />
        {hasloggedin ? <NavButtons /> : null}
        <Routes>
          <Route path="/" element={<UserButtons />}></Route>
          <Route path="room1" element={<Leaflet1 />}></Route>
          <Route path="room2" element={<Leaflet2 />}></Route>
          <Route path="room3" element={<Leaflet3 />}></Route>
          <Route path="signup" element={<SignupPage/>}></Route>
          <Route path="login" element={<LoginPage/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
