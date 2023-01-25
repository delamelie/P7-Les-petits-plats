import { recipes } from "/data/recipes.js"


/*console.log(recipes)*/
/*console.log(recipes[0]['ingredients'][0])*/


/////////////////////////////DOM elements/////////////////////////

const ingredientsContainer = document.querySelector(".search-filters-ingredients")
const appliancesContainer = document.querySelector(".search-filters-appliances")
const ustensilsContainer = document.querySelector(".search-filters-ustensils")

const closeFiltersBtn = document.querySelectorAll(".fa-chevron-up")


/////////////////////Ingredients//////////////////

// Retrieve ingredients and remove duplicates

let newIngredientsArray = []

function removeDuplicateIngredients() {
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            let ing = ingredient.ingredient
            newIngredientsArray.push(ing)
        })
    })
    return newIngredientsArray.filter((item, index) => newIngredientsArray.indexOf(item) === index)
}

// Display ingredients

let ingredientsFilteredArray = removeDuplicateIngredients(newIngredientsArray)

function ingredientsDropdown(items) {
    items.forEach(item => {
        let ingredientsListItem = `<div class="item-filtered-ingredient col-4 text-start gx-0">${item}</div>`
        ingredientsContainer.innerHTML += ingredientsListItem
    })
}

ingredientsDropdown(ingredientsFilteredArray)



/////////////////////Appliances//////////////////

// Retrieve appliances and remove duplicates

let newAppliancesArray = []

function removeDuplicateAppliances(newAppliancesArray) {
    recipes.forEach((recipe) => {
        let appliance = recipe.appliance
        newAppliancesArray.push(appliance)
    })
    return newAppliancesArray.filter((item, index) => newAppliancesArray.indexOf(item) === index)
}


// Display appliances

let appliancesFilteredArray = removeDuplicateAppliances(newAppliancesArray)

function appliancesDropdown(appliances) {
    appliances.forEach((appliance) => {
        let appliancesListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${appliance}</div>`
        appliancesContainer.innerHTML += appliancesListItem
    });
}

appliancesDropdown(appliancesFilteredArray)



/////////////////////Ustensils//////////////////

// Retrieve ustensils and remove duplicates

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

function capitalizeWords(arr) {
    return arr.map((word) => {
        const capitalizedFirst = word.charAt(0).toUpperCase();
        const rest = word.slice(1).toLowerCase();
        return capitalizedFirst + rest;
    });
}

// Display ustensils with capitalized names

let ustensilsFilteredCapitalizedArray = capitalizeWords(ustensilsFilteredArray)

function ustensilsDropdown(ustensils) {
    ustensils.forEach((ustensil) => {
        let ustensilsListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${ustensil}</div>`
        ustensilsContainer.innerHTML += ustensilsListItem
    })
}

ustensilsDropdown(ustensilsFilteredCapitalizedArray)



// Open and close ingredients


/*function openFilters() {
    const openFiltersBtn = document.querySelectorAll(".search-filters-button")
    openFiltersBtn.forEach(button =>
        button.addEventListener("click", (event) => {
            let ingredientsContainer = event.target.nextElementSibling
            event.target.style.display = "none"
            console.log('yoyo')
            ingredientsContainer.classList.toggle("open")
            ingredientsContainer.style.display = "block"
            /*console.log(event.target)
            console.log(ingredientsContainer)
        }))
}
openFilters()*/

function closeFilters() {
    closeFiltersBtn.forEach(button =>
        button.addEventListener("click", (event) => {
            let dropdown = event.target.parentNode.parentNode
            let closeFiltersBtn = ingredientsContainer.previousElementSibling
            /*dropdown.classList.toggle("closed")*/
            dropdown.style.display = "none"
            closeFiltersBtn.style.display = "block"
            /*event.target.nextElementSibling.style.display = "block"*/
        }))
}
closeFilters()





















