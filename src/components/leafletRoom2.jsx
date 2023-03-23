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
  import { getRoom2Climbs } from "./apirequests";
  import DisplayClimbInfo from "./displayClimbInfo";
  
  const Leaflet2 = () => {
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
      getRoom2Climbs().then((data) => {
        setMarkers((currMarkers) => {
          return data.climbs.map((climb) => [climb.xpos, climb.ypos]);
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
            url={"Room2.png"}
            bounds={[
              [0, 0],
              [500, 500],
            ]}
          />
          <MapMarkers />
          {markers.map((marker) => {
            return (
              <Circle center={marker}>
                <Popup>
                  <DisplayClimbInfo />
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
  
  export default Leaflet2;
  