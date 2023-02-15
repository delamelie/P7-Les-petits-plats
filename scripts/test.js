import { newIngredientsArray } from "./tags-display.js"
import { ingredientsContainer } from "./tags-display.js"
import { displayIngredientsTags } from "./tags-display.js"
import { newAppliancesArray } from "./tags-display.js"
import { appliancesContainer } from "./tags-display.js"
import { displayAppliancesTags } from "./tags-display.js"
import { newUstensilsArray } from "./tags-display.js"
import { ustensilsContainer } from "./tags-display.js"
import { displayUstensilsTags } from "./tags-display.js"
import { updateRecipes } from "./search.js"


/////////////////////// DOM elements and event listeners //////////////////////////////////

const inputIngredients = document.querySelector(".input-ingredients")
const inputAppliances = document.querySelector(".input-appliances")
const inputUstensils = document.querySelector(".input-ustensils")
let selectedIngredient = document.querySelectorAll(".item-filtered-ingredient")
let selectedAppliance = document.querySelectorAll(".item-filtered-appliance")
let selectedUstensil = document.querySelectorAll(".item-filtered-ustensil")
let tagsContainer = document.querySelector(".tags-container")
let tagsXBtn = document.querySelectorAll(".fa-circle-xmark")
let clickedItemBtn = document.querySelectorAll(".clicked-item")

inputIngredients.addEventListener("input", searchIngredients)
inputAppliances.addEventListener("input", searchAppliances)
inputUstensils.addEventListener("input", searchUstensils)

///////////////////////////// Search by input//////////////////////


//// Ingredients/////

function searchIngredients() {
    let inputIngredientsValue = inputIngredients.value.toLowerCase()
    const ingredientsFilterByTag = newIngredientsArray.filter(i => i.ingredient.toLowerCase() === inputIngredientsValue || i.ingredient.toString().split(" ") === inputIngredientsValue)
    updateIngredientsOnInput(ingredientsFilterByTag)
    if (ingredientsFilterByTag.length != 0) {
    } else {
        ingredientsContainer.innerHTML = ""
        displayIngredientsTags(newIngredientsArray)
    }
}

/*newIngredientsArray.forEach(ingredient => {
    let test = []
        let ingredientTostring = ingredient.toString()
        if (ingredientTostring.includes(inputIngredientsValue) ||
            ingredientTostring.split(" ").includes(inputIngredientsValue)) {
test.push({ id: recipe.id })
        }
    })*/


function updateIngredientsOnInput(ingredientsFilterByTag) {
    const updatedIngredientsArray = newIngredientsArray.filter(ingredient => ingredientsFilterByTag.some(result => ingredient.ids === result.ids))
    ingredientsContainer.innerHTML = ""
    displayIngredientsTags(updatedIngredientsArray)
}


//// Appliances/////

function searchAppliances() {
    let inputAppliancesValue = inputAppliances.value.toLowerCase()
    const appliancesFilterByTag = newAppliancesArray.filter(i => i.appliance.toLowerCase() === inputAppliancesValue || i.appliance.toString().split(" ") === inputAppliancesValue)
    updateAppliancesOnInput(appliancesFilterByTag)
    if (appliancesFilterByTag.length != 0) {
    } else {
        appliancesContainer.innerHTML = ""
        displayAppliancesTags(newAppliancesArray)
    }
}


function updateAppliancesOnInput(appliancesFilterByTag) {
    const updatedAppliancesArray = newAppliancesArray.filter(appliance => appliancesFilterByTag.some(result => appliance.ids === result.ids))
    appliancesContainer.innerHTML = ""
    displayAppliancesTags(updatedAppliancesArray)
}


//// Ustensils/////


function searchUstensils() {
    let inputUstensilsValue = inputUstensils.value.toLowerCase()
    const ustensilsFilterByTag = newUstensilsArray.filter(i => i.ustensil.toLowerCase() === inputUstensilsValue || i.ustensil.toString().split(" ") === inputUstensilsValue)
    updateUstensilsOnInput(ustensilsFilterByTag)
    if (ustensilsFilterByTag.length != 0) {
    } else {
        ustensilsContainer.innerHTML = ""
        displayUstensilsTags(newUstensilsArray)
    }
}


function updateUstensilsOnInput(ustensilsFilterByTag) {
    const updatedUstensilsArray = newUstensilsArray.filter(ustensil => ustensilsFilterByTag.some(result => ustensil.ids === result.ids))
    ustensilsContainer.innerHTML = ""
    displayUstensilsTags(updatedUstensilsArray)
}


//////////////////////////////// Search by clicking tag //////////////////

let retrieveIds
let clickedItem

//// Ingredients/////


const clickedIngredient = selectedIngredient.forEach(ingredient => {
    ingredient.addEventListener('click', function clickTag(event) {
        clickedItem = event.target.innerText
        console.log(clickedItem)
        retrieveIds = newIngredientsArray.filter((ingredient) => (ingredient.ingredient === clickedItem)).map(ingredient => ({ id: ingredient.ids })).flatMap(({ id }) => id.map(id => ({ id })))
        createSelectedTag()
        updateTagsRecipesOnClick(retrieveIds)
    });
});


//// Appliances/////

const clickedAppliance = selectedAppliance.forEach(appliance => {
    appliance.addEventListener('click', function clickTag(event) {
        clickedItem = event.target.innerText
        retrieveIds = newAppliancesArray.filter((appliance) => (appliance.appliance === clickedItem)).map(appliance => ({ id: appliance.ids })).flatMap(({ id }) => id.map(id => ({ id })))
        createSelectedTag()
        updateTagsRecipesOnClick(retrieveIds)
    });
});

//// Ustensils/////

const clickedUstensil = selectedUstensil.forEach(ustensil => {
    ustensil.addEventListener('click', function clickTag(event) {
        clickedItem = event.target.innerText
        retrieveIds = newUstensilsArray.filter((ustensil) => (ustensil.ustensil === clickedItem)).map(ustensil => ({ id: ustensil.ids })).flatMap(({ id }) => id.map(id => ({ id })))
        createSelectedTag()
        updateTagsRecipesOnClick(retrieveIds)
    });
});


/////////////// Generic function to display recipes, ingredients, appliances, ustensils //////////////


/*function updateTagsRecipesOnClick(retrieveIds) {
    updateRecipes(retrieveIds)
    let ingredientsIds = newIngredientsArray.filter(ingredient => retrieveIds.some(id => ingredient.ids.includes(id.id)))
    ingredientsContainer.innerHTML = ""
    displayIngredientsTags(ingredientsIds)
    let appliancesIds = newAppliancesArray.filter(appliance => retrieveIds.some(id => appliance.ids.includes(id.id)))
    appliancesContainer.innerHTML = ""
    displayAppliancesTags(appliancesIds)
    let ustensilsIds = newUstensilsArray.filter(ustensil => retrieveIds.some(id => ustensil.ids.includes(id.id)))
    ustensilsContainer.innerHTML = ""
    displayUstensilsTags(ustensilsIds)
}*/


/////////////// Generic function to display selected tags above dropdowns //////////////

function createSelectedTag() {
    let selectedTag =
        `<span class="clicked-item fw-bold color--primary rounded p-2">${clickedItem}
            <span class="fa-regular fa-circle-xmark ms-3" role="button" type="button"></span>
        </span>`
    tagsContainer.innerHTML += selectedTag
}



