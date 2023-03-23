import "./App.css";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import NavButtons from "./components/navbuttons";
import Leaflet1 from "./components/leafletRoom1";
import Leaflet2 from "./components/leafletRoom2";
import Leaflet3 from "./components/leafletRoom3";


function App() {
  return (
    <div className="App">
      <Header />
      <NavButtons />
      <Routes>
        <Route path="room1" element={<Leaflet1 />}></Route>
        <Route path="room2" element={<Leaflet2 />}></Route>
        <Route path="room3" element={<Leaflet3 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
