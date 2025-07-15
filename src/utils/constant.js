export const headerLinks = [
  {
    label: "Movies",
    menu: [
      { label: "Popular", path: "/movies/popular" },
      { label: "Now Playing", path: "/movies/nowPlaying" },
      { label: "Upcoming", path: "/movies/upcoming" },
      { label: "Top Rated", path: "/movies/topRated" },
    ],
  },
  {
    label: "TV Shows",
    menu: [
      { label: "Popular", path: "" },
      { label: "Airing Today", path: "" },
      { label: "On TV", path: "" },
      { label: "Top Rated", path: "" },
    ],
  },
];

export const sortOptions = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" }
];