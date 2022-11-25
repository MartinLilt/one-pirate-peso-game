import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import PlayerBar from "./components/playerBar/PlayerBar";
import MapBar from "./components/mapBar";
import ArmoryBar from "./components/armoryBar";
import ChatBar from "./components/chatBar";
import MenuBar from "./components/menuBar";
import SettingBar from "./components/settingBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <PlayerBar />
    <MapBar />
    <ArmoryBar />
    <ChatBar />
    <MenuBar />
    <SettingBar />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
