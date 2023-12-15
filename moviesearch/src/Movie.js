import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

function Movie() {
  const [movie, setMovie] = useState('');
  const [newMovie, setNewMovie] = useState([]);

  function search() {
    axios.get(`https://www.omdbapi.com/?apikey=28f7f34a&s=${movie}`)
      .then((response) => {
        const res = response.data;
        console.log(res);
        setNewMovie(res.Search);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }

  return (
    <div className="movie-container">
      <div className="search-bar">
        <input
          type='text'
          value={movie}
          placeholder='Search...'
          onChange={(e) => setMovie(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>

      {newMovie && (
        <div className="results-container">
          <h2>Movie Results:</h2>
          <ul>
            {newMovie.map((movie) => (
              <li key={movie.imdbID} className="movie-item">
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} Poster`}
                  className="movie-poster"
                />
                <span className="movie-title">{movie.Title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Movie;
