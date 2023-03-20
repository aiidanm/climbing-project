import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  ImageOverlay,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import NewClimbForm from "./NewClimbForm";
import { CRS } from "leaflet";
import L from "leaflet";

const Leaflet1 = () => {
  const [markers, setMarkers] = useState([[250, 250]]);
  const [state, setState] = useState("view");

  const MapMarkers = () => {
    useMapEvents({
      click(e) {
        // if (state !== "addClimb") return;
        setMarkers((currMarkers) => {
          return [...currMarkers, [e.latlng.lat, e.latlng.lng]];
        });
      },
    });
  };

  return (
    <MapContainer
      center={[250, 250]}
      zoom={0}
      scrollWheelZoom={false}
      id="map"
      crs={CRS.Simple}
      maxBounds={[
        [0, 0],
        [500, 500],
      ]}
      maxBoundsViscosity={1.0}
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
      {markers.map((marker) => {
        return (
          <Marker position={marker} >
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
