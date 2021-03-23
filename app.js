if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", runApp);
}
else {
    runApp();
}
//Shows the number of items in the cart
const itemsInCart = document.getElementsByClassName("items-in-cart")[0];
let numberOfItems = 0;
//Array to store items added to cart
let cartList = [];

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
        cartList.push({
            "title": title,
            "price": price
        });
        console.log(cartList);
        numberOfItems++;
        itemsInCart.innerText = numberOfItems;
}

function goToCart() {
    location.href = "./cart.html";
}

//Need to display items in cart
function displayCart() {
    //Get items that have been added to cart
}