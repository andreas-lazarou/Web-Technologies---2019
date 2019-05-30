"use strict";
selection("all");

function selection(category) {
    
    var column = document.getElementsByClassName("portfolio-column");

    if (category == "all") category = "";

    for (var i = 0; i < column.length; i++) {

        removeClassList(column[i], "show");
        if (column[i].className.indexOf(category) > -1) {
            addClassList(column[i], "show");
        }
    }
}

function addClassList(item, description) {
    var tab, name;
    tab = item.className.split(" ");
    name = description.split(" ");
    for (var i = 0; i < name.length; i++) {
        if (tab.indexOf(name[i]) == -1) {
            item.className += " " + name[i];
        }
    }
}

function removeClassList(item, description) {
    var tab, name;
    tab = item.className.split(" ");
    name = description.split(" ");
    for (var i = 0; i < name.length; i++) {
        while (tab.indexOf(name[i]) > -1) {
            tab.splice(tab.indexOf(name[i]), 1);
        }
    }
    item.className = tab.join(" ");
}


var infoButton = document.getElementById("portfolio-button");
var buttons = infoButton.getElementsByClassName("button-item");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var currentButton = document.getElementsByClassName("active");
        currentButton[0].className = currentButton[0].className.replace(" active", "");
        this.className += " active";
    });
}