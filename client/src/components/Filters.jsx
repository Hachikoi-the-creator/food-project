import { Component } from "react";
import { connect } from "react-redux";
import { getAllDiets, filterByAlpha } from "../redux/actions";

class Filters extends Component {
  componentDidMount() {
    this.props.getAllDiets();
  }

  handleTypeChange(e) {
    const dietType = e.target.value;
  }

  handleDietAlpha(isAscendingOrder) {
    this.props.filterByAlpha(isAscendingOrder);
  }

  render() {
    const { allDiets } = this.props;
    // console.log(allDiets);

    return (
      <div>
        <h1>{allDiets.length}</h1>
        <div className="diet-filter">
          <label>something</label>
          <select onChange={this.handleTypeChange}>
            {allDiets.map((diet) => (
              <option key={diet.id} value={diet.dietName}>
                {diet.dietName}
              </option>
            ))}
          </select>
        </div>
        <div className="aplha-filter">
          <p>by Alpabatich order</p>
          <button onClick={() => this.handleDietAlpha(true)}>Ascending</button>
          <button onClick={() => this.handleDietAlpha(false)}>
            Descending
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allDiets: state.allDiets,
});

const mapDispatchToProps = {
  getAllDiets,
  filterByAlpha,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
