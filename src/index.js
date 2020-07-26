import React from "react";
import ReactDOM from "react-dom";
import MoviesList from "./moviesList";
import Navbar from "../src/components/Navbar"

import "./styles.css";

function App() {
  return (
    <div className="App">
     <Navbar />
      <MoviesList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
