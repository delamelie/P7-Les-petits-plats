import { recipes } from "/data/recipes.js"

/////////////////////////////DOM elements/////////////////////////

export const ingredientsContainer = document.querySelector(".search-filters-ingredients")
export const appliancesContainer = document.querySelector(".search-filters-appliances")
export const ustensilsContainer = document.querySelector(".search-filters-ustensils")
const closeFiltersBtn = document.querySelectorAll(".fa-chevron-up")


/////////////////////////////////////////////////Ingredients/////////////////////


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


// Display ingredients

export function displayIngredientsTags(ingredients) {
    ingredients.forEach(ingredient => {
        let ingredientsListItem = `<div class="item-filtered item-filtered-ingredient col-4 text-start gx-0" role="button">${ingredient.ingredient}</div>`
        ingredientsContainer.innerHTML += ingredientsListItem
    })
}

displayIngredientsTags(newIngredientsArray)



//////////////////////////////////////////////// Appliances////////////////////////////////////////////////


// Retrieve appliances and remove duplicates

export let newAppliancesArray = recipes.reduce((accumulator, { id, appliance }) => {
    accumulator[appliance] = accumulator[appliance] || { appliance: appliance, ids: [] }
    accumulator[appliance].ids.push(id)
    return accumulator
}, {})

newAppliancesArray = Object.values(newAppliancesArray)


// Display appliances

export function displayAppliancesTags(appliances) {
    appliances.forEach(appliance => {
        let appliancesListItem = `<div class="item-filtered item-filtered-appliance col-4 text-start gx-0" role="button">${appliance.appliance}</div>`
        appliancesContainer.innerHTML += appliancesListItem
    })
}
displayAppliancesTags(newAppliancesArray)



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


// Display ustensils

export function displayUstensilsTags(ustensils) {
    ustensils.forEach(ustensil => {
        let ustensilsListItem = `<div class="item-filtered item-filtered-ustensil col-4 text-start gx-0" role="button">${ustensil.ustensil}</div>`
        ustensilsContainer.innerHTML += ustensilsListItem
    })
}
displayUstensilsTags(newUstensilsArray)






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























