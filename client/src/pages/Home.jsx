import { useEffect } from "react";
import { useDispatch } from "react-redux";
import RecipesContainer from "../components/RecipesContainer";
import SearchBar from "../components/SearchBar";
import { apiRecipesFetch } from "../redux/actions";

export default function Home() {
  const a = 3 === 10;
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(apiRecipesFetch());
  }, []);

  return (
    <div className="home">
      <SearchBar />
      <RecipesContainer />
    </div>
  );
}
