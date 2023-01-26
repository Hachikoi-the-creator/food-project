import RecipesContainer from "../components/RecipesContainer";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <SearchBar />
      <RecipesContainer />
    </div>
  );
}
