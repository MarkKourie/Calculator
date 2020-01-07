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
const numberButtons = document.querySelectorAll('.button');
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        /(\d|\u002E)$/.test(displayValue.textContent) ? 
            displayValue.textContent = displayValue.textContent + `${button.value}`:
            displayValue.textContent = `${button.value}`;
    })
});

//reverts values to positive if number displayed is already negative
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (numbersDiv.className == "negative") {
            revertToPositive();
        }  
    });
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

const pastOperations = document.querySelector('#past-operations');
pastOperations.textContent = '';

//Equals Button
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => {
    history.textContent = history.textContent + displayValue.textContent;
    displayValue.textContent = '';
    let arithmeticString = history.textContent
    currentOperation = arithmeticString.split(' ');
    if (/\D$/.test(history.textContent)) {
        clearAll() //change this to simply remove the last operator? Or display an error. 
        throw new Error("STAHP");
    } else {
        while (currentOperation.length !== 1) {
            arithemeticLogic(currentOperation);
        }
    }
    createPastOperation();
    displayValue.textContent = currentOperation[0];
    history.textContent = '';
    resultDiv.textContent = currentOperation[0];
});

//Clear Buttons
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', (e) => clear());

const clearAllButton = document.querySelector('#clear-all');
clearAllButton.addEventListener('click', (e) => clearAll());

//Backspace Button
const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', (e) => {
    displayValue.textContent = displayValue.textContent.slice(0, -1);
})

//Decimal Button
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener('click', (e) => {
    if (displayValue.textContent == '') { 
        displayValue.textContent = '0.' ;
    } else if (/\u002E/.test(displayValue.textContent)) {
        displayValue.textContent = displayValue.textContent;
    } else {
        displayValue.textContent = displayValue.textContent + '.';
    }
})

//Plus/Minus Button
const plusMinusButton = document.querySelector("#negative");
const numbersDiv = document.querySelector("#numbers")
plusMinusButton.addEventListener('click', (e) => {
    if (/\d/.test(displayValue.textContent)) {
        /^\u002D.*\d$/.test(displayValue.textContent) ?
            displayValue.textContent = displayValue.textContent.slice(1):
            displayValue.textContent = `-${displayValue.textContent}`;
    } else if (numbersDiv.className == "positive") {
        numberButtons.forEach((button) => {
            button.value = `-${button.value}`;
            button.id = `-${button.id}`;
            button.textContent = `-${button.textContent}`
        });
        numbersDiv.className = "negative"
    } else if (numbersDiv.className = "negative") {
        revertToPositive();
    }
});


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
    clear();
    clearPastOperations();
    resultDiv.textContent = '';
}

function clear() {
    history.textContent = '';
    displayValue.textContent = '';
    currentOperation = currentOperation[0];
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

function createPastOperation() {
    var para = document.createElement('P');
    var text = document.createTextNode(`${history.textContent} = ${currentOperation[0]}`);
    para.appendChild(text);
    pastOperations.appendChild(para);
}

function clearPastOperations() { 
    var e = document.querySelector("#past-operations"); 
    var first = e.firstElementChild; 
    while (first) { 
        first.remove(); 
        first = e.firstElementChild; 
    } 
}

function revertToPositive() {
    numberButtons.forEach((button) => {
        button.value = `${button.value}`.slice(1);
        button.id = `${button.id}`.slice(1);
        button.textContent = `${button.textContent}`.slice(1);
        });
    numbersDiv.className = "positive";
    }

//add keyboard support