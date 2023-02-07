import { recipes } from "/data/recipes.js"
import { ingredientsContainer } from "./tags-display.js"
import { appliancesContainer } from "./tags-display.js"
import { ustensilsContainer } from "./tags-display.js"
import { displayIngredientsTags } from "./tags-display.js"
import { displayAppliancesTags } from "./tags-display.js"
import { displayUstensilsTags } from "./tags-display.js"
import { newIngredientsArray } from "./tags-display.js"
import { newAppliancesArray } from "./tags-display.js"
import { newUstensilsArray } from "./tags-display.js"
import { createRecipeCard } from "./recipe-card.js"
import { recipesContainer } from "./recipe-card.js"
import { displayRecipes } from "./recipe-card.js"


/////////////////////////// Create flat array containing all searchable keywords///////////////////////////

let newRecipeArray = recipes.map(recipe => {
    let words = []
    words.push(recipe.name.toLowerCase())
    words.push(recipe.description.toLowerCase())
    recipe.ingredients.forEach(ingredient => words.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, words: words }
})


///////////////////////// Create search funtion on input///////////////////////////////////////////////////


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
            if (wordsTostring.includes(inputValue) ||
                wordsTostring.split(" ").includes(inputValue)) {
                searchResultsStore.push({ id: recipe.id })
                updateRecipes(searchResultsStore)
                updateTags(searchResultsStore)
            }
        })
        if (searchResultsStore.length === 0) {
            recipesContainer.textContent = ""
            recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        }

    } else {
        recipesContainer.textContent = ""
        displayRecipes(recipes)
        ingredientsContainer.innerHTML = ""
        displayIngredientsTags(newIngredientsArray)
        appliancesContainer.innerHTML = ""
        displayAppliancesTags(newAppliancesArray)
        ustensilsContainer.innerHTML = ""
        displayUstensilsTags(newUstensilsArray)
    }
}


//Create array to retrieve recipes matching previously stored ids and update recipes display accordingly

export function updateRecipes(searchResultsStore) {
    let updatedRecipesArray = recipes.filter(recipe => searchResultsStore.some(result => recipe.id === result.id))
    recipesContainer.textContent = ''
    /*displayRecipes(updatedRecipesArray)*/
    updatedRecipesArray.forEach((recipe) => {
        recipesContainer.appendChild(createRecipeCard(recipe))
    })
}


//Create arrays to retrieve ingredients, appliances and ustensils matching previously stored ids and update tags display accordingly

function updateTags(searchResultsStore) {
    let updatedIngredientsArray = newIngredientsArray.filter(ingredient => searchResultsStore.some(id => ingredient.ids.includes(id.id)))
    ingredientsContainer.innerHTML = ""
    displayIngredientsTags(updatedIngredientsArray)
    let updatedAppliancesArray = newAppliancesArray.filter(appliance => searchResultsStore.some(id => appliance.ids.includes(id.id)))
    appliancesContainer.innerHTML = ""
    displayAppliancesTags(updatedAppliancesArray)
    let updatedUstensilsArray = newUstensilsArray.filter(ustensil => searchResultsStore.some(id => ustensil.ids.includes(id.id)))
    ustensilsContainer.innerHTML = ""
    displayUstensilsTags(updatedUstensilsArray)
}




/*function newArrayRecipes() {
    if (input.value.length >= 3) {

        let inputValue = input.value.toLowerCase()

        newRecipeArray.forEach(recipe => {
            let wordsTostring = recipe.words.toString()
            if (wordsTostring.includes(inputValue) ||
                wordsTostring.split(" ").includes(inputValue)) {
                searchResultsStore.push({ id: recipe.id })
                console.log(searchResultsStore)
                searchRecipes()
                return searchResultsStore
            }
        })

    }
}*/









