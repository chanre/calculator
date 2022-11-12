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

console.log(operate("-", 3, 4));