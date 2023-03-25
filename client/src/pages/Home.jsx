import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filters from "../components/Filters";
import RecipesContainer from "../components/RecipesContainer";
import SearchBar from "../components/SearchBar";
import { apiRecipesFetch } from "../redux/actions";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 2rem;
`;

export default function Home() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(apiRecipesFetch());
  }, []);

  return (
    <Container className="home">
      <SearchBar />
      <Filters />
      <RecipesContainer />
    </Container>
  );
}
