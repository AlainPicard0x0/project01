if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", runApp);
}
else {
    runApp();
}
//Shows the number of items in the cart
const itemsInCart = document.getElementsByClassName("items-in-cart")[0];
let numberOfItems = 0;

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
            addToCart();
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

function addToCart() {    
        numberOfItems++;
        itemsInCart.innerText = numberOfItems;
}