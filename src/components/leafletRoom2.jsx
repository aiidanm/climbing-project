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
  const [viewForm, setViewForm] = useState(false);
  const [hasAddedMarker, setHasAddedMarker] = useState(false);
  const [allowAddMarker, setAllowAddMarker] = useState(false);
  const [newClimb, setNewClimb] = useState();
  const [showAdd, setShowAdd] = useState(true)
  const [viewMap2, setViewMap2] = useState(true)

  const MapMarkers = () => {
    useMapEvents({
      click(e) {
        if (!allowAddMarker) return;
        setMarkers((currMarkers) => {
          setHasAddedMarker(true);
          setAllowAddMarker(false);
          setNewClimb((currNewClimb) => {
            const tclimb = {...currNewClimb}
            tclimb["xpos"] = e.latlng.lat
            tclimb["ypos"] = e.latlng.lng
            return tclimb;
          })
          return [...currMarkers, {xpos:e.latlng.lat, ypos: e.latlng.lng, color: newClimb.color }];
        });
        setTimeout(() => {setViewMap2(false)}, 1000)
      },
    });
  };

  useEffect(() => {
    getRoom2Climbs().then((data) => {
      setMarkers(data.climbs);
    });
  }, []);

  return (
    <div className="room1_container">
      {viewMap2 ? (<MapContainer
        center={[250, 250]}
        zoom={0}
        scrollWheelZoom={true}
        id="map"
        crs={CRS.Simple}
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
        {markers.map((climb) => {
          return (
            <Circle center={[climb.xpos, climb.ypos]} radius={6} pathOptions={{color: climb.color || "pink", stroke: false, fillOpacity: 1}}>
              <Popup>
                <DisplayClimbInfo climb={climb} />
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>) : null}
      {showAdd ? (<button onClick={() => {
        setViewForm(true)
        setShowAdd(false)
        setViewMap2(false)
      }}>Add a new climb!</button>) : null}
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
          room={2}
          setViewMap={setViewMap2}
        />
      ) : null}
    </div>
  );
};

export default Leaflet2;

//set mode to view on default
//when new climb clicked, set view to adding climb
//set mode to adding marker when climb add marker button clicked
//when marker placed set view to adding climb
//when submitted set view to view
