import React, { useState } from "react";
import placesData from "../data/places";

const PlaceCard = ({ place, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const placeInfo = placesData[place.id] || {};
  const name = placeInfo.name || `Place ${place.id}`;
  const image = placeInfo.image || "/images/default.jpg";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(place.id)} // ✅ FIXED
      style={{
        border: hovered ? "2px solid #055ebeff" : "1px solid #ccc",
        borderRadius: "12px",
        padding: "15px",
        margin: "10px",
        cursor: "pointer",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: hovered
          ? "0 18px 26px rgba(0, 123, 255, 0.5)"
          : "0 14px 18px rgba(0, 0, 0, 0.1)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.4s ease",
        backgroundColor: hovered ? "#f8fbff" : "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "180px",
          overflow: "hidden",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      <h3 style={{ textAlign: "center", margin: "5px 0" }}>{name}</h3>

      <p style={{ textAlign: "center", fontSize: "14px", color: "#555" }}>
        {place.fullDescription
          ? place.fullDescription.slice(0, 100) + "..."
          : "No description available"}
      </p>
    </div>
  );
};

export default PlaceCard;
