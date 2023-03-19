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
import { CRS } from "leaflet";

///home/aidan/climbingApp/climbing-project/public/maptiles

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
      center={[250, 250]}
      zoom={0}
      scrollWheelZoom={false}
      id="map"
      crs={CRS.Simple}
      onClick={handleClick}
    >
      <ImageOverlay
        attribution="aidanMurray"
        url={"Room1.png"}
        bounds={[
          [0, 0],
          [500, 500],
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
