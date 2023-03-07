import { recipes } from "/data/recipes.js"

export const recipesContainer = document.querySelector(".recipes-container")

function createRecipeCard(recipe) {
    const divCard = document.createElement("div")
    const image = document.createElement("img")
    const divRecipe = document.createElement("div")
    const cardHeader = document.createElement("div")
    const divTitle = document.createElement("h1")
    const divTime = document.createElement("div")
    const spanIcon = document.createElement("span")
    const spanDuration = document.createElement("span")
    const cardBody = document.createElement("div")
    const divIngredients = document.createElement("div")
    const divDescription = document.createElement("div")

    divCard.setAttribute("class", "card col-auto col-md-6 col-xxl-4 g-4 border-0")
    image.setAttribute("src", recipe.picture)
    image.setAttribute("class", "rounded-top h-50")
    image.setAttribute("alt", "")
    divRecipe.setAttribute("class", "card-recipe h-50 p-3 rounded-bottom")
    cardHeader.setAttribute("class", "card-recipe-header row mb-2")
    divTitle.setAttribute("class", "card-recipe-header-title col-8 mb-0 fw-bold")
    divTime.setAttribute("class", "card-text card-recipe-header-time col-4 text-end fw-bold")
    spanIcon.setAttribute("class", "fa-regular fa-clock")
    spanDuration.setAttribute("class", "time-number ms-2")
    cardBody.setAttribute("class", "card-recipe-body d-flex w-100 mt-2")
    divIngredients.setAttribute("class", "card-recipe-body-ingredients w-50 pe-2")
    divDescription.setAttribute("class", "card-recipe-body-description w-50")

    divTitle.textContent = recipe.name
    spanDuration.textContent = `${recipe.time} min`
    divDescription.textContent = recipe.description

    divCard.appendChild(image)
    divCard.appendChild(divRecipe)
    divRecipe.appendChild(cardHeader)
    divRecipe.appendChild(cardBody)
    cardHeader.appendChild(divTitle)
    cardHeader.appendChild(divTime)
    divTime.appendChild(spanIcon)
    divTime.appendChild(spanDuration)
    cardBody.appendChild(divIngredients)
    cardBody.appendChild(divDescription)

    recipe.ingredients.forEach((ingredient) => {
        const divItem = document.createElement("div")
        const spanIngredient = document.createElement("span")
        const spanQuantity = document.createElement("span")

        spanIngredient.setAttribute("class", "fw-bold")
        // Check if the object has quantity and unit and display data accordingly
        spanIngredient.textContent = ingredient.hasOwnProperty('quantity') ? `${ingredient.ingredient} : ` : ingredient.ingredient
        spanQuantity.textContent = ingredient.hasOwnProperty('unit') ? `${ingredient.quantity} ${ingredient.unit}` : ingredient.quantity

        divItem.appendChild(spanIngredient)
        divItem.appendChild(spanQuantity)
        divIngredients.appendChild(divItem)
    })
    return divCard
}


export function displayRecipes(recipes) {
    recipes.forEach((recipe) => {
        recipesContainer.appendChild(createRecipeCard(recipe))
    })
}
displayRecipes(recipes)