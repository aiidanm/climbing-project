exports.getRoom1Climbs = () => {
  return fetch("https://climbdbtake2.onrender.com/api/climbs/room1").then((data) =>
    data.json()
  );
};

exports.postNewClimb = (climb) => {
  return fetch("https://climbdbtake2.onrender.com/api/climbs/room1", {
    method: "post",
    body: JSON.stringify(climb),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

exports.getRoom2Climbs = () => {
  return fetch("https://climbdbtake2.onrender.com/api/climbs/room2").then((data) =>
    data.json()
  );
};
exports.getRoom3Climbs = () => {
  return fetch("https://climbdbtake2.onrender.com/api/climbs/room3").then((data) =>
    data.json()
  );
};
