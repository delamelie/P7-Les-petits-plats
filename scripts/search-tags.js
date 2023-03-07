import { recipes } from "../data/recipes.js"
import { ingredientsContainer, appliancesContainer, ustensilsContainer } from "./tags-display.js"
import { displayRecipes, recipesContainer } from "./recipe-card.js"
import { displayReset, removeAccents, search, filteredRecipes } from "./main-search.js"


//////////////////////////////////////////// DOM elements /////////////////////////////////////////////////////

export const inputIngredients = document.querySelector(".input-ingredients")
export const inputAppliances = document.querySelector(".input-appliances")
export const inputUstensils = document.querySelector(".input-ustensils")
const tagsContainer = document.querySelector(".tags-container")


///////////////////////////////////// Search by input in tags' section //////////////////////////////////////

inputIngredients.addEventListener("input", function () {
    searchItems(".item-filtered-ingredient", inputIngredients)
})

inputAppliances.addEventListener("input", function () {
    searchItems(".item-filtered-appliance", inputAppliances)
})

inputUstensils.addEventListener("input", function () {
    searchItems(".item-filtered-ustensil", inputUstensils)
})


function searchItems(selector, input) {
    const items = document.querySelectorAll(selector)
    const inputValue = input.value.toLowerCase()
    const normalizedInputValue = removeAccents(inputValue)
    const itemsArray = Array.prototype.slice.call(items)
    const filteredItems = itemsArray.filter(item => removeAccents(item.innerText.toLowerCase()).includes(normalizedInputValue))
    items.forEach(item => item.style.display = "none")
    filteredItems.forEach(item => item.style.display = "block")
}


//////////////////////////////// Search by clicking tags ///////////////////////////////

// Add event listener to items

let clickedItem

export function addClickEvent(selector, itemType, input) {
    let selectedItem = document.querySelectorAll(selector)
    selectedItem.forEach((item) => {
        item.addEventListener("click", function clickTag(event) {
            clickedItem = event.target.innerText
            createSelectedTag(itemType, clickedItem)
            //filterOnclick()
            search()
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


// Filter recipes onclick 



// Remove clicked items from dropdown

function removeClickedItems(itemsList) {
    let clickedItemTags = document.querySelectorAll(".clicked-item-tag")
    clickedItemTags.forEach(clickedItemTag => {
        let clickedItem = clickedItemTag.innerText.trim()
        itemsList.forEach(item => {
            if (item.innerText.toLowerCase().includes(clickedItem.toLowerCase())) {
                item.remove()
            }
        })
    })
}


// Remove selected tags when they are unclicked

function addEventToRemoveTags() {
    let removeTagButtons = document.querySelectorAll(".fa-circle-xmark")
    removeTagButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            let tag = event.target.parentElement
            tag.remove()
            //filterOnclick()
            search()
        })
    })
}




///////////////////// A supprimer /////////////////


// Update recipes and dropdowns

// export function domUpdateOnclick() {
//     recipesContainer.textContent = ""
//     displayRecipes(filteredRecipes)
//     ingredientsContainer.innerHTML = ""
//     updateIngredientsDropdown(filteredRecipes)
//     appliancesContainer.innerHTML = ""
//     updateAppliancesDropdown(filteredRecipes)
//     ustensilsContainer.innerHTML = ""
//     updateUstensilsDropdown(filteredRecipes)
// }

///// Update dropdowns //////

// Generic function
// function updateDropdowns(items, type, container, selector, input) {
//     items.forEach(item => {
//         let listItem = `<div class="item-filtered item-filtered-${type} col-4 text-start gx-0" role="button">${item}</div>`
//         container.innerHTML += listItem
//     })
//     let list = document.querySelectorAll(selector)
//     removeClickedItems(list)
//     addClickEvent(selector, type, input)
// }


export function updateDropdowns2(selector) {
    let list = document.querySelectorAll(selector)
    removeClickedItems(list)
    addClickEvent(selector)
}


// Update each container

// function updateIngredientsDropdown(recipes) {
//     let itemsArray = []
//     recipes.forEach(recipe => {
//         recipe.ingredients.forEach(ingredient => {
//             let ing = ingredient.ingredient
//             itemsArray.push(ing)
//             itemsArray = itemsArray.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1).toLowerCase())
//             itemsArray = itemsArray.filter((ing, index) => itemsArray.indexOf(ing) === index)
//         })
//     })
//     updateDropdowns(itemsArray, "ingredient", ingredientsContainer, ".item-filtered-ingredient", inputIngredients)
//     //console.log(itemsArray)
// }


// function updateUstensilsDropdown(recipes) {
//     let itemsArray = []
//     recipes.forEach(recipe => {
//         recipe.ustensils.forEach(ustensil => {
//             itemsArray.push(ustensil)
//             itemsArray = itemsArray.map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase())
//             itemsArray = itemsArray.filter((ustensil, index) => itemsArray.indexOf(ustensil) === index)
//         })
//     })
//     updateDropdowns(itemsArray, "ustensil", ustensilsContainer, ".item-filtered-ustensil", inputUstensils)
//     //console.log(itemsArray)
// }


// function updateAppliancesDropdown(recipes) {
//     let itemsArray = []
//     recipes.forEach(recipe => {
//         itemsArray.push(recipe.appliance)
//         itemsArray = itemsArray.map(appliance => appliance.charAt(0).toUpperCase() + appliance.slice(1).toLowerCase())
//         itemsArray = itemsArray.filter((appliance, index) => itemsArray.indexOf(appliance) === index)
//     })
//     updateDropdowns(itemsArray, "appliance", appliancesContainer, ".item-filtered-appliance", inputAppliances)
//     //console.log(itemsArray)
// }





















