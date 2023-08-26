import React, { Component } from 'react';import PropTypes from 'prop-types';
import Movie from '@/components/Movie';

const Movies = ({ movieData }) => {
  if (!movieData) {
    return null;
  }

  return (
    <div className="movies-container">
      <h2>Top Movies Set in the Area</h2>
      <div className="movie-list">
        {movieData.map((movie, index) => (
          <Movie key={index} movie={movie} />
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
