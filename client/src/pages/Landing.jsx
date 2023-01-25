import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiRecipesFetch } from "../redux/actions";

export default function Landing() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(apiRecipesFetch());
  }, []);

  return (
    <div className="landing-page">
      <h1>Welcome to my app :3</h1>
      <Link to="/home">Discover the app~</Link>
    </div>
  );
}