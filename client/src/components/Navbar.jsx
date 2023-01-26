import { Link } from "react-router-dom";
import { NavbarStyled } from "./styles/LayoutStuff";

export default function Navbar() {
  return (
    <NavbarStyled>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">Landing</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
      </ul>
    </NavbarStyled>
  );
}
