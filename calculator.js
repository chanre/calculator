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
        case "*":
            current = multiply(num1, num2);
            break;
        case "/":
            current = divide(num1, num2);
    }
    return current;
}

function displayInput(e) {
    let type = e.target.className;
    let input = e.target.dataset.input;
    let text = document.querySelector(".input");
    let history = document.querySelector(".history");
    if (type === "num") {
        operand1 += input;
        text.textContent = operand1;
    } else if (type === "operator") {
        history.textContent += text.textContent + ` ${input} `;
    } else if (input === "clear") {
        operand1 = "";
        history.textContent = "";
        text.textContent = "";
    }
}

let operand1 = "";


let buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', displayInput));
