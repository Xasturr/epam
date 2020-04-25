let form = document.forms.myForm;

let img = document.getElementsByName("image")[0];

let inputWidth = form.elements.inputWidth;
let inputHeight = form.elements.inputHeight;
let inputThickness = form.elements.inputThickness;
let inputColor = form.elements.inputColor;
let inputText = form.elements.inputText;
let submitBtn = form.elements.submit;

class ImgBuf {
    constructor(img) {
        this.height = img.height;
        this.width = img.width;
        this.borderThickness = img.style.borderWidth;
        this.borderColor = img.style.borderColor;
        this.alt = img.alt;
    }
};

let imgBuf = new ImgBuf(img);

inputWidth.value = img.width;
inputHeight.value = img.height;
inputThickness.value = parseInt(img.style.borderWidth);
inputColor.value = img.style.borderColor;
inputText.value = img.alt;

inputWidth.addEventListener("change", inputWidthCheck);
inputHeight.addEventListener("change", inputHeightCheck);
inputThickness.addEventListener("change", inputThicknessCheck);
inputColor.addEventListener("change", inputColorCheck);
inputText.addEventListener("change", inputTextCheck);
submitBtn.addEventListener("click", submitCheck);

function inputWidthCheck() {
    let input = inputWidth.value;
    if (input == parseInt(input, 10)) {
        imgBuf.width = parseInt(input, 10);
        inputWidth.style.borderColor = "";
        submitBtn.disabled = false;
    }
    else {
        inputWidth.style.borderColor = "red";
        submitBtn.disabled = true;
    }
}

function inputHeightCheck() {
    let input = inputHeight.value;
    if (input == parseInt(input, 10)) {
        imgBuf.height = parseInt(input, 10);
        inputHeight.style.borderColor = "";
        submitBtn.disabled = false;
    }
    else {
        inputHeight.style.borderColor = "red";
        submitBtn.disabled = true;
    }
}

function inputThicknessCheck() {
    let input = inputThickness.value;
    if (input == parseInt(input, 10)) {
        imgBuf.borderThickness = input + "px";
        inputThickness.style.borderColor = "";
        submitBtn.disabled = false;
    }
    else {
        inputThickness.style.borderColor = "red";
        submitBtn.disabled = true;
    }
}

function inputColorCheck() {
    let input = inputColor.value;
    inputColor.style.borderColor = "";
    submitBtn.disabled = false;
    imgBuf.borderColor = input;

    if (input === "red") {}
    else if (input === "blue") {}
    else if (input === "yellow") {}
    else if (input === "black") {}
    else if (input === "gray") {}
    else if (input === "green") {}
    else if (input === "brown") {}
    else {
        inputColor.style.borderColor = "red";
        submitBtn.disabled = true;
    }
}

function inputTextCheck() {
    let input = inputText.value;

    let i = input.length;
    while (i--) {
        let char = input.charAt(i);
        if (char >= 'A' && char <= 'Z' ||
        char >= 'a' && char <= 'z') {
            inputText.style.borderColor = "";
            submitBtn.disabled = false;
            imgBuf.alt = input;
        }
        else {
            inputText.style.borderColor = "red";
            submitBtn.disabled = true;
            break;
        } 
    }
}

function submitCheck() {
    event.preventDefault();
    
    img.width = imgBuf.width;
    img.height = imgBuf.height;
    img.style.borderColor = imgBuf.borderColor;
    img.style.borderWidth = imgBuf.borderThickness;
    img.alt = imgBuf.alt;
}