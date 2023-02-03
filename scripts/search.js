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
});


///////////////////////// Create search funtion on input///////////////////////////////////////////////////


const input = document.querySelector(".search-bar-input")
input.addEventListener("input", searchRecipes)


function searchRecipes() {
    if (input.value.length >= 3) {

        //Create array to store recipes ids as results of user's search
        let searchResultsStore = []
        let inputValue = input.value.toLowerCase()

        newRecipeArray.forEach(recipe => {
            let wordsTostring = recipe.words.toString()
            if (wordsTostring.includes(inputValue) ||
                wordsTostring.split(" ").includes(inputValue)) {
                searchResultsStore.push({ id: recipe.id })
                console.log(searchResultsStore)

                //Create array to retrieve recipes matching previously stored ids and update recipes display accordingly
                let updatedRecipesArray = recipes.filter(a => searchResultsStore.some(b => a.id === b.id))
                recipesContainer.textContent = ''
                /*displayRecipes(updatedRecipesArray)*/
                updatedRecipesArray.forEach((recipe) => {
                    recipesContainer.appendChild(createRecipeCard(recipe))
                })

                //Create array to retrieve ingredients matching previously stored ids and update ingredients tags display accordingly
                const updatedIngredientsArray = newIngredientsArray.filter(a => searchResultsStore.some(id => a.ids.includes(id.id)))
                ingredientsContainer.innerHTML = ""
                displayIngredientsTags(updatedIngredientsArray)

                //Create array to retrieve appliances matching previously stored ids and update appliances tags display accordingly
                const updatedAppliancesArray = newAppliancesArray.filter(a => searchResultsStore.some(id => a.ids.includes(id.id)))
                appliancesContainer.innerHTML = ""
                displayAppliancesTags(updatedAppliancesArray)

                //Create array to retrieve ustensils matching previously stored ids and update ustensils tags display accordingly
                const updatedUstensilsArray = newUstensilsArray.filter(a => searchResultsStore.some(id => a.ids.includes(id.id)))
                ustensilsContainer.innerHTML = ""
                displayUstensilsTags(updatedUstensilsArray)

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

/*input.addEventListener("input", newArrayRecipes)
let searchResultsStore = []

function newArrayRecipes() {
    if (input.value.length >= 3) {

        let inputValue = input.value.toLowerCase()

        newRecipeArray.forEach(recipe => {
            let wordsTostring = recipe.words.toString()
            if (wordsTostring.includes(inputValue) ||
                wordsTostring.split(" ").includes(inputValue)) {
                searchResultsStore.push({ id: recipe.id })
                console.log(searchResultsStore)
                return searchResultsStore
            }
        })
    }
}





function searchRecipes() {
    if (input.value.length >= 3) {
        console.log(searchResultsStore)
        let updatedRecipesArray = recipes.filter(a => searchResultsStore.some(b => a.id === b.id))
        recipesContainer.textContent = ''
        updatedRecipesArray.forEach((recipe) => {
            recipesContainer.appendChild(createRecipeCard(recipe))
        })
        if (searchResultsStore.length === 0) {
            recipesContainer.textContent = ""
            recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        }

    } else {
        recipesContainer.textContent = ""
        displayRecipes(recipes)
    }
}
searchRecipes()*/