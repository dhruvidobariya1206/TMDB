"use client";

import React, { use, useState, useEffect } from "react";
import CustomSelect from "./custom-select";
import { getPlatforms, getCountries, getGenres } from "../../service/serverService";
import { sortOptions } from "@/utils/constant";
import "../../styles/components/sidebar.css";

const getCountriesPromise = getCountries();
const getGenresPromise = getGenres();

export default function Sidebar({ filter, onChange }) {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(true);
  const [platformDropDown, setPlatformDropDown] = useState(false);
  const [filtersDropDown, setFiltersDropDown] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const countries = use(getCountriesPromise);
  const genres = use(getGenresPromise);

  useEffect(() => {
    setSelectedCountry(countries[0]?.value);
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
    onChange({ platforms: selectedPlatforms, watch_region: selectedCountry });
  }

  const handleGenreChange = (e) => {
    e.preventDefault();
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
              <CustomSelect value={filter.sortBy} onChange={handleSortChange} options={sortOptions}/>
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
              <form onSubmit={handlePlatformChange}>
                <h3 className="section-title">Country</h3>
                <CustomSelect value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} options={countries}/>
                <h3 className="section-title">Platforms</h3>
                <div className="check-list">
                  {platforms.map((platform, i) => (
                    <label key={i} className="check-item">
                      <input
                        type="checkbox"
                        key={i}
                        value={platform.provider_id}
                        onChange={()=> {
                          const isChecked = selectedPlatforms.includes(platform.provider_id);
                          const newPlatforms = isChecked
                            ? selectedPlatforms.filter(id => id !== platform.provider_id)
                            : [...selectedPlatforms, platform.provider_id];
                          setSelectedPlatforms(newPlatforms);
                        }}
                      />
                      {platform.provider_name}
                    </label>
                  ))}
                </div>
                <button type="submit" className="submit-button">Apply</button>
                <button type="reset" className="submit-button" onClick={() => {
                  setSelectedPlatforms([]);
                  setSelectedCountry(countries[0].value);
                  onChange({ platforms: [], watch_region: '' });
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
                <div className="check-list">
                  {genres.map((genre, i) => (
                      <label className="check-item" key={i}>
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
                  ))}
                </div>
                <button type="submit" className="submit-button">Apply</button>
                <button type="reset" className="submit-button" onClick={() => {
                  setSelectedPlatforms([]);
                  onChange({ genres: [] });
                }}>Clear filter</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
