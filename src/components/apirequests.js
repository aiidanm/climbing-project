exports.getAllClimbs = () => {
  return fetch("https://climbdbtake2.onrender.com/api/climbs").then((data) =>
    data.json()
  );
};

exports.postNewClimb = () => {
  return fetch("https://climbdbtake2.onrender.com/api/climbs", {
    method: "post",
    body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
