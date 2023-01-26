import styled from "styled-components";

export const NavbarStyled = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: purple;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  li {
    padding: 0.3rem;
  }
`;
