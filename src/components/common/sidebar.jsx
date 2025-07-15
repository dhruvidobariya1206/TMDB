"use client";

import React, { useState, useEffect } from "react";
import { getPlatforms, getCountries, getGenres } from "../../service/serverService";
import { sortOptions } from "@/utils/constant";
import "../../styles/components/sidebar.css";

export default function Sidebar({ filter, onChange }) {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(true);
  const [platformDropDown, setPlatformDropDown] = useState(false);
  const [filtersDropDown, setFiltersDropDown] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await getCountries();
      const countryOptions = response.data.map(country => ({
        label: country.english_name,
        value: country.iso_3166_1,
      }));
      setCountries(countryOptions);
      if (countryOptions.length > 0) {
        setSelectedCountry(countryOptions[0].value);
      }
    };

    const fetchGenres = async () => {
      const response = await getGenres();
      setGenres(response.data.genres || []);
    };
    Promise.all([
      fetchCountries(),
      fetchGenres(),
    ])
  }, []);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await getPlatforms(selectedCountry);
      response.data.results.sort((a, b) => a.display_priority - b.display_priority);
      setPlatforms(response.data.results || []);
    };

    if(selectedCountry) {
      fetchPlatforms();
    }
  }, [selectedCountry]);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    onChange({ sortBy: selectedSort });
  };

  const handlePlatformChange = (e) => {
    e.preventDefault();
    const selectedPlatforms = selectedPlatform.length > 0 ? selectedPlatform : platforms.map(p => p.id);
    onChange({ platforms: selectedPlatforms });
  }

  const handleGenreChange = (e) => {
    e.preventDefault();
    const selectedGenres = selectedGenres.length > 0 ? selectedGenres : genres.map(p => p.id);
    onChange({ genres: selectedGenres });
  }

  return (
    <div className="sidebar">
      <div className="button-section">
        <button className="btn" onClick={() => setSortDropdownOpen(!sortDropdownOpen)}>Sort</button>
        {sortDropdownOpen && (
          <div className="sort-dropdown">
            <div className="section-header">
              <h3 className="section-title">Sort Results By</h3>
              <select
                id="sort"
                className="select-dropdown"
                value={filter.sortBy}
                onChange={handleSortChange}
              >
              {sortOptions.map((option, i) => (
                <option key={i} value={option.value} className="sort-option">
                  {option.label}
                </option>
              ))}
              </select>
            </div>
          </div>
          )
        }
      </div>

      <div className="button-section">
        <button className="btn" onClick={() => setPlatformDropDown(!platformDropDown)}>Where To Watch</button>
        { platformDropDown && (
          <div className="sort-dropdown">
            <div className="section-header">
              <h3 className="section-title">Country</h3>
              <select
                id="filter-country"
                className="select-dropdown"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                { countries.map((country, i) => (
                  <option key={i} value={country.value} className="country-option">
                    {country.label}
                  </option>
                ))}
              </select>
              <h3 className="section-title">Platforms</h3>
              <form onSubmit={handlePlatformChange}>
                <ul className="check-list">
                  {platforms.map((platform, i) => (
                    <li key={i} className="check-item">
                      <label>
                        <input
                          type="checkbox"
                          key={i}
                          value={platform.provider_id}
                          onChange={()=> {
                            const isChecked = selectedPlatform.includes(platform.provider_id);
                            const newPlatforms = isChecked
                              ? selectedPlatform.filter(id => id !== platform.provider_id)
                              : [...selectedPlatform, platform.provider_id];
                            setSelectedPlatform(newPlatforms);
                          }}
                        />
                        {platform.provider_name}
                      </label>
                    </li>
                  ))}
                </ul>
                <button type="submit" className="submit-button">Apply</button>
                <button type="reset" className="submit-button" onClick={() => {
                  setSelectedPlatform([]);
                  onChange({ platforms: [] });
                }}>Clear filter</button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="button-section">
        <button className="btn" onClick={() => setFiltersDropDown(!filtersDropDown)}>Filters</button>
        { filtersDropDown && (
          <div className="sort-dropdown">
            <div className="section-header">
              <h3 className="section-title">Genres</h3>
              <form onSubmit={handleGenreChange}>
                <ul className="check-list">
                  {genres.map((genre, i) => (
                    <li key={i} className="check-item">
                      <label>
                        <input
                          type="checkbox"
                          value={genre.id}
                          onChange={()=> {
                            const isChecked = selectedGenres.includes(genre.id);
                            const newGenres = isChecked
                              ? selectedGenres.filter(id => id !== genre.id)
                              : [...selectedGenres, genre.id];
                            setSelectedGenres(newGenres);
                          }}
                        />
                        {genre.name}
                      </label>
                    </li>
                  ))}
                </ul>
                <button type="submit" className="submit-button">Apply</button>
                <button type="reset" className="submit-button" onClick={() => {
                  setSelectedPlatform([]);
                  onChange({ platforms: [] });
                }}>Clear filter</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
