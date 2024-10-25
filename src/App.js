import Modal from "./components/Modal";
import { useState, useReducer } from "react";

const App = () => {
  const [albumName, setAlbumName] = useState("");

  // Default state of reducer
  const defaultState = {
    albums: [],
    showNotification: false,
    notificationContent: "",
  };

  // Reducer definition
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_ALBUM":
        return {
          ...state,
          albums: [...state.albums, action.payload],
          showNotification: true,
          notificationContent: "Album přidáno",
        };
      case "NO_ALBUM_ADD":
        return {
          ...state,
          showNotification: true,
          notificationContent: "Zadej název alba",
        };
      case "CLOSE_NOTIFICATION":
        return {
          ...state,
          showNotification: false,
        };
      case "DELETE_ALBUM":
        return {
          ...state,
          albums: state.albums.filter((album) => album.id !== action.payload),
        };
      default:
        return state;
    }
  };

  // useReducer Hook
  const [state, dispatch] = useReducer(reducer, defaultState);

  const submitHandler = (event) => {
    event.preventDefault();

    if (albumName) {
      const newAlbum = { id: new Date().getTime(), name: albumName };
      dispatch({ type: "ADD_ALBUM", payload: newAlbum });
      setAlbumName("");
    } else {
      dispatch({ type: "NO_ALBUM_ADD" });
    }
  };

  const closeNotification = () => {
    dispatch({ type: "CLOSE_NOTIFICATION" });
  };

  return (
    <section className="form">
      {state.showNotification && (
        <Modal
          notifContent={state.notificationContent}
          closeNotif={closeNotification}
        />
      )}
      <form onSubmit={submitHandler}>
        <input
          className="text-input"
          type="text"
          value={albumName}
          onChange={(event) => setAlbumName(event.target.value)}
        />
        <input className="submit-input" type="submit" value="přidat" />
      </form>
      {state.albums.map((album) => (
        <div key={album.id} className="all-albums">
          {album.name}
          <button
            onClick={() =>
              dispatch({ type: "DELETE_ALBUM", payload: album.id })
            }
          >
            Smazat
          </button>
        </div>
      ))}
    </section>
  );
};

export default App;
