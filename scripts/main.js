//Mathematical Operations
function addition(a, b) {
   return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

//Operator
function operator(operation, a, b) {
    operation(a, b)
}

//Display buttons
const displayValue = document.querySelector('#display')
const calculatorButtons = document.querySelectorAll('.button');
calculatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        displayValue.textContent = `${button.id}`
    })
})