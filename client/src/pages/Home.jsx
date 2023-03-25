import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filters from "../components/Filters";
import RecipesContainer from "../components/RecipesContainer";
import SearchBar from "../components/SearchBar";
import { apiRecipesFetch } from "../redux/actions";

export default function Home() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(apiRecipesFetch());
  }, []);

  return (
    <div className="home">
      <Filters />
      <SearchBar />
      <RecipesContainer />
    </div>
  );
}
