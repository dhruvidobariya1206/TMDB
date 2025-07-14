"use client";

import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "@/components/common/movieCard";
import Sidebar from "@/components/common/sidebar";
import "../style.css";
import { getNowPlayingMovies, discoverMovie } from "../../../service/serverService";

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: "popularity.desc",
  });
    
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  }

  useEffect(() => {
    const fetchData = async () => {
      const popularMovies = await getNowPlayingMovies();
      setMovies(popularMovies.data.results);
    };

    fetchData();
  }, []);

  useEffect(() => {
      const fetchData = async () => {
        const filteredMovies = await discoverMovie(filters);
        setMovies(filteredMovies.data.results);
      };
  
      fetchData();
    }, [filters]);

  return (
      <>
        <div className="main-content">
          <Sidebar onChange={updateFilters} filter={filters} />
          <div className="content">
            <div className="movie-grid">
              {movies.map((movie, i) => (
                <MovieCard key={i} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
