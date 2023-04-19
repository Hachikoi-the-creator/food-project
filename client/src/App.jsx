import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
// import CreateRecipe from "./pages/CreateRecipe";
import NewCreateRecipe from "./pages/NewCreateRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Custom404 from "./pages/Custom404";

export default function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/home"} element={<Home />} />
      <Route path={"/details/:id"} element={<RecipeDetails />} />
      <Route path={"/new-create"} element={<NewCreateRecipe />} />
      <Route path={"*"} element={<Custom404 />} />
    </Routes>
  );
}
