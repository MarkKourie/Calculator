const displayValue = document.querySelector('#display');

const history = document.querySelector('#history');
history.textContent = '';

let currentOperation = []

const resultDiv = document.querySelector('#result');
resultDiv.textContent = '';

const pastOperations = document.querySelector('#past-operations');
pastOperations.textContent = '';

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

//Keyboard support
window.addEventListener('keypress',(e) => {
    const button = document.querySelector(`.button[id="${String.fromCharCode(e.which)}"`);
    const operation = document.querySelector(`.operation[id="${String.fromCharCode(e.which)}"]`);
    const negativeButton = document.querySelector(`.button[id="-${String.fromCharCode(e.which)}"`);
    console.log(e.which)
    if (button) {
        updateDisplay(button)
    } else if (numbersDiv.className == "negative") {
        updateDisplay(negativeButton);
        revertToPositive();
    } else if (operation) {
        event.preventDefault();
        stroreOperation(operation);
    } else if (e.which == 61) {
        operate();
    } else if (e.which == 95) {
        plusMinus();
    } else if (e.which == 46) {
        decimal();
    }
});

window.addEventListener('keydown', (e) => {
    console.log(e.which)
    if (e.which == 13) {
        operate();
    } else if (e.which == 46) {
        clear();
    } else if (e.which == 27) {
        clearAll();
    } else if (e.which == 8) {
        backspace();
    }
});

//Display buttons
const numberButtons = document.querySelectorAll('.button');
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => updateDisplay(button) );
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
    button.addEventListener('click', (e) => stroreOperation(button) )
});


//Equals Button
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => operate());

//Clear Buttons
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', (e) => clear());

const clearAllButton = document.querySelector('#clear-all');
clearAllButton.addEventListener('click', (e) => clearAll());

//Backspace Button
const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', (e) => backspace())

//Decimal Button
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener('click', (e) => decimal())

//Plus/Minus Button
const plusMinusButton = document.querySelector("#negative");
const numbersDiv = document.querySelector("#numbers")
plusMinusButton.addEventListener('click', (e) => plusMinus());


//Core Arithmetic Logic
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

function notZero(num) {
    num = +num;
    if (!num) {
        clear();
        throw new Error("Invalid dividend " + num);
    }
    return num;
}

function clearAll() {
    clear();
    clearPastOperations();
    resultDiv.textContent = '';
    currentOperation = [];
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

function updateDisplay(button) {
    usePreviousResult();
    /(\d|\u002E)$/.test(displayValue.textContent) ? 
        displayValue.textContent = displayValue.textContent + `${button.value}`:
        displayValue.textContent = `${button.value}`;

}

function stroreOperation(button) {
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
}

function operate() {
    history.textContent = history.textContent + displayValue.textContent;
    displayValue.textContent = '';
    let arithmeticString = history.textContent
    currentOperation = arithmeticString.split(' ');
    if (/\D$/.test(history.textContent)) {
        clearAll() //change this to simply remove the last operator? Or display an error. 
        throw new Error("That is not an operation");
    } else {
        while (currentOperation.length !== 1) {
            arithemeticLogic(currentOperation);
        }
    }
    createPastOperation();
    displayValue.textContent = currentOperation[0];
    history.textContent = '';
    resultDiv.textContent = currentOperation[0];
}

function backspace() {
        displayValue.textContent = displayValue.textContent.slice(0, -1);
}

function plusMinus() {
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
}

function decimal() {
    usePreviousResult();
    const zero =  document.querySelector('.button[special-name="zero"]');
    if (/\D$/.test(displayValue.textContent) || displayValue.textContent == '') {
        displayValue.textContent = zero.textContent + '.' ;
        numbersDiv.className == 'negative' ? revertToPositive() : undefined;
    } else if (/\u002E/.test(displayValue.textContent)) {
        displayValue.textContent = displayValue.textContent;
    } else {
        displayValue.textContent = displayValue.textContent + '.';
    }
}

function usePreviousResult() {
    if (currentOperation[0] != undefined) {
        displayValue.textContent='';
        currentOperation = [];}
}

//fix error messages