function operate(operator, num1, num2) {
    let current;
    switch(operator) {
        case "+":
            current = num1 + num2;
            break
        case "-":
            current = num1 - num2;
            break;
        case "x":
            current = num1 * num2;
            break;
        case "/":
            if (num2 === 0) return "Can't divide by zero!";
            current = num1 / num2;
    }
    return current;
}

function backspace() {
    if (display.textContent) {
        display.textContent = display.textContent.slice(0, -1);
        if (!display.textContent) {
            display.textContent = 0;
        }
    } else {
        display.textContent = 0;
    }
}

function setOperation(currentOperator, previousOperator) {
    if (previousOperator) {
        let operand1 = parseFloat(history.textContent.slice(0, -2));
        let operand2 = parseFloat(display.textContent);
        let result = operate(previousOperator, operand1, operand2);
        if (currentOperator === "=") {
            history.textContent = `${operand1} ${previousOperator} ${operand2} ${currentOperator}`;
        } else {
            history.textContent = `${result} ${currentOperator}`;
        }
        display.textContent = result;
        history.dataset.changeOperator = true;
    } else {
        let operand1 = display.textContent;
        history.textContent = `${operand1} ${currentOperator}`;
    }
}

function updateOperation(newOperator, equals) {
    if (equals) {
        history.textContent = display.textContent + " " + newOperator;
    } else {
        history.textContent = history.textContent.slice(0, -1) + newOperator;
    }
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
    
    if (display.textContent.includes(".") && number === ".") {
        return;
    }

    display.textContent += number;
}

const display = document.querySelector(".input");
const history = document.querySelector(".history");
const numbers = document.querySelectorAll(".num");
const operations = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const backspaceBtn = document.querySelector("#backspace");

numbers.forEach(number => number.addEventListener("click", () => {
    let changeDisplay = history.dataset.changeOperator;
    if (display.textContent.slice(0, 1) === "C") {
        clearInput(true);
    } else if (!history.textContent || changeDisplay === "false") {
        displayInput(number.dataset.input, false)
    } else {
        displayInput(number.dataset.input, true)
    }
}));

operations.forEach(operation => operation.addEventListener("click", () => {
    let changeOperator = history.dataset.changeOperator;
    let previousOperator = history.textContent.slice(-1);
    if (display.textContent.slice(0, 1) === "C") {
        clearInput(true);
    } else if (!history.textContent) {
        setOperation(operation.dataset.input);
        history.dataset.changeOperator = true;
    } else if (changeOperator === "true") {
        updateOperation(operation.dataset.input, previousOperator);
    } else {
        setOperation(operation.dataset.input, previousOperator);
    }
}));

clear.addEventListener("click", () => clearInput(true));
backspaceBtn.addEventListener(("click"), backspace);