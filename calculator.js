function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    let current;
    switch(operator) {
        case "+":
            current = add(num1, num2);
            break
        case "-":
            current = subtract(num1, num2);
            break;
        case "x":
            current = multiply(num1, num2);
            break;
        case "/":
            if (num2 === 0) return null;
            current = divide(num1, num2);
    }
    return current;
}

function setOperation(currentOperator, previousOperator) {
    if (previousOperator) {
        let operand1 = parseFloat(history.textContent.slice(0, -2));
        let operand2 = parseFloat(display.textContent);
        let result = operate(previousOperator, operand1, operand2);
        history.textContent = `${result} ${currentOperator}`;
        display.textContent = result;
        history.dataset.changeOperator = true;
    } else {
        let operand1 = display.textContent;
        history.textContent = `${operand1} ${currentOperator}`;
    }
}

function updateOperation(newOperator) {
    history.textContent = history.textContent.slice(0, -1) + newOperator;
}

function clearInput(clearAll) {
    if (clearAll) {
        history.textContent = "";
        display.textContent = 0;
    } else {
        display.textContent = "";
    }
}


function displayInput(number, reset) {
    if (reset || display.textContent == 0) {
        clearInput();
        history.dataset.changeOperator =  false;
    }
    display.textContent += number;
}

const display = document.querySelector(".input");
const history = document.querySelector(".history");
const numbers = document.querySelectorAll(".num");
const operations = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");

numbers.forEach(number => number.addEventListener("click", () => {
    let changeDisplay = history.dataset.changeOperator;
    if (!history.textContent || changeDisplay === "false") {
        displayInput(number.dataset.input, false)
    } else {
        displayInput(number.dataset.input, true)
    }
}));

operations.forEach(operation => operation.addEventListener("click", () => {
    let changeOperator = history.dataset.changeOperator;
    if (!history.textContent) {
        setOperation(operation.dataset.input);
        history.dataset.changeOperator = true;
    } else if (changeOperator === "true") {
        updateOperation(operation.dataset.input);
    } else {
        let previousOperator = history.textContent.slice(-1);
        setOperation(operation.dataset.input, previousOperator);
    }
}));

clear.addEventListener("click", () => clearInput(true));