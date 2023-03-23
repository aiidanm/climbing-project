import {
  MapContainer,
  Popup,
  ImageOverlay,
  useMapEvents,
  Circle,
} from "react-leaflet";
import { useState, useEffect } from "react";
import NewClimbForm from "./NewClimbForm";
import { CRS } from "leaflet";
import { getRoom1Climbs } from "./apirequests";
import DisplayClimbInfo from "./displayClimbInfo";

const Leaflet1 = () => {
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState("view");

  const MapMarkers = () => {
    useMapEvents({
      click(e) {
        if (mode !== "addClimb") return;
        setMarkers((currMarkers) => {
          setMode("makingClimb");
          return [...currMarkers, [e.latlng.lat, e.latlng.lng]];
        });
      },
    });
  };

  useEffect(() => {
    getRoom1Climbs().then((data) => {
      setMarkers((currMarkers) => {
        return data.climbs;
      });
    });
  }, []);

  return (
    <div className="room1_container">
      <MapContainer
        center={[250, 250]}
        zoom={0}
        scrollWheelZoom={true}
        id="map"
        crs={CRS.Simple}
        maxBounds={[
          [0, 0],
          [1000, 1000],
        ]}
        maxBoundsViscosity={10}
      >
        <ImageOverlay
          attribution="aidanMurray"
          url={"Room1.png"}
          bounds={[
            [0, 0],
            [500, 500],
          ]}
        />
        <MapMarkers />
        {markers.map((climb) => {
          return (
            <Circle center={[climb.xpos, climb.ypos]}>
              <Popup>
                <DisplayClimbInfo climb={climb}/>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
      <button onClick={() => setMode("addClimb")}>Add a new climb!</button>
      {mode === "makingClimb" ? (
        <NewClimbForm setMode={setMode} mode={mode} />
      ) : null}
    </div>
  );
};

export default Leaflet1;
