import "./App.css";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import NavButtons from "./components/navbuttons";
import Leaflet1 from "./components/leafletRoom1";
import Leaflet2 from "./components/leafletRoom2";
import Leaflet3 from "./components/leafletRoom3";
import { useState, createContext } from "react";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import { Link } from "react-router-dom";

export const UserContext = createContext({ user: null, setUser: () => {} });

function App() {
  const [hasloggedin] = useState(false);
  const [user, setUser] = useState(null); // Corrected to use useState 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <div className="mainContainer">
          <Link to="/">
            <Header />
          </Link>
          {hasloggedin ? <NavButtons /> : null}
          <Routes>
            <Route path="/" element={<NavButtons />}></Route>
            <Route path="room1" element={<Leaflet1 />}></Route>
            <Route path="room2" element={<Leaflet2 />}></Route>
            <Route path="room3" element={<Leaflet3 />}></Route>
            <Route path="signup" element={<SignupPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
