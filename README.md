# university_recipe_finder_project
I created this recipe search web application within the framework of a university course called "Software Development".

I created a web application where the user can save recipes, search among recipes based on their ingredients and list the results. 
I created the user interface with the React library and implemented the save and search business logic on a Node.js server. 
The server saves and loads the recipes in a JSON file.

## how to run
1. download Node.js from https://nodejs.org/en/download/package-manager
2. clone the repository to the selected folder with
```
git clone https://github.com/ReaSzabo/university_recipe_finder_project
```
3. start the react project
```
cd university_recipe_finder_project/frontend
npm install
npm start
```
4. in an other terminal start the node.js server
```
cd backend
npm install
node express.js
```

## how to test
```
cd backend
npm install
npm run test
```
