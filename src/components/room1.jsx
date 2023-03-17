import "../App.css";
import { useState } from "react";

const Room1 = () => {
  const [elementCoords, setElementCoords] = useState([]);

  const handleClick = (event) => {
    console.log(event.currentTarget.getBoundingClientRect())
    let targetRect = event.currentTarget.getBoundingClientRect();
    var xPosition = event.clientX  - 6.25;
    var yPosition = event.clientY  - 6.25;

    setElementCoords((currElementCoords) => [
      ...currElementCoords,
      [xPosition, yPosition],
    ]);
  };
  return (
    <div className="room1page_container">
      <div className="room1_img_div" onClick={handleClick}>
        {elementCoords.map((coords) => {
          return (
            <button
              className="click_buttons"
              style={{
                position: "fixed",
                left: coords[0],
                top: coords[1],
                border: "2px solid black",
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Room1;
