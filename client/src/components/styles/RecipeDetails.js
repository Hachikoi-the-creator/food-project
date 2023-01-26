import styled from "styled-components";

export const OrderedList = styled.ol`
  list-style: upper-roman;
`;

export const RecipeStyles = styled.div`
  padding: 1rem;
  /* margin-bottom for all childs */
  > * {
    margin-bottom: 1.3rem;
  }

  .recipe-name {
    text-align: center;
  }

  .recipe-img {
    border-radius: 1rem;
  }

  .ol-steps {
  }

  .diets-list {
  }
`;
