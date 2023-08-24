// import React from 'react';
import PropTypes from 'prop-types';

const Movies = ({ movieData }) => {
  if (!movieData) {
    return null;
  }

  return (
    <div className="movies-container">
      <h2>Top Movies Set in the Area</h2>
      <div className="movie-list">
        {movieData.map((movie, index) => (
          <div className="movie-item" key={index}>
            <img src={movie.image_url} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>Average Votes: {movie.average_votes}</p>
            <p>Total Votes: {movie.total_votes}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Released On: {movie.released_on}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Movies.propTypes = {
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      average_votes: PropTypes.string.isRequired,
      total_votes: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      popularity: PropTypes.string.isRequired,
      released_on: PropTypes.string.isRequired,
    })
  ),
};

export default Movies;
