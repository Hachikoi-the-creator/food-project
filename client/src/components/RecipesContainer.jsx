import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import Paged from "./Paged";
import Filters from "./Filters";

export default function RecipesContainer() {
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const [page, setPage] = useState(1);
  const pagesRecipes = filteredRecipes?.slice(
    (page - 1) * 10 + 10,
    page * 10 + 10
  );

  return (
    <div className="recipes-container">
      <Filters />
      <Paged {...{ page }} total={filteredRecipes.length} {...{ setPage }} />
      <div className="recipes-inner-wrapper">
        <h2>Check out these recipes :D</h2>
        {pagesRecipes.slice(2).map((data) => (
          <RecipeCard key={data.name} {...{ data }} />
        ))}
      </div>
      <Paged {...{ page }} total={filteredRecipes.length} {...{ setPage }} />
    </div>
  );
}
