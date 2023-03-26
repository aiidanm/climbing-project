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
  const [viewForm, setViewForm] = useState(false);
  const [hasAddedMarker, setHasAddedMarker] = useState(false);
  const [allowAddMarker, setAllowAddMarker] = useState(false);
  const [newClimb, setNewClimb] = useState();

  const MapMarkers = () => {
    useMapEvents({
      click(e) {
        if (!allowAddMarker) return;
        setMarkers((currMarkers) => {
          setHasAddedMarker(true);
          setAllowAddMarker(false);
          setNewClimb((currNewClimb) => {
            const tclimb = { ...currNewClimb };
            tclimb["xpos"] = e.latlng.lat;
            tclimb["ypos"] = e.latlng.lng;
            return tclimb;
          });
          return [
            ...currMarkers,
            { xpos: e.latlng.lat, ypos: e.latlng.lng, color: newClimb.color },
          ];
        });
      },
    });
  };

  useEffect(() => {
    getRoom1Climbs().then((data) => {
      setMarkers(data.climbs);
    });
  }, []);

  return (
    <div className="room1_container">
      <MapContainer
        center={[250, 250]}
        zoom={0}
        scrollWheelZoom={false}
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
            <Circle
              center={[climb.xpos, climb.ypos]}
              radius={4}
              pathOptions={{
                color: climb.color || "pink",
                stroke: false,
                fillOpacity: 1,
              }}
              key={climb.climb_id}
            >
              <Popup>
                <DisplayClimbInfo climb={climb} />
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
      <button onClick={() => setViewForm(true)}>Add a new climb!</button>
      {viewForm ? (
        <NewClimbForm
          setMarkers={setMarkers}
          hasAddedMarker={hasAddedMarker}
          setHasAddedMarker={setHasAddedMarker}
          setAllowAddMarker={setAllowAddMarker}
          allowAddMarker={allowAddMarker}
          setViewForm={setViewForm}
          viewForm={viewForm}
          newClimb={newClimb}
          setNewClimb={setNewClimb}
          room={1}
        />
      ) : null}
    </div>
  );
};

export default Leaflet1;

//set mode to view on default
//when new climb clicked, set view to adding climb
//set mode to adding marker when climb add marker button clicked
//when marker placed set view to adding climb
//when submitted set view to view
