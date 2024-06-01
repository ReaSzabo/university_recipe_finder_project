const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const convertArrayToString = (ingredientsAsArray) => {
  const ingredientsAsString = ingredientsAsArray.join(", ");
  return ingredientsAsString;
};

const convertStringToArray = (ingredientsAsString) => {
  const ingredientsAsArray = ingredientsAsString.split(",");

  for (let i = 0; i < ingredientsAsArray.length; i++) {
    ingredientsAsArray[i] = ingredientsAsArray[i].trim();
  }
  return ingredientsAsArray;
};

function canCookRecipe(recipeIngredients, availableIngredients) {
  const availableIngredientsAsArray =
    convertStringToArray(availableIngredients);
  for (let i = 0; i < recipeIngredients.length; i++) {
    if (!availableIngredientsAsArray.includes(recipeIngredients[i])) {
      return false;
    }
  }
  return true;
}

function filterRecipes(recipes, availableIngredients) {
  const filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    if (canCookRecipe(recipes[i].ingredients, availableIngredients)) {
      filteredRecipes.push(recipes[i]);
    }
  }
  return filteredRecipes;
}

app.post("/findRecipe", (req, res) => {
  const availableIngredients = req.body.ingredients;

  const filePath = path.join(__dirname, "recipes.json");
  fs.readFile(filePath, "utf8", (error, data) => {
    const recipes = JSON.parse(data);
    const filteredRecipes = filterRecipes(recipes, availableIngredients);
    const filteredRecipeNames = filteredRecipes.map((recipe) => recipe.name);
    res.json(convertArrayToString(filteredRecipeNames));
  });
});

app.post("/addRecipe", (req, res) => {
  const newRecipeName = req.body.recipeName;
  const newRecipeIngredientsAsString = req.body.ingredientsList;

  const newRecipeIngredientsAsArray = convertStringToArray(
    newRecipeIngredientsAsString
  );

  const newRecipe = {
    name: newRecipeName,
    ingredients: newRecipeIngredientsAsArray,
  };

  const filePath = path.join(__dirname, "recipes.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    const recipes = JSON.parse(data);
    recipes.push(newRecipe);

    fs.writeFile(filePath, JSON.stringify(recipes, null, 2), (writeErr) => {
      res.json("Siker!!!!!!!");
    });
  });
});

app.listen(3001, () => {
  console.log("Fut a szerver a 3001-es porton.");
});

module.exports = {
  canCookRecipe,
  filterRecipes,
  convertStringToArray,
  convertArrayToString,
};
