import styled from "styled-components";
import { BoxShadow } from "./mixins";

export const ColumnFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  .inner-wrapper {
    border-radius: 1rem;
    background-image: ${(props) => `url(${props.imgSrc})`};
    background-blend-mode: multiply;
    background-position: 20% center;
    background-size: cover;
    /* object-fit: cover; */
    height: 30ch;
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
      display: flex;
      gap: 1.2ch;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      > * {
        padding: 0.7rem;
      }
      ${BoxShadow}
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
