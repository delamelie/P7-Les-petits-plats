import { recipes } from "/data/recipes.js"


const recipesContainer = document.querySelector(".recipes-container")

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
    divIngredients.setAttribute("class", "card-recipe-body-ingredients w-50")
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
        const spanUnit = document.createElement("span")

        spanIngredient.setAttribute("class", "fw-bold")

        spanIngredient.textContent = `${ingredient.ingredient} : `
        spanQuantity.textContent = ingredient.quantity
        spanUnit.textContent = ingredient.unit

        divItem.appendChild(spanIngredient)
        divItem.appendChild(spanQuantity)
        divItem.appendChild(spanUnit)
        divIngredients.appendChild(divItem)

    })
    return divCard
}

function displayRecipes() {
    recipes.forEach((recipe) => {
        const recipesContainer = document.querySelector(".recipes-container")
        recipesContainer.appendChild(createRecipeCard(recipe))
    })
}
displayRecipes(recipes)





/////////////////////////// Create flat array containing all searchable keywords///////////////////////////

let newRecipeArray = recipes.map(recipe => {
    let words = []
    words.push(recipe.name.toLowerCase())
    words.push(recipe.description.toLowerCase())
    recipe.ingredients.forEach(ingredient => words.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, words: words }
});


///////////////////////// Create search funtion on input///////////////////////////////////////////////////


const input = document.querySelector(".search-bar-input")

input.addEventListener("input", searchRecipes)


function searchRecipes() {
    if (input.value.length >= 3) {
        let searchResultsStore = []
        newRecipeArray.forEach(recipe => {
            let wordsTostring = recipe.words.toString()
            let inputValue = input.value.toLowerCase()
            if (wordsTostring.includes(inputValue) ||
                wordsTostring.split(" ").includes(inputValue)) {
                searchResultsStore.push({ id: recipe.id });
                let updatedArray = recipes.filter(a => searchResultsStore.some(b => a.id === b.id));
                console.log(updatedArray)
                recipesContainer.textContent = ''
                updatedArray.forEach((recipe) => {
                    const recipesContainer = document.querySelector(".recipes-container")
                    recipesContainer.appendChild(createRecipeCard(recipe))
                })
            } else {
                console.log('no')
                /*recipesContainer.textContent = ''
                recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."*/
            }
        })

    } else {
        recipesContainer.textContent = ''
        displayRecipes(recipes)
    }
}




////////////////////////////////////////////////


/*
// Create all recipes' cards
function createRecipeCards(recipes) {
    let recipeCard = '';

    recipes.forEach(recipe => {
        let ingredients = recipe.ingredients;
        let ingredientDiv = '';

        ingredients.forEach(ingredient => {
            ingredientDiv += `
            <div class="card-recipe-body-ingredients-item">
                <span class="item-ingredient">${ingredient.ingredient}</span>
                <span class="item-quantity fw-normal">${ingredient.quantity}</span>
                <span class="item-unit fw-normal">${ingredient.unit}</span>
            </div>
            `;
        });

        // Create recipes' cards

        recipeCard += `
<div class="card border-0">
    <img src="images/limonade-coco.jpg" class="rounded-top h-50" alt="...">
    <div class="card-recipe h-50 p-3 rounded-bottom">
        <div class="card-recipe-header d-flex mb-3">
            <h1 class="card-recipe-header-title w-75 m-0 fw-bold">${recipe.name}</h1>
            <div class="card-text recipe-time">
                <span class="fa-regular fa-clock"></span>
                <span class="time-number ms-2">${recipe.time} min</span>
            </div>
        </div>

        <div class="card-recipe-body d-flex w-100 mt-2">
            <div class="card-recipe-body-ingredients w-50">${ingredientDiv}</div>
            <div class="card-recipe-body-description w-50">${recipe.description}</div>
        </div>
   </div>
</div>
        `;
    });
    recipesContainer.innerHTML = recipeCard;
}

createRecipeCards(recipes) */







