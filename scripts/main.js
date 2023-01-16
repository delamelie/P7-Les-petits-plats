import { recipes } from "/data/recipes.js"


function recipeFactory(data) {

    const { name, ingredients, time, description } = data

    function getRecipeDOM() {
        const divCard = document.createElement("div")
        const image = document.createElement("img")
        const divRecipe = document.createElement("div")
        const cardHeader = document.createElement("div")
        const cardBody = document.createElement("div")
        const h1 = document.createElement("h1")
        const divTime = document.createElement("div")
        const divIngredients = document.createElement("div")
        const divDescription = document.createElement("div")
        divCard.setAttribute("class", "card")
        image.setAttribute("src", "images/pexels-kindel-media-8181524.png")
        divRecipe.setAttribute("class", "card-recipe")
        cardHeader.setAttribute("class", "card-recipe-header")
        h1.setAttribute("class", "card-recipe-header-title")
        divTime.setAttribute("class", "card-recipe-header-time")
        cardBody.setAttribute("class", "card-recipe-body")
        divIngredients.setAttribute("class", "card-recipe-body-ingredients")
        divDescription.setAttribute("class", "card-recipe-body-description")
        divCard.appendChild(image)
        divCard.appendChild(divRecipe)
        divRecipe.appendChild(cardHeader)
        divRecipe.appendChild(cardBody)
        cardHeader.appendChild(h1)
        cardHeader.appendChild(divTime)
        cardBody.appendChild(divIngredients)
        cardBody.appendChild(divDescription)
        h1.textContent = name
        divTime.textContent = `${time} min`
        divIngredients.textContent = ingredients
        divDescription.textContent = description
        return (divCard)
    }
    return { name, ingredients, time, description, getRecipeDOM }
}


function displayRecipes(recipes) {
    recipes.forEach((recipe) => {
        const recipesContainer = document.querySelector(".recipes-container")
        recipesContainer.appendChild(recipeFactory(recipe).getRecipeDOM())
    })
}

displayRecipes(recipes)





/*function recipeFactory(data) {

    const { name, ingredients, time, description } = data


    function getRecipeDOM() {
        const recipeCard = `
        <div class="card" style="width: 50%;">
                <img src="images/pexels-kindel-media-8181524.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <div class="card-text d-flex justify-content-between align-items-center">
                        <h1 class="card-text recipe-title">${name}</h1>
                        <p class="card-text recipe-time">${time}</p>
                    </div>

                    <div class="card-text d-flex justify-content-between align-items-center">
                        <p class="card-text recipe-ingredients">${ingredients}</p>
                        <p class="card-text recipe-description">${description}</p>
                    </div>
                </div>
            </div>
        `
        console.log("yo")
        return (recipeCard)
    }
    return { name, ingredients, time, description, getRecipeDOM }
}*/








