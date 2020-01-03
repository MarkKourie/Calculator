let currentOperation = []
//Mathematical Operations
function addition(values) {
    return values.length
        ? values.reduce((sum, nextItem) => sum + nextItem)
        : 0;
}

function subtraction(values) {
    return values.length
        ? values.reduce((difference, nextItem) => difference - nextItem)
        : 0;
}

function multiplication(values) {
    return values.length
        ? values.reduce((product, nextItem) => product * nextItem)
        : 0;
}


function division(values) {
    return values.length
        ? values.reduce((quotient, nextItem) => quotient / nextItem)
        : 0;
}

//Operator - need to refactor to call all operations stored in the variable!
function operate(operation, ...values) {
    operation(...values)
}

//Display buttons
const displayValue = document.querySelector('#display');
const history = document.querySelector('#history');
history.textContent = '';
const calculatorButtons = document.querySelectorAll('.button');
calculatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        /\D$/.test(displayValue.textContent) ? 
            displayValue.textContent = `${button.id}` :
            displayValue.textContent = displayValue.textContent + `${button.id}`;
    })
});

//Operator Buttons
const operatorButtons = document.querySelectorAll('.operation');
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (/\d$/.test(displayValue.textContent)) {
            history.textContent = history.textContent + displayValue.textContent + ` ${button.id} `;
            displayValue.textContent = `${button.id}`;
        } else {
            history.textContent = history.textContent.slice(0, -3) + ` ${button.id} `;
            displayValue.textContent = `${button.id}`;
        }
    })
});

const resultDiv = document.querySelector('#result');
resultDiv.textContent = '';
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => {
    history.textContent = history.textContent + displayValue.textContent;
    displayValue.textContent = '=';
    let arithmeticString = history.textContent
    currentOperation = arithmeticString.split(' ');
    while (currentOperation.length !== 1) {
        arithemeticLogic(currentOperation);
    }
    resultDiv.textContent = currentOperation[0];
});

function findAdjacentValues(array, value) {
    let left = array.indexOf(value) - 1;
    let right = array.indexOf(value) + 1;
    let result = [parseFloat(array[left]), parseFloat(array[right])];
    return result;
};

function replaceOperationAndAdjacentValues(array, operation, result) {
    let left = array.indexOf(operation) - 1;
    array.splice(left, 3, result);
};

function arithemeticLogic(array) {
    array.forEach((item) => {
        if (item === "*") {
            let product = multiplication(findAdjacentValues(array, item));
            replaceOperationAndAdjacentValues(array, "*", `${product}`);
        } else if (item === "/" && (array.includes("*") !== true)) {
            let quotient = division(findAdjacentValues(array, item));
            replaceOperationAndAdjacentValues(array, "/", `${quotient}`);
        } else if (item === "+" && (array.includes("*") !== true) && (array.includes("/") !== true)) {
            let sum = addition(findAdjacentValues(array, item));
            replaceOperationAndAdjacentValues(array, "+", `${sum}`);
        } else if (item === "-" && (array.includes("*") !== true) && (array.includes("/") !== true)) {
            let difference = subtraction(findAdjacentValues(array, item));
            replaceOperationAndAdjacentValues(array, "-", `${difference}`);
        }
    });
}