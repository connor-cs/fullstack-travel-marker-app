import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import RoomIcon from '@mui/icons-material/Room';

export default function App() {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
    height: "100vh",
    width: "100vw",
  });

  return (
    <div className="map-container" style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewState}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={2}
          latitude={48}>
          anchor= "center"
          <RoomIcon style={{fontSize:viewport.zoom * 7, color:"slateblue"}}/>
        </Marker>
      </ReactMapGL>
    </div>
  );
}
