import { recipes } from "./data/recipes.js"
import { addClickEvent, inputIngredients, inputUstensils, inputAppliances } from "./search-tags.js"


//////////////////////////////////// DOM elements /////////////////////////////////////

export const ingredientsContainer = document.querySelector(".search-filters-ingredients")
export const appliancesContainer = document.querySelector(".search-filters-appliances")
export const ustensilsContainer = document.querySelector(".search-filters-ustensils")


///////////////////////////// Create ingredients' array //////////////////////////////

// Retrieve ingredients and capitalize names

export let newIngredientsArray = recipes.flatMap(({ id, ingredients }) => ingredients.flatMap(({ ingredient }) => ({ id, ingredient })))

newIngredientsArray = newIngredientsArray.map(ingredient => ({ id: ingredient.id, ingredient: (ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase()) }))


// Remove duplicates

newIngredientsArray = newIngredientsArray.reduce((accumulator, { id, ingredient }) => {
    accumulator[ingredient] = accumulator[ingredient] || { ingredient: ingredient, ids: [] }
    accumulator[ingredient].ids.push(id)
    return accumulator
}, {})

newIngredientsArray = Object.values(newIngredientsArray)


//////////////////////////// Create appliances' array ///////////////////////////////

// Retrieve appliances and and capitalize names

export let newAppliancesArray = recipes.map(({ id, appliance }) => ({ id, appliance }))

newAppliancesArray = newAppliancesArray.map(appliance => ({ id: appliance.id, appliance: (appliance.appliance.charAt(0).toUpperCase() + appliance.appliance.slice(1).toLowerCase()) }))


// Remove duplicates

newAppliancesArray = recipes.reduce((accumulator, { id, appliance }) => {
    accumulator[appliance] = accumulator[appliance] || { appliance: appliance, ids: [] }
    accumulator[appliance].ids.push(id)
    return accumulator
}, {})

newAppliancesArray = Object.values(newAppliancesArray)


////////////////////////// Create ustensils' array ///////////////////////////////

// Retrieve ustensils and capitalize names

export let newUstensilsArray = recipes.flatMap(({ id, ustensils }) => ustensils.map(ustensil => ({ id, ustensil })))

newUstensilsArray = newUstensilsArray.map(ustensil => ({ id: ustensil.id, ustensil: ustensil.ustensil.charAt(0).toUpperCase() + ustensil.ustensil.slice(1).toLowerCase() }))


// Remove duplicates

newUstensilsArray = newUstensilsArray.reduce((accumulator, { id, ustensil }) => {
    accumulator[ustensil] = accumulator[ustensil] || { ustensil: ustensil, ids: [] }
    accumulator[ustensil].ids.push(id)
    return accumulator
}, {})

newUstensilsArray = Object.values(newUstensilsArray)


////////////////////////////// Display tags ////////////////////////////////////

export function displayTagsInsideDropdowns(items, container, type, input) {
    items.forEach(item => {
        let listItem = `<div class="item-filtered item-filtered-${type} col-xl-4 col-md-6 col-12 text-start flex-wrap" role="button">${item[type]}</div>`
        container.innerHTML += listItem
        addClickEvent(`.item-filtered-${type}`, type, input)
    })
}

displayTagsInsideDropdowns(newIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
displayTagsInsideDropdowns(newAppliancesArray, appliancesContainer, "appliance", inputAppliances)
displayTagsInsideDropdowns(newUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)































