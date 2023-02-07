import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Map from "react-map-gl"
import './app.css'
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from '@mui/icons-material/Star';


export default function App() {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
    
  });

  return (
    <div className="map-container" style={{ height: "100vh", width: "100%" }}>
      <Map
        {...viewState}
        height= "100%"
        width= "100%"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker 
        longitude={-77.050636} 
        latitude={38.889248} 
        >
          <RoomIcon
            style={{ fontSize: viewState.zoom * 7, color: "slateblue" }}
          />
        </Marker>
        <Popup
          longitude={-77.050636}
          latitude={38.889248}
          closeButton={true}
          anchor="left"
          >
            <div className="card">
              <label>Place</label>
              <h4>Place name</h4>
              <label>Review</label>
              <label>Rating</label>
            </div>
        </Popup>
      </Map>
    </div>
  );
}
