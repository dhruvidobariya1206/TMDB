import { GET, POST, PUT, DELETE } from "../client/http_request";

export async function getCountries() {
  const response = await GET("https://api.themoviedb.org/3/configuration/countries");
  return response;
}

export async function getPlatforms(watchRegion = "IN") {
  const response = await GET(`https://api.themoviedb.org/3/watch/providers/movie?watch_region=${watchRegion}`);
  return response;
}

export async function getGenres() {
  const response = await GET("https://api.themoviedb.org/3/genre/movie/list");
  return response;
}

export async function getPopularMovies() {
  const response = await GET("https://api.themoviedb.org/3/movie/popular");
  return response;
}

export async function getNowPlayingMovies() {
  const response = await GET("https://api.themoviedb.org/3/movie/now_playing");
  return response;
}

export async function getUpcomingMovies() {
  const response = await GET("https://api.themoviedb.org/3/movie/upcoming");
  return response;
}

export async function getTopRatedMovies() {
  const response = await GET("https://api.themoviedb.org/3/movie/top_rated");
  return response;
}

export async function discoverMovie(filters = {}) {
  const { sortBy = "popularity.desc", platforms = [] } = filters;
  
  // Construct the URL with the sortBy and platforms filters
  const response = await GET(`https://api.themoviedb.org/3/discover/movie?sort_by=${sortBy}&with_watch_providers=${platforms.join("|")}&watch_region=IN`);
  return response;
}

export async function getTrendingMovies(timeWindow = "day") {
  const response = await GET(
    `https://api.themoviedb.org/3/trending/movie/${timeWindow}`
  );
  return response;
}
