import { recipes } from "/data/recipes.js"
import { ingredientsContainer, appliancesContainer, ustensilsContainer, newIngredientsArray, newAppliancesArray, newUstensilsArray, displayTagsInsideDropdowns } from "./tags-display.js"
import { recipesContainer, displayRecipes } from "./recipe-card.js"
import { inputIngredients, inputUstensils, inputAppliances, updateDropdowns2 } from "./search-tags.js"


///////// Create flat array containing all searchable keywords (among names, recipes, ingredients) //////////

let newRecipesArray = recipes.map(recipe => {
    let words = []
    words.push(recipe.name.toLowerCase())
    words.push(recipe.description.toLowerCase())
    recipe.ingredients.forEach(ingredient => words.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, words: words }
})


//////////////////////////////////// Create search function on main input //////////////////////////////////////

const inputSearchBar = document.querySelector(".search-bar-input")
inputSearchBar.addEventListener("input", filterRecipes)


// Remove accents from strings to compare items with input

export function removeAccents(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}


// Store results from filtering arrays containing keywords and tags

export let filteredRecipes = recipes
let searchResultsStore = []
let clickedResultsSore = []
let crossResults = []


// Search function

function filterRecipes() {
    let inputValue = inputSearchBar.value.toLowerCase()
    let normalizedInputValue = removeAccents(inputValue)
    searchResultsStore = newRecipesArray.filter(recipe => removeAccents(recipe.words.toString()).includes(normalizedInputValue));
    search()
}

export function search() {
    if (inputSearchBar.value.length >= 3) {
        if (searchResultsStore.length != 0) {
            updateRecipes(searchResultsStore)
            updateTags(searchResultsStore)
        } else {
            recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
        }

    } else {
        displayReset()
    }

    filteredRecipes = recipes
    let clickedItemTag = document.querySelectorAll(".clicked-item-tag")
    if ((clickedItemTag.length) != 0) {
        clickedItemTag.forEach((item => {
            let clickedItem = item.innerText.trim()
            let itemType = item.getAttribute("item-type")
            switch (itemType) {
                case "ingredient":
                    filteredRecipes = filteredRecipes.filter(recipe => recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(clickedItem.toLowerCase())))
                    break
                case "appliance":
                    filteredRecipes = filteredRecipes.filter(recipe => (recipe.appliance.toLowerCase().includes(clickedItem.toLowerCase())))
                    break
                case "ustensil":
                    filteredRecipes = filteredRecipes.filter(recipe => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(clickedItem.toLowerCase())))
                    break
            }

            clickedResultsSore = filteredRecipes.map(({ id }) => ({ id }))
            updateRecipes(clickedResultsSore)
            updateTags(clickedResultsSore)
            /*updateDropdowns2(".item-filtered-ingredient")
            updateDropdowns2(".item-filtered-appliance")
            updateDropdowns2(".item-filtered-ustensil")*/
            //domUpdateOnclick()
        }
        ))
    }
    console.log(clickedResultsSore)
    console.log(searchResultsStore)

    if (inputSearchBar.value.length >= 3 && (clickedItemTag.length) != 0) {
        crossResults = searchResultsStore.filter(item => clickedResultsSore.some(testItem => item.id === testItem.id))
        console.log(crossResults)
        updateRecipes(crossResults)
        updateTags(crossResults)
    }
}


//Create array to retrieve recipes matching previously stored ids and update recipes display accordingly

function updateRecipes(results) {
    let updatedRecipesArray = recipes.filter(recipe => results.some(result => recipe.id === result.id))
    console.log(updatedRecipesArray)
    recipesContainer.textContent = ''
    displayRecipes(updatedRecipesArray)
}


//Create arrays to retrieve ingredients, appliances and ustensils matching previously stored ids and update tags display accordingly

function updateTags(results) {
    let updatedIngredientsArray = newIngredientsArray.filter(ingredient => results.some(id => ingredient.ids.includes(id.id)))
    ingredientsContainer.innerHTML = ""
    displayTagsInsideDropdowns(updatedIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
    let updatedAppliancesArray = newAppliancesArray.filter(appliance => results.some(id => appliance.ids.includes(id.id)))
    appliancesContainer.innerHTML = ""
    displayTagsInsideDropdowns(updatedAppliancesArray, appliancesContainer, "appliance", inputAppliances)
    let updatedUstensilsArray = newUstensilsArray.filter(ustensil => results.some(id => ustensil.ids.includes(id.id)))
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







