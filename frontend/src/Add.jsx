import { Component } from "react";
import axios from "axios";

class Add extends Component {
  state = {
    recipeName: "",
    ingredientsList: "",
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

  handleAddButtonClick = () => {
    axios
      .post("http://localhost:3001/addRecipe", {
        recipeName: this.state.recipeName,
        ingredientsList: this.state.ingredientsList,
      })
      .then((response) => {
        alert("Sikeresen hozzáadtad a receptet! :)");
      })
      .catch((errorMessage) => {
        console.error(errorMessage);
      });
  };

  render() {
    return (
      <div className="AddContainer">
        <h3>
          Alább bővítheted a receptek listáját, bátran add hozzá a sajátodat!
          Add meg a recept nevét és írd le az összetevőit!
        </h3>
        <input
          id="Name_Input"
          type="text"
          placeholder="Ide írd a recept nevét!"
          onChange={this.handleRecipeNameChange}
        />
        <input
          id="Add_Ingredients_Input"
          type="text"
          placeholder="Sorold fel a recept hozzávalóit! Pl.: habtejszín, vaj, tojás, cukor, fahéj"
          onChange={this.handleIngredientsListChange}
        />
        <button type="button" onClick={this.handleAddButtonClick}>
          hozzáadás
        </button>
      </div>
    );
  }
}

export default Add;
