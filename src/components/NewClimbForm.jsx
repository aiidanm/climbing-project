import ColorPicker from "./colorPicker";
import { useState, useEffect } from "react";

const NewClimbForm = () => {
  const [newClimb, setNewClimb] = useState();
  const [newClimbName, setNewClimbName] = useState();
  const [newClimbRating, setNewClimbRating] = useState();
  const [newClimbColor, setNewClimbColor] = useState();
  const [newClimbPoster, setNewClimbPoster] = useState();

  const handleChange = (e) => {
    if (e.target.id === "climbnameinput") {
      setNewClimbName(e.target.value);
    }
    if (e.target.id === "selectGrade") {
      setNewClimbRating(e.target.value);
    }
    if (e.target.id === "posterinput") {
      setNewClimbPoster(e.target.value);
    }
    if (e.target.id === "colorpicker") {
      setNewClimbColor(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewClimb({newClimbColor, newClimbName, newClimbPoster, newClimbRating})
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="climbnameinput">Enter climb name </label>
      <input id="climbnameinput" onChange={handleChange}></input>
      <label htmlFor="selectGrade"></label>
      <select id="selectGrade" onChange={handleChange}>
        <option>Lower end</option>
        <option>on grade</option>
        <option>hard for grade</option>
      </select>
      <label htmlFor="posterinput">Your name</label>
      <input type={"text"} id="posterinput" onChange={handleChange}></input>
      <ColorPicker id="colorpicker" onChange={handleChange} newClimbColor={newClimbColor} setNewClimbColor={setNewClimbColor}/>
      <button type="submit">Add Climb</button>
    </form>
  );
};

export default NewClimbForm;
