const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'andreaannadev_recipefinder';
const fileName = 'recipes.json';

const app = express();

app.use(cors({ origin: '*' }));
//app.options('*', cors()); // Preflight request handling

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
};

function filterRecipes(recipes, availableIngredients) {
  const filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    if (canCookRecipe(recipes[i].ingredients, availableIngredients)) {
      filteredRecipes.push(recipes[i]);
    }
  }
  return filteredRecipes;
};

function checkId(recipes) {
  let max = 0;
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id > max) {
      max = recipes[i].id;
    }
  }

  return max + 1;

};

app.post("/findRecipes", async (req, res) => {
  const availableIngredients = req.body.ingredients;


  //const filePath = path.join(__dirname, "recipes.json");

  const recipes = await readData();
  const filteredRecipes = filterRecipes(recipes, availableIngredients);
  res.json(filteredRecipes);


  //fs.readFile(filePath, "utf8", (error, data) => {
  //console.error(data)
  //const recipes = JSON.parse(data);
  //const filteredRecipes = filterRecipes(recipes, availableIngredients);
  //res.json(filteredRecipes);
  //});
});

app.post("/addRecipe", async (req, res) => {
  const newRecipeName = req.body.recipeName;
  const newRecipeIngredientsAsString = req.body.ingredientsList;
  const newRecipeDescription = req.body.description;

  const newRecipeIngredientsAsArray = convertStringToArray(
    newRecipeIngredientsAsString
  );

  const newRecipe = {
    id: null,
    name: newRecipeName,
    ingredients: newRecipeIngredientsAsArray,
    description: newRecipeDescription,
  };


  const recipes = await readData();


  newRecipe.id = checkId(recipes);
  recipes.push(newRecipe);


  await writeData(recipes)

  res.json("Siker!!!!!!!");


});

app.listen(8080, () => {
  console.log("Fut a szerver a 8080-as porton.");
});
/*
app.listen(3001, () => {
console.log("Fut a szerver a 3001-as porton.");
});
*/


// Read data
async function readData() {
  const file = storage.bucket(bucketName).file(fileName);
  const [contents] = await file.download();
  console.log('Data read from GCS');
  return JSON.parse(contents);
}

// Write data
async function writeData(jsonData) {
  const file = storage.bucket(bucketName).file(fileName);
  await file.save(JSON.stringify(jsonData));
  console.log('Data written to GCS');
}

module.exports = {
  canCookRecipe,
  filterRecipes,
  convertStringToArray,
  convertArrayToString,
};
