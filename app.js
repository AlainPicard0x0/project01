if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", runApp);
}
else {
    runApp();
}

function runApp() {
    let dropDown = document.getElementsByClassName("dropdown-button");
    for(let i = 0; i < dropDown.length; i++) {
        let dropdownDisplay = dropDown[i];        
        dropdownDisplay.addEventListener("click", (e) => {
            let dropdownContainer = dropdownDisplay.parentElement;
            let drop = dropdownContainer.getElementsByClassName("dropdown-content")[0];
            drop.classList.toggle("show");
            console.log(drop);
        });
    }
}