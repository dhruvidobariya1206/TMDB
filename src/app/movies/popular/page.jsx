"use client";

import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "@/components/common/movieCard";
import Sidebar from "@/components/common/sidebar";
import { getPopularMovies, discoverMovie } from "../../../service/serverService";
import "../style.css";


export default function Page() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: "popularity.desc",
    platforms: [],
  });
  
  const updateFilters = (newFilters) => {
    console.log("Updating filters with:", newFilters);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  }

  console.log("Filters:", filters);
  
  useEffect(() => {
    const fetchData = async () => {
      const popularMovies = await getPopularMovies();
      console.log("Popular Movies:", popularMovies);
      
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
