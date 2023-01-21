import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-page">
      <h1>Welcome to my app :3</h1>
      <Link to="/home">Discover the app~</Link>
    </div>
  );
}
