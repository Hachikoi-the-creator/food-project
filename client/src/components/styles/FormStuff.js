import styled, { css } from "styled-components";

const SubTitle = css`
  text-align: center;
  font-size: 1.4rem;
  margin-block: 1.7rem 0.4rem;
  text-decoration: underline;
`;

export const SelectDietsWrapper = styled.div`
  width: 80%;
  margin: 0 10%;
  flex-direction: column;

  &,
  .checkbox-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    ${SubTitle}
  }

  .checkbox-item {
    padding: 0.4rem;
    flex-direction: column;

    input {
      height: 1.3rem;
      width: 1.3rem;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .reset-btn {
    margin: 0.5rem 0;
    width: 50%;
    background-color: #ff919199;
    border: 1px solid salmon;
  }
`;

export const TextAreaStyled = styled.div`
  .title {
    display: block;
    ${SubTitle}
  }

  textarea {
    width: 100%;
    height: 10ch;
  }
`;

export const IngredientInfo = styled.div`
  border: 1px solid #ad00ad;
  padding: 0.5rem;
  border-radius: 0.3rem;
  background-color: #9e9e9e2e;

  &,
  .input-wrapper {
    display: flex;
    flex-direction: column;
  }

  .input-wrapper {
    padding-bottom: 0.4rem;
  }
`;

export const IngredientListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 80%;
  margin: 5% 10% 2% 10%;
`;
