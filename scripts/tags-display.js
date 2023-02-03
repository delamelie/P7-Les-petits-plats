import { recipes } from "/data/recipes.js"



/////////////////////////////DOM elements/////////////////////////

export const ingredientsContainer = document.querySelector(".search-filters-ingredients")
export const appliancesContainer = document.querySelector(".search-filters-appliances")
export const ustensilsContainer = document.querySelector(".search-filters-ustensils")
const closeFiltersBtn = document.querySelectorAll(".fa-chevron-up")


/////////////////////////////////////////////////Ingredients/////////////////////


// Retrieve ingredients and remove duplicates

const flattenIngredients = recipes.map(({ id, ingredients }) => ingredients.map(({ ingredient }) => ({ id, ingredient }))
)
    .flat()


const reduceIngredients = flattenIngredients.reduce((accumulator, { id, ingredient }) => {
    accumulator[ingredient] = accumulator[ingredient] || { ingredient: ingredient, ids: [] }
    accumulator[ingredient].ids.push(id)
    return accumulator
}, {})

/*console.log(reduceIngredients)*/
export let newIngredientsArray = Object.values(reduceIngredients)
console.log(newIngredientsArray)


// Display ingredients

export function displayIngredientsTags(ingredients) {
    ingredients.forEach(ingredient => {
        let ingredientsListItem = `<div class="item-filtered-ingredient col-4 text-start gx-0">${ingredient.ingredient}</div>`
        ingredientsContainer.innerHTML += ingredientsListItem
    })
}

displayIngredientsTags(newIngredientsArray)



//////////////////////////////////////////////// Appliances////////////////////////////////////////////////


const reduceAppliances = recipes.reduce((accumulator, { id, appliance }) => {
    accumulator[appliance] = accumulator[appliance] || { appliance: appliance, ids: [] }
    accumulator[appliance].ids.push(id)
    return accumulator
}, {})

export let newAppliancesArray = Object.values(reduceAppliances)
console.log(newAppliancesArray)


export function displayAppliancesTags(appliances) {
    appliances.forEach(appliance => {
        let appliancesListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${appliance.appliance}</div>`
        appliancesContainer.innerHTML += appliancesListItem
    })
}
displayAppliancesTags(newAppliancesArray)



/////////////////////Ustensils//////////////////


// Retrieve ustensils and remove duplicates


let flattenUstensils = recipes.flatMap(({ id, ustensils }) => ustensils.map(ustensil => ({ id, ustensil })))


const reduceUstensils = flattenUstensils.reduce((accumulator, { id, ustensil }) => {
    accumulator[ustensil] = accumulator[ustensil] || { ustensil: ustensil, ids: [] }
    accumulator[ustensil].ids.push(id)
    return accumulator
}, {})

/*console.log(reduceUstensils)*/
export let newUstensilsArray = Object.values(reduceUstensils)
console.log(newUstensilsArray)



// Capitalize names

function capitalizeWords(array) {
    return array.map((word) => {
        const capitalizedFirst = word.charAt(0).toUpperCase()
        const rest = word.slice(1).toLowerCase()
        return capitalizedFirst + rest
    })
}


// Display ustensils with capitalized names

/*let ustensilsFilteredCapitalizedArray = capitalizeWords(newUstensilsArray)*/

export function displayUstensilsTags(ustensils) {
    ustensils.forEach(ustensil => {
        let ustensilsListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${ustensil.ustensil}</div>`
        ustensilsContainer.innerHTML += ustensilsListItem

    })
}
/*displayUstensilsTags(ustensilsFilteredCapitalizedArray)*/
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





















