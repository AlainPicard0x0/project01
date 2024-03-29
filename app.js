if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", runApp);
}
else {
    runApp();
}

//Shows the number of items in the cart
const itemsInCart = document.getElementsByClassName("items-in-cart")[0];
//Shows the number of items in the cart for mobile nav
const itemsInCartMobile = document.getElementsByClassName("items-in-cart-mobile")[0];

//Array to store items added to cart
let cartList;
let id;
let numberOfItems;
let cartContainer;
//Set page number variable up
let pageNum;
//Set up localStorage variable
let data = JSON.parse(localStorage.getItem("savedCart"));
if(data) {
    cartList = data;
    numberOfItems = cartList.length;
    id = cartList.length;
    console.log(cartList);
    if(itemsInCart) {
        itemsInCart.innerText = numberOfItems;        
    }
    if(itemsInCartMobile) {
        itemsInCartMobile.innerText = numberOfItems;
    }
}
else {
    cartList = [];
    numberOfItems = 0;
    id = 0;
}



function runApp() {
    
    const cartTotal = document.getElementById("cart-total");
    let dropDown = document.getElementsByClassName("dropdown-button");
    //Run completePurchase() function when check out button is clicked
    let checkOutBtn = document.getElementById("checkout-btn");
    if(checkOutBtn) {
        if(cartList.length >= 1) {
            checkOutBtn.addEventListener("click", completePurchase);
        }
        else {
            checkOutBtn.removeEventListener("click", completePurchase);
        }
        
    }
    

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
    //Close drop down menu if click happens outside of the dropdown menu
    //Added && document.URL.includes so that event listener is only added when on home page(index.html)
    document.addEventListener("click", (e) => {
        let clicked = e.target;
        if(!clicked.classList.contains("fa") && !clicked.classList.contains("dropdown-button") && document.URL.includes("index.html")) {
            closeDropMenu();
        }
    })
    
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

    //for mobile nav
    let goToCart = document.getElementById("cart-text-mobile");
    if(goToCart) {
        goToCart.addEventListener("click", () => {
            location.href = "./cart.html";
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

    // Remove items from mobile cart
    let mobileRemoveButton = document.getElementsByClassName("checkout-container-remove-btn");
    for(let i = 0; i < mobileRemoveButton.length; i++) {
        mobileRemoveButton[i].addEventListener("click", (e) => {
            let removeItem = e.target;
            removeSelected(removeItem);
        })
    }
    

    //Get continue shopping button and add eventListener
    const continueShoppingBtn = document.getElementById("continue-shopping-btn");
    if(continueShoppingBtn) {
        continueShoppingBtn.addEventListener("click", () => {
            continueShopping(continueShoppingBtn);
        })
    }

    //Get mobile navigation element
    const mobileNav = document.getElementsByClassName("icon")[0];
    mobileNav.addEventListener("click", () => {
        mobileMenu();
    })
}

//Get the value of the last element added to the cart
//If value is from selection.html page, make <continue shopping button navigate back to that page. If value was from 
//selection02.html, make <continue shopping button navigate back to that page and so on.
function continueShopping(buttonElement) {
    let pageHref;
    if(pageNum) {
        pageHref = `./selection${pageNum}.html`;
    }
    else {
        pageHref = "./selection01.html";
    }
    
    buttonElement.href = pageHref;
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
        let pageNumber = itemContainer.dataset.pageNumber;
        console.log(pageNumber);
        cartList.push({
            "id": id,
            "title": title,
            "price": price,
            "icon": icon,
            "details": details,
            "pageNumber": pageNumber
        });
        localStorage.setItem("savedCart", JSON.stringify(cartList));
        id++;
        console.log(cartList);
        numberOfItems = cartList.length;
        itemsInCart.innerText = numberOfItems;        
        itemsInCartMobile.innerText = numberOfItems;
     
}

//Need to display items in cart
function displayCart(cartSection, arr) {
    //Get items that have been added to cart
    let total = 0;
    for(let i = 0; i < arr.length; i++) {
        let newItem = document.createElement("div");
        newItem.classList.add("box");
        let itemContents = `<div id="${i}" class="cart-div grid-container">
                                <img class="cart-img" class="img-src" src="${arr[i]["icon"]}">
                                <p class="title">${arr[i]["title"]}</p>
                                <p id="price" class="price">${arr[i]["price"]}</p>
                                <p class="details">${arr[i]["details"]}</p>
                                <button class="remove-item">Remove Item</button>
                            </div>`;
        newItem.innerHTML = itemContents;
        cartSection.append(newItem);
        //Add total of cart items        
        let price = parseFloat(arr[i]["price"].replace("$", ""));
        total += price;
    }
    //Ensure total only has 2 decimal places
    total = Math.round(total * 100) / 100;
    //Get cart total container and display total
    let cartTotalContainer = document.getElementById("cart-total");
    total !== 0 ? cartTotalContainer.innerText = "$" + total : cartTotalContainer.innerText = "$0.00";
    //Get the page number attribute of the last item in the array and save it to our pageNum variable
    if(arr.length > 0) {
        //let pageAttribute = arr[arr.length-1]["pageNumber"];
        //pageNum = pageAttribute.toString() || "01";
        pageNum = arr[arr.length-1]["pageNumber"];
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
//Remove selected item from cart
function removeSelected(e) {
    let buttonParent = e.parentElement;
    let itemId = buttonParent.id;
    cartList.splice(itemId, 1);
    localStorage.setItem("savedCart", JSON.stringify(cartList));
    buttonParent.remove();
    location.reload();
}

//Add items in shopping cart to shopping cart display and give totals
function displayItemsInCart(cartItemContainer, arr) {    
    //create divs for each cart item
    for(let i = 0; i < arr.length; i++) {
        let newListItem = document.createElement("div");
        newListItem.className = "item-container";
        let itemContents = `<div class="item-img-container">
                                <div>
                                    <img class="checkout-container-image" src="${arr[i]["icon"]}">
                                </div>
                                <div>
                                    <button class="checkout-container-remove-btn">Remove</button>
                                </div>
                            </div>
                            <div class="item-container-flex">
                                <div class="item-title-container">
                                    <p>${arr[i]["title"]}</p>
                                </div>
                                <div class="item-price-container">
                                    <p>Price: ${arr[i]["price"]}</p>
                                    <hr>
                                </div>
                            </div>`;
        newListItem.innerHTML = itemContents;
        cartItemContainer.append(newListItem);
    }
}

//Remove items from cart when Checkout button clicked and reset total
function completePurchase() {
    while(cartItemContainer.hasChildNodes()) {
        cartItemContainer.removeChild(cartItemContainer.firstChild);
    }
    let cartTotalContainer = document.getElementById("cart-total");
    cartTotalContainer.innerText = "$0.00";
    removeItems(cartSection);
    localStorage.clear();
    location.reload();
    setTimeout(() => {
        alert("Thank you for your purchase");
    }, 0);
    
}

//Add functionality to modile menu
function mobileMenu() {
    const myLinks = document.getElementById("myLinks"); 
    if (myLinks.style.display === "block") {
        myLinks.style.display = "none";
    } else {
        myLinks.style.display = "block";
    }
}


