import React from "react";
import MovieRating from "./movieRating";

const MoviesCard = ({ movies }) => {
  return movies.map((el, key) => {
    return (
      <div className="movie-card col-lg-3" key={key}>
        <div className="stars-rating">
          <MovieRating rating={el.rating} />
        </div>
        <figure>
          <img src={el.image} alt={el.name} />
        </figure>
        <h1>
          {el.name} <span>{el.year}</span>
        </h1>
      </div>
    );
  });
};

export default MoviesCard;
