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
  border-bottom: 1px solid #ad00ad;
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

export const FormInnerWrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    gap: 1.3rem;
    justify-content: center;
  }

  margin-bottom: 1rem;
`;
//export const GridCheckboxContainer = styled.div``

export const GridCheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const CheckboxInputStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  > * {
    text-align: center;
  }
`;

export const IngListMainContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:1rem;
  justify-content:center;
  width:80%;
  margin: 1rem 10%;
`;

export const IngredientsListWrapper = styled.div`
  border: 1px solid pink;
  background-color: #ae2eff3b;
  border-radius:0.5rem; 
  padding:0.5rem;
  display:flex;
  flex-direction:column;
  width:20%; 
  min-width:20ch;

 > input {
    margin-bottom:1.3rem;
  }
`;

export const AddRemoveBtn = styled.button`
  all:unset; 
  cursor:pointer;
  margin-top:1rem;

  img {
    width: 5ch;
  }
`
