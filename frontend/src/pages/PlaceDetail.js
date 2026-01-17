// frontend/src/pages/PlaceDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import placesData from "../data/places";

const PlaceDetail = () => {
  const { id } = useParams(); // numeric id (1,2,3...)
  const [place, setPlace] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        // ✅ CORRECT backend route
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/places/${id}`);
        if (!res.ok) throw new Error("Place not found");

        const data = await res.json();

        // ✅ merge frontend image + name
        const frontendData = placesData[data.id] || {};

        setPlace({
          ...data,
          name: frontendData.name || `Place ${data.id}`,
          image: frontendData.image || "/images/default.jpg",
          comments: data.comments || [],
        });
      } catch (err) {
        console.error("Error fetching place:", err);
      }
    };

    fetchPlace();
  }, [id]);

  if (!place) return <p>Loading place details...</p>;

  const renderDescription = (desc) => {
    if (!desc) return <p>No description available.</p>;

    const historySplit = desc.split("History");
    const intro = historySplit[0].trim();
    const rest = historySplit[1] || "";

    const architectureSplit = rest.split("Architecture and Museum");
    const historyText = architectureSplit[0]?.trim();
    const architectureText = architectureSplit[1]?.trim();

    return (
      <div>
        <p>{intro}</p>

        {historyText && (
          <>
            <h3 style={{ textAlign: "center" }}>History</h3>
            <p>{historyText}</p>
          </>
        )}

        {architectureText && (
          <>
            <h3 style={{ textAlign: "center" }}>Architecture</h3>
            <p>{architectureText}</p>
          </>
        )}
      </div>
    );
  };

  const handleCommentSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please sign in before commenting.");
      return;
    }

    if (!commentText.trim()) return;

    try {
      // ✅ CORRECT backend route
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/places/${id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user.name,
            comment: commentText,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to post comment");

      const updatedComments = await res.json();
      setPlace({ ...place, comments: updatedComments });
      setCommentText("");
    } catch (err) {
      console.error(err);
      alert("Error adding comment");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h1 style={{ textAlign: "center" }}>{place.name}</h1>

      <img
        src={place.image}
        alt={place.name}
        style={{ maxWidth: "100%", display: "block", margin: "20px auto" }}
      />

      {renderDescription(place.fullDescription)}

      <hr />
      <h2>Comments</h2>

      {place.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        place.comments.map((c, i) => (
          <p key={i}>
            <b>{c.user}:</b> {c.comment}
          </p>
        ))
      )}

      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
        style={{ width: "70%", padding: "6px" }}
      />
      <button onClick={handleCommentSubmit} style={{ marginLeft: "10px" }}>
        Submit
      </button>
    </div>
  );
};

export default PlaceDetail;
