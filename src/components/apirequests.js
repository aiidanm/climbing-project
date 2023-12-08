exports.getRoom1Climbs = () => {
  return fetch("https://cruxclimbingdb.onrender.com/api/climbs/room1").then(
    (data) => data.json().then((parseddata) => parseddata)
  );
};

exports.postNewClimb = (climb) => {
  console.log("climb before post", climb);
  return fetch("https://cruxclimbingdb.onrender.com/api/climbs", {
    method: "post",
    body: JSON.stringify(climb),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((climb) => console.log("climb after post", climb))
    .catch((err) => console.log("error on post", err));
};

exports.getRoom2Climbs = () => {
  return fetch("https://cruxclimbingdb.onrender.com/api/climbs/room2").then(
    (data) => data.json().then((parseddata) => parseddata)
  );
};
exports.getRoom3Climbs = () => {
  return fetch("https://cruxclimbingdb.onrender.com/api/climbs/room3").then(
    (data) => data.json().then((parseddata) => parseddata)
  );
};

exports.postNewUser = (user) => {
  return fetch ("https://cruxclimbingdb.onrender.com/api/users", {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
};

exports.login = (user) => {
  return fetch("https://cruxclimbingdb.onrender.com/api/auth/login", {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
}
