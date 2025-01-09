import React from "react";
import {  Routes, Route } from "react-router-dom";
import ImagePaginationPage from "./pages/ImagePaginationPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<ImagePaginationPage />} />
      </Routes>
  );
}

export default App;
