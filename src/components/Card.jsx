import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Card({ description }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    localStorage.setItem("isFavorited", !isFavorited);

    const favoritesList = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!isFavorited) {
      favoritesList.push(description);
      localStorage.setItem("favorites", JSON.stringify(favoritesList));
    } else {
      const index = favoritesList.findIndex(
        (fav) => fav.descriptions === description.descriptions
      );
      if (index !== -1) {
        favoritesList.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favoritesList));
      }
    }
  };

  useEffect(() => {
    const savedIsFavorited = JSON.parse(localStorage.getItem("isFavorited"));
    setIsFavorited(savedIsFavorited || false);
  }, []);

  function handleLetsGo() {
    console.log("Let’s go !");
  }

  return (
    <div className="card">
      <img src={description.img} alt={description.descriptions} />
      <div className="card-details">
        <h2>{description.descriptions}</h2>
        <div className="card-info">
          <p>
            Durée :
            <br /> {description.temps}
          </p>
          <p>
            Niveau :
            <br /> {description.niveau}
          </p>
          <p className="prix">A partir de {description.prix}</p>
        </div>
        <div className="card-dates">
          <div className="card-date">
            <p>{description.date1}</p>
            <p>{description.place1}</p>
          </div>
          <div className="card-date">
            <p>{description.date2}</p>
            <p>{description.place2}</p>
          </div>
          <div className="card-date">
            <p>{description.date3}</p>
            <p>{description.place3}</p>
          </div>
        </div>
        <div className="card-buttons">
          <Link to={`/description/${description.id}`}>
            <button onClick={handleLetsGo}>Détails</button>
          </Link>
          <button
            type="button"
            className={`favoriteButton ${isFavorited ? "favorited" : ""}`}
            onClick={toggleFavorite}
          >
            <span className="heartIcon">{isFavorited ? "❤️" : "🤍"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
