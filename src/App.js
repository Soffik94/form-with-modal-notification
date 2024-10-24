import Modal from "./components/Modal";
import data from "./data";
import { useState } from "react";

const App = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <input type="text" />
        <input type="submit" value="přidat" />
      </form>
    </section>
  );
};

export default App;
