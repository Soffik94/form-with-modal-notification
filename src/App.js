import Modal from "./components/Modal";
import albums from "./data";
import data from "./data";
import { useState, useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "ADD_ALBUM") {
    const newAlbums = [...state.albums, action.payload];
    return {
      ...state,
      albums: newAlbums,
      showNotification: true,
      notificationContent: "Album přidáno",
    };
  }
  if (action.type === "NO_ALBUM_ADD") {
    return {
      ...state,
      showNotification: true,
      notificationContent: "Zadej název alba",
    };
  }
  if (action.type === "CLOSE_NOTIFICATION")
    return { ...state, showNotification: false };
  if (action.type === "DELETE_MOVIE") {
    const filteredAlbums = state.albums.filter((oneAlbum) => {
      return oneAlbum.id !== action.payload;
    });
    return { ...state, albums: filteredAlbums };
  }
};

const defaultState = {
  albums: [],
  showNotification: false,
  notificationContent: "",
};

const App = () => {
  const [albumName, setAlbumName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const submitHandler = (event) => {
    event.preventDefault();

    if (albumName) {
      const newAlbumName = { id: new Date().getTime(), name: albumName };
      dispatch({ type: "ADD_ALBUM", payload: newAlbumName });
    } else {
      dispatch({ type: "NO_ALBUM_ADD" });
    }
    setAlbumName("");
  };

  const closeNotification = () => {
    dispatch({ type: "CLOSE_NOTIFICATION" });
  };

  return (
    <section>
      {state.showNotification && (
        <Modal
          notifContent={state.notificationContent}
          closeNotif={closeNotification}
        />
      )}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={albumName}
          onChange={(event) => {
            setAlbumName(event.target.value);
          }}
        />
        <input type="submit" value="přidat" />
      </form>
      {state.albums.map((oneAlbum) => {
        const { id, name } = oneAlbum;
        return (
          <div key={oneAlbum.id}>
            {name}
            <button
              onClick={() => {
                dispatch({ type: "DELETE_MOVIE", payload: oneAlbum.id });
              }}
            >
              Smazat
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default App;
