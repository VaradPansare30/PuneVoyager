import React, { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import placeImages from "../data/places"; // ✅ local image & name mapping

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [newComment, setNewComment] = useState("");

  // 🔹 Fetch all places from backend
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/places`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch places");
        return res.json();
      })
      .then((data) => {
        // 🔹 Attach frontend names + images
        const placesWithExtras = data.map((place) => {
          const frontendData = placeImages[place.id] || {};
          return {
            ...place,
            image: frontendData.image || "/images/default.jpg",
            name: frontendData.name || `Place ${place.id}`,
            shortDescription: place.fullDescription
              ? place.fullDescription.slice(0, 80) + "..."
              : "No description",
          };
        });
        setPlaces(placesWithExtras);
      })
      .catch((err) => console.error("Error fetching places:", err));
  }, []);

  // 🔹 Fetch full place details when clicked
  const handleClick = async (mongoId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/places/${mongoId}`
      );
      if (!response.ok) throw new Error("Failed to fetch place info");

      const data = await response.json();

      // 🔹 Attach frontend name + image
      const frontendData = placeImages[data.id] || {};
      data.image = frontendData.image || "/images/default.jpg";
      data.name = frontendData.name || `Place ${data.id}`;

      setSelectedPlace(data);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Error fetching place info");
    }
  };

  // 🔹 Add comment
  const handleAddComment = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please sign in before commenting.");
      return;
    }

    if (!newComment.trim()) return;

    const user = JSON.parse(storedUser);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/places/${selectedPlace._id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user.name,
            comment: newComment,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to post comment");

      const updatedComments = await response.json();
      setSelectedPlace({ ...selectedPlace, comments: updatedComments });
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Error adding comment");
    }
  };

  return (
    <div>
      {/* 🔹 Place cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {places.map((place) => (
          <PlaceCard
            key={place._id}
            place={place} // ✅ name, image, shortDescription included
            onClick={() => handleClick(place._id)}
          />
        ))}
      </div>

      {/* 🔹 Selected place details */}
      {selectedPlace && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "12px",
            maxWidth: "600px",
            margin: "20px auto",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>{selectedPlace.name}</h2>

          <img
            src={selectedPlace.image}
            alt={selectedPlace.name}
            style={{ width: "100%", borderRadius: "10px" }}
          />

          <p>{selectedPlace.fullDescription}</p>

          <h4>Comments:</h4>
          {selectedPlace.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            selectedPlace.comments.map((c, idx) => (
              <p key={idx}>
                <b>{c.user}:</b> {c.comment}
              </p>
            ))
          )}

          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{ width: "70%", padding: "8px", marginRight: "10px" }}
            />
            <button onClick={handleAddComment} style={{ padding: "8px 12px" }}>
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
