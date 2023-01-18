import { recipes } from "/data/recipes.js"

console.log(recipes[0]['ingredients'][0])
let ingredient
let quantity
let unit
let item
let ingredients
/*console.log(recipes)*/

function test() {
    for (let i = 0; i < recipes.length; i++) {
        ingredients = recipes[i].ingredients
        ingredients.forEach((data) => {
            ingredient = data.ingredient
            quantity = data.quantity
            unit = data.unit
            /*console.log(ingredient)
            console.log(quantity)
            console.log(unit)*/
            for (let i = 0; i < ingredients.length; i++) {
                item = ingredients[i]
                /*console.log(item)*/
                let hasUnit = item.hasOwnProperty("unit")
                if (hasUnit) {
                    /*console.log('oui')*/
                    return ingredient, quantity
                } else {
                    /*console.log('non')*/
                    /*return ingredient, quantity, unit*/
                }
            }
        })
    }
}



function recipeFactory(data) {
    // console.log(recipes)
    const { name, time, description } = data
    test()
    /*console.log(ingredient)
    console.log(quantity)
    console.log(unit)*/


    function getRecipeDOM() {

        const divCard = document.createElement("div")
        const image = document.createElement("img")
        const divRecipe = document.createElement("div")
        const cardHeader = document.createElement("div")
        const title = document.createElement("h1")
        const divTime = document.createElement("div")
        const spanIcon = document.createElement("span")
        const spanDuration = document.createElement("span")
        const cardBody = document.createElement("div")
        const divIngredients = document.createElement("div")
        const divDescription = document.createElement("div")
        divCard.setAttribute("class", "card border-0")
        image.setAttribute("src", "images/limonade-coco.jpg")
        image.setAttribute("class", "rounded-top h-50")
        divRecipe.setAttribute("class", "card-recipe h-50 p-3 rounded-bottom")
        cardHeader.setAttribute("class", "card-recipe-header d-flex mb-3")
        title.setAttribute("class", "card-recipe-header-title w-75 m-0 fw-bold")
        divTime.setAttribute("class", "card-recipe-header-time text-end w-25 fw-bold")
        spanIcon.setAttribute("class", "fa-regular fa-clock")
        spanDuration.setAttribute("class", "time-number ms-2")
        cardBody.setAttribute("class", "card-recipe-body d-flex w-100 mt-2")
        divIngredients.setAttribute("class", "card-recipe-body-ingredients w-50")
        divDescription.setAttribute("class", "card-recipe-body-description w-50")
        divCard.appendChild(image)
        divCard.appendChild(divRecipe)
        divRecipe.appendChild(cardHeader)
        divRecipe.appendChild(cardBody)
        cardHeader.appendChild(title)
        cardHeader.appendChild(divTime)
        divTime.appendChild(spanIcon)
        divTime.appendChild(spanDuration)
        cardBody.appendChild(divIngredients)
        cardBody.appendChild(divDescription)
        title.textContent = name
        spanDuration.textContent = `${time} min`
        divIngredients.textContent = `${ingredient}: ${quantity} ${unit}`
        divDescription.textContent = description
        return (divCard)
    }
    return { getRecipeDOM }
}


function displayRecipes(recipes) {
    recipes.forEach((recipe) => {
        const recipesContainer = document.querySelector(".recipes-container")
        recipesContainer.appendChild(recipeFactory(recipe).getRecipeDOM())
    })
}
displayRecipes(recipes)


/*function test(recipes) {
    for (let i = 0; i < recipes.length; i++) {
        recipes[i].ingredients.forEach((data) => {
            document.querySelector(".card-recipe-body").innerHTML += `${data.ingredient}: ${data.quantity} ${data.unit}`
        })
    }
}
test(recipes)*/




// for (let i = 0; i < recipes.length; i++) {
//     // initialisation liste ingredients recette =''

//     recipes[i].ingredients.forEach((data) => {
//         const test = document.createElement('div')
//         document.querySelector(".card-recipe-body").appendChild(test)
//         test.innerHTML += (`${data.ingredient}: ${data.quantity} ${data.unit}`)

//         // ajout ingredient à liste
//         // ingredientsArray.push(data.ingredient)
//         // inscrit liste dans html
//         // console.log(i, document)
//     })
// }


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

