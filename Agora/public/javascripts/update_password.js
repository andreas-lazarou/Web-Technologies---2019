var updatePasswordIsOpen = false;

function displayPasswordUpdate() {
    var displayBlock;
    
    if (updatePasswordIsOpen) {
        displayBlock = document.getElementsByClassName("show");
        displayBlock[0].className = displayBlock[0].className.replace(" show", " hide");
        updatePasswordIsOpen = false;
    } else {
        displayBlock = document.getElementsByClassName("hide");
        displayBlock[0].className = displayBlock[0].className.replace(" hide", " show");
        updatePasswordIsOpen = true;
    }
    
}