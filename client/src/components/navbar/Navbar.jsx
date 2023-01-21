import { Link } from "react-router-dom";
import { Nav } from "./styledNavbar";

export default function Navbar() {
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
        <li>
          <Link to="/register">REGISTER</Link>
        </li>
        <li>
          <Link to="/create">CREATE</Link>
        </li>
        <li>
          <Link to="/details/99">DETAILS</Link>
        </li>
      </ul>
    </Nav>
  );
}
