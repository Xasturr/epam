var main = document.getElementsByClassName("main");

var childrenAmount = 0;
var partnerName = "name";
var job = "job";
var country = "country";

while (true) {
    partnerName = prompt("Your partner name:", '') || "?";
    childrenAmount = prompt("How many children you will have?") || "?";
    job = prompt("What job you will have?") || "?";
    country = prompt("In what country will you live?") || "?";
    alert("You will marry with " + partnerName + " and you will have " + childrenAmount + " children");
    alert("You will work as a " + job + " and you will live in " + country);
}