import { useRef } from "react";
import { Input } from "./styledSearchBar";

export default function SearchBar() {
  const inputRef = useRef();
  const [foodGotten, setFoodGotten] = useState([]);
  // Array.prototype.length

  const searchHandler = () => {
    const value = inputRef.current.value;
    // do request to my API
    const res = ["Some recipe kek"];
    setFoodGotten(res);
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
      {!foodGotten.length && (
        <p>
          Was not able find what you were loking for D: try a shorter search~
        </p>
      )}
    </div>
  );
}
