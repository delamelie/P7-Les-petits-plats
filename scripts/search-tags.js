import { removeAccents, search } from "../search-function.js"


//////////////////////////////////////////// DOM elements /////////////////////////////////////////////////////

export const inputIngredients = document.querySelector(".input-ingredients")
export const inputAppliances = document.querySelector(".input-appliances")
export const inputUstensils = document.querySelector(".input-ustensils")
const tagsContainer = document.querySelector(".tags-container")


///////////////////////////////////// Search by input in tags' section //////////////////////////////////////

inputIngredients.addEventListener("input", function () {
    searchItems(".item-filtered-ingredient", inputIngredients)
})

inputAppliances.addEventListener("input", function () {
    searchItems(".item-filtered-appliance", inputAppliances)
})

inputUstensils.addEventListener("input", function () {
    searchItems(".item-filtered-ustensil", inputUstensils)
})


function searchItems(selector, input) {
    const items = document.querySelectorAll(selector)
    const inputValue = input.value.toLowerCase()
    const normalizedInputValue = removeAccents(inputValue)
    const itemsArray = Array.prototype.slice.call(items)
    const filteredItems = itemsArray.filter(item => removeAccents(item.innerText.toLowerCase()).includes(normalizedInputValue))
    items.forEach(item => item.style.display = "none")
    filteredItems.forEach(item => item.style.display = "block")
}


//////////////////////////////// Search by clicking tags ///////////////////////////////

// Add event listener to items

let clickedItem

export function addClickEvent(selector, itemType, input) {
    let selectedItem = document.querySelectorAll(selector)
    selectedItem.forEach((item) => {
        item.addEventListener("click", function clickTag(event) {
            clickedItem = event.target.innerText
            createSelectedTag(itemType, clickedItem)
            search()
            input.value = ""
        })
    })
}

addClickEvent(".item-filtered-ingredient", "ingredient", inputIngredients)
addClickEvent(".item-filtered-appliance", "appliance", inputAppliances)
addClickEvent(".item-filtered-ustensil", "ustensil", inputUstensils)


// Display selected tags above dropdowns

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
        `<span class="clicked-item-tag fw-bold ${classItem} me-2 mb-2 p-2 rounded text-white" item-type="${itemType}">${clickedItem}
            <span class="fa-regular fa-circle-xmark ms-3 text-white" role="button" type="button" aria-label="Déselectionner le tag"></span>
        </span>`
    tagsContainer.innerHTML += selectedTag
    addEventToRemoveTags()
}


// Remove clicked items from dropdown

export function removeClickedItems(selector) {
    let listItems = document.querySelectorAll(selector)
    let clickedItemTags = document.querySelectorAll(".clicked-item-tag")
    clickedItemTags.forEach(clickedItemTag => {
        let clickedItem = clickedItemTag.innerText.trim()
        listItems.forEach(item => {
            if (item.innerText.toLowerCase().includes(clickedItem.toLowerCase())) {
                item.remove()
            }
        })
    })
}


// Remove selected tags when they are unclicked

function addEventToRemoveTags() {
    let removeTagButtons = document.querySelectorAll(".fa-circle-xmark")
    removeTagButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            let tag = event.target.parentElement
            tag.remove()
            search()
        })
    })
}























