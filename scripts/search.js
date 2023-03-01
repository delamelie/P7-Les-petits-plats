import { recipes } from "/data/recipes.js"
import { ingredientsContainer } from "./tags-display.js"
import { appliancesContainer } from "./tags-display.js"
import { ustensilsContainer } from "./tags-display.js"
import { recipesContainer } from "./recipe-card.js"
import { newIngredientsArray } from "./tags-display.js"
import { newAppliancesArray } from "./tags-display.js"
import { newUstensilsArray } from "./tags-display.js"
import { displayRecipes } from "./recipe-card.js"
import { displayTags } from "./tags-display.js"
import { inputIngredients } from "./search-tags.js"
import { inputUstensils } from "./search-tags.js"
import { inputAppliances } from "./search-tags.js"


///////// Create flat array containing all searchable keywords (among names, recipes, ingredients) //////////

let newRecipeArray = recipes.map(recipe => {
    let words = []
    words.push(recipe.name.toLowerCase())
    words.push(recipe.description.toLowerCase())
    recipe.ingredients.forEach(ingredient => words.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, words: words }
})


//////////////////////////////////// Create search funtion on main input //////////////////////////////////////

const inputSearchBar = document.querySelector(".search-bar-input")
inputSearchBar.addEventListener("input", searchRecipes)


/*let searchResultsStore = []*/

function searchRecipes() {
    if (inputSearchBar.value.length >= 3) {
        //Create array to store recipes ids as results of user's search
        let searchResultsStore = []
        let inputValue = inputSearchBar.value.toLowerCase()
        newRecipeArray.forEach(recipe => {
            const wordsTostring = recipe.words.toString()
            if (wordsTostring.includes(inputValue)) {
                searchResultsStore.push({ id: recipe.id })
                updateRecipes(searchResultsStore)
                updateTags(searchResultsStore)
            }
        })
        if (searchResultsStore.length === 0) {
            recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        }
    } else {
        displayReset()
    }
}


//Create array to retrieve recipes matching previously stored ids and update recipes display accordingly

function updateRecipes(searchResultsStore) {
    let updatedRecipesArray = recipes.filter(recipe => searchResultsStore.some(result => recipe.id === result.id))
    recipesContainer.textContent = ''
    displayRecipes(updatedRecipesArray)
}


//Create arrays to retrieve ingredients, appliances and ustensils matching previously stored ids and update tags display accordingly

function updateTags(searchResultsStore) {
    let updatedIngredientsArray = newIngredientsArray.filter(ingredient => searchResultsStore.some(id => ingredient.ids.includes(id.id)))
    ingredientsContainer.innerHTML = ""
    displayTags(updatedIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
    let updatedAppliancesArray = newAppliancesArray.filter(appliance => searchResultsStore.some(id => appliance.ids.includes(id.id)))
    appliancesContainer.innerHTML = ""
    displayTags(updatedAppliancesArray, appliancesContainer, "appliance", inputAppliances)
    let updatedUstensilsArray = newUstensilsArray.filter(ustensil => searchResultsStore.some(id => ustensil.ids.includes(id.id)))
    ustensilsContainer.innerHTML = ""
    displayTags(updatedUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)
}


// Reset recipes and dropdowns when inputs are cleared and/or tags unclicked

export function displayReset() {
    recipesContainer.textContent = ""
    displayRecipes(recipes)
    ingredientsContainer.innerHTML = ""
    displayTags(newIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
    appliancesContainer.innerHTML = ""
    displayTags(newAppliancesArray, appliancesContainer, "appliance", inputAppliances)
    ustensilsContainer.innerHTML = ""
    displayTags(newUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)
}




