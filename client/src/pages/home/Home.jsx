import Filters from "../../components/filters/Filters";
import RecipesContainer from "../../components/recipesContainer/RecipesContainer";
import SearchBar from "../../components/searchBar/SearchBar";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <SearchBar />
      <RecipesContainer />
    </div>
  );
}
