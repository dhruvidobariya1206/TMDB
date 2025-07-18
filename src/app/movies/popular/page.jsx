"use client";

import React, { useState, useEffect, Suspense } from "react";
import MovieCard from "@/components/common/movie-card";
import Sidebar from "@/components/common/sidebar";
import { getPopularMovies, discoverMovie } from "../../../service/serverService";
import "../../../styles/pages/movies.css";


export default function Page() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: "popularity.desc",
    watch_region: '',
    platforms: [],
    genres: [],
  });
  
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const popularMovies = await getPopularMovies();
      
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
        <Suspense fallback={<p>Loading...</p>}>
          <Sidebar onChange={updateFilters} filter={filters} />
        </Suspense>
        <div className="content">
          <div className="movie-grid">
            {movies.map((movie, i) => (
              <MovieCard key={i} {...movie} />
            ))}
            {/* <div className="load-more-button">
              <button>Load More</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
