import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import "./styles/index.css";
import ControlPanel from "./control";
import Projector from "./projector";
import DynamicRouter from "./shared/dynamicRouter";
import RemoteControls from "./remote";
import TutorialWindow from "./tutorial";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <DynamicRouter>
    <Routes>
      <Route path="/" element={<ControlPanel />} />
      <Route path="/projector" element={<Projector />} />
      <Route path="/remote" element={<RemoteControls />} />
      <Route path="/tutorial" element={<TutorialWindow />} />
    </Routes>
  </DynamicRouter>
);
