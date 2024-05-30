import { Component } from "react";

class Search extends Component {
  state = {
    ingredients: "",
    recipeList: "",
  };

  handleIngredientChange = (event) => {
    this.setState({
      ingredients: event.target.value,
    });
  };

  handleSearchButtonClick = () => {
    this.setState({
      recipeList: "cghvbjknlmlé",
    });
  };

  render() {
    return (
      <div className="SearchContainer">
        {this.state.ingredients}
        <h1> RECIPE FINDER </h1>
        <p>
          Sorold fel, milyen alapanyagaid vannak és lássuk, milyen desszertet
          készíthetsz belőlük!
        </p>
        <input
          id="Ingredients_Input"
          type="text"
          placeholder="Ide írd az alapanyagaidat! Pl.: habtejszín, vaj, tojás, cukor, fahéj"
          onChange={this.handleIngredientChange}
        />
        <button type="button" onClick={this.handleSearchButtonClick}>
          keresés
        </button>

        <h2> A keresés eredménye : </h2>
        {this.state.recipeList}
      </div>
    );
  }
}

export default Search;
