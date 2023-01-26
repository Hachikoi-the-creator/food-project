import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiRecipesFetch, getAllDiets } from "../redux/actions";

export default function Landing() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(apiRecipesFetch());
    dispatcher(getAllDiets());
  }, []);

  return (
    <div className="landing-page">
      <h1>Welcome to my app :3</h1>
      <Link to="/home">Discover the app~</Link>
    </div>
  );
}
