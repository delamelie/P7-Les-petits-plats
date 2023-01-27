import { recipes } from "/data/recipes.js"



let newRecipeArray = recipes.map(recipe => {
    let words = []
    words.push(recipe.name.toLowerCase())
    words.push(recipe.description.toLowerCase())
    recipe.ingredients.forEach(ingredient => words.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, words: words }
});
console.log(newRecipeArray)


const input = document.querySelector(".search-bar-input")
input.addEventListener("input", searchRecipes)


function searchRecipes() {
    if (input.value.length >= 3) {
        console.log('3')
        newRecipeArray.forEach(element => {
            if (element.words.includes(input.value.toLowerCase())) {
                console.log('yes')
            }
        })
    }
}



/*let newRecipeArrayText = newRecipeArray.toString()
console.log(newRecipeArrayText)



function splitWords(newRecipeArrayText) {
    newRecipeArrayText.forEach((item) => {
        item = item.split(' ')
        console.log(item.split(' '))
    })
}

splitWords(newRecipeArrayText)


/////////////////////////////////////////////////////////////////////

/*const globalArray = recipes.map((recipe) => [recipe.id, recipe.name.toLowerCase(), recipe.description.toLowerCase()]);
console.log(globalArray)


////////////////////////////////////////////////////////////////////////

let globalMap2 = recipes.map((recipes) => {
    const ingredients = recipes.ingredients.map(ingredient => ingredient.ingredient);
    return [recipes.id, recipes.name, recipes.description, ingredients];
});
console.log(globalMap2)

///////////////////////////////////////////////////////////////////////////


let newArray = []

function createNewArray() {
    recipes.forEach((recipe) => {
        let description = recipe.description.toLowerCase()
        newArray.push(description)
        let name = recipe.name.toLowerCase()
        newArray.push(name)
        recipe.ingredients.forEach((ingredient) => {
            let ing = ingredient.ingredient.toLowerCase()
            newArray.push(ing)
        })
    })
    return createNewArray
}

createNewArray()

console.log(newArray)


/*const input = document.querySelector(".search-bar-input")
input.addEventListener("input", searchRecipes)


function splitWords(newArray) {
    newArray.forEach((item) => {
        item.split(' ')
        console.log(item.split(' '))
    })
}



function searchRecipes() {
    splitWords(newArray)
    if (input.value.length >= 3) {
        console.log(input.value)
        if (newArray.includes(input.value.toLowerCase())) {
            console.log('yes')
        }
    }
}


///////////////////////////////////////////////////////////

/*const recipesContainer = document.querySelector(".recipes-container")



function searchRecipes() {
    if (input.value.length >= 3) {
        newRecipeArray.forEach(element => {
            if (element.words.includes(input.value.toLowerCase())) {
                console.log('yes')



            recipesContainer.textContent = ''
            displayRecipes(selectedRecipes)

        } else {
            recipesContainer.textContent = ''
            recipesContainer.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        }

    }
}*/





