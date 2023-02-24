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
let tagsContainer = document.querySelector(".tags-container")

inputIngredients.addEventListener("input", searchIngredients)
inputAppliances.addEventListener("input", searchAppliances)
inputUstensils.addEventListener("input", searchUstensils)


///////////////////////////// Search by input //////////////////////



function searchIngredients() {
    let ingredientTags = document.querySelectorAll(".item-filtered-ingredient")
    let inputIngredientsValue = inputIngredients.value.toLowerCase()
    const ingredientTagsArray = Array.prototype.slice.call(ingredientTags)
    const ingredientTagsFiltered = ingredientTagsArray.filter(item => item.innerText.toLowerCase().includes(inputIngredientsValue))
    console.log(ingredientTagsFiltered)
    ingredientTags.forEach(item => item.style.display = "none")
    ingredientTagsFiltered.forEach(item => console.log(item))
    ingredientTagsFiltered.forEach(item => item.style.display = "block")
}

function searchAppliances() {
    let applianceTags = document.querySelectorAll(".item-filtered-appliance")
    let inputAppliancesValue = inputAppliances.value.toLowerCase()
    const applianceTagsArray = Array.prototype.slice.call(applianceTags)
    const applianceTagsFiltered = applianceTagsArray.filter(item => item.innerText.toLowerCase().includes(inputAppliancesValue))
    applianceTags.forEach(item => item.style.display = "none")
    applianceTagsFiltered.forEach(item => item.style.display = "block")
}

function searchUstensils() {
    let ustensilTags = document.querySelectorAll(".item-filtered-ustensil")
    let inputUstensilsValue = inputUstensils.value.toLowerCase()
    const ustensilTagsArray = Array.prototype.slice.call(ustensilTags)
    const ustensilTagsFiltered = ustensilTagsArray.filter(item => item.innerText.toLowerCase().includes(inputUstensilsValue))
    ustensilTags.forEach(item => item.style.display = "none")
    ustensilTagsFiltered.forEach(item => item.style.display = "block")
}

// function searchUstensils() {
//     let inputUstensilsValue = inputUstensils.value.toLowerCase()
//     const ustensilsFilteredByTag = newUstensilsArray.filter(item => item.ustensil.toLowerCase().includes(inputUstensilsValue))
//     if (inputUstensilsValue.length >= 1) {
//         ustensilsContainer.innerHTML = ""
//         displayUstensilsTags(ustensilsFilteredByTag)
//         addClickUstensilEvent()
//     } else {
//         ustensilsContainer.innerHTML = ""
//         displayUstensilsTags(newUstensilsArray)
//         addClickUstensilEvent()
//     }
// }


//////////////////////////////// Search by clicking tags //////////////////

///// Add event listener ////////

let clickedItem

export function addClickIngredientEvent() {
    let selectedIngredient = document.querySelectorAll(".item-filtered-ingredient")
    selectedIngredient.forEach(ingredient => {
        ingredient.addEventListener('click', function clickTag(event) {
            clickedItem = event.target.innerText
            createSelectedTag("ingredient", clickedItem)
            updateOnclick()
            inputIngredients.value = ""
        })
    })
}
addClickIngredientEvent()


export function addClickApplianceEvent() {
    let selectedAppliance = document.querySelectorAll(".item-filtered-appliance")
    selectedAppliance.forEach(appliance => {
        appliance.addEventListener('click', function clickTag(event) {
            clickedItem = event.target.innerText
            createSelectedTag("appliance", clickedItem)
            updateOnclick()
            inputAppliances.value = ""
        })
    })
}
addClickApplianceEvent()


export function addClickUstensilEvent() {
    let selectedUstensil = document.querySelectorAll(".item-filtered-ustensil");
    selectedUstensil.forEach((ustensil) => {
        ustensil.addEventListener("click", function clickTag(event) {
            clickedItem = event.target.innerText
            createSelectedTag("ustensil", clickedItem)
            updateOnclick()
            inputUstensils.value = ""
        });
    });
}
addClickUstensilEvent()


/////////// Display selected tags above dropdowns ///////////

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
        `<span class="clicked-item-tag fw-bold ${classItem} me-2 rounded p-2" item-type="${itemType}">${clickedItem}
            <span class="fa-regular fa-circle-xmark ms-3" role="button" type="button"></span>
        </span>`
    tagsContainer.innerHTML += selectedTag
    addEventToRemoveTags()
}


/////////// Update recipes and tags containers altogether //////////

let filteredRecipes = recipes

function updateOnclick() {
    let clickedItemTag = document.querySelectorAll(".clicked-item-tag")
    clickedItemTag.forEach((item => {
        let clickedItem = item.innerText.trim()
        let itemType = item.getAttribute("item-type")
        switch (itemType) {
            case "ingredient":
                filteredRecipes = filteredRecipes.filter(recipe => recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === clickedItem.toLowerCase()))
                break
            case "appliance":
                filteredRecipes = filteredRecipes.filter(recipe => (recipe.appliance.toLowerCase() === clickedItem.toLowerCase()))
                break
            case "ustensil":
                filteredRecipes = filteredRecipes.filter(recipe => recipe.ustensils.some(ustensil => ustensil.toLowerCase() === clickedItem.toLowerCase()))
                break
        }
        console.log(filteredRecipes)
        recipesContainer.textContent = ""
        displayRecipes(filteredRecipes)
        ingredientsContainer.innerHTML = ""
        updateIngredientsDropdown(filteredRecipes)
        appliancesContainer.innerHTML = ""
        updateAppliancesDropdown(filteredRecipes)
        ustensilsContainer.innerHTML = ""
        updateUstensilsDropdown(filteredRecipes)
    }
    ))
}



///// Functions to update each container //////

function updateIngredientsDropdown(recipes) {
    let clickedItemTag = document.querySelectorAll(".clicked-item-tag")
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {


            //let test = ingredient.ingredient
            let ingredientsListItem = `<div class="item-filtered item-filtered-ingredient col-4 text-start gx-0" role="button">${ingredient.ingredient}</div>`
            ingredientsContainer.innerHTML += ingredientsListItem
            /*if (test === clickedItem) {
                test.style.display = "none"
            }*/


        })
    })
    addClickIngredientEvent()
}

function updateUstensilsDropdown(recipes) {
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            let ustensilsListItem = `<div class="item-filtered item-filtered-ustensil col-4 text-start gx-0" role="button">${ustensil}</div>`
            ustensilsContainer.innerHTML += ustensilsListItem
        })
    })
    addClickUstensilEvent()
}


function updateAppliancesDropdown(recipes) {
    recipes.forEach(recipe => {
        let appliancesListItem = `<div class="item-filtered item-filtered-appliance col-4 text-start gx-0" role="button">${recipe.appliance}</div>`
        appliancesContainer.innerHTML += appliancesListItem

    })
    addClickApplianceEvent()
}

/*function updateDropdown() {
    let clickedItemTag = document.querySelectorAll(".clicked-item-tag")
    clickedItemTag.forEach(item => {
        let itemType = item.getAttribute("item-type")
        switch (itemType) {
            case "ingredient":
                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        let ingredientsListItem = `<div class="item-filtered item-filtered-ingredient col-4 text-start gx-0" role="button">${ingredient.ingredient}</div>`
                        ingredientsContainer.innerHTML += ingredientsListItem
                    })
                })
                break
            case "appliance":
                let appliancesListItem = `<div class="item-filtered item-filtered-appliance col-4 text-start gx-0" role="button">${recipes.appliance}</div>`
                appliancesContainer.innerHTML += appliancesListItem
                break
            case "ustensil":
                let ustensilsListItem = `<div class="item-filtered item-filtered-ustensil col-4 text-start gx-0" role="button">${recipes.ustensil}</div>`
                ustensilsContainer.innerHTML += ustensilsListItem
                break
        }
    })
}*/



/////////////// Remove tags /////////////////////

function addEventToRemoveTags() {
    let removeTagButtons = document.querySelectorAll(".fa-circle-xmark")
    removeTagButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            let tag = event.target.parentElement
            tag.style.display = "none"
        })
    })
}




/*function removeTags() {
    let clickedItemTag = document.querySelectorAll(".clicked-item-tag")
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
    }
    ))
}*/






