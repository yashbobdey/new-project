import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "../Ui/NavigationBar";
import MySwitch from "./MySwitch";

export default function MyRouter() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <MySwitch />
      </Router>
    </div>
  );
}
