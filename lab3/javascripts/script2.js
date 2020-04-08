let n = 10;
let currN = 0;
let number = 0;

function factorial(n, result) {
    result = result || 1;
    if (!n) {
        return result;
    } else {
        return factorial(n - 1, result * n);
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

while (currN != n + 1) {
    let arr = new Array;
    let tempN = 0;
    while (tempN != currN + 1) {
        if (tempN == 0 || tempN == currN) {
            arr.push(factorial(0));
        } else {
            arr.push(factorial(currN) / (factorial(tempN) * factorial(currN - tempN)));
        }
        tempN++;
    }

    var elem = document.createElement("div");
    elem.innerHTML = currN + ") ";
    let x = parseInt((n - currN));
    while (x) {
        elem.innerHTML += "------";
        x--
    }

    arr.forEach(element => {
        if (parseInt(element) > 99) {
            elem.innerHTML += element + "--------";
        } else if (parseInt(element) > 9) {
            elem.innerHTML += element + "---------";
        } else
            elem.innerHTML += element + "----------";
    });
    document.body.appendChild(elem);
    console.log(elem);
    sleep(60);
    currN++;
}