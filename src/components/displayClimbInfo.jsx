import { useEffect, useState } from "react";

const DisplayClimbInfo = ({ climb }) => {
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (climb.rating === 1) {
      setRating("easy for grade");
    } else if (climb.rating === 2) {
      setRating("On grade");
    } else if (climb.rating === 3) {
      setRating("hard for grade");
    }
  }, [climb]);

  return (
    <div className="climbinfo_container">
      <h3>{climb.climb_name}</h3>
      <h4>Posted by: {climb.poster_name}</h4>
      <p>Rated: {rating}</p>
      <p>Comments: {climb.description}</p>
    </div>
  );
};

export default DisplayClimbInfo;
