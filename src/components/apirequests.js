exports.getRoom1Climbs = () => {
  return fetch("https://cruxclimbingdb.onrender.com/api/climbs/room1").then(
    (data) => data.json()
  )
};

exports.postNewClimb = (climb) => {
  console.log("climb before post", climb)
  return fetch("https://cruxclimbingdb.onrender.com/api/climbs", {
    method: "post",
    body: JSON.stringify(climb),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((climb) => console.log("climb after post", climb))
  .catch((err) => console.log("error on post", err));
};

exports.getRoom2Climbs = () => {
  return fetch("https://cruxclimbingdb.onrender.com/api/climbs/room2").then(
    (data) => data.json()
  );
};
exports.getRoom3Climbs = () => {
  return fetch("https://cruxclimbingdb.onrender.com/api/climbs/room3").then(
    (data) => data.json()
  );
};


