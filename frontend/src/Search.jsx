import { Component } from "react";
import axios from "axios";
import "./search.css";

class Search extends Component {
  state = {
    ingredients: "",
    recipeList: [],
    description: "",
  };

  handleIngredientChange = (event) => {
    this.setState({
      ingredients: event.target.value,
    });
  };

  handleSearchButtonClick = () => {
    axios
      .post("https://recipe-finder-441617.lm.r.appspot.com/findRecipes", {
        //.post("http://localhost:3001/findRecipes", {
        ingredients: this.state.ingredients,
      })
      .then((response) => {
        this.setState({
          recipeList: response.data,
        });
      })
      .catch((errorMessage) => {
        console.error(errorMessage);
      });
  };

  handleGetDescriptionClick = (event) => {
    for (let i = 0; i < this.state.recipeList.length; i++) {
      if (this.state.recipeList[i].name === event.target.textContent) {
        this.setState({
          description: this.state.recipeList[i].description,
        });

        break;
      }
    }
  };

  render() {
    return (
      <div>
        <div className="SearchHeader">
          <h1> RECIPE FINDER </h1>
        </div>
        <div className="SearchContainer">
          <div className="SearchContainerHeader">
            <p>
              List what ingredients you have and let's see, what kind of meals
              you can make of them!
            </p>
          </div>
          <div className="InputField">
            <input
              id="Search_Ingredients_Input"
              type="text"
              placeholder="Write your ingredients here! 
              For example: whipped cream, butter, eggs, sugar, cinnamon"
              onChange={this.handleIngredientChange}
            />
            <button type="button" onClick={this.handleSearchButtonClick}>
              SEARCH
            </button>
          </div>
          <div className="SearchResultContainer">
            <h2> SEARCH RESULT BELOW </h2>
            {this.state.recipeList.map((element) => {
              return <div className="SearchResult" onClick={this.handleGetDescriptionClick} key={element.name}>
                {element.name}
              </div>
            })}
            <div className={`${this.state.description === "" ? 'Hidden' : 'DescriptionContainer'}`}>
              {this.state.description}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Search;
