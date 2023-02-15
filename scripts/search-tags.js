import { newIngredientsArray } from "./tags-display.js"
import { ingredientsContainer } from "./tags-display.js"
import { displayIngredientsTags } from "./tags-display.js"
import { newAppliancesArray } from "./tags-display.js"
import { appliancesContainer } from "./tags-display.js"
import { displayAppliancesTags } from "./tags-display.js"
import { newUstensilsArray } from "./tags-display.js"
import { ustensilsContainer } from "./tags-display.js"
import { displayUstensilsTags } from "./tags-display.js"
import { recipes } from "../data/recipes.js"
import { displayRecipes } from "./recipe-card.js"
import { recipesContainer } from "./recipe-card.js"


/////////////////////// DOM elements and event listeners //////////////////////////////////

const inputIngredients = document.querySelector(".input-ingredients")
const inputAppliances = document.querySelector(".input-appliances")
const inputUstensils = document.querySelector(".input-ustensils")
let selectedIngredient = document.querySelectorAll(".item-filtered-ingredient")
let selectedAppliance = document.querySelectorAll(".item-filtered-appliance")
let selectedUstensil = document.querySelectorAll(".item-filtered-ustensil")
let tagsContainer = document.querySelector(".tags-container")
let tagsXBtn = document.querySelectorAll(".fa-circle-xmark")

inputIngredients.addEventListener("input", searchIngredients)
inputAppliances.addEventListener("input", searchAppliances)
inputUstensils.addEventListener("input", searchUstensils)


///////////////////////////// Search by input//////////////////////


function searchIngredients() {
    let inputIngredientsValue = inputIngredients.value.toLowerCase()
    const ingredientsFilteredByTag = newIngredientsArray.filter(i => i.ingredient.toLowerCase() === inputIngredientsValue || i.ingredient.toString().split(" ") === inputIngredientsValue)
    if (inputIngredientsValue.length >= 1) {
        if (ingredientsFilteredByTag.length != 0) {
            ingredientsContainer.innerHTML = ""
            displayIngredientsTags(ingredientsFilteredByTag)
        }
        if (ingredientsFilteredByTag.length === 0) {
            ingredientsContainer.innerHTML = ""
        }
    } else {
        ingredientsContainer.innerHTML = ""
        displayIngredientsTags(newIngredientsArray)
    }
}


function searchAppliances() {
    let inputAppliancesValue = inputAppliances.value.toLowerCase()
    const appliancesFilteredByTag = newAppliancesArray.filter(i => i.appliance.toLowerCase() === inputAppliancesValue || i.appliance.toString().split(" ") === inputAppliancesValue)
    if (inputAppliancesValue.length >= 1) {
        if (appliancesFilteredByTag.length != 0) {
            appliancesContainer.innerHTML = ""
            displayAppliancesTags(appliancesFilteredByTag)
        }
        if (appliancesFilteredByTag.length === 0) {
            appliancesContainer.innerHTML = ""
        }
    } else {
        appliancesContainer.innerHTML = ""
        displayAppliancesTags(newAppliancesArray)
    }
}


function searchUstensils() {
    let inputUstensilsValue = inputUstensils.value.toLowerCase()
    const ustensilsFilteredByTag = newUstensilsArray.filter(i => i.ustensil.toLowerCase() === inputUstensilsValue || i.ustensil.toString().split(" ") === inputUstensilsValue)
    if (inputUstensilsValue.length >= 1) {
        if (ustensilsFilteredByTag.length != 0) {
            ustensilsContainer.innerHTML = ""
            displayUstensilsTags(ustensilsFilteredByTag)
        }
        if (ustensilsFilteredByTag.length === 0) {
            ustensilsContainer.innerHTML = ""
        }
    } else {
        ustensilsContainer.innerHTML = ""
        displayUstensilsTags(newUstensilsArray)
    }
}


//////////////////////////////// Search by clicking tags //////////////////


selectedIngredient.forEach(ingredient => {
    ingredient.addEventListener('click', function clickTag(event) {
        let clickedItem = event.target.innerText
        createSelectedTag("ingredient", clickedItem)
        updateOnclick()
    })
})


selectedAppliance.forEach(appliance => {
    appliance.addEventListener('click', function clickTag(event) {
        let clickedItem = event.target.innerText
        createSelectedTag("appliance", clickedItem)
        updateOnclick()
    })
})


selectedUstensil.forEach(ustensil => {
    ustensil.addEventListener('click', function clickTag(event) {
        let clickedItem = event.target.innerText
        createSelectedTag("ustensil", clickedItem)
        updateOnclick()
    })
})


/////////////// Display selected tags above dropdowns //////////////


function createSelectedTag(itemType, clickedItem) {
    let classItem
    switch (itemType) {
        case "ingredient":
            classItem = "color--primary"
            break
        case "appliance":
            classItem = "color--secondary"
            break
        case "ustensil":
            classItem = "color--tertiary"
            break
    }
    let selectedTag =
        `<span class="clicked-item fw-bold ${classItem} me-2 rounded p-2" item-type="${itemType}">${clickedItem}
            <span class="fa-regular fa-circle-xmark ms-3" role="button" type="button"></span>
        </span>`
    tagsContainer.innerHTML += selectedTag
}


/////////////// Update recipes and tags containers //////////////

let filteredRecipes = recipes
let updatedIngredientsArray
let updatedAppliancesArray
let updatedUstensilsArray

function updateOnclick() {
    let clickedItemTag = document.querySelectorAll(".clicked-item")
    clickedItemTag.forEach((item => {
        let clickedItem = item.innerText.trim()
        console.log(clickedItem)
        let itemType = item.getAttribute("item-type")
        switch (itemType) {
            case "ingredient":
                filteredRecipes = filteredRecipes.filter(recipe => recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === clickedItem.toLowerCase()))
                updatedIngredientsArray = newIngredientsArray.filter(ingredient => filteredRecipes.some(id => ingredient.ids.includes(id.id)))
                console.log(updatedIngredientsArray)
                break
            case "appliance":
                filteredRecipes = filteredRecipes.filter(recipe => (recipe.appliance.toLowerCase() === clickedItem.toLowerCase()))
                updatedAppliancesArray = newAppliancesArray.filter(appliance => filteredRecipes.some(id => appliance.ids.includes(id.id)))
                console.log(updatedAppliancesArray)
                break
            case "ustensil":
                filteredRecipes = filteredRecipes.filter(recipe => recipe.ustensils.some(ustensil => ustensil.toLowerCase() === clickedItem.toLowerCase()))
                updatedUstensilsArray = newUstensilsArray.filter(ustensil => filteredRecipes.some(id => ustensil.ids.includes(id.id)))
                console.log(updatedUstensilsArray)
                break
        }
        console.log(filteredRecipes)
        recipesContainer.textContent = ""
        displayRecipes(filteredRecipes)
        /*ingredientsContainer.innerHTML = ""
        updateIngredientsTags(filteredRecipes)
        appliancesContainer.innerHTML = ""
        updateAppliancesTags(filteredRecipes)
        ustensilsContainer.innerHTML = ""
        updateUstensilsTags(filteredRecipes)*/

        /*displayIngredientsTags(updatedIngredientsArray)*/
        /*displayAppliancesTags(updatedAppliancesArray)*/
        /*displayUstensilsTags(updatedUstensilsArray)*/
    }
    ))
}


function updateIngredientsTags(recipes) {
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            let ingredientsListItem = `<div class="item-filtered item-filtered-ingredient col-4 text-start gx-0" role="button">${ingredient.ingredient}</div>`
            ingredientsContainer.innerHTML += ingredientsListItem
        })
    })
}

function updateUstensilsTags(recipes) {
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            let ustensilsListItem = `<div class="item-filtered item-filtered-ustensil col-4 text-start gx-0" role="button">${ustensil}</div>`
            ustensilsContainer.innerHTML += ustensilsListItem
        })
    })
}


function updateAppliancesTags(recipes) {
    recipes.forEach(recipe => {
        let appliancesListItem = `<div class="item-filtered item-filtered-appliance col-4 text-start gx-0" role="button">${recipe.appliance}</div>`
        appliancesContainer.innerHTML += appliancesListItem

    })
}






/*const removeTags = tagsXBtn.forEach(button => {
console.log(button)
button.addEventListener("click", function removeTag(event) {
console.log(event.target)
event.target.style.display = "none"
})
})*/









