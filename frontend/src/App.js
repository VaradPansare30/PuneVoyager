import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlacesList from "./components/PlacesList";
import PlaceDetail from "./pages/PlaceDetail"; // make sure import matches file name
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  // Track search term for filtering places
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      {/* Pass search handler to Navbar */}
      <Navbar onSearch={handleSearch} />

      <Routes>
        {/* Home page showing all place cards */}
        <Route path="/" element={<PlacesList searchTerm={searchTerm} />} />

        {/* Single place details page using numeric id */}
        <Route path="/places/:id" element={<PlaceDetail />} />

        {/* Authentication routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
