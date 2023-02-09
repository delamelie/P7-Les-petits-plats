import { recipes } from "/data/recipes.js"

/////////////////////////////DOM elements/////////////////////////

export const ingredientsContainer = document.querySelector(".search-filters-ingredients")
export const appliancesContainer = document.querySelector(".search-filters-appliances")
export const ustensilsContainer = document.querySelector(".search-filters-ustensils")
const closeFiltersBtn = document.querySelectorAll(".fa-chevron-up")


let newUstensilsArray = []

function removeDuplicateUstensils(newUstensilsArray) {
    recipes.forEach((recipe) => {
        let ustensil = recipe.ustensils
        recipe.ustensils.forEach((ustensil) => {
            newUstensilsArray.push(ustensil)
        })
    })
    return newUstensilsArray.filter((item, index) => newUstensilsArray.indexOf(item) === index)
}


// Capitalize ustensil names

let ustensilsFilteredArray = removeDuplicateUstensils(newUstensilsArray)
console.log(ustensilsFilteredArray)

function capitalizeWords(arr) {
    return arr.map((word) => {
        const capitalizedFirst = word.charAt(0).toUpperCase();
        const rest = word.slice(1).toLowerCase();
        return capitalizedFirst + rest;
    });
}

// Display ustensils with capitalized names

let ustensilsFilteredCapitalizedArray = capitalizeWords(ustensilsFilteredArray)
console.log(ustensilsFilteredCapitalizedArray)

function ustensilsDropdown(ustensils) {
    ustensils.forEach((ustensil) => {
        let ustensilsListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${ustensil}</div>`
        ustensilsContainer.innerHTML += ustensilsListItem
    })
}

ustensilsDropdown(ustensilsFilteredCapitalizedArray)