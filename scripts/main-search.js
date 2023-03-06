import { recipes } from "/data/recipes.js"
import { ingredientsContainer, appliancesContainer, ustensilsContainer, newIngredientsArray, newAppliancesArray, newUstensilsArray, displayTagsInsideDropdowns } from "./tags-display.js"
import { recipesContainer, displayRecipes } from "./recipe-card.js"
import { inputIngredients, inputUstensils, inputAppliances } from "./search-tags.js"


///////// Create flat array containing all searchable keywords (among names, recipes, ingredients) //////////

let newRecipeArray = recipes.map(recipe => {
    let words = []
    words.push(recipe.name.toLowerCase())
    words.push(recipe.description.toLowerCase())
    recipe.ingredients.forEach(ingredient => words.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, words: words }
})


//////////////////////////////////// Create search function on main input //////////////////////////////////////

const inputSearchBar = document.querySelector(".search-bar-input")
inputSearchBar.addEventListener("input", searchRecipes)


// Remove accents from strings to compare items with input

export function removeAccents(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}


/*let searchResultsStore = []*/

function searchRecipes() {
    let searchResultsStore = []
    if (inputSearchBar.value.length >= 3) {
        let inputValue = inputSearchBar.value.toLowerCase()
        let normalizedInputValue = removeAccents(inputValue)
        searchResultsStore = newRecipeArray.filter(recipe => removeAccents(recipe.words.toString()).includes(normalizedInputValue))
        if (searchResultsStore.length != 0) {
            updateRecipes(searchResultsStore)
            updateTags(searchResultsStore)
        } else {
            recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        }
    } else {
        displayReset()
    }
    console.log(searchResultsStore)
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
    displayTagsInsideDropdowns(updatedIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
    let updatedAppliancesArray = newAppliancesArray.filter(appliance => searchResultsStore.some(id => appliance.ids.includes(id.id)))
    appliancesContainer.innerHTML = ""
    displayTagsInsideDropdowns(updatedAppliancesArray, appliancesContainer, "appliance", inputAppliances)
    let updatedUstensilsArray = newUstensilsArray.filter(ustensil => searchResultsStore.some(id => ustensil.ids.includes(id.id)))
    ustensilsContainer.innerHTML = ""
    displayTagsInsideDropdowns(updatedUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)
}


// Reset recipes and dropdowns when inputs are cleared and/or tags unclicked

export function displayReset() {
    recipesContainer.textContent = ""
    displayRecipes(recipes)
    ingredientsContainer.innerHTML = ""
    displayTagsInsideDropdowns(newIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
    appliancesContainer.innerHTML = ""
    displayTagsInsideDropdowns(newAppliancesArray, appliancesContainer, "appliance", inputAppliances)
    ustensilsContainer.innerHTML = ""
    displayTagsInsideDropdowns(newUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)
}





///////////////////////// A supprimer //////////////////////



// function searchRecipes() {
//     let searchResultsStore = []
//     if (inputSearchBar.value.length >= 3) {
//         // Create array to store recipes ids as results of user's search
//         let inputValue = inputSearchBar.value.toLowerCase()

//         // Remove accents from input and searchable words
//         let normalizedInputValue = removeAccents(inputValue)
//         newRecipeArray.forEach(recipe => {
//             const wordsTostring = recipe.words.toString()
//             const normalizedWordsTostring = removeAccents(wordsTostring)
//             if (normalizedWordsTostring.includes(normalizedInputValue)) {
//                 searchResultsStore.push({ id: recipe.id })
//                 updateRecipes(searchResultsStore)
//                 updateTags(searchResultsStore)
//             }
//         })
//         if (searchResultsStore.length === 0) {
//             recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
//         }
//     } else {
//         displayReset()
//     }
//     console.log(searchResultsStore)
// }