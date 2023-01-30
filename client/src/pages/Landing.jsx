import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDiets } from "../redux/actions";
import { MainContainer } from "../components/styles/Var.js"
import { LayoutWrapper } from "../components/styles/LandingPage";

export default function Landing() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(getAllDiets());
  }, []);

  return (
    <LayoutWrapper className="landing-page">
    <MainContainer>
    <h1>Welcome to my app :3</h1>
    <Link to="/home">Discover the app~</Link>
    </MainContainer>
    </LayoutWrapper>
  );
}
