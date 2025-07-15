import '../../styles/components/movie-card.css';

export default function MovieCard({movie, i}) {
  return (
    <div key={i} className="movie-card">
      <div className="movie-poster-placeholder">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className="movie-poster"></img>
        <div className="rating">{movie.vote_average}%</div>
        <div className="menu-icon">...</div>
      </div>
      <div className="movie-info">
        <div className="movie-title">{movie.original_title}</div>
        <div className="movie-date">{movie.release_date}</div>
      </div>
    </div>
  );
}