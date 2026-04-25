import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import WasteWiseCaseStudy from "./pages/MicrobeCaseStudy";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/case-studies/waste-wise" element={<WasteWiseCaseStudy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
