import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDiets } from "../redux/actions";
import { MainContainer } from "../components/styles/Var.js";
import { LayoutWrapper } from "../components/styles/LandingPage";

export default function Landing() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(getAllDiets());
  }, []);

  return (
    <LayoutWrapper className="landing-page">
      <h1 className="title">Global Recipes</h1>
      <h2 className="sub-title">
        From our kitchen to yours - delicious recipes made easy!
      </h2>
      <p className="intro">
        Our recipes cover a wide range of cuisines, from traditional family
        favorites to international dishes. We believe that cooking should be fun
        and accessible for everyone, so we've designed our recipes with clear
        and concise instructions, accompanied by mouth-watering photos that will
        make you want to get cooking right away.
      </p>
      <p className="catchprhase">Happy cooking!</p>
      <Link to="/home">Take a look around~</Link>
    </LayoutWrapper>
  );
}
