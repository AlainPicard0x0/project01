if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", runApp);
}
else {
    runApp();
}

//Shows the number of items in the cart
const itemsInCart = document.getElementsByClassName("items-in-cart")[0];

//Array to store items added to cart
let cartList;
let id;
let numberOfItems;
//Set up localStorage variable
let data = JSON.parse(localStorage.getItem("savedCart"));
if(data) {
    cartList = data;
    numberOfItems = cartList.length;
    id = cartList.length;
    if(itemsInCart) {
        itemsInCart.innerText = numberOfItems;
    }
}
else {
    cartList = [];
    numberOfItems = 0;
    id = 0;
}



function runApp() {
    let dropDown = document.getElementsByClassName("dropdown-button");
    for(let i = 0; i < dropDown.length; i++) {
        let dropdownDisplay = dropDown[i];        
        dropdownDisplay.addEventListener("click", (e) => {  
            let clicked = e.target;
            let clickedClass;
            if(clicked.classList.contains("fa")) {
                clickedClass = clicked.parentElement.nextElementSibling;
            }
            else {
                clickedClass = clicked.nextElementSibling;
            }            
            if(!clickedClass.classList.contains("show")) {
                closeDropMenu();
            } 
            let dropdownContainer = dropdownDisplay.parentElement;
            let drop = dropdownContainer.getElementsByClassName("dropdown-content")[0];
            drop.classList.toggle("show");
        });
    }
    
    let addButton = document.getElementsByClassName("add-to-cart");
    for(let i = 0; i < addButton.length; i++) {
        let currentAddButton = addButton[i];
        currentAddButton.addEventListener("click", () => {
            addToCart(currentAddButton);
        })
    }
    let goToCartBtn = document.getElementById("cart-button");
        if(goToCartBtn) {
            goToCartBtn.addEventListener("click", () => {                
                location.href = "./cart.html";
            })
        }
    let emptyCartBtn = document.getElementById("empty-cart");
    if(emptyCartBtn) {
        emptyCartBtn.addEventListener("click", () => {
            removeItems(cartSection);
        })  
    }
    let removeItemBtn = document.getElementsByClassName("remove-item");
    for(let i = 0; i < removeItemBtn.length; i++) {
        let removeItem = removeItemBtn[i];
        removeItem.addEventListener("click", (e) => {
            removeItem = e.target;
            removeSelected(removeItem)
        })
    }
}

//Check if any drop-down menus are currently open and close them before opening another
function closeDropMenu() { 
        console.log("closeDropMenu fired off")
        let navContainer = document.getElementsByClassName("navbar")[0];
        let dropContainer = navContainer.getElementsByClassName("dropdown-content");
        for(let i = 0; i < dropContainer.length; i++) {
            let hasShow = dropContainer[i]
            hasShow.classList.remove("show");
        }            
}

function addToCart(currentAddButton) { 
        //get parent of cart item that was clicked and save title and price to array   
        let itemContainer = currentAddButton.parentElement;
        let price = itemContainer.getElementsByClassName("price")[0].innerText;
        let title = itemContainer.getElementsByClassName("title")[0].innerText;
        let icon = itemContainer.getElementsByClassName("img-src")[0].src;
        let details = itemContainer.getElementsByClassName("details")[0].innerText;
        cartList.push({
            "id": id,
            "title": title,
            "price": price,
            "icon": icon,
            "details": details
        });
        localStorage.setItem("savedCart", JSON.stringify(cartList));
        id++;
        console.log(cartList);
        numberOfItems = cartList.length;
        itemsInCart.innerText = numberOfItems;
}

//Need to display items in cart
function displayCart(cartSection, arr) {
    //Get items that have been added to cart
    for(let i = 0; i < arr.length; i++) {
        let newItem = document.createElement("div");
        newItem.classList.add("box");
        let itemContents = `<div id="${i}" class="cart-div grid-container">
                                <img class="cart-img" width="150px" height="150px" class="img-src" src="${arr[i]["icon"]}">
                                <p class="title">${arr[i]["title"]}</p>
                                <p id="price" class="price">${arr[i]["price"]}</p>
                                <p class="details">${arr[i]["details"]}</p>
                                <button class="remove-item">Remove Item</button>
                            </div>`;
        newItem.innerHTML = itemContents;
        cartSection.append(newItem);
    }
}
//Remove items from cart
function removeItems(cartSection) {
    cartList = [];
    localStorage.clear();
    while(cartSection.hasChildNodes()) {
        cartSection.removeChild(cartSection.firstChild);
    }
}
//Remove selected item from card
function removeSelected(e) {
    let buttonParent = e.parentElement;
    let itemId = buttonParent.id;
    cartList.splice(itemId, 1);
    localStorage.setItem("savedCart", JSON.stringify(cartList));
    buttonParent.remove();
    location.reload();
}