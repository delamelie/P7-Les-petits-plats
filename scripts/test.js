
import { recipes } from "../data/recipes.js"
import { displayRecipes } from "./recipe-card.js"
import { recipesContainer } from "./recipe-card.js"


/////////////////////////////DOM elements/////////////////////////

export const ingredientsContainer = document.querySelector(".search-filters-ingredients")
export const appliancesContainer = document.querySelector(".search-filters-appliances")
export const ustensilsContainer = document.querySelector(".search-filters-ustensils")
const closeFiltersBtn = document.querySelectorAll(".fa-chevron-up")

const inputIngredients = document.querySelector(".input-ingredients")
const inputAppliances = document.querySelector(".input-appliances")
const inputUstensils = document.querySelector(".input-ustensils")
let tagsContainer = document.querySelector(".tags-container")


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




//////////////////////////////////////////////// Appliances////////////////////////////////////////////////


// Retrieve appliances and remove duplicates

let newAppliancesArray = recipes.reduce((accumulator, { id, appliance }) => {
    accumulator[appliance] = accumulator[appliance] || { appliance: appliance, ids: [] }
    accumulator[appliance].ids.push(id)
    return accumulator
}, {})

newAppliancesArray = Object.values(newAppliancesArray)




/////////////////////Ustensils//////////////////


// Retrieve ustensils and capitalize names

let newUstensilsArray = recipes.flatMap(({ id, ustensils }) => ustensils.map(ustensil => ({ id, ustensil })))

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


////// Display tags /////////


function displayTags(items, container, type, input) {
    items.forEach(item => {
        let listItem = `<div class="item-filtered item-filtered-${type} col-4 text-start gx-0" role="button">${item[type]}</div>`
        container.innerHTML += listItem
        //addClickEvent(`.item-filtered-${type}`, type, input)
    })
}

displayTags(newIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
displayTags(newAppliancesArray, appliancesContainer, "appliance", inputAppliances)
displayTags(newUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)









/////////////////////////// Create flat array containing all searchable keywords///////////////////////////

let newRecipeArray = recipes.map(recipe => {
    let words = []
    words.push(recipe.name.toLowerCase())
    words.push(recipe.description.toLowerCase())
    recipe.ingredients.forEach(ingredient => words.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, words: words }
})

///////////////////////// Create search funtion on input///////////////////////////////////////////////////


const inputSearchBar = document.querySelector(".search-bar-input")
inputSearchBar.addEventListener("input", searchRecipes)


/*let searchResultsStore = []*/

function searchRecipes() {
    if (inputSearchBar.value.length >= 3) {

        //Create array to store recipes ids as results of user's search
        let searchResultsStore = []
        let inputValue = inputSearchBar.value.toLowerCase()
        newRecipeArray.forEach(recipe => {
            const wordsTostring = recipe.words.toString()
            if (wordsTostring.includes(inputValue)) {
                searchResultsStore.push({ id: recipe.id })
                updateRecipes(searchResultsStore)
                updateTags(searchResultsStore)
            }
        })
        console.log(searchResultsStore)
        if (searchResultsStore.length === 0) {
            recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        }
    } else {
        recipesContainer.textContent = ""
        displayRecipes(recipes)
        ingredientsContainer.innerHTML = ""
        displayTags(newIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)
        appliancesContainer.innerHTML = ""
        displayTags(newAppliancesArray, appliancesContainer, "appliance", inputAppliances)
        ustensilsContainer.innerHTML = ""
        displayTags(newUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)
    }
}


//Create array to retrieve recipes matching previously stored ids and update recipes display accordingly

export function updateRecipes(searchResultsStore) {
    let updatedRecipesArray = recipes.filter(recipe => searchResultsStore.some(result => recipe.id === result.id))
    recipesContainer.textContent = ''
    displayRecipes(updatedRecipesArray)
}


//Create arrays to retrieve ingredients, appliances and ustensils matching previously stored ids and update tags display accordingly

function updateTags(searchResultsStore) {
    let updatedIngredientsArray = newIngredientsArray.filter(ingredient => searchResultsStore.some(id => ingredient.ids.includes(id.id)))
    ingredientsContainer.innerHTML = ""
    displayTags(updatedIngredientsArray, ingredientsContainer, "ingredient", inputIngredients)

    addClickIngredientEvent()
    let updatedAppliancesArray = newAppliancesArray.filter(appliance => searchResultsStore.some(id => appliance.ids.includes(id.id)))
    appliancesContainer.innerHTML = ""
    displayTags(updatedAppliancesArray, appliancesContainer, "appliance", inputAppliances)

    addClickApplianceEvent()
    let updatedUstensilsArray = newUstensilsArray.filter(ustensil => searchResultsStore.some(id => ustensil.ids.includes(id.id)))
    ustensilsContainer.innerHTML = ""
    displayTags(updatedUstensilsArray, ustensilsContainer, "ustensil", inputUstensils)

    addClickUstensilEvent()
}



/////////////////////// DOM elements and event listeners //////////////////////////////////



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


//////////////////////////////// Search by clicking tags //////////////////

///// Add event listener ////////

let clickedItem

function addClickIngredientEvent() {
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

function addClickApplianceEvent() {
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


function addClickUstensilEvent() {
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
















