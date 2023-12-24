require("dotenv").config();

exports.getRoom1Climbs = () => {
  return fetch("https://climbingdatabasefirebase.onrender.com/climbs/all").then(
    (data) =>
      data.json().then((climbs) => {
        const room1 = climbs.filter((climb) => climb.room === 1);
        return room1;
      })
  );
};

exports.postNewClimb = (climb) => {
  return fetch("https://climbingdatabasefirebase.onrender.com/climbs", {
    method: "post",
    body: JSON.stringify(climb),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).catch((err) => console.log("error on post", err));
};

exports.getRoom2Climbs = () => {
  return fetch("https://climbingdatabasefirebase.onrender.com/climbs/all").then(
    (data) =>
      data.json().then((climbs) => {
        const room2 = climbs.filter((climb) => climb.room === 2);
        return room2;
      })
  );
};
exports.getRoom3Climbs = () => {
  return fetch("https://climbingdatabasefirebase.onrender.com/climbs/all").then(
    (data) =>
      data.json().then((climbs) => {
        const room3 = climbs.filter((climb) => climb.room === 3);
        return room3;
      })
  );
};

exports.postNewUser = (user) => {
  return fetch("https://climbingdatabasefirebase.onrender.com/api/signup", {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) =>
    res.json().then((parsedRes) => {
      if (parsedRes.error) {
        return parsedRes.error;
      } else {
        return parsedRes.user;
      }
    })
  );
};

exports.login = (user) => {

  return fetch("https://climbingdatabasefirebase.onrender.com/api/signin", {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((user) => user.json().then((parsedUser) => console.log(parsedUser)));
};
