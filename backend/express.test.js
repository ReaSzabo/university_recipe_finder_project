const {
  canCookRecipe,
  filterRecipes,
  convertStringToArray,
  convertArrayToString,
} = require("./express");

describe("canCookRecipe", () => {
  test("should return true if all recipe ingredients are available", () => {
    const recipeIngredients = ["flour", "sugar", "eggs"];
    const availableIngredients = "flour, sugar, eggs, milk";
    expect(canCookRecipe(recipeIngredients, availableIngredients)).toEqual(
      true
    );
  });

  test("should return false if any recipe ingredient is not available", () => {
    const recipeIngredients = ["flour", "sugar", "eggs"];
    const availableIngredients = "flour, sugar, milk";
    expect(canCookRecipe(recipeIngredients, availableIngredients)).toEqual(
      false
    );
  });

  test("should return false if available ingredients list is empty", () => {
    const recipeIngredients = "flour, sugar, eggs";
    const availableIngredients = "";
    expect(canCookRecipe(recipeIngredients, availableIngredients)).toEqual(
      false
    );
  });
});

describe("filterRecipes", () => {
  const recipes = [
    { name: "Piskóta", ingredients: ["tojás", "cukor", "liszt", "só"] },
    {
      name: "Palacsinta",
      ingredients: ["tojás", "cukor", "liszt", "só", "tej", "szódavíz"],
    },
    {
      name: "Brownie",
      ingredients: [
        "tojás",
        "cukor",
        "liszt",
        "só",
        "étcsokoládé",
        "tejcsokoládé",
        "vaj",
      ],
    },
  ];

  test("should return recipes that can be cooked with given ingredients", () => {
    const availableIngredients = "tojás, cukor, liszt, só, tej, szódavíz";
    const result = filterRecipes(recipes, availableIngredients);
    expect(result).toEqual([
      { name: "Piskóta", ingredients: ["tojás", "cukor", "liszt", "só"] },
      {
        name: "Palacsinta",
        ingredients: ["tojás", "cukor", "liszt", "só", "tej", "szódavíz"],
      },
    ]);
  });

  test("should return an empty array if no recipes can be cooked with given ingredients", () => {
    const availableIngredients = "tejszín, rétesliszt";
    const result = filterRecipes(recipes, availableIngredients);
    expect(result).toEqual([]);
  });

  test("should return all recipes if all possible ingredients are available", () => {
    const availableIngredients =
      "tojás, cukor, liszt, só, étcsokoládé, tejcsokoládé, vaj, tej, szódavíz";
    const result = filterRecipes(recipes, availableIngredients);
    expect(result).toEqual(recipes);
  });

  test("should return an empty array if available ingredients list is empty", () => {
    const availableIngredients = "";
    const result = filterRecipes(recipes, availableIngredients);
    expect(result).toEqual([]);
  });
});

describe("convertStringToArray", () => {
  test("should convert a comma-separated string to an array and trim spaces", () => {
    const input = "flour, sugar, eggs, milk";
    const expectedOutput = ["flour", "sugar", "eggs", "milk"];
    expect(convertStringToArray(input)).toEqual(expectedOutput);
  });

  test("should handle extra spaces around commas", () => {
    const input = "flour , sugar , eggs , milk";
    const expectedOutput = ["flour", "sugar", "eggs", "milk"];
    expect(convertStringToArray(input)).toEqual(expectedOutput);
  });

  test("should handle no spaces between items", () => {
    const input = "flour,sugar,eggs,milk";
    const expectedOutput = ["flour", "sugar", "eggs", "milk"];
    expect(convertStringToArray(input)).toEqual(expectedOutput);
  });

  test("should handle a string with one ingredient", () => {
    const input = "flour";
    const expectedOutput = ["flour"];
    expect(convertStringToArray(input)).toEqual(expectedOutput);
  });
});

describe("convertArrayToString", () => {
  test("should convert an array of strings to a string", () => {
    const input = ["flour", "sugar", "butter"];
    const expectedOutput = "flour, sugar, butter";
    expect(convertArrayToString(input)).toEqual(expectedOutput);
  });

  test("should convert an empty array to an empty string", () => {
    const input = [];
    const expectedOutput = "";
    expect(convertArrayToString(input)).toEqual(expectedOutput);
  });

  test("should convert a one-element array to a single string", () => {
    const input = ["sugar"];
    const expectedOutput = "sugar";
    expect(convertArrayToString(input)).toEqual(expectedOutput);
  });
});
