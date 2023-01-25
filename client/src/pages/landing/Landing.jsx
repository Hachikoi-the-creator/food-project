import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { apiRecipesFetch } from "../../redux/actions";

export default function Landing() {
  const dispatcher = useDispatch();
  const navigator = useNavigate();

  const clickInHandler = () => {
    dispatcher(apiRecipesFetch());
    navigator("/home");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to my app :3</h1>
      <button onClick={clickInHandler}>Discover the app~</button>
    </div>
  );
}
