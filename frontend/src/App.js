import { useEffect, useState } from "react";
import { Marker, Popup } from "react-map-gl";
import Map from "react-map-gl";
import "./app.css";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";


export default function App() {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const currentUser = "john";

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

console.log('curent', currentPlaceId)
  return (
    <div className="map-container" style={{ height: "100vh", width: "90%" }}>
      <Map
        {...viewState}
        height="100%"
        width="90%"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {pins.map((p) => (
            <>
              <Marker
              className="marker"
              longitude={p.long} 
              latitude={p.lat}
              offsetLeft={-3.5 * viewState.zoom}
              offsetTop={-7 * viewState.zoom}>
                <RoomIcon
                  style={{
                    fontSize: viewState.zoom * 7,
                    color: p.username === currentUser ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(p._id)}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  key={p._id}
                  longitude={p.long}
                  latitude={p.lat}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrentPlaceId('')}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      <StarIcon className="star" />
                      <StarIcon className="star" />
                    </div>
                    <label>Info</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">1 hour ago</span>
                  </div>
                </Popup>
              )}
            </>
        ))}
      </Map>
    </div>
  );

  function handleMarkerClick(id) {
    console.log('id', id)
    setCurrentPlaceId(id);
  }
}
