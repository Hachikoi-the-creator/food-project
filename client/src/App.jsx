import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CreateRecipe from "./pages/CreateRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Register from "./pages/Register";
import Custom404 from "./pages/Custom404";

export default function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/home"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/details/:id"} element={<RecipeDetails />} />
      <Route path={"/create"} element={<CreateRecipe />} />
      <Route path={"*"} element={<Custom404 />} />
    </Routes>
  );
}
