let deleteBtns = document.getElementsByClassName("deleteRow");
let changeBtns = document.getElementsByClassName("changeInfo");
let saveBtn = document.getElementsByName("saveBtn")[0];
let nameInput = document.getElementsByName("nameInput")[0];
let priceInput = document.getElementsByName("priceInput")[0];
let priceBool = false;
let nameBool = false;
let table = document.getElementsByName("table")[0];
let flag = false;
let tempNameInput;
let tempPriceInput;
let mainDiagram = document.getElementsByClassName("mainDiagram")[0];

for (let i = 1; i < table.rows.length; i++) {
    let newDiv = document.createElement("div");

    let newContentName = document.createTextNode(table.rows[i].cells[1].dataset.name); 

    newDiv.appendChild(newContentName);
    newDiv.className = "diagram";
    newDiv.style.height = table.rows[i].cells[2].dataset.price + "px";

    document.getElementsByClassName("mainDiagram")[0].appendChild(newDiv);
}

nameInput.addEventListener("input", checkValidName);
priceInput.addEventListener("input", checkValidPrice);
saveBtn.addEventListener("click", saveBtnClick);

for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", deleteBtnClick);
}

function checkValidName() {
    if (nameInput.value.length === 0) {
        nameBool = false;
        nameInput.style.borderColor = "red";
    }
    else {
        nameBool = true;
        nameInput.style.borderColor = "";
    }
}

function checkValidPrice() {
    if (priceInput.value.length === 0) {
        priceBool = false;
        priceInput.style.borderColor = "red";
    }
    else {
        priceBool = true;
        priceInput.style.borderColor = "";
    }
}

function saveBtnClick() {

    if (flag) {
        flag = false;

        let name;
        if (this.parentNode.childNodes[3])
            name = this.parentNode.childNodes[3].dataset.name;
        else 
            name = this.parentNode.childNodes[1].dataset.name;

        for (let i = 1; i < table.rows.length; i++) {
            if (table.rows[i].cells[1].dataset.name == tempNameInput &&
                table.rows[i].cells[2].dataset.price == tempPriceInput) {
                table.rows[i].remove();
                break;
            }
        }
        for (let i = 1; i < mainDiagram.childNodes.length; i++) {
            if (mainDiagram.childNodes[i].innerHTML == tempNameInput) {
                mainDiagram.childNodes[i].remove();
                break;
            }
        }
    }
    let row = table.insertRow(1);
    
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = "видалити";
    cell1.className = "deleteRow";
    cell1.addEventListener("click", deleteBtnClick);
    cell1.setAttribute("name", "deleteBtn");
    cell2.setAttribute("class", "changeInfo");
    cell2.setAttribute("onclick", "changeBtnClick(this)");
    cell2.innerHTML = nameInput.value;
    cell2.setAttribute("data-name", nameInput.value);
    cell2.setAttribute("data-toggle", "modal");
    cell2.setAttribute("data-target", "#exampleModal");
    cell3.setAttribute("class", "changeInfo");
    cell3.setAttribute("onclick", "changeBtnClick(this)");
    cell3.innerHTML = priceInput.value;
    cell3.setAttribute("data-price", priceInput.value);
    cell3.setAttribute("data-toggle", "modal");
    cell3.setAttribute("data-target", "#exampleModal");

    let newDiv = document.createElement("div");

    let newContentName = document.createTextNode(nameInput.value); 

    newDiv.appendChild(newContentName);
    newDiv.className = "diagram";
    newDiv.style.height = priceInput.value + "px";

    document.getElementsByClassName("mainDiagram")[0].appendChild(newDiv);

    nameInput.value = priceInput.value = "";
}

function deleteBtnClick() {
    let name;
    if (this.parentNode.childNodes[3])
        name = this.parentNode.childNodes[3].dataset.name;
    else 
        name = this.parentNode.childNodes[1].dataset.name;

    for (let i = 1; i < mainDiagram.childNodes.length; i++) {
        if (mainDiagram.childNodes[i].innerHTML == name) {
            mainDiagram.childNodes[i].remove();
            break;
        }
    }
    this.parentNode.parentNode.removeChild(this.parentNode);
}

function changeBtnClick(input) {
    let name;
    if (input.parentNode.childNodes[3])
        name = input.parentNode.childNodes[3].dataset.name;
    else 
        name = input.parentNode.childNodes[1].dataset.name

    let value;
    if (input.parentNode.childNodes[5])
        value = input.parentNode.childNodes[5].dataset.price;
    else 
        value = input.parentNode.childNodes[2].dataset.price;

    nameInput.value = tempNameInput = name;
    priceInput.value = tempPriceInput = value;
    flag = true;
}

function clearInputs() {
    priceInput.value = '';
    nameInput.value = '';
}

function closeBtnClickI() {
    flag = false;
}