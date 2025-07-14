"use client";

import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { getTrendingMovies } from "../../service/serverService";
import MovieCard from "../common/movieCard";

const TRAILER_TABS = {
  popular: "popular",
  streaming: "streaming",
  onTv: "onTv",
  forRent: "forRent",
  inTheaters: "inTheaters",
};

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [trendingActiveTab, setTrendingActiveTab] = useState("day");
  const [trailerActiveTab, setTrailerActiveTab] = useState(
    TRAILER_TABS.popular
  );

  useEffect(() => {
    const fetchData = async () => {
      const popularMovies = await getTrendingMovies(trendingActiveTab);
      setMovies(popularMovies.data.results);
    };
    fetchData();
  }, [trendingActiveTab]);

  return (
    <>
      <div className="hero-banner">
        <div className="overlay">
          <h1>Welcome</h1>
          <p>
            Millions of movies, TV shows and people to discover. Explore now.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for a movie, tv show, person……"
            />
            <button>Search</button>
          </div>
        </div>
      </div>

      <div className="trending-section">
        <div className="trending-header">
          <h2>Trending</h2>
          <div className="tabs">
            <button
              className={trendingActiveTab === "day" ? "tab active" : "tab"}
              onClick={() => setTrendingActiveTab("day")}
            >
              Today
            </button>
            <button
              className={trendingActiveTab === "week" ? "tab active" : "tab"}
              onClick={() => setTrendingActiveTab("week")}
            >
              This Week
            </button>
          </div>
        </div>

        <div className="scroll-wrapper">
          <div className="fade-left"></div>
          <div className="trending-scroll">
            {movies.map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </div>
          <div className="fade-right"></div>
        </div>
      </div>

      <div className="trailers-section">
        <div className="trailers-header">
          <h2>Latest Trailers</h2>
          <div className="tabs-bar">
            <button
              className={
                trailerActiveTab === TRAILER_TABS.popular
                  ? "tab-bar active"
                  : "tab-bar"
              }
              onClick={() => setTrailerActiveTab(TRAILER_TABS.popular)}
            >
              Popular
            </button>
            <button
              className={
                trailerActiveTab === TRAILER_TABS.streaming
                  ? "tab-bar active"
                  : "tab-bar"
              }
              onClick={() => setTrailerActiveTab(TRAILER_TABS.streaming)}
            >
              Streaming
            </button>
            <button
              className={
                trailerActiveTab === TRAILER_TABS.onTv
                  ? "tab-bar active"
                  : "tab-bar"
              }
              onClick={() => setTrailerActiveTab(TRAILER_TABS.onTv)}
            >
              On TV
            </button>
            <button
              className={
                trailerActiveTab === TRAILER_TABS.forRent
                  ? "tab-bar active"
                  : "tab-bar"
              }
              onClick={() => setTrailerActiveTab(TRAILER_TABS.forRent)}
            >
              For Rent
            </button>
            <button
              className={
                trailerActiveTab === TRAILER_TABS.inTheaters
                  ? "tab-bar active"
                  : "tab-bar"
              }
              onClick={() => setTrailerActiveTab(TRAILER_TABS.inTheaters)}
            >
              In Theaters
            </button>
          </div>
        </div>
        <div className="video-card"></div>
      </div>
    </>
  );
}
