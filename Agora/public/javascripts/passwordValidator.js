var inputPassword = document.getElementById("password");
var validPassword = false;
var inputConfirmPassword = document.getElementById("confirm-password");
var letter = document.getElementById("letter");
var number = document.getElementById("number");
var length = document.getElementById("length");
var confirmPass = document.getElementById("confirm-pass");
var samePassword= false;

// Activate block on password click
inputPassword.onfocus = function () {
    document.getElementById("password-validator-block").style.display = "block";
}

// Disable block on password click
inputPassword.onblur = function () {
    checkPass();
    checkSame();
    document.getElementById("password-validator-block").style.display = "none";

}

// Type
inputPassword.onkeyup = function () {
    
    var validLetter = false;
    var validNumber = false;
    var validLength = false;

    var lowerCase = /[a-z]/g;
    var numbers = /[0-9]/g;

    if (inputPassword.value.match(lowerCase)) {
        letter.classList.remove("password-checker-invalid");
        letter.classList.add("password-checker-valid");
        validLetter = true;
    } else {
        letter.classList.remove("password-checker-valid");
        letter.classList.add("password-checker-invalid");
        validLetter = false;
    }

    if (inputPassword.value.match(numbers)) {
        number.classList.remove("password-checker-invalid");
        number.classList.add("password-checker-valid");
        validNumber = true;
    } else {
        number.classList.remove("password-checker-valid");
        number.classList.add("password-checker-invalid");
        validNumber = false;
    }

    if (inputPassword.value.length >= 6) {
        length.classList.remove("password-checker-invalid");
        length.classList.add("password-checker-valid");
        validLength = true;
    } else {
        length.classList.remove("password-checker-valid");
        length.classList.add("password-checker-invalid");
        validLength = false;
    }

    if (validLetter == true && validNumber == true && validLength == true) {
        validPassword = true;
    } else {
        validPassword = false;
    }
    checkSame();
    checkPass();
}

// Activate block on confirm-password click
inputConfirmPassword.onfocus = function () {
    document.getElementById("confirm-password-validator-block").style.display = "block";
}

// Disable block on confirm-password click
inputConfirmPassword.onblur = function () {
    checkPass();
    checkSame();
    document.getElementById("confirm-password-validator-block").style.display = "none";
}

// TODO There is a bug, when they match but password is not correct
inputConfirmPassword.onkeyup = function() {
    checkSame();
    checkPass();
}

function checkPass(){

    if(samePassword &&validPassword){
        document.getElementById("test1").disabled = false;
        document.getElementById("test1").classList.remove("agora-button-disabled");
        document.getElementById("test1").classList.add("agora-button-enabled");

    }else{
        document.getElementById("test1").disabled = true;
        document.getElementById("test1").classList.remove("agora-button-enabled");
        document.getElementById("test1").classList.add("agora-button-disabled");
    }
}


function checkSame(){
    if (inputPassword.value === inputConfirmPassword.value) {
        console.log("They Match");
        

        confirmPass.classList.remove("password-checker-invalid");
        confirmPass.classList.add("password-checker-valid");
        samePassword=true;



        
    } else {
        
        confirmPass.classList.remove("password-checker-valid");
        confirmPass.classList.add("password-checker-invalid");
        samePassword=false;
    }
}