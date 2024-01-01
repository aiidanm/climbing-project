import ColorPicker from "./colorPicker";
import { useState, useContext } from "react";
import { postNewClimb } from "./apirequests";
import { UserContext } from "../App";

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
  setViewMap,
  setShowAdd,
}) => {
  const [newClimbColor, setNewClimbColor] = useState();
  const [showFormError, setShowFormError] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    if (e.target.id === "colorpicker") {
      setNewClimbColor(e.target.value);
    }
  };

  const handleAddMarker = (e) => {
    e.preventDefault();
    if (
      !newClimb.climb_name ||
      !newClimb.color ||
      !newClimb.rating
    ) {
      setShowFormError(true);
      setTimeout(() => {
        setShowFormError(false);
      }, 4000);
    } else {
      setShowFormError(false);
      setAllowAddMarker(true);
      setViewMap(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setViewForm(false);
    postNewClimb(newClimb);
    setViewMap(true);
  };

  const handleFormChange = (e) => {
    setNewClimb({
      color: e.target.parentElement.parentElement[2].value,
      climb_name: e.target.parentElement.parentElement[0].value || "black",
      rating: e.target.parentElement.parentElement[1].value,
      room: room,
      type: " ",
      posted_by: user,
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
    setShowAdd(true);
    setViewMap(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="newClimbForm"
    >
      <div className="form_item">
        <label htmlFor="climbnameinput" className="form_items">
          Enter climb name{" "}
        </label>
        <input
          id="climbnameinput"
          onChange={handleChange}
          className="form_items"
          required
        ></input>
      </div>
      <div className="form_item">
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
      </div>
      <div className="form_item">
        <label htmlFor="colorpicker">Select Climb colour</label>
        <ColorPicker
          id="colorpicker"
          onChange={handleChange}
          newClimbColor={newClimbColor}
          setNewClimbColor={setNewClimbColor}
          className="form_items"
        />
      </div>
      <button onClick={handleAddMarker}>
        {allowAddMarker
          ? "Click on the map to add the marker"
          : "click to add a marker to the map"}
      </button>
      {showFormError ? <h3>You need to add climb information first</h3> : null}
      {hasAddedMarker ? (
        <div>
          <button type="submit" className="form_items">
            Add Climb
          </button>
          <button className="form_items" onClick={handleCancel}>
            Cancel adding climb
          </button>
        </div>
      ) : null}
    </form>
  );
};

export default NewClimbForm;
