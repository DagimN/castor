import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./styles/index.css";
import ControlPanel from "./control";
import Projector from "./projector";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<ControlPanel />} />
      <Route path="/projector" element={<Projector />} />
    </Routes>
  </HashRouter>
);
