import Modal from "./components/Modal";
import data from "./data";
import { useState, useReducer } from "react";

const reducer = () => {};

const defaultState = {
  albums: [],
  showNotification: false,
  notificationContent: "",
};

const App = () => {
  const [albumName, setAlbumName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState); //state se pojí s defaultState a reducer s dispatch

  const submitHandler = (event) => {
    event.preventDefault();

    if (albumName) {
    } else {
    }
  };

  return (
    <section>
      {state.showNotification && <Modal />}
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
