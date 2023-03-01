import { recipes } from "/data/recipes.js"
import { addClickEvent } from "./search-tags.js"
import { inputIngredients } from "./search-tags.js"
import { inputUstensils } from "./search-tags.js"
import { inputAppliances } from "./search-tags.js"

/////////////////////////////DOM elements/////////////////////////

export const ingredientsContainer = document.querySelector(".search-filters-ingredients")
export const appliancesContainer = document.querySelector(".search-filters-appliances")
export const ustensilsContainer = document.querySelector(".search-filters-ustensils")
//const closeFiltersBtn = document.querySelectorAll(".search-filters-close-button")


/////////////////////////////Ingredients/////////////////////

// Retrieve ingredients and capitalize names

export let newIngredientsArray = recipes.map(({ id, ingredients }) => ingredients.map(({ ingredient }) => ({ id, ingredient })))
    .flat()

newIngredientsArray = newIngredientsArray.map(ingredient => {
    let word = ingredient.ingredient
    return { id: ingredient.id, ingredient: (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) }
})


// Remove duplicates

newIngredientsArray = newIngredientsArray.reduce((accumulator, { id, ingredient }) => {
    accumulator[ingredient] = accumulator[ingredient] || { ingredient: ingredient, ids: [] }
    accumulator[ingredient].ids.push(id)
    return accumulator
}, {})

newIngredientsArray = Object.values(newIngredientsArray)


//////////////////////////////////////////////// Appliances////////////////////////////////////////////////


// Retrieve appliances and remove duplicates

export let newAppliancesArray = recipes.reduce((accumulator, { id, appliance }) => {
    accumulator[appliance] = accumulator[appliance] || { appliance: appliance, ids: [] }
    accumulator[appliance].ids.push(id)
    return accumulator
}, {})

newAppliancesArray = Object.values(newAppliancesArray)


/////////////////////Ustensils//////////////////


// Retrieve ustensils and capitalize names

export let newUstensilsArray = recipes.flatMap(({ id, ustensils }) => ustensils.map(ustensil => ({ id, ustensil })))

newUstensilsArray = newUstensilsArray.map(ustensil => {
    let word = ustensil.ustensil
    return { id: ustensil.id, ustensil: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() }
})


// Remove duplicates

newUstensilsArray = newUstensilsArray.reduce((accumulator, { id, ustensil }) => {
    accumulator[ustensil] = accumulator[ustensil] || { ustensil: ustensil, ids: [] }
    accumulator[ustensil].ids.push(id)
    return accumulator
}, {})

newUstensilsArray = Object.values(newUstensilsArray)


/////////////////////// Display tags //////////////////////

export function displayTags(items, container, type, input) {
    items.forEach(item => {
        let listItem = `<div class="item-filtered item-filtered-${type} col-4 text-start gx-0" role="button">${item[type]}</div>`
        container.innerHTML += listItem
        addClickEvent(`.item-filtered-${type}`, type, input)
    })
}

displayTags(newIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
displayTags(newAppliancesArray, appliancesContainer, "appliance", inputAppliances)
displayTags(newUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)



// Open and close ingredients

/*const buttons = document.querySelectorAll('.search-filters-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('d-none')
    });
});*/




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

/*function closeFilters() {
    closeFiltersBtn.forEach(button =>
        button.addEventListener("click", (event) => {
            let dropdown = event.target.parentNode.parentNode
            let closeFiltersBtn = ingredientsContainer.previousElementSibling
            dropdown.classList.remove('show')
            /*dropdown.classList.toggle("closed")
            dropdown.style.display = "none"
            closeFiltersBtn.style.display = "block"
            /*event.target.nextElementSibling.style.display = "block"
        }))
}
closeFilters()*/



























