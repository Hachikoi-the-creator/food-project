import { Component } from "react";
import { connect } from "react-redux";
import {
  filterByAlpha,
  filterByDietType,
  filterRecipesByName,
} from "../redux/actions";
import DietTypesSelector from "./DietTypesSelector";
import { GenericFlexContainer } from "./styles/FilterStuff";
import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";
import styled from "styled-components";

const AlphaOptions = styled.div`
  display: flex;
  flex-direction: column;

  .options-btns {
    display: flex;
    justify-content: space-evenly;
  }
`;

const FiltersSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  /* @media (min-width: 800px){
    flex-direction: row;
  } */

  .btn-pack {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
    flex-direction: column;
  }

  & .btn-pack:first-child {
    border-right: 1px solid var(--dark-blue);
    padding-right: 1rem;
  }
`;

class Filters extends Component {
  handleDietAlpha(isAscendingOrder) {
    this.props.filterByAlpha(isAscendingOrder);
  }

  render() {
    return (
      <FiltersSection className="filter-section">
        <GenericFlexContainer className="aplha-filter">
          <AlphaOptions className="alpha-options">
            <p>Alphabetic order</p>
            <div className="options-btns">
              <div className="btn-pack">
                <span>Asc</span>
                <button onClick={() => this.handleDietAlpha(true)}>
                  <ImSortAlphaAsc />
                </button>
              </div>

              <div className="btn-pack">
                <span>Desc</span>
                <button onClick={() => this.handleDietAlpha(false)}>
                  <ImSortAlphaDesc />
                </button>
              </div>
            </div>
          </AlphaOptions>
        </GenericFlexContainer>

        <DietTypesSelector />
      </FiltersSection>
    );
  }
}

const mapStateToProps = (state) => ({});
//   {
//   allDiets: state.allDiets,
// }

const mapDispatchToProps = {
  filterByAlpha,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
