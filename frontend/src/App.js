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
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
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

  return (
    <div className="map-container" style={{ height: "100vh", width: "90%" }}>
      <Map
        {...viewState}
        height="100%"
        width="90%"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        doubleClickZoom={false}
        onDblClick={handleMapClick}
        style={{
          transition: {
            duration: 300,
            delay: 0,
          },
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {pins.map((p) => (
          <>
            <Marker
              className="marker"
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-3.5 * viewState.zoom}
              offsetTop={-7 * viewState.zoom}
            >
              <RoomIcon
                style={{
                  fontSize: viewState.zoom * 7,
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
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
                onClose={() => setCurrentPlaceId("")}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="star" />)}
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
        {newPlace ? (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace("")}
          >
            <div>
              <form onSubmit={handleAddMarker}>
                <label>Title</label>
                <input
                  placeholder="enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <input
                  placeholder="say something about this place"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submit-button" type="submit">
                  Add marker
                </button>
              </form>
            </div>
          </Popup>
        ) : null}
        <div className="buttons">
          <button className="button logout">Logout</button>
          <button className="button login">Login</button>
          <button className="button register">Register</button>
        </div>
      </Map>
    </div>
  );

  function handleMarkerClick(id, lat, long) {
    console.log("id", id);
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  }

  function handleMapClick(e) {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lat,
      lng,
    });
  }

  async function handleAddMarker(e) {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };
    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  }
}
