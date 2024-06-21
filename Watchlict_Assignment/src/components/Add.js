import React, { useState, useEffect } from "react";
import { ResultCard } from "./ResultCard";

export const Add = () => {
  const [searchedMovie, setSearchedMovie] = useState("");
  const [results, setResults] = useState([]);
  const [showAllMovies, setShowAllMovies] = useState(false);

  useEffect(() => {
    if (showAllMovies) {
      fetchPopularMovies();
    } else {
      setResults([]);
    }
  }, [showAllMovies]);

  const fetchPopularMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=a43d3e2b14ed47ed4026ffef42e90e66&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };

  const toggleMovieList = () => {
    setShowAllMovies(!showAllMovies);
  };

  const onChange = (e) => {
    e.preventDefault();
    setSearchedMovie(e.target.value);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a43d3e2b14ed47ed4026ffef42e90e66&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
          setShowAllMovies(false); // Reset showAllMovies when searching
        } else {
          setResults([]);
        }
      });
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
        <button
        onClick={toggleMovieList}
        style={{
          padding: '10px 20px',  
          backgroundColor: '#ff6347',  
          color: 'white', 
          border: 'none',  
          cursor: 'pointer',
          
          marginLeft: '200px',
          marginBottom: '30px'
           
        }}
      >
        {showAllMovies ? "Hide Movie List" : "Show All Movies"}
      </button>
      
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for movies to add"
              value={searchedMovie}
              onChange={onChange}
            />
          </div>
          {(results.length > 0 || showAllMovies) && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
