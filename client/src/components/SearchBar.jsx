import { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { filterRecipesByName } from "../redux/actions";

const SearchSection = styled.section`
  padding-top: 2rem;

  > * {
    margin: 0.3rem;
  }
`;

export default function SearchBar() {
  const dispatcher = useDispatch();
  const inputRef = useRef();

  const searchHandler = () => {
    const recipeName = inputRef.current.value;
    if (recipeName.length) dispatcher(filterRecipesByName(recipeName));
    else
      console.log(
        "Input is empty, distpatch something to make it equal to base state"
      );
  };

  return (
    <SearchSection className="name-search">
      <label htmlFor="food-name">Search For Food</label>
      <input
        type="text"
        placeholder="Search..."
        id="food-name"
        ref={inputRef}
      />
      <button onClick={searchHandler}>Search</button>
    </SearchSection>
  );
}
