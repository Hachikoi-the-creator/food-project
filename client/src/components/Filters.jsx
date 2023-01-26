import { Component } from "react";
import { connect } from "react-redux";
import { filterByAlpha, filterRecipesByName } from "../redux/actions";
import DietTypesSelector from "./DietTypesSelector";
import { GenericFlexContainer } from "./styles/FilterStuff";

class Filters extends Component {
  handleDietAlpha(isAscendingOrder) {
    this.props.filterByAlpha(isAscendingOrder);
  }

  handleSearchByName(name) {
    if (name.length) this.props.filterRecipesByName(name);
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

        <DietTypesSelector
          label={"Filter by diets"}
          handler={this.handleSearchByName}
        />
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
  filterRecipesByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
