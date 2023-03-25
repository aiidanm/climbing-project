import ColorPicker from "./colorPicker";
import { useState } from "react";
import { postNewClimb } from "./apirequests";

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
  const [newClimbColor, setNewClimbColor] = useState();
  const [markerError, setMarkerError] = useState(false);

  const handleChange = (e) => {
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
      setTimeout(() => setMarkerError(false), 3000);
      return;
    } else {
      setViewForm(false);
      postNewClimb(newClimb);
    }
  };

  const handleFormChange = (e) => {
    setNewClimb({
      color: e.target.parentElement[4].value,
      climb_name: e.target.parentElement[0].value,
      poster_name: e.target.parentElement[2].value,
      rating: e.target.parentElement[1].value,
      room: room,
      description: e.target.parentElement[3].value,
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setHasAddedMarker(false);
    setAllowAddMarker(false);
    setViewForm(false);
    setNewClimb({});
    if (hasAddedMarker) {
      setMarkers((currMarkers) => {
        const newMarkers = [...currMarkers];
        newMarkers.pop();
        return newMarkers;
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="newClimbForm"
    >
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
      <label htmlFor="descriptioninput">Enter comments on climb</label>
      <input id="descriptioninput"></input>
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
      <button className="form_items" onClick={handleCancel}>
        Cancel adding climb
      </button>
    </form>
  );
};

export default NewClimbForm;
