import React, { useEffect, useState } from "react";
import PlaceCard from "./PlaceCard";
import { useNavigate } from "react-router-dom";
import placesData from "../data/places";

const PlacesList = ({ searchTerm = "" }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/places`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch places");
        return res.json();
      })
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching places:", err);
        setLoading(false);
      });
  }, []);

  // ✅ ALWAYS navigate using numeric id
  const handleClick = (numericId) => {
    navigate(`/places/${numericId}`);
  };

  if (loading) return <p>Loading places...</p>;

  const filteredPlaces = places.filter((place) => {
    const name = placesData[place.id]?.name?.toLowerCase() || "";
    return name.includes(searchTerm.toLowerCase());
  });

  const listToShow = searchTerm ? filteredPlaces : places;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "15px",
      }}
    >
      {listToShow.map((place) => (
        <PlaceCard
          key={place.id}                 // ✅ FIXED
          place={place}
          onClick={() => handleClick(place.id)} // ✅ FIXED
        />
      ))}
    </div>
  );
};

export default PlacesList;
