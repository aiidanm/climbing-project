import './App.css';
import Room1 from './components/room1';
import Header from './components/header';
import {Routes, Route}  from "react-router-dom"
import NavButtons from './components/navbuttons';

function App() {
  return (
    <div className="App">
      <Header />
      <NavButtons />
      <Routes>
      <Route path='/room1' element={<Room1 />}></Route>

      </Routes>
    </div>
  );
}

export default App;
