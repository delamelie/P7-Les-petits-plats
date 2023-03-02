import { recipes } from "../data/recipes.js"
import { ingredientsContainer } from "./tags-display.js"
import { appliancesContainer } from "./tags-display.js"
import { ustensilsContainer } from "./tags-display.js"
import { displayRecipes } from "./recipe-card.js"
import { recipesContainer } from "./recipe-card.js"
import { displayReset } from "./search.js"
import { removeAccents } from "./search.js"

import { newUstensilsArray } from "./tags-display.js"
// import { displayTags } from "./tags-display.js"


/////////////////////// DOM elements and event listeners //////////////////////////////////

export const inputIngredients = document.querySelector(".input-ingredients")
export const inputAppliances = document.querySelector(".input-appliances")
export const inputUstensils = document.querySelector(".input-ustensils")

let tagsContainer = document.querySelector(".tags-container")

inputIngredients.addEventListener("input", searchIngredients)
inputAppliances.addEventListener("input", searchAppliances)
inputUstensils.addEventListener("input", searchUstensils)


///////////////////////////////////// Search by input in tags' section //////////////////////////////////////

function searchItems(selector, input) {
    const items = document.querySelectorAll(selector)
    const inputValue = input.value.toLowerCase()
    //const normalizedInputValue = removeAccents(inputValue)
    //console.log(normalizedInputValue)
    const itemsArray = Array.prototype.slice.call(items)
    const filteredItems = itemsArray.filter(item => removeAccents(item.innerText.toLowerCase()).includes(removeAccents(inputValue)))
    items.forEach(item => item.style.display = "none")
    filteredItems.forEach(item => item.style.display = "block")
}


function searchIngredients() {
    searchItems(".item-filtered-ingredient", inputIngredients)
}

function searchAppliances() {
    searchItems(".item-filtered-appliance", inputAppliances)
}

function searchUstensils() {
    searchItems(".item-filtered-ustensil", inputUstensils)
}




// function searchUstensils() {
//     let inputUstensilsValue = inputUstensils.value.trim()
//     const ustensilsFilteredByTag = newUstensilsArray.filter(i => i.ustensil.toLowerCase().includes(inputUstensilsValue.toLowerCase()))
//     if (inputUstensilsValue.length >= 1) {
//         if (ustensilsFilteredByTag.length != 0) {
//             ustensilsContainer.innerHTML = ""
//             displayTags(ustensilsFilteredByTag, ustensilsContainer, "ustensil", inputUstensils)
//         }
//         if (ustensilsFilteredByTag.length === 0) {
//             ustensilsContainer.innerHTML = ""
//         }
//     } else {
//         ustensilsContainer.innerHTML = ""
//         displayTags(newUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)
//     }
// }



//////////////////////////////// Search by clicking tags ///////////////////////////////

// Add event listener to items

let clickedItem

export function addClickEvent(selector, itemType, input) {
    let selectedItem = document.querySelectorAll(selector)
    selectedItem.forEach((item) => {
        item.addEventListener("click", function clickTag(event) {
            clickedItem = event.target.innerText
            createSelectedTag(itemType, clickedItem)
            updateOnclick()
            input.value = ""
        })
    })
}

addClickEvent(".item-filtered-ingredient", "ingredient", inputIngredients)
addClickEvent(".item-filtered-appliance", "appliance", inputAppliances)
addClickEvent(".item-filtered-ustensil", "ustensil", inputUstensils)


// Display selected tags above dropdowns

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
        `<span class="clicked-item-tag fw-bold ${classItem} me-2 rounded p-2 text-white" item-type="${itemType}">${clickedItem}
            <span class="fa-regular fa-circle-xmark ms-3 text-white" role="button" type="button"></span>
        </span>`
    tagsContainer.innerHTML += selectedTag
    addEventToRemoveTags()
}


// Update recipes and dropdowns

let filteredRecipes = recipes

function updateOnclick() {
    filteredRecipes = recipes
    let clickedItemTag = document.querySelectorAll(".clicked-item-tag")
    if ((clickedItemTag.length) >= 1) {
        clickedItemTag.forEach((item => {
            let clickedItem = item.innerText.trim()
            console.log(clickedItem)
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
            domUpdateOnclick()
        }
        ))
    } else {
        displayReset()
    }
}


function domUpdateOnclick() {
    recipesContainer.textContent = ""
    displayRecipes(filteredRecipes)
    ingredientsContainer.innerHTML = ""
    updateIngredientsDropdown(filteredRecipes)
    //updateDropdown(filteredRecipes, ingredientsContainer, ".item-filtered-ingredient", "ingredient", inputIngredients)
    appliancesContainer.innerHTML = ""
    updateAppliancesDropdown(filteredRecipes)
    //updateDropdown(filteredRecipes, appliancesContainer, ".item-filtered-appliance", "appliance", inputAppliances)
    ustensilsContainer.innerHTML = ""
    updateUstensilsDropdown(filteredRecipes)
    //updateDropdown(filteredRecipes, ustensilsContainer, ".item-filtered-ustensil", "ustensil", inputUstensils)
}


// Remove clicked items from dropdown

function removeClickedItems(itemsList) {
    let clickedItemTags = document.querySelectorAll(".clicked-item-tag")
    clickedItemTags.forEach(clickedItemTag => {
        let clickedItem = clickedItemTag.innerText.trim()
        itemsList.forEach(item => {
            if (item.innerText.toLowerCase() === clickedItem.toLowerCase()) {
                item.remove()
            }
        })
    })
}


///// Update dropdowns //////


function updateIngredientsDropdown(recipes) {
    let test = []
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            test.push(ingredient.ingredient)
            /*test = test.map(ingredient => ingredient.ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase())
            console.log(test)
            test = test.filter((ingredient, index) => test.indexOf(ingredient) === index)*/
            let ingredientsListItem = `<div class="item-filtered item-filtered-ingredient col-4 text-start gx-0" role="button">${ingredient.ingredient}</div>`
            ingredientsContainer.innerHTML += ingredientsListItem
        })
    })
    let ingredientsList = document.querySelectorAll(".item-filtered-ingredient")
    removeClickedItems(ingredientsList)
    addClickEvent(".item-filtered-ingredient", "ingredient", inputIngredients)
}


function updateUstensilsDropdown(recipes) {
    let test = []
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            test.push(ustensil)
            test = test.map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase())
            test = test.filter((ustensil, index) => test.indexOf(ustensil) === index)
        })
    })
    test.forEach(item => {
        let ustensilsListItem = `<div class="item-filtered item-filtered-ustensil col-4 text-start gx-0" role="button">${item}</div>`
        ustensilsContainer.innerHTML += ustensilsListItem
    })
    console.log(test)
    let ustensilsList = document.querySelectorAll(".item-filtered-ustensil")
    removeClickedItems(ustensilsList)
    addClickEvent(".item-filtered-ustensil", "ustensil", inputUstensils)
}




function updateAppliancesDropdown(recipes) {
    let test = []
    recipes.forEach(recipe => {
        test.push(recipe.appliance)
        test = test.map(appliance => appliance.charAt(0).toUpperCase() + appliance.slice(1).toLowerCase())
        test = test.filter((appliance, index) => test.indexOf(appliance) === index)
        console.log(test)
    })
    test.forEach(item => {
        let appliancesListItem = `<div class="item-filtered item-filtered-appliance col-4 text-start gx-0" role="button">${item}</div>`
        appliancesContainer.innerHTML += appliancesListItem
    })
    let appliancesList = document.querySelectorAll(".item-filtered-appliance")
    removeClickedItems(appliancesList)
    addClickEvent(".item-filtered-appliance", "appliance", inputAppliances)
}




// function updateDropdown(recipes, container, selector, type, input) {
//     recipes.forEach(recipe => {
//         recipe.items.forEach(item => {
//             let listItem = `<div class="item-filtered item-filtered-{$type} col-4 text-start gx-0" role="button">${item[type]}</div>`
//             container.innerHTML += listItem
//         })
//     })
//     let itemsList = document.querySelectorAll(selector)
//     removeClickedItems(itemsList)
//     addClickEvent(selector, type, input)
// }





// Remove selected tags when they are unclicked

function addEventToRemoveTags() {
    let removeTagButtons = document.querySelectorAll(".fa-circle-xmark")
    removeTagButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            let tag = event.target.parentElement
            tag.remove()
            updateOnclick()
        })
    })
}





























