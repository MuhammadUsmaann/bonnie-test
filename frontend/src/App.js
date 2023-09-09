import { BrowserRouter, HashRouter } from "react-router-dom";
import "./App.css";
import React from "react";
import AppRouter from "./Routes";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
