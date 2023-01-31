import { recipes } from "/data/recipes.js"


/////////////////////////// Create flat array containing all searchable keywords///////////////////////////

/*let newRecipeArray = recipes.map(recipe => {
    let words = []
    words.push(recipe.name.toLowerCase())
    words.push(recipe.description.toLowerCase())
    recipe.ingredients.forEach(ingredient => words.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, words: words }
});



///////////////////////// Create search funtion on input///////////////////////////////////////////////////


const input = document.querySelector(".search-bar-input")
const recipesContainer = document.querySelector(".recipes-container")
input.addEventListener("input", searchRecipes)


function searchRecipes() {
    if (input.value.length >= 3) {
        let searchResultsStore = []
        newRecipeArray.forEach(recipe => {
            let wordsTostring = recipe.words.toString()
            let inputValue = input.value.toLowerCase()
            if (wordsTostring.includes(inputValue) ||
                wordsTostring.split(" ").includes(inputValue)) {
                searchResultsStore.push({ id: recipe.id });
            }
        })
        let updatedArray = recipes.filter(a => searchResultsStore.some(b => a.id === b.id));
        console.log(updatedArray)
        recipesContainer.textContent = ''
        updatedArray.forEach((recipe) => {
            const recipesContainer = document.querySelector(".recipes-container")
            recipesContainer.appendChild(createRecipeCard(recipe))
        })
    }
}


function displaySelectedRecipes() {
    updatedArray.forEach((recipe) => {
        const recipesContainer = document.querySelector(".recipes-container")
        recipesContainer.appendChild(createRecipeCard(recipe))
    })
}


///////////////////////////////////////////////////////////
*/