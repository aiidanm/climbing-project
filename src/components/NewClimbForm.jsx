import ColorPicker from "./colorPicker";
import { useState, useEffect } from "react";
import { getAllClimbs } from "./apirequests";

const NewClimbForm = ({mode, setMode}) => {
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
    setMode("view")
    setNewClimb({color: newClimbColor, climb_name: newClimbName, poster_name: newClimbPoster, rating: newClimbRating, room: 1})
  };

  useEffect(() => {
    console.log(newClimb)
  }, [newClimb])


  return (
    <form onSubmit={handleSubmit} className="newClimbForm">
      <label htmlFor="climbnameinput" className="form_items">Enter climb name </label>
      <input id="climbnameinput" onChange={handleChange} className="form_items"></input>
      <label htmlFor="selectGrade" className="form_items">Rating for grade</label>
      <select id="selectGrade" onChange={handleChange} className="form_items">
        <option>Lower end</option>
        <option>on grade</option>
        <option>hard for grade</option>
      </select>
      <label htmlFor="posterinput" className="form_items">Your name</label>
      <input type={"text"} id="posterinput" onChange={handleChange} className="form_items"></input>
      <label htmlFor="colorpicker">Select Climb colour</label>
      <ColorPicker id="colorpicker" onChange={handleChange} newClimbColor={newClimbColor} setNewClimbColor={setNewClimbColor} className="form_items"/>
      <button type="submit" className="form_items">Add Climb</button>
      <button className="form_items">Cancel adding climb</button>
    </form>
  );
};

export default NewClimbForm;
