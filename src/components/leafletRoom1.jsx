import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  ImageOverlay,
} from "react-leaflet";
import { useState } from "react";
import NewClimbForm from "./NewClimbForm";

import * as l from "leaflet";

const Leaflet1 = () => {
  const [markers, setMarkers] = useState([[51.505, -0.09]]);

  const handleClick = (e) => {
    console.log(e);
    setMarkers((currMarkers) => {
      return [...currMarkers, []];
    });
  };
  return (
    <MapContainer
      center={[100, 100]}
      zoom={1}
      minZoom={-5}
      scrollWheelZoom={false}
      id="map"
      onClick={handleClick}
      style={{ height: "50vh", width: "100%" }}
    >
      <ImageOverlay
        url={"Room1.png"}
        bounds={[
          [0, 0],
          [1080 / 4, 1920 / 4],
        ]}
      />

      {markers.map((marker) => {
        return (
          <Marker position={marker}>
            <Popup>
              <NewClimbForm />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Leaflet1;
