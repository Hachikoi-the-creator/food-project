import styled from "styled-components";

export const LayoutWrapper = styled.div`
  background-image: url("/chef.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* darken bg */
  background-color: grey;
  background-blend-mode: multiply;

  min-height: calc(100vh - 2rem);
  padding: 3rem 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;

  @media (min-width: 800px) {
    padding: 10rem 10%;
  }

  a {
    display: inline-block;
    background-color: purple;
    border-radius: 0.5rem;
    padding: 0.4rem 1.2rem;
    margin-top: 1rem;
    background-color: var(--blue);
    color: black;
    font-size: 1.2rem;
  }

  .title {
    font-size: 3rem;
    text-decoration: none;
    margin-bottom: 1rem;
  }

  .intro {
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
    font-size: 1.2rem;
    background-color: rgba(0, 0, 0, 0.3);
    margin-block: 2rem;

    @media (min-width: 800px) {
      width: 50%;
    }
  }

  .catch-prhase {
    font-size: 1.2rem;
  }
`;
