import { Component } from "react";
import axios from "axios";
import "./add.css";

class Add extends Component {
  state = {
    recipeName: "",
    ingredientsList: "",
    description: ""
  };

  handleRecipeNameChange = (event) => {
    this.setState({
      recipeName: event.target.value,
    });
  };

  handleIngredientsListChange = (event) => {
    this.setState({
      ingredientsList: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleAddButtonClick = () => {
    axios
      .post("https://recipe-finder-441617.lm.r.appspot.com/addRecipe", {
        //.post("http://localhost:3001/addRecipe", {
        recipeName: this.state.recipeName,
        ingredientsList: this.state.ingredientsList,
        description: this.state.description,
      })
      .then((response) => {
        alert("Sikeresen hozzáadtad a receptet! :)");
        this.setState({
          recipeName: "",
          ingredientsList: "",
          description: "",
        });

      })
      .catch((errorMessage) => {
        console.error(errorMessage);
      });
  };

  render() {
    return (
      <div className="AddContainer">
        <div className="SearchHeader">
          <h1> RECIPE FINDER </h1>
        </div>
        <div className="AddContainerHeader">
          <p>
            You can expand the list of recipes below, feel free to add your own!
            Enter the name of the recipe and its ingredients!
          </p>
        </div>
        <div className="InputContainer">

          <input
            id="Name_Input"
            type="text"
            value={this.state.recipeName}
            placeholder="Write the name of the recipe here!"
            onChange={this.handleRecipeNameChange}
          />

          <input
            id="Add_Ingredients_Input"
            type="text"
            value={this.state.ingredientsList}
            placeholder="Write the ingredients here! 
            For example: whipped cream, butter, eggs, sugar, cinnamon"
            onChange={this.handleIngredientsListChange}
          />

          <textarea
            className="Add_Description_Input"
            value={this.state.description}
            placeholder="Write the recipe description here!"
            onChange={this.handleDescriptionChange}
          >
          </textarea>
          <button className="AddButton" type="button" onClick={this.handleAddButtonClick}>
            ADD
          </button>
        </div>
      </div>
    );
  }
}

export default Add;
