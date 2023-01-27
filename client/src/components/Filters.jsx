import { Component } from "react";
import { connect } from "react-redux";
import {
  filterByAlpha,
  filterByDietType,
  filterRecipesByName,
} from "../redux/actions";
import DietTypesSelector from "./DietTypesSelector";
import { GenericFlexContainer } from "./styles/FilterStuff";

class Filters extends Component {
  handleDietAlpha(isAscendingOrder) {
    this.props.filterByAlpha(isAscendingOrder);
  }

  render() {
    return (
      <div className="filter-section">
        <GenericFlexContainer className="aplha-filter">
          <p>by Alpabatich order</p>
          <button onClick={() => this.handleDietAlpha(true)}>Ascending</button>
          <button onClick={() => this.handleDietAlpha(false)}>
            Descending
          </button>
        </GenericFlexContainer>

        <DietTypesSelector />
      </div>
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
