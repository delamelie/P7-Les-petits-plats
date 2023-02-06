import { recipes } from "/data/recipes.js"
import { newIngredientsArray } from "./tags-display.js"
import { ingredientsContainer } from "./tags-display.js"
import { displayIngredientsTags } from "./tags-display.js"
import { recipesContainer } from "./recipe-card.js"


///////////////////////////// Search by input//////

const inputIngredients = document.querySelector(".input-ingredients")
inputIngredients.addEventListener("input", searchIngredients)


function searchIngredients() {
    let inputIngredientsValue = inputIngredients.value.toLowerCase()
    const ingredientsFilterByTag = newIngredientsArray.filter(i => i.ingredient.toLowerCase() === inputIngredientsValue || i.ingredient.toString().split(" ") === inputIngredientsValue);
    updateIngredientsTags(ingredientsFilterByTag)
    if (ingredientsFilterByTag.length != 0) {
        console.log(ingredientsFilterByTag);
    }
}


/*newIngredientsArray.forEach(ingredient => {
        let ingredientTostring = ingredient.toString()
        if (ingredientTostring.includes(inputIngredientsValue) ||
            ingredientTostring.split(" ").includes(inputIngredientsValue)) {

        }
    })*/

function updateIngredientsTags(ingredientsFilterByTag) {
    const updatedIngredientsArray = newIngredientsArray.filter(ingredient => ingredientsFilterByTag.some(result => ingredient.ids === result.ids))
    console.log(updatedIngredientsArray)
    ingredientsContainer.innerHTML = ""
    displayIngredientsTags(updatedIngredientsArray)
}



//////////////////////////////// Search by clicking tag //////////////////


let selectedIngredient = document.querySelectorAll(".item-filtered-ingredient")


const clickedIngredient = selectedIngredient.forEach(ingredient => {
    ingredient.addEventListener('click', function clickTag(event) {
        let clickedItem = event.target.innerText
        const retrieveIngredientIds = newIngredientsArray.filter(ingredient => ingredient.ingredient === clickedItem)
        console.log(retrieveIngredientIds)
    });
});