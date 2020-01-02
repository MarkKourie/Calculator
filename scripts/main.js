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
        displayValue.textContent = displayValue.textContent + `${button.id}`
    })
});

//Operator Buttons
const operatorButtons = document.querySelectorAll('.operation');
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        history.textContent = history.textContent + displayValue.textContent + ` ${button.id} `;
        displayValue.textContent = '';
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
        currentOperation.forEach((item) => {
            if (item === "*") {
                let product = multiplication(findAdjacentValues(currentOperation, item));
                replaceOperationAndAdjacentValues(currentOperation, "*", `${product}`);
            } else if (item === "/" && (currentOperation.includes("*") !== true)) {
                let quotient = division(findAdjacentValues(currentOperation, item));
                replaceOperationAndAdjacentValues(currentOperation, "/", `${quotient}`);
            } else if (item === "+" && (currentOperation.includes("*") !== true) && (currentOperation.includes("/") !== true)) {
                let sum = addition(findAdjacentValues(currentOperation, item));
                replaceOperationAndAdjacentValues(currentOperation, "+", `${sum}`);
            } else if (item === "-" && (currentOperation.includes("*") !== true) && (currentOperation.includes("/") !== true)) {
                let difference = subtraction(findAdjacentValues(currentOperation, item));
                replaceOperationAndAdjacentValues(currentOperation, "-", `${difference}`);
            }
        });
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