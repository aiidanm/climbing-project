import ColorPicker from "./colorPicker";
import { useState, useEffect } from "react";

const NewClimbForm = ({
  setMarkers,
  hasAddedMarker,
  setHasAddedMarker,
  setAllowAddMarker,
  allowAddMarker,
  setViewForm,
  newClimb,
  setNewClimb,
  room,
}) => {
  const [newClimbName, setNewClimbName] = useState();
  const [newClimbRating, setNewClimbRating] = useState();
  const [newClimbColor, setNewClimbColor] = useState();
  const [newClimbPoster, setNewClimbPoster] = useState();
  const [markerError, setMarkerError] = useState(false);

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

  const handleAddMarker = (e) => {
    e.preventDefault();
    setAllowAddMarker(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasAddedMarker) {
      setMarkerError(true);
      setTimeout(() => setMarkerError(false), 3000)
      return;
    } else {
      setViewForm(false);
      setNewClimb({
        color: newClimbColor,
        climb_name: newClimbName,
        poster_name: newClimbPoster,
        rating: newClimbRating,
        room: room,
      });
      //submit climb to database here
    }
  };

  const handleCancel = (e) => {
    e.preventDefault()
    setHasAddedMarker(false)
    setAllowAddMarker(false)
    setViewForm(false)
    setNewClimb({})
    setMarkers((currMarkers) => {
      const newMarkers = [...currMarkers]
      newMarkers.pop()
      return newMarkers
    })
  }

  useEffect(() => {
    console.log(newClimb);
  }, [newClimb]);

  return (
    <form onSubmit={handleSubmit} className="newClimbForm">
      <label htmlFor="climbnameinput" className="form_items">
        Enter climb name{" "}
      </label>
      <input
        id="climbnameinput"
        onChange={handleChange}
        className="form_items"
        required
      ></input>
      <label htmlFor="selectGrade" className="form_items">
        Rating for grade
      </label>
      <select
        id="selectGrade"
        onChange={handleChange}
        className="form_items"
        required
      >
        <option value={"1"}>Lower end</option>
        <option value={"2"}>on grade</option>
        <option value={"3"}>hard for grade</option>
      </select>
      <label htmlFor="posterinput" className="form_items">
        Your name
      </label>
      <input
        type={"text"}
        id="posterinput"
        onChange={handleChange}
        className="form_items"
        required
      ></input>
      <label htmlFor="colorpicker">Select Climb colour</label>
      <ColorPicker
        id="colorpicker"
        onChange={handleChange}
        newClimbColor={newClimbColor}
        setNewClimbColor={setNewClimbColor}
        className="form_items"
      />
      <button onClick={handleAddMarker}>
        {allowAddMarker
          ? "Click on the map to add the marker"
          : "click to add a marker to the map"}
      </button>
      <button type="submit" className="form_items">
        Add Climb
      </button>
      {markerError ? <h3>You need to add a marker for this climb!</h3> : null}
      <button className="form_items" onClick={handleCancel}>Cancel adding climb</button>
    </form>
  );
};

export default NewClimbForm;
