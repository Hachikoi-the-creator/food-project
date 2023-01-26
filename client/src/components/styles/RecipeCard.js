import styled from "styled-components";

export const Card = styled.div`
  .inner-wrapper {
    padding: 0.5rem;
    border-radius: 1rem;
    background-image: ${(props) => `url(${props.imgSrc})`};
    background-blend-mode: multiply;
    background-position: 20% center;
    background-size: cover;
    /* object-fit: cover; */
    width: 30vw;
    height: 20vw;
    padding: 0.2rem;

    .title {
      font-size: 1.2rem;
      text-decoration: underline;
      text-align: center;
    }

    .title,
    .diets-container {
      color: transparent;
    }

    .diets-container {
      margin-top: 1.3ch;
      display: flex;
      gap: 1.2ch;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      background-color: #242424;

      .title,
      .diets-container {
        color: #f87aff;
      }
    }
  }

  /* < 700 */
  @media (max-width: 700px) {
    .inner-wrapper {
      width: 100%;
      min-height: 20ch;
    }
  }

  /* cant hover on mobile... */
  @media (max-width: 500px) {
    .inner-wrapper {
      background-color: #404040;

      .title,
      .diets-container {
        color: #f87aff;
      }
    }
  }
`;
