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
        case "÷":
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

function addDecimal() {
    if (display.textContent.includes(".")) return;
    display.textContent += ".";
}

function setOperation(currentOperator, previousOperator) {
    if (previousOperator) {
        if (previousOperator === "=" && currentOperator !== "=") {
            let operand1 = display.textContent;
            history.textContent = `${operand1} ${currentOperator}`;
            history.dataset.changeOperator = "true";
            return;
        }
        let operand1 = parseFloat(history.textContent.slice(0, -2));
        let operand2 = parseFloat(display.textContent);
        let result = operate(previousOperator, operand1, operand2);
        result = Math.round(result * 1000) / 1000;
        if (currentOperator === "=") {
            history.textContent = `${operand1} ${previousOperator} ${operand2} ${currentOperator}`;
        } else {
            history.textContent = `${result} ${currentOperator}`;
        }
        display.textContent = result;
        history.dataset.changeOperator = true;
    } else {
        if (currentOperator === "=" && !history.textContent) return;
        let operand1 = display.textContent;
        history.textContent = `${operand1} ${currentOperator}`;
    }
}

function updateOperation(newOperator) {
    if (newOperator === "=") return;
    history.textContent = display.textContent + " " + newOperator;
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
    if (reset || display.textContent === "0") {
        clearInput();
        history.dataset.changeOperator =  false;
    }

    display.textContent += number;
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") {
        return '÷';
    } else if (keyboardOperator === "*") {
        return "x";
    } else if (keyboardOperator === "Enter") {
        return "=";
    } else {
        return keyboardOperator;
    }
    
  }

function enterInput(e) {
    if (e.key === "Backspace") {
        backspace();
    } else if (e.className === "num" || e.key >= 0 && e.key<= 9) {
        let number;
        if (e.key) {
            number = e.key;
        } else {
            number = e.dataset.input;
        }
        let changeDisplay = history.dataset.changeOperator;
        if (display.textContent.slice(0, 1) === "C") {
            clearInput(true);
        } else if (number === ".") {
            addDecimal();
        } else if (!history.textContent || changeDisplay === "false") {
            displayInput(number, false)
        } else {
            displayInput(number, true)
        }
    } else if (e.className === "operator" || e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "=" || e.key === "Enter") {
        let operation;
        if (e.key) {
            operation = convertOperator(e.key);
        } else {
            operation = e.dataset.input;
        }
        let changeOperator = history.dataset.changeOperator;
        let previousOperator = history.textContent.slice(-1);
        if (display.textContent.slice(0, 1) === "C") {
            clearInput(true);
        } else if (!history.textContent) {
            setOperation(operation);
            history.dataset.changeOperator = true;
        } else if (changeOperator === "true") {
            updateOperation(operation);
        } else {
            setOperation(operation, previousOperator);
        }
    }
    
}

const display = document.querySelector(".input");
const history = document.querySelector(".history");
const numbers = document.querySelectorAll(".num");
const operations = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const backspaceBtn = document.querySelector("#backspace");

numbers.forEach(number => number.addEventListener("click", () => {
    enterInput(number);
}));

operations.forEach(operation => operation.addEventListener("click", () => {
    enterInput(operation);
}));

clear.addEventListener("click", () => clearInput(true));
backspaceBtn.addEventListener(("click"), backspace);
window.addEventListener("keydown", enterInput);