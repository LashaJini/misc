import React from "react";
import "./App.css";
import { Navigation } from "../";
import ParentTheme from "../../themes/ParentTheme";

function App() {
  return (
    <ParentTheme>
      <Navigation />
    </ParentTheme>
  );
}

export default App;
