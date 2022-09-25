import React from "react";
import "./App.css";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Modal from "./Components/UI/Modal";

function App() {
  return (
    <React.Fragment>
      <Modal />
      <Header />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
