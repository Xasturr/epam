let i = 50;
let j = 0;

while (i >= 0) {
    var elem = document.createElement("div");

    if (i == 0) {
        elem.innerHTML = "Nothing";
    } else {
        elem.innerHTML = i + " bottles stay on the wall, " + j + " fell and left";
    }
    document.body.appendChild(elem);
    i--;
    j++;
}