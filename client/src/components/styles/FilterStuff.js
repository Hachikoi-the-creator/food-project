import styled from "styled-components";

export const GenericFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  gap: 0.5rem;
`;

export const ButtonsList = styled.ul`
  list-style: none;
  display: flex;

  li {
    margin: 0.3rem;
  }

  button {
    color: white;
  }

  .curr-page {
    border: white 2px solid;
  }

  .btn-icon {
    background: none;
    padding: 0;
    cursor: pointer;

    &:hover svg {
      fill: #303c8d;
    }
  }
`;
