import { useSelector } from "react-redux";
import { useState } from "react";
import { MainContainer } from "./styles/Var";
import { FlexWrapper } from "./styles/RecipeMain";
import Paged from "./Paged";
import Filters from "./Filters";
import RecipeCard from "./RecipeCard";

export default function RecipesContainer() {
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const [page, setPage] = useState(1);
  // redux is not instant
  const pagesRecipes = filteredRecipes?.slice((page - 1), page * 10);

  return (
    <MainContainer className="recipes-container">
      <Filters />
      <Paged {...{ page }} total={filteredRecipes.length} {...{ setPage }} />
      <h2 className="main-title">Check out these recipes :D</h2>
      <FlexWrapper className="recipes-inner-wrapper">
        {pagesRecipes.map((data) => (
          <RecipeCard key={data.name} {...{ data }} />
        ))}
      </FlexWrapper>
      <Paged {...{ page }} total={filteredRecipes.length} {...{ setPage }} />
    </MainContainer>
  );
}
