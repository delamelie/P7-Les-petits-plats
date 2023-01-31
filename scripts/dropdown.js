import { recipes } from "/data/recipes.js"



/////////////////////////////DOM elements/////////////////////////

const ingredientsContainer = document.querySelector(".search-filters-ingredients")
const appliancesContainer = document.querySelector(".search-filters-appliances")
const ustensilsContainer = document.querySelector(".search-filters-ustensils")
const closeFiltersBtn = document.querySelectorAll(".fa-chevron-up")


/////////////////////Ingredients//////////////////

// Retrieve ingredients and remove duplicates

let newIngredientsArray = []

function removeDuplicateIngredients() {
    recipes.map(recipe => {
        recipe.ingredients.map(ingredient => {
            newIngredientsArray.push(ingredient.ingredient)
        })
    })
    return newIngredientsArray.filter((item, index) => newIngredientsArray.indexOf(item) === index)
}


// Display ingredients

let ingredientsFilteredArray = removeDuplicateIngredients(newIngredientsArray)

function ingredientsDropdown(ingredients) {
    ingredients.map(ingredient => {
        let ingredientsListItem = `<div class="item-filtered-ingredient col-4 text-start gx-0">${ingredient}</div>`
        ingredientsContainer.innerHTML += ingredientsListItem
    })
}

ingredientsDropdown(ingredientsFilteredArray)



/*let testArray = recipes.map(recipe => {
    let newIngredientsArray = []
    recipe.ingredients.forEach(ingredient => newIngredientsArray.push(ingredient.ingredient.toLowerCase()))
    return { id: recipe.id, ingredient: newIngredientsArray }
})

console.log(testArray)



function removeDuplicateIngredients() {
    testArray.filter((item, index) => testArray.indexOf(item) === index)
}

console.log(testArray)


let ingredientsFilteredArray = removeDuplicateIngredients(testArray)

function ingredientsDropdown(items) {
    items.forEach(item => {
        let ingredientsListItem = `<div class="item-filtered-ingredient col-4 text-start gx-0">${item}</div>`
        ingredientsContainer.innerHTML += ingredientsListItem
    })
}

ingredientsDropdown(ingredientsFilteredArray)*/



/////////////////////////// Test/////////////////////////////////
/*function createDropdown() {
    recipes.forEach(recipe => {
        let ingredients = recipe.ingredients;
       ingredients.filter((item, index) => newIngredientsArray.indexOf(item) === index)
        ingredients.forEach(ingredient => {

            let ingredientsListItem = `<div class="item-filtered-ingredient col-4 text-start gx-0">${ingredient.ingredient}</div>`;
            ingredientsContainer.innerHTML += ingredientsListItem
        });
    });
}

createDropdown(recipes)*/







/////////////////////Appliances//////////////////

// Retrieve appliances and remove duplicates

/*let newAppliancesArray = []

function removeDuplicateAppliances(newAppliancesArray) {
    recipes.map(recipe => {
        newAppliancesArray.push(recipe.appliance)
    })
    return newAppliancesArray.filter((item, index) => newAppliancesArray.indexOf(item) === index)
}*/


// Display appliances

/*let appliancesFilteredArray = removeDuplicateAppliances(newAppliancesArray)

function appliancesDropdown(appliances) {
    appliances.forEach((appliance) => {
        let appliancesListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${appliance}</div>`
        appliancesContainer.innerHTML += appliancesListItem
    });
}

appliancesDropdown(appliancesFilteredArray)*/



/*let result = recipes.reduce(function (r, a) {
    r[a.appliance] = r[a.appliance] || [];
    r[a.appliance].push(a);
    console.log([a.appliance].toString())
    return r;
}, Object.create(null));
console.log(result)*/


const results = {};
for (const { id, appliance } of recipes) {
    if (!results[appliance]) results[appliance] = []
    results[appliance].push({ id, appliance })
    console.log(appliance)
    let appliancesListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${appliance}</div>`
    appliancesContainer.innerHTML += appliancesListItem
}
console.log(results.toString())


/*let results = {}
function test(results) {
    for (const { id, appliance } of recipes) {
        if (!results[appliance]) results[appliance] = []
        results[appliance].push({ id, appliance })
        console.log(appliance)
    }
}

test(results)*/



/*function appliancesDropdown(results) {
    results.forEach(result => {
        let appliancesListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${result}</div>`
        appliancesContainer.innerHTML += appliancesListItem

    })
}

appliancesDropdown(results)*/

/*let newAppliancesArray = []

function removeDuplicateAppliances(newAppliancesArray) {
    recipes.map(recipe => {
        newAppliancesArray.push(recipe.appliance)
    })
    return newAppliancesArray.filter((item, index) => newAppliancesArray.indexOf(item) === index)
}*/




/////////////////////Ustensils//////////////////

// Retrieve ustensils and remove duplicates

let newUstensilsArray = []

function removeDuplicateUstensils(newUstensilsArray) {
    recipes.map(recipe => {
        recipe.ustensils.map(ustensil => {
            newUstensilsArray.push(ustensil)
        })
    })
    return newUstensilsArray.filter((item, index) => newUstensilsArray.indexOf(item) === index)
}



// Capitalize ustensil names

let ustensilsFilteredArray = removeDuplicateUstensils(newUstensilsArray)

function capitalizeWords(array) {
    return array.map((word) => {
        const capitalizedFirst = word.charAt(0).toUpperCase();
        const rest = word.slice(1).toLowerCase();
        return capitalizedFirst + rest;
    });
}

// Display ustensils with capitalized names

let ustensilsFilteredCapitalizedArray = capitalizeWords(ustensilsFilteredArray)

function ustensilsDropdown(ustensils) {
    ustensils.map(ustensil => {
        let ustensilsListItem = `<div class="item-filtered-appliance col-4 text-start gx-0">${ustensil}</div>`
        ustensilsContainer.innerHTML += ustensilsListItem
    })
}

ustensilsDropdown(ustensilsFilteredCapitalizedArray)



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





















