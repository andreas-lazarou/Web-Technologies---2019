var inputUsername = document.getElementById("username");
var inputPassword = document.getElementById("password");
function checkSame(){
    if (inputPassword.value!= "" &&inputUsername.value!= "") {
        document.getElementById("check").disabled = false;
        document.getElementById("check").classList.remove("agora-button-disabled");
        document.getElementById("check").classList.add("agora-button-enabled");
        
    } else {
        document.getElementById("check").disabled = true;
        document.getElementById("check").classList.remove("agora-button-enabled");
        document.getElementById("check").classList.add("agora-button-disabled");
    }
}
inputPassword.onfocus = function () {
    document.getElementById("password-validator-block").style.display = "block";
}

// Disable block on password click
inputPassword.onblur = function () {
    checkSame();
    document.getElementById("password-validator-block").style.display = "none";

}
inputUsername.onfocus = function () {
    document.getElementById("password-validator-block").style.display = "block";
}

// Disable block on password click
inputUsername.onblur = function () {
    checkSame();
    document.getElementById("password-validator-block").style.display = "none";

}
inputPassword.onkeyup = function () {
   
    checkSame();
}
inputUsername.onkeyup = function () {
   
    checkSame();
}