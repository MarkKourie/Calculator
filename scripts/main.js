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
        } else if (displayValue.textContent == '' && (button.id == '*' || button.id == '/')) {
            displayValue.textContent = '';
        } else if (displayValue.textContent == '' && (button.id == "+" || button.id == "-")) {
            history.textContent = `0 ${button.id} `;
            displayValue.textContent = `${button.id}`;
        } else {
            history.textContent = history.textContent.slice(0, -3) + ` ${button.id} `;
            displayValue.textContent = `${button.id}`;
        }
    })
});

const resultDiv = document.querySelector('#result');
resultDiv.textContent = '';

//Equals Button
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => {
    history.textContent = history.textContent + displayValue.textContent;
    displayValue.textContent = '=';
    let arithmeticString = history.textContent
    currentOperation = arithmeticString.split(' ');
    if (/\D$/.test(history.textContent)) {
        clearAll()
        throw new Error("STOAHP");
    } else {
        while (currentOperation.length !== 1) {
            arithemeticLogic(currentOperation);
        }
    }
    //modify currentOperation[0] to fixed decimal places or scientfic notation if too large for the screen
    resultDiv.textContent = currentOperation[0];
});

//Clear Button
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', (e) => clearAll());


//Operate function
function arithemeticLogic(array) {
    array.forEach((item) => {
        if (item === "/") {
            let denominator = findAdjacentValues(array, item)[1];
            notZero(denominator);
            let quotient = division(findAdjacentValues(array, item));
            replaceOperationAndAdjacentValues(array, "/", `${quotient}`);
        } else if (item === "*" && (array.includes("/") !== true)) {
            let product = multiplication(findAdjacentValues(array, item));
            replaceOperationAndAdjacentValues(array, "*", `${product}`);            
        } else if (item === "+" && (array.includes("*") !== true) && (array.includes("/") !== true)) {
            let sum = addition(findAdjacentValues(array, item));
            replaceOperationAndAdjacentValues(array, "+", `${sum}`);
        } else if (item === "-" && (array.includes("*") !== true) && (array.includes("/") !== true)) {
            let difference = subtraction(findAdjacentValues(array, item));
            replaceOperationAndAdjacentValues(array, "-", `${difference}`);
        }
    });
}

function notZero(n) {
    n = +n;
    if (!n) {
        throw new Error("Invalid dividend " + n);
    }
    return n;
}

function clearAll() {
    history.textContent = '';
    displayValue.textContent = '';
    resultDiv.textContent = '';
    currentOperation = [];
}

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

//add plus/minus button that toggles button values to be positive or negative
//add decimals
