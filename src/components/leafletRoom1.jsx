import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  ImageOverlay,
  useMapEvents,
  Circle,
} from "react-leaflet";
import { useState, useEffect } from "react";
import NewClimbForm from "./NewClimbForm";
import { CRS } from "leaflet";
import L from "leaflet";
import { getAllClimbs } from "./apirequests";

const Leaflet1 = () => {
  const [markers, setMarkers] = useState([]);
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

  useEffect(() => {
    getAllClimbs().then((data) => {
      setMarkers((currMarkers) => {
        return data.climbs.map((climb) => [climb.xpos, climb.ypos])
      })
    });
  }, []);

  return (
    <MapContainer
      center={[250, 250]}
      zoom={0}
      scrollWheelZoom={true}
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
          <Circle center={marker}>
            <Popup>
              <NewClimbForm />
            </Popup>
          </Circle>
        );
      })}
    </MapContainer>
  );
};

export default Leaflet1;
