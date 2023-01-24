import { recipes } from "/data/recipes.js"
/*console.log(recipes)*/
/*console.log(recipes[0]['ingredients'][0])*/


/////////////////////Ingredients//////////////////


let newIngredientsArray = []

function removeDuplicates() {
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            let ing = ingredient.ingredient
            newIngredientsArray.push(ing)
        })
    })
    return newIngredientsArray.filter((item,
        index) => newIngredientsArray.indexOf(item) === index);
}


let ingredientsFilteredArray = removeDuplicates(newIngredientsArray)


function ingredientsDropdown(items) {
    items.forEach(item => {
        let ingredientsListItem = `
                <div class="item-filtered-ingredient col-4 text-start gx-0">${item}</div>
            `;
        const ingredientsContainer = document.querySelector(".search-filters-ingredients")
        ingredientsContainer.innerHTML += ingredientsListItem
    });

}

ingredientsDropdown(ingredientsFilteredArray)



/////////////////////Appliances//////////////////


let newAppliancesArray = []

recipes.forEach((recipe) => {
    let appliance = recipe.appliance
    newAppliancesArray.push(appliance)

})


function removeDuplicatesbis(newAppliancesArray) {
    return newAppliancesArray.filter((item,
        index) => newAppliancesArray.indexOf(item) === index);
}

/*console.log(removeDuplicatesbis(newAppliancesArray))*/



/////////////////////Ustensils//////////////////


let newUstensilsArray = []

recipes.forEach((recipe) => {
    let ustensil = recipe.ustensils
    recipe.ustensils.forEach((ustensil) => {
        newUstensilsArray.push(ustensil)
    })
})


function removeDuplicatester(newUstensilsArray) {
    return newUstensilsArray.filter((item,
        index) => newUstensilsArray.indexOf(item) === index);
}

/*console.log(removeDuplicatester(newUstensilsArray))*/
























