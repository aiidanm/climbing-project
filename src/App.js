import "./App.css";
import Header from "./components/header";
import { Routes, Route, Navigate } from "react-router-dom";
import NavButtons from "./components/navbuttons";
import Leaflet1 from "./components/leafletRoom1";
import Leaflet2 from "./components/leafletRoom2";
import Leaflet3 from "./components/leafletRoom3";
import Wall from "./components/wall.js";
import Room from "./components/room.js";
import { useState, createContext, useEffect } from "react";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import { Link } from "react-router-dom";

export const UserContext = createContext({ user: null, setUser: () => {} });
const ADMIN = true;

function App() {
  const [user, setUser] = useState(null); // Corrected to use useState

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
          <Link to="/">
            <Header />
          </Link>

          {user || ADMIN ? (
            <Routes>
              <Route path="/" element={<NavButtons />}></Route>
              <Route path="room1" element={<Leaflet1 />}></Route>
              <Route path="room2" element={<Leaflet2 />}></Route>
              <Route path="room3" element={<Leaflet3 />}></Route>
              <Route path="wall/:wallName/:view" element={<Wall />}></Route>
              <Route path="room" element={<Room />}></Route>
              <Route path="signup" element={<SignupPage />}></Route>
            </Routes>
          ) : (
            <div className="nav_container">
            <Link to="/signup">
            <button id="room1button">Signup</button>
            </Link>
            <Link to="/login">
            <button>Login</button>
            </Link>
            
            </div>
          )}

          <Routes>
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
