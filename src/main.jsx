import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import MicrobeCaseStudy from "./pages/MicrobeCaseStudy";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/case-studies/microbe-of-the-day" element={<MicrobeCaseStudy />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
