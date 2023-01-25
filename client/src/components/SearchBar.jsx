import { useRef, useState } from "react";
// import { Input } from "./styledSearchBar";
import { useSelector, useDispatch } from "react-redux";
import { filterRecipesByName } from "../redux/actions";

export default function SearchBar() {
  const dispatcher = useDispatch();
  const inputRef = useRef();
  // const [foodGotten, setFoodGotten] = useState([]);
  // const apiRecipes = useSelector((data) => data.apiRecipes);

  const searchHandler = () => {
    const recipeName = inputRef.current.value;
    useDispatch(filterRecipesByName(recipeName));
  };

  return (
    <div>
      <label htmlFor="food-name">Search For Food</label>
      <input
        type="text"
        placeholder="Search..."
        id="food-name"
        ref={inputRef}
      />
      <button onClick={searchHandler}>Search</button>
    </div>
  );
}
