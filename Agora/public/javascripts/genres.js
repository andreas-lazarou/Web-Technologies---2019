"use strict";
filterSelection("all");

function filterSelection(a) {
    var tab, i;

    tab = document.getElementsByClassName("column");
    if(a == "all") a = "";

    for (i = 0; i < tab.length; i++) {
        removeElements(tab[i], "show");
        if (tab[i].className.indexOf(a) > -1) addElements(tab[i], "show");
    }
}

function addElements (item, description) {
    var i, tab, name;

    tab = item.className.split(" ");
    name = description.split(" ");

    for (i = 0; i < name.length; i++) {
        if (tab.indexOf(name[i]) == -1) {
            item.className += " " + name[i];
        }
    }
}

function removeElements (item, description) {
    var i, tab, name;

    tab = item.className.split(" ");
    name = description.split(" ");

    for(i = 0; i < name.length; i++) {
        while (tab.indexOf(name[i]) > -1) {
            tab.splice(tab.indexOf(name[i], 1))
        }
    }
    item.className = tab.join(" ");
}


var infoButton = document.getElementById ("genre-button");
var buttons = infoButton.getElementsByClassName("btn");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        var currButton = document.getElementsByClassName("active");
        currButton[0].className = currButton[0].className.replace(" active", "");
        this.className += " active";
    });
}
