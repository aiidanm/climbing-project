import "../App.css";
import { useEffect, useRef, useState } from "react";

const Room1 = () => {
  const [elementCoords, setElementCoords] = useState([]);
  const [x, setX] = useState();
  const [y, setY] = useState();

  const myRef = useRef();

  const getPosition = () => {
    const x = myRef.current.offsetLeft;
    setX(x);
    const y = myRef.current.offsetTop;
    setY(y);
  };

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);

  const handleClick = (event) => {
    var xPosition = event.clientX - x - 6.25;
    var yPosition = event.clientY - y - 6.25;

    setElementCoords((currElementCoords) => [
      ...currElementCoords,
      [xPosition, yPosition],
    ]);
  };
  return (
    <div className="room1page_container">
      <div className="room1_img_div" onClick={handleClick} ref={myRef}>
        {elementCoords.map((coords) => {
          return (
            <button
              className="click_buttons"
              style={{
                position: "fixed",
                left: coords[0] + x,
                top: coords[1] + y,
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
