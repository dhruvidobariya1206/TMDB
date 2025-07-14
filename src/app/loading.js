import "./loading.css";

export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return(
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  )
}