import Modal from "./components/Modal";
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
    }
  };

  return (
    <section>
      {state.showNotification && (
        <Modal notifContent={state.notificationContent} />
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
        return <div key={oneAlbum.id}>{name}</div>;
      })}
    </section>
  );
};

export default App;
