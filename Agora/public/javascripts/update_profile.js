var updatePasswordIsOpen = false;
var updateEmailIsOpen = false;


function displayPasswordUpdate() {


    if (updateEmailIsOpen) {
        var hideEmailPanel = document.getElementsByClassName("show-email");
        hideEmailPanel[0].className = hideEmailPanel[0].className.replace(" show-email", " hide-email");
        updateEmailIsOpen = false;
    }

    if (updatePasswordIsOpen) {
        var hidePasswordPanel = document.getElementsByClassName("show-password");
        hidePasswordPanel[0].className = hidePasswordPanel[0].className.replace(" show-password", " hide-password");
        updatePasswordIsOpen = false;
    } else {
        var showPasswordPanel = document.getElementsByClassName("hide-password");
        showPasswordPanel[0].className = showPasswordPanel[0].className.replace(" hide-password", " show-password");
        updatePasswordIsOpen = true;
    }

    
}

function displayEmailUpdate() {


    if (updatePasswordIsOpen) {
        var hidePasswordPanel = document.getElementsByClassName("show-password");
        hidePasswordPanel[0].className = hidePasswordPanel[0].className.replace(" show-password", " hide-password");
        updatePasswordIsOpen = false;
    }

    if (updateEmailIsOpen) {
        var hideEmailPanel = document.getElementsByClassName("show-email");
        hideEmailPanel[0].className = hideEmailPanel[0].className.replace(" show-email", " hide-email");
        updateEmailIsOpen = false;
    } else {
        var showEmailPanel = document.getElementsByClassName("hide-email");
        showEmailPanel[0].className = showEmailPanel[0].className.replace(" hide-email", " show-email");
        updateEmailIsOpen = true;
    }

    
}



