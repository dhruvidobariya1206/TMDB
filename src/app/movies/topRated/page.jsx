"use client";

import React, { useState, useEffect } from "react";
import MovieCard from "@/components/common/movie-card";
import Sidebar from "@/components/common/sidebar";
import { getTopRatedMovies, discoverMovie } from "../../../service/serverService";
import "../../../styles/pages/movies.css";

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: "vote_average.desc",
  });
    
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  }

  useEffect(() => {
    const fetchData = async () => {
      const popularMovies = await getTopRatedMovies();
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
                <MovieCard key={i} {...movie} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
