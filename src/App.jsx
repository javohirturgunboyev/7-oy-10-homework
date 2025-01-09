import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ImagePaginationPage from "./pages/ImagePaginationPage";
import Scrolpage from "./pages/Scrolpage";

function App() {
  return (
    <div>
      <header className="bg-green-400 p-4 text-white text-2xl flex justify-between cursor-pointer">
        <Link to='/'>ImagePagination</Link>
        <h1>Mening sahifam </h1>
        <Link to='/scrolpage'>scrolpage</Link>
      </header>
      <Routes>
        <Route path="/" element={<ImagePaginationPage />} />
        <Route path="/scrolpage" element={<Scrolpage />} />
      </Routes>
    </div>
  );
}

export default App;
