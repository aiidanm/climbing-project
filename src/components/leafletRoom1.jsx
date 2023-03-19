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
import "leaflet/dist/leaflet.css";

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
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      id="map"
      onClick={handleClick}
    >
      <TileLayer attribution="offline img"
      url={"../maptiles/{z}/{x}/{y}.jpg"}
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
