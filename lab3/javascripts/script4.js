var arr = [
    { value: 100, type: 'USD' },
    { value: 215, type: 'EUR' },
    { value: 7, type: 'EUR' },
    { value: 99, type: 'USD' },
    { value: 354, type: 'USD' },
    { value: 12, type: 'EUR' },
    { value: 77, type: 'USD' },
];

// 1)Знайти суму всіх значень value у яких тип ‘USD’ та value менше за 100. 
// 2)повернути масив всіх об’єктів з типом ‘EUR’ та для кожного об’єкту подвоїти значення value;

let sum = 0;

arr.forEach(element => {
    if (element.type = 'USD' && element.value < 100)
        sum += element.value;
});

var elem = document.createElement("div");
elem.innerHTML = "USD sum: " + sum;
document.body.appendChild(elem);

let arr2 = [];
arr.forEach(element => {
    if (element.type = 'EUR') {
        element.value *= 2;
        arr2.push(element);
    }
});

arr.forEach(element => {
    var elem = document.createElement("div");
    elem.innerHTML = element.type + element.value;
    document.body.appendChild(elem);
});