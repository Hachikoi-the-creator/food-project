import styled from "styled-components";

export const LayoutMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;

  main {
    width: 100%;
  }
`;

export const NavbarStyled = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 2.3rem;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: black;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  li {
    padding: 0.3rem;
  }
`;

export const FooterStyle = styled.footer`
  background-color: pink !important;
  width: 100%;
  color: black;
  text-align: center;

  a {
    text-decoration: underline;
    color: var(--dark-blue);
  }
`;
